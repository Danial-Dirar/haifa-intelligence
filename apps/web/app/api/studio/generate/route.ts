import { NextResponse } from "next/server";
import { getStyle, aspectRatios, dimsFor, stepRange, megapixelRange } from "@/lib/data/styles";
import { enqueue, BridgeOfflineError } from "@/lib/comfy/client";

/**
 * Enqueue an image-generation job on the home GPU (via the bridge).
 *
 * This returns immediately with a job id — the browser then polls
 * /api/studio/status for queue position + live progress + the final image.
 * Because we no longer block on the GPU, there is no long serverless function
 * and no timeout pressure.
 */

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

  const seed = Math.floor(Math.random() * 1_000_000_000_000);

  try {
    const { promptId } = await enqueue({ prompt, style, steps, width: w, height: h, seed });
    return NextResponse.json({
      ok: true,
      promptId,
      seed,
      width: w,
      height: h,
      steps,
      megapixels,
      style: style.name,
    });
  } catch (err) {
    if (err instanceof BridgeOfflineError) {
      return NextResponse.json(
        { ok: false, error: "The studio GPU is offline right now. Please try again later." },
        { status: 503 }
      );
    }
    const message = err instanceof Error ? err.message : "Could not start the job.";
    console.error("[studio/generate]", message);
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
