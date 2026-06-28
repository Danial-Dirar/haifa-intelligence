/**
 * Studio client (server-side, Next route handlers).
 *
 * Talks to the home **bridge** (apps/api), not ComfyUI directly. The bridge owns
 * the WebSocket to ComfyUI, so it knows live per-step progress and queue position;
 * we just build the graph here, enqueue it, and poll status.
 *
 *   Next route --STUDIO_BRIDGE_URL--> bridge --localhost--> ComfyUI
 *
 * Locally the bridge runs on 127.0.0.1:8189; in the cloud STUDIO_BRIDGE_URL is the
 * Cloudflare Tunnel URL that fronts the home bridge.
 */
import { krea2Workflow } from "./krea2-workflow";
import type { ImageStyle } from "@/lib/data/styles";

export type ComfyNode = {
  class_type: string;
  inputs: Record<string, unknown>;
  _meta?: { title?: string };
};
export type ComfyGraph = Record<string, ComfyNode>;

export const BRIDGE_URL = (process.env.STUDIO_BRIDGE_URL ?? "http://127.0.0.1:8189").replace(/\/$/, "");

/** Node ids in the krea2 template we override per request. */
const NODE = {
  userPrompt: "30:19", // PrimitiveStringMultiline
  ksampler: "30:3", // KSampler (seed, steps)
  latent: "30:5", // EmptyLatentImage (width, height)
  resolution: "49", // ResolutionSelector — bypassed, we set latent dims directly
  enableLora: "30:23", // PrimitiveBoolean "Enable LoRA?"
  refinePrompt: "30:24", // PrimitiveBoolean "Refine Prompt?" (prompt optimizer)
  loraLoader: "30:15", // LoraLoaderModelOnly
  triggerConcat: "30:27", // StringConcatenate (appends LoRA trigger word)
} as const;

export type GenerateParams = {
  prompt: string;
  style: ImageStyle;
  steps: number;
  width: number;
  height: number;
  seed: number;
  /** Use the workflow's built-in prompt optimizer (future feature; off by default). */
  refinePrompt?: boolean;
};

/** Clone the template and stamp in the per-request values. */
export function buildGraph(p: GenerateParams): ComfyGraph {
  const g: ComfyGraph = structuredClone(krea2Workflow);

  g[NODE.userPrompt].inputs.value = p.prompt;

  g[NODE.ksampler].inputs.seed = p.seed;
  g[NODE.ksampler].inputs.steps = p.steps;

  // Drive the latent size directly so output dims match the UI exactly.
  g[NODE.latent].inputs.width = p.width;
  g[NODE.latent].inputs.height = p.height;
  delete g[NODE.resolution];

  g[NODE.refinePrompt].inputs.value = Boolean(p.refinePrompt);

  const lora = p.style.lora;
  if (lora) {
    g[NODE.enableLora].inputs.value = true; // routes model through the LoRA + trigger concat
    g[NODE.loraLoader].inputs.lora_name = lora.file;
    g[NODE.loraLoader].inputs.strength_model = lora.strength;
    g[NODE.triggerConcat].inputs.string_b = lora.trigger ?? "";
  } else {
    g[NODE.enableLora].inputs.value = false; // base model, no trigger word
  }

  return g;
}

export class BridgeOfflineError extends Error {}

async function bridgeFetch(path: string, init?: RequestInit, timeoutMs = 12_000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(`${BRIDGE_URL}${path}`, { ...init, signal: ctrl.signal });
  } catch {
    throw new BridgeOfflineError("Studio GPU is offline.");
  } finally {
    clearTimeout(t);
  }
}

/** Build + submit a job. Returns immediately with the prompt id (no GPU wait). */
export async function enqueue(params: GenerateParams): Promise<{ promptId: string }> {
  const graph = buildGraph(params);
  const res = await bridgeFetch("/enqueue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ graph }),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 503) throw new BridgeOfflineError(data.error ?? "Studio GPU is offline.");
  if (!res.ok) throw new Error(data.error ?? "Could not start the job.");
  if (!data.promptId) throw new Error("No job id returned.");
  return { promptId: data.promptId };
}

export type JobStatus = {
  state: "queued" | "running" | "done" | "error";
  ahead?: number;
  progress?: number; // 0..1
  value?: number; // current step
  max?: number; // total steps
  image?: string; // data URL, when done
  error?: string;
};

/** Poll a job's queue position + live progress (and the image once done). */
export async function getStatus(id: string): Promise<JobStatus> {
  const res = await bridgeFetch(`/status?id=${encodeURIComponent(id)}`);
  const data = await res.json().catch(() => ({}));
  if (res.status === 503) throw new BridgeOfflineError(data.error ?? "Studio GPU is offline.");
  if (!res.ok) throw new Error(data.error ?? "Could not read job status.");
  return data as JobStatus;
}
