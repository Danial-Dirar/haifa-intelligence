import { NextResponse } from "next/server";

/**
 * Stub lead-capture endpoint.
 * TODO: replace with the NestJS API (apps/api) — persist + email notification.
 * For now it validates shape and logs, so the front-end flow is real end-to-end.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // eslint-disable-next-line no-console
    console.log("[contact] new lead:", { name, email, type: body.projectType });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
