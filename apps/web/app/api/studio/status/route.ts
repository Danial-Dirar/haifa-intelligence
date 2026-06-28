import { NextResponse } from "next/server";
import { getStatus, BridgeOfflineError } from "@/lib/comfy/client";

/**
 * Poll a job: queue position ("N ahead"), live per-step progress, and the final
 * image once it's done. The browser hits this every ~1s after enqueueing.
 */
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing id." }, { status: 400 });
  }

  try {
    const status = await getStatus(id);
    return NextResponse.json({ ok: true, ...status });
  } catch (err) {
    if (err instanceof BridgeOfflineError) {
      return NextResponse.json(
        { ok: false, error: "The studio GPU is offline right now." },
        { status: 503 }
      );
    }
    const message = err instanceof Error ? err.message : "Could not read status.";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
