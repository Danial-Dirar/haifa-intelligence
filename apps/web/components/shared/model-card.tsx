import { cn } from "@/lib/utils";
import type { AIModel } from "@/lib/data/models";

const statusStyles: Record<AIModel["status"], string> = {
  Live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Beta: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Research: "bg-sky-500/15 text-sky-400 border-sky-500/30",
};

export function ModelCard({
  model,
  className,
}: {
  model: AIModel;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-1/40",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand-2/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight">{model.name}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{model.task}</p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-0.5 text-[0.7rem] font-medium",
            statusStyles[model.status]
          )}
        >
          {model.status}
        </span>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{model.description}</p>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {model.metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-border/50 bg-background/40 p-3 text-center">
            <p className="font-display text-lg font-semibold tracking-tight">{m.value}</p>
            <p className="text-[0.7rem] text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-5">
        <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
          Inputs
        </p>
        <div className="flex flex-wrap gap-1.5">
          {model.inputs.map((inp) => (
            <span
              key={inp}
              className="rounded-full border border-border/50 bg-background/40 px-2.5 py-1 text-xs text-muted-foreground"
            >
              {inp}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
