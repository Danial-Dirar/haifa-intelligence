/**
 * Haifa Studio bridge.
 *
 * Runs at home, next to the GPU. Sits in front of ComfyUI so the public surface
 * is our controlled API (reached through the Cloudflare Tunnel) instead of raw
 * ComfyUI. Its whole job: hold ONE WebSocket to ComfyUI to learn live per-step
 * progress (which REST does not expose), and serve a clean queue + status API.
 *
 *   Vercel (Next) --tunnel--> THIS bridge --localhost--> ComfyUI
 *
 * Concurrency is ComfyUI's: it runs prompts serially, so the GPU never runs two
 * at once. We just surface the queue position and progress.
 *
 * No dependencies — Node's global fetch + WebSocket (Node >= 22).
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const COMFYUI_URL = (process.env.COMFYUI_URL ?? "http://127.0.0.1:8188").replace(/\/$/, "");
const PORT = Number(process.env.PORT ?? 8189);
const CLIENT_ID = "haifa-bridge";

// Manual pause switch: when this file exists the GPU is "busy" (e.g. gaming), so
// we refuse new jobs and the site shows "GPU offline". Toggled by `studio pause`/
// `studio resume`. In-flight jobs are left alone.
const PAUSE_FILE = process.env.STUDIO_PAUSE_FILE ?? path.join(import.meta.dirname, "..", ".paused");
function isPaused() {
  try {
    return fs.existsSync(PAUSE_FILE);
  } catch {
    return false;
  }
}

/** prompt_id -> { status, value, max, error, enqueuedAt, startedAt, doneAt } */
const jobs = new Map();
const JOB_TTL_MS = 15 * 60 * 1000;

function getJob(id) {
  let j = jobs.get(id);
  if (!j) {
    j = { status: "queued", value: 0, max: 0, enqueuedAt: Date.now() };
    jobs.set(id, j);
  }
  return j;
}

function pruneJobs() {
  const now = Date.now();
  for (const [id, j] of jobs) {
    const ref = j.doneAt ?? j.enqueuedAt;
    if (now - ref > JOB_TTL_MS) jobs.delete(id);
  }
}
setInterval(pruneJobs, 60_000).unref();

// ── ComfyUI WebSocket: the only source of real per-step progress ──────────────
let currentPromptId = null;

function connectWs() {
  const wsUrl = `${COMFYUI_URL.replace(/^http/, "ws")}/ws?clientId=${CLIENT_ID}`;
  const ws = new WebSocket(wsUrl);

  ws.addEventListener("open", () => console.log(`[bridge] WS connected -> ${wsUrl}`));

  ws.addEventListener("message", (ev) => {
    let msg;
    try {
      // Binary frames are preview images — ignore.
      if (typeof ev.data !== "string") return;
      msg = JSON.parse(ev.data);
    } catch {
      return;
    }
    const { type, data } = msg ?? {};
    if (!data) return;

    switch (type) {
      case "execution_start": {
        currentPromptId = data.prompt_id;
        const j = getJob(data.prompt_id);
        j.status = "running";
        j.startedAt = Date.now();
        break;
      }
      case "executing": {
        if (data.node === null || data.node === undefined) {
          // prompt finished executing
          const id = data.prompt_id ?? currentPromptId;
          if (id) {
            const j = getJob(id);
            j.status = "completed";
            j.doneAt = Date.now();
          }
          currentPromptId = null;
        } else if (data.prompt_id) {
          currentPromptId = data.prompt_id;
          getJob(data.prompt_id).status = "running";
        }
        break;
      }
      case "progress": {
        const id = data.prompt_id ?? currentPromptId;
        if (id) {
          const j = getJob(id);
          j.status = "running";
          j.value = data.value ?? j.value;
          j.max = data.max ?? j.max;
        }
        break;
      }
      case "execution_success": {
        const id = data.prompt_id;
        if (id) {
          const j = getJob(id);
          j.status = "completed";
          j.doneAt = Date.now();
        }
        if (currentPromptId === id) currentPromptId = null;
        break;
      }
      case "execution_error": {
        const id = data.prompt_id;
        if (id) {
          const j = getJob(id);
          j.status = "error";
          j.error = data.exception_message ?? "Generation failed on the GPU.";
          j.doneAt = Date.now();
        }
        if (currentPromptId === id) currentPromptId = null;
        break;
      }
    }
  });

  ws.addEventListener("close", () => {
    console.warn("[bridge] WS closed — reconnecting in 2s");
    setTimeout(connectWs, 2000);
  });
  ws.addEventListener("error", () => {
    try {
      ws.close();
    } catch {
      /* triggers the close handler -> reconnect */
    }
  });
}
connectWs();

// ── ComfyUI REST helpers ──────────────────────────────────────────────────────
async function comfy(path, init) {
  return fetch(`${COMFYUI_URL}${path}`, init);
}

/** How many jobs are ahead of `id` in ComfyUI's queue (running counts as ahead). */
async function queuePosition(id) {
  const res = await comfy("/queue");
  if (!res.ok) return null;
  const q = await res.json();
  const running = q.queue_running ?? [];
  const pending = q.queue_pending ?? [];

  if (running.some((it) => it[1] === id)) return { active: true, ahead: 0 };
  const idx = pending.findIndex((it) => it[1] === id);
  if (idx >= 0) return { active: false, ahead: idx + running.length };
  return null; // not in queue (done, or not yet registered)
}

/** Fetch the finished image for `id` from history and return it as a data URL. */
async function fetchResult(id) {
  const res = await comfy(`/history/${id}`);
  if (!res.ok) return null;
  const hist = await res.json();
  const entry = hist[id];
  if (!entry) return null;
  if (entry.status?.status_str === "error") return { error: "Generation failed on the GPU." };
  if (!entry.status?.completed) return null;

  const img = entry.outputs
    ? Object.values(entry.outputs).flatMap((o) => o.images ?? [])[0]
    : undefined;
  if (!img) return { error: "Finished but produced no image." };

  const view = await comfy(
    `/view?filename=${encodeURIComponent(img.filename)}&subfolder=${encodeURIComponent(
      img.subfolder
    )}&type=${encodeURIComponent(img.type)}`
  );
  if (!view.ok) return { error: "Could not read the generated image." };
  const buf = Buffer.from(await view.arrayBuffer());
  return { image: `data:image/png;base64,${buf.toString("base64")}` };
}

// ── HTTP API ──────────────────────────────────────────────────────────────────
function send(res, code, body) {
  const payload = JSON.stringify(body);
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(payload);
}

async function readJson(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);

    if (req.method === "GET" && url.pathname === "/healthz") {
      const paused = isPaused();
      const comfyOk = await comfy("/system_stats").then((r) => r.ok).catch(() => false);
      const ok = comfyOk && !paused;
      return send(res, ok ? 200 : 503, { ok, comfy: comfyOk, paused });
    }

    // Enqueue a pre-built ComfyUI graph. The web app builds the graph; we just
    // submit it and start tracking it.
    if (req.method === "POST" && url.pathname === "/enqueue") {
      // Paused (GPU in use elsewhere) — turn the studio away cleanly. The web
      // client maps 503 to its "GPU offline" state.
      if (isPaused()) {
        return send(res, 503, {
          error: "The Studio is taking a short break — the GPU is busy. Please try again soon.",
        });
      }

      const body = await readJson(req);
      const graph = body.graph;
      if (!graph || typeof graph !== "object") return send(res, 400, { error: "Missing graph." });

      let queued;
      try {
        queued = await comfy("/prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: graph, client_id: CLIENT_ID }),
        });
      } catch {
        return send(res, 503, { error: "ComfyUI is offline." });
      }
      if (!queued.ok) {
        const detail = await queued.text().catch(() => "");
        return send(res, 502, { error: `ComfyUI rejected the job. ${detail.slice(0, 300)}` });
      }
      const { prompt_id: promptId } = await queued.json();
      if (!promptId) return send(res, 502, { error: "ComfyUI did not return a prompt id." });
      getJob(promptId); // start tracking
      return send(res, 200, { promptId });
    }

    // Poll status: queue position + live progress + the image when done.
    if (req.method === "GET" && url.pathname === "/status") {
      const id = url.searchParams.get("id");
      if (!id) return send(res, 400, { error: "Missing id." });
      const job = jobs.get(id);

      let pos;
      try {
        pos = await queuePosition(id);
      } catch {
        return send(res, 503, { error: "ComfyUI is offline." });
      }

      // Still waiting its turn. Surface the job currently on the GPU so the
      // waiting user can watch the queue move (how far ahead, and its progress).
      if (pos && !pos.active) {
        const active = currentPromptId ? jobs.get(currentPromptId) : null;
        const aMax = active?.max ?? 0;
        const aVal = active?.value ?? 0;
        return send(res, 200, {
          state: "queued",
          ahead: pos.ahead,
          progress: 0,
          value: 0,
          max: job?.max ?? 0,
          activeProgress: aMax > 0 ? aVal / aMax : 0,
          activeValue: aVal,
          activeMax: aMax,
        });
      }

      // Actively running.
      if (pos && pos.active) {
        const value = job?.value ?? 0;
        const max = job?.max ?? 0;
        return send(res, 200, {
          state: "running",
          ahead: 0,
          progress: max > 0 ? value / max : 0,
          value,
          max,
        });
      }

      // Not in the queue: finished (or errored), look in history.
      if (job?.status === "error") return send(res, 200, { state: "error", error: job.error });
      const result = await fetchResult(id);
      if (result?.error) return send(res, 200, { state: "error", error: result.error });
      if (result?.image) {
        return send(res, 200, { state: "done", progress: 1, value: job?.max ?? 0, max: job?.max ?? 0, image: result.image });
      }
      // Briefly in limbo between leaving the queue and landing in history.
      return send(res, 200, { state: "running", ahead: 0, progress: job?.max ? (job.value ?? 0) / job.max : 0.99, value: job?.value ?? 0, max: job?.max ?? 0 });
    }

    send(res, 404, { error: "Not found." });
  } catch (err) {
    console.error("[bridge] error", err);
    send(res, 500, { error: "Bridge error." });
  }
});

server.listen(PORT, () => {
  console.log(`[bridge] listening on http://127.0.0.1:${PORT}  (ComfyUI: ${COMFYUI_URL})`);
});
