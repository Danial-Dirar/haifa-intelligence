import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { process } from "@/lib/data/misc";

export function Process() {
  return (
    <section className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow="How we work"
        align="center"
        title={
          <>
            From idea to <span className="text-gradient">shipped</span>, in four moves.
          </>
        }
        description="No black boxes. You see a plan, a prototype, and working demos the whole way through."
        className="mx-auto items-center"
      />

      <div className="relative mt-16">
        {/* connecting line */}
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
        <div className="grid gap-8 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.08} className="relative">
              <div className="flex flex-col items-start">
                <span className="relative z-10 grid size-14 place-items-center rounded-2xl border border-border/60 bg-card font-display text-lg font-semibold text-gradient">
                  {p.step}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
