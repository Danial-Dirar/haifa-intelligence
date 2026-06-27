import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { stats } from "@/lib/data/misc";

export function Stats() {
  return (
    <section className="container-page py-16 md:py-20">
      <RevealGroup className="grid grid-cols-2 gap-6 rounded-3xl border border-border/60 bg-card/30 p-8 md:grid-cols-4 md:p-12">
        {stats.map((s) => (
          <Reveal key={s.label} className="flex flex-col gap-1">
            <span className="font-display text-4xl font-semibold tracking-tight text-gradient md:text-5xl">
              {s.value}
            </span>
            <span className="text-sm text-muted-foreground">{s.label}</span>
          </Reveal>
        ))}
      </RevealGroup>
    </section>
  );
}
