/**
 * Minimal server-side ComfyUI client for the AI Studio.
 *
 * Flow: build a graph from the krea2 template -> POST /prompt -> poll
 * /history/{id} until done -> fetch the PNG via /view -> return a data URL.
 *
 * Runs server-side only (Next route handler). Reaches ComfyUI on localhost now;
 * point COMFYUI_URL at the Cloudflare Tunnel when the site goes to the cloud.
 */
import { krea2Workflow } from "./krea2-workflow";
import type { ImageStyle } from "@/lib/data/styles";

export type ComfyNode = {
  class_type: string;
  inputs: Record<string, unknown>;
  _meta?: { title?: string };
};
export type ComfyGraph = Record<string, ComfyNode>;

export const COMFYUI_URL = process.env.COMFYUI_URL ?? "http://127.0.0.1:8188";

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

type HistoryEntry = {
  status?: { completed?: boolean; status_str?: string };
  outputs?: Record<string, { images?: { filename: string; subfolder: string; type: string }[] }>;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function comfyFetch(path: string, init?: RequestInit, timeoutMs = 10_000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(`${COMFYUI_URL}${path}`, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

export class ComfyOfflineError extends Error {}

/** Submit a graph, wait for the result, return the first image as a PNG data URL. */
export async function generateImage(
  params: GenerateParams,
  { pollMs = 1_000, maxWaitMs = 180_000 }: { pollMs?: number; maxWaitMs?: number } = {}
): Promise<{ image: string; width: number; height: number; filename: string }> {
  const graph = buildGraph(params);
  const clientId = crypto.randomUUID();

  let queued: Response;
  try {
    queued = await comfyFetch("/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: graph, client_id: clientId }),
    });
  } catch {
    throw new ComfyOfflineError("Studio GPU is offline.");
  }

  if (!queued.ok) {
    const detail = await queued.text().catch(() => "");
    throw new Error(`ComfyUI rejected the job (${queued.status}). ${detail.slice(0, 300)}`);
  }
  const { prompt_id: promptId } = (await queued.json()) as { prompt_id: string };
  if (!promptId) throw new Error("ComfyUI did not return a prompt id.");

  // Poll history until this prompt completes.
  const deadline = Date.now() + maxWaitMs;
  while (Date.now() < deadline) {
    await sleep(pollMs);
    const res = await comfyFetch(`/history/${promptId}`).catch(() => null);
    if (!res?.ok) continue;
    const hist = (await res.json()) as Record<string, HistoryEntry>;
    const entry = hist[promptId];
    if (!entry) continue;

    const statusStr = entry.status?.status_str;
    if (statusStr === "error") throw new Error("Generation failed on the GPU.");
    if (!entry.status?.completed) continue;

    const img = entry.outputs
      ? Object.values(entry.outputs).flatMap((o) => o.images ?? [])[0]
      : undefined;
    if (!img) throw new Error("Generation finished but produced no image.");

    const view = await comfyFetch(
      `/view?filename=${encodeURIComponent(img.filename)}&subfolder=${encodeURIComponent(
        img.subfolder
      )}&type=${encodeURIComponent(img.type)}`,
      undefined,
      30_000
    );
    if (!view.ok) throw new Error("Could not fetch the generated image.");
    const buf = Buffer.from(await view.arrayBuffer());
    return {
      image: `data:image/png;base64,${buf.toString("base64")}`,
      width: params.width,
      height: params.height,
      filename: img.filename,
    };
  }

  throw new Error("Timed out waiting for the image.");
}
