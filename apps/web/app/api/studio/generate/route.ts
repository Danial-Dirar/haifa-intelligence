import { NextResponse } from "next/server";
import { getStyle, aspectRatios, dimsFor, stepRange, megapixelRange } from "@/lib/data/styles";
import { generateImage, ComfyOfflineError } from "@/lib/comfy/client";

/**
 * Real image generation against Danial's local ComfyUI (krea2 turbo).
 *
 * Validates + lightly moderates input, maps the public style -> LoRA, builds the
 * ComfyUI workflow, runs it on the GPU, and returns the resulting PNG.
 *
 * Phase 2 TODO: move the GPU call behind a NestJS job queue (concurrency=1) with
 * per-IP rate limits + daily quota, and stream /ws progress instead of polling.
 */

// A single image can take a while on the 8GB GPU — give the route room.
export const maxDuration = 200;

const BLOCKED = ["nsfw", "nude", "naked", "porn", "gore", "explicit"];

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Math.round(Number.isFinite(n) ? n : min)));

export async function POST(request: Request) {
  let body: {
    prompt?: string;
    styleId?: string;
    aspect?: string;
    steps?: number;
    megapixels?: number;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const prompt = (body.prompt ?? "").trim();
  const style = getStyle(body.styleId ?? "");
  const aspect = aspectRatios.find((a) => a.id === body.aspect) ?? aspectRatios[0];
  const steps = clamp(body.steps ?? stepRange.default, stepRange.min, stepRange.max);
  const megapixels = clamp(body.megapixels ?? megapixelRange.default, megapixelRange.min, megapixelRange.max);
  const { w, h } = dimsFor(aspect.id, megapixels);

  if (prompt.length < 3) {
    return NextResponse.json({ ok: false, error: "Add a longer prompt." }, { status: 400 });
  }
  if (!style) {
    return NextResponse.json({ ok: false, error: "Pick a style." }, { status: 400 });
  }
  if (BLOCKED.some((word) => prompt.toLowerCase().includes(word))) {
    return NextResponse.json({ ok: false, error: "That prompt isn't allowed." }, { status: 422 });
  }

  const id = Math.random().toString(36).slice(2, 8);
  const seed = Math.floor(Math.random() * 1_000_000_000_000);

  try {
    const result = await generateImage({ prompt, style, steps, width: w, height: h, seed });
    return NextResponse.json({
      ok: true,
      id,
      seed,
      image: result.image,
      width: result.width,
      height: result.height,
      steps,
      megapixels,
      style: style.name,
    });
  } catch (err) {
    if (err instanceof ComfyOfflineError) {
      return NextResponse.json(
        { ok: false, error: "The studio GPU is offline right now. Please try again later." },
        { status: 503 }
      );
    }
    const message = err instanceof Error ? err.message : "Generation failed.";
    console.error("[studio/generate]", message);
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
