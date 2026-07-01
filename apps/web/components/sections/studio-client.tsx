"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Check,
  ChevronDown,
  Clock,
  Download,
  ImageIcon,
  Loader2,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  imageStyles,
  aspectRatios,
  publicStyle,
  defaultStyle,
  dimsFor,
  stepRange,
  megapixelRange,
  estimateSeconds,
} from "@/lib/data/styles";
import { cn } from "@/lib/utils";

function fmtDur(s: number) {
  return s < 90 ? `~${s}s` : `~${(s / 60).toFixed(1)} min`;
}

/** A labelled range slider whose side-note warns, live, as the value climbs. */
function SliderRow({
  label,
  value,
  min,
  max,
  badge,
  hint,
  heat,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  badge: string;
  hint: string;
  heat: number; // 0..1 — how "expensive" the current value is
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-sm font-medium">{label}</label>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium tabular-nums transition-colors",
            heat > 0.66
              ? "bg-rose-500/15 text-rose-400"
              : heat > 0.33
                ? "bg-amber-500/15 text-amber-400"
                : "bg-brand-1/15 text-foreground"
          )}
        >
          {badge}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-brand-1"
      />
      <p
        className={cn(
          "flex items-center gap-1.5 text-xs transition-colors",
          heat > 0.66 ? "text-rose-400/90" : heat > 0.33 ? "text-amber-400/90" : "text-muted-foreground"
        )}
      >
        <Clock className="size-3" />
        {hint}
      </p>
    </div>
  );
}

type Result = {
  id: string;
  image: string;
  prompt: string;
  style: string;
  seed: number;
};

const styles = imageStyles.map(publicStyle);
type StyleOption = (typeof styles)[number];

/**
 * Compact style selector: a single row showing the current style, which opens a
 * grid popover on click. Keeps the tall list of styles from pushing the rest of
 * the controls — and the Generate button — far down the panel.
 */
function StylePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = styles.find((s) => s.id === value)!;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex w-full items-center gap-3 rounded-xl border bg-background/40 p-2.5 text-left transition-colors",
          open ? "border-brand-1/60 ring-1 ring-brand-1/40" : "border-border/60 hover:border-brand-1/40"
        )}
      >
        <span className={cn("size-9 shrink-0 rounded-lg bg-gradient-to-br", active.accent)} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium leading-tight">{active.name}</span>
          <span className="block text-[0.7rem] text-muted-foreground">{active.sample}</span>
        </span>
        <ChevronDown
          className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 rounded-2xl border border-border/60 bg-popover p-2 shadow-xl shadow-black/20"
        >
          <div
            data-lenis-prevent
            className="grid max-h-[19rem] grid-cols-2 gap-2 overflow-y-auto p-1"
          >
            {styles.map((s: StyleOption) => {
              const selected = s.id === value;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(s.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border p-2.5 text-left transition-all",
                    selected
                      ? "border-brand-1/60 ring-1 ring-brand-1/40"
                      : "border-border/60 hover:border-brand-1/40"
                  )}
                >
                  <div className={cn("mb-2 h-12 w-full rounded-lg bg-gradient-to-br", s.accent)} />
                  <p className="text-sm font-medium leading-tight">{s.name}</p>
                  <p className="mt-0.5 line-clamp-1 text-[0.7rem] text-muted-foreground">{s.sample}</p>
                  {selected && <Check className="absolute right-2 top-2 size-4 text-brand-1" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function StudioClient() {
  const [prompt, setPrompt] = useState("");
  const [styleId, setStyleId] = useState(defaultStyle.id);
  const [aspect, setAspect] = useState<string>(aspectRatios[0].id);
  const [steps, setSteps] = useState<number>(stepRange.default);
  const [megapixels, setMegapixels] = useState<number>(megapixelRange.default);
  const [busy, setBusy] = useState(false);
  const [pct, setPct] = useState(0);
  const [statusLabel, setStatusLabel] = useState("");
  // Queue state: how many jobs are ahead of us, and the % of the one on the GPU now.
  const [queueAhead, setQueueAhead] = useState(0);
  const [activePct, setActivePct] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeStyle = styles.find((s) => s.id === styleId)!;
  const activeAspect = aspectRatios.find((a) => a.id === aspect)!;
  const dims = dimsFor(aspect, megapixels);
  const eta = estimateSeconds(steps, megapixels);
  const stepHeat = (steps - stepRange.min) / (stepRange.max - stepRange.min);
  const mpHeat = (megapixels - megapixelRange.min) / (megapixelRange.max - megapixelRange.min);
  const current = results[0];

  /** Poll the job until it finishes; resolves with the final image data URL. */
  function pollUntilDone(promptId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const tick = async () => {
        try {
          const res = await fetch(`/api/studio/status?id=${encodeURIComponent(promptId)}`);
          const s = await res.json();
          if (!res.ok || !s.ok) throw new Error(s.error || "Lost track of the job.");

          if (s.state === "queued") {
            setQueueAhead(s.ahead ?? 0);
            setActivePct(Math.round((s.activeProgress ?? 0) * 100));
            setStatusLabel(s.ahead > 0 ? `In queue · ${s.ahead} ahead` : "Starting…");
            setPct(2);
          } else if (s.state === "running") {
            setQueueAhead(0);
            const p = Math.round((s.progress ?? 0) * 100);
            setPct(Math.max(3, p));
            setStatusLabel(s.max > 0 ? `Generating · step ${s.value}/${s.max}` : "Generating…");
          } else if (s.state === "done") {
            setPct(100);
            setStatusLabel("Finishing…");
            resolve(s.image as string);
            return;
          } else if (s.state === "error") {
            reject(new Error(s.error || "Generation failed."));
            return;
          }
          timer.current = setTimeout(tick, 1000);
        } catch (e) {
          reject(e instanceof Error ? e : new Error("Status check failed."));
        }
      };
      tick();
    });
  }

  async function generate() {
    if (prompt.trim().length < 3) {
      toast.error("Write a longer prompt first.");
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    setBusy(true);
    setPct(0);
    setQueueAhead(0);
    setActivePct(0);
    setStatusLabel("Sending…");
    try {
      const res = await fetch("/api/studio/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, styleId, aspect, steps, megapixels }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not start the job.");

      const image = await pollUntilDone(data.promptId);
      setResults((prev) => [
        { id: data.promptId, image, prompt, style: data.style, seed: data.seed },
        ...prev,
      ]);
      toast.success("Image ready");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
      setBusy(false);
      setTimeout(() => {
        setPct(0);
        setStatusLabel("");
      }, 800);
    }
  }

  function download(r: Result) {
    const a = document.createElement("a");
    a.href = r.image;
    a.download = `haifa-${r.style.toLowerCase().replace(/\s+/g, "-")}-${r.id}.png`;
    a.click();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(320px,380px)_1fr]">
      {/* Controls */}
      <div className="space-y-6 rounded-3xl border border-border/60 bg-card/40 p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your prompt</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="A lighthouse on a cliff at golden hour, crashing waves…"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Style</label>
          <StylePicker value={styleId} onChange={setStyleId} />
          <p className="text-xs text-muted-foreground">{activeStyle.description}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Aspect ratio</label>
          <div className="flex flex-wrap gap-2">
            {aspectRatios.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setAspect(a.id)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition-colors",
                  a.id === aspect
                    ? "border-brand-1/60 bg-brand-1/15 text-foreground"
                    : "border-border/60 bg-background/40 text-muted-foreground hover:text-foreground"
                )}
              >
                {a.label} · {a.id}
              </button>
            ))}
          </div>
        </div>

        <SliderRow
          label="Detail (steps)"
          value={steps}
          min={stepRange.min}
          max={stepRange.max}
          badge={`${steps} steps`}
          heat={stepHeat}
          onChange={setSteps}
          hint={
            steps <= stepRange.min
              ? "Fastest. Good enough for most prompts."
              : `More refinement passes — sharper, but slower.`
          }
        />

        <SliderRow
          label="Resolution"
          value={megapixels}
          min={megapixelRange.min}
          max={megapixelRange.max}
          badge={`${megapixels} MP · ${dims.w}×${dims.h}`}
          heat={mpHeat}
          onChange={setMegapixels}
          hint={
            megapixels <= megapixelRange.min
              ? "Fastest. Light on VRAM."
              : `Bigger image — noticeably slower and heavier on the GPU.`
          }
        />

        <div className="flex items-center justify-center gap-1.5 rounded-xl border border-border/60 bg-background/40 py-2 text-xs text-muted-foreground">
          <Clock className="size-3.5 text-brand-2" />
          Estimated time: <span className="font-medium text-foreground">{fmtDur(eta)}</span>
        </div>

        <Button onClick={generate} disabled={busy} size="lg" className="w-full rounded-full">
          {busy ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Wand2 className="size-4" />
              Generate
            </>
          )}
        </Button>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-brand-2" />
          Runs on Haifa&apos;s local GPU pipeline. One image at a time — be patient in the queue.
        </p>
      </div>

      {/* Canvas */}
      <div className="space-y-6">
        <div
          className="relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-3xl border border-border/60 bg-card/30"
          style={{
            aspectRatio: `${activeAspect.rw} / ${activeAspect.rh}`,
            // Keep the stage from ballooning on tall/portrait ratios: cap the
            // height, and for portrait derive a matching max width so the box
            // stays centered instead of stretching across the column.
            maxHeight: "70vh",
            maxWidth:
              activeAspect.rh > activeAspect.rw
                ? `calc(70vh * ${activeAspect.rw} / ${activeAspect.rh})`
                : undefined,
          }}
        >
          <div className="absolute inset-0 bg-grid opacity-20" />
          {current ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={current.image} alt={current.prompt} className="relative size-full object-contain" />
          ) : (
            <div className="relative flex flex-col items-center gap-3 text-center text-muted-foreground">
              <ImageIcon className="size-10" />
              <p className="max-w-xs text-sm">Your generated image will appear here.</p>
            </div>
          )}

          {busy && (
            <div className="absolute inset-x-0 bottom-0 p-4">
              {queueAhead > 0 ? (
                // Waiting our turn — show the queue and the job moving through it.
                <div className="glass space-y-2.5 rounded-2xl p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-2 opacity-70" />
                        <span className="relative inline-flex size-2 rounded-full bg-brand-2" />
                      </span>
                      <Users className="size-3.5 text-brand-2" />
                      {queueAhead} ahead of you
                    </span>
                    <span className="tabular-nums text-muted-foreground">in queue</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[0.7rem] text-muted-foreground">
                      <span>Now generating</span>
                      <span className="tabular-nums">{activePct}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-background/40">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-1 to-brand-2 transition-all duration-500"
                        style={{ width: `${Math.max(4, activePct)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass space-y-2 rounded-2xl p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Loader2 className="size-3.5 animate-spin text-brand-2" />
                      {statusLabel || "Working…"}
                    </span>
                    <span className="tabular-nums text-muted-foreground">{pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-background/40">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-2 to-brand-3 transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {current && (
          <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-card/40 p-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{current.prompt}</p>
              <p className="text-xs text-muted-foreground">
                {current.style} · seed {current.seed}
              </p>
            </div>
            <Button variant="outline" size="sm" className="rounded-full" onClick={() => download(current)}>
              <Download className="size-4" />
              Save
            </Button>
          </div>
        )}

        {results.length > 1 && (
          <div>
            <p className="mb-3 text-sm font-medium text-muted-foreground">This session</p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {results.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setResults((prev) => [r, ...prev.filter((x) => x.id !== r.id)])}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-border/60"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.image} alt={r.prompt} className="size-full object-cover transition-transform group-hover:scale-105" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
