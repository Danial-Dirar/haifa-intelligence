"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { Clock, Download, ImageIcon, Loader2, Sparkles, Wand2 } from "lucide-react";
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

export function StudioClient() {
  const [prompt, setPrompt] = useState("");
  const [styleId, setStyleId] = useState(defaultStyle.id);
  const [aspect, setAspect] = useState<string>(aspectRatios[0].id);
  const [steps, setSteps] = useState<number>(stepRange.default);
  const [megapixels, setMegapixels] = useState<number>(megapixelRange.default);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeStyle = styles.find((s) => s.id === styleId)!;
  const activeAspect = aspectRatios.find((a) => a.id === aspect)!;
  const dims = dimsFor(aspect, megapixels);
  const eta = estimateSeconds(steps, megapixels);
  const stepHeat = (steps - stepRange.min) / (stepRange.max - stepRange.min);
  const mpHeat = (megapixels - megapixelRange.min) / (megapixelRange.max - megapixelRange.min);
  const current = results[0];

  function startProgress() {
    setProgress(6);
    timer.current = setInterval(() => {
      setProgress((p) => (p < 90 ? p + Math.random() * 9 : p));
    }, 180);
  }
  function stopProgress() {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }

  async function generate() {
    if (prompt.trim().length < 3) {
      toast.error("Write a longer prompt first.");
      return;
    }
    setBusy(true);
    startProgress();
    try {
      const res = await fetch("/api/studio/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, styleId, aspect, steps, megapixels }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Generation failed");

      setProgress(100);
      setResults((prev) => [
        { id: data.id, image: data.image, prompt, style: data.style, seed: data.seed },
        ...prev,
      ]);
      toast.success("Preview ready", { description: data.note });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      stopProgress();
      setTimeout(() => setProgress(0), 600);
      setBusy(false);
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

        <div className="space-y-3">
          <label className="text-sm font-medium">Style</label>
          <div className="grid grid-cols-2 gap-2">
            {styles.map((s) => {
              const active = s.id === styleId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStyleId(s.id)}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border p-2.5 text-left transition-all",
                    active
                      ? "border-brand-1/60 ring-1 ring-brand-1/40"
                      : "border-border/60 hover:border-brand-1/40"
                  )}
                >
                  <div className={cn("mb-2 h-12 w-full rounded-lg bg-gradient-to-br", s.accent)} />
                  <p className="text-sm font-medium leading-tight">{s.name}</p>
                  <p className="mt-0.5 line-clamp-1 text-[0.7rem] text-muted-foreground">{s.sample}</p>
                </button>
              );
            })}
          </div>
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
          className="relative flex items-center justify-center overflow-hidden rounded-3xl border border-border/60 bg-card/30"
          style={{ aspectRatio: `${activeAspect.rw} / ${activeAspect.rh}` }}
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
              <div className="glass rounded-full p-1.5">
                <div className="h-1.5 overflow-hidden rounded-full bg-background/40">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-2 to-brand-3 transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
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
