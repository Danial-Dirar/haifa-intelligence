import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/services";

export function Services() {
  return (
    <section id="services" className="container-page py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Sticky intro */}
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance md:text-5xl">
              One studio,{" "}
              <span className="text-gradient">end-to-end</span> capability.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-md text-muted-foreground text-pretty">
              You bring the problem — a prediction to make, a product to launch,
              footage to cut. We take it from data and design all the way to a
              shipped, monitored result.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Button asChild variant="outline" className="mt-6 rounded-full">
              <Link href="/services">
                Explore all services
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={(i % 2) * 0.06}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-1/40 hover:bg-card/70">
                  <div className="absolute -right-10 -top-10 size-32 rounded-full bg-brand-1/10 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl border border-border/60 bg-background/60 text-brand-2 transition-colors group-hover:text-brand-3">
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <h3 className="relative mt-5 font-display text-xl font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="relative mt-1 text-sm font-medium text-brand-2">{s.tagline}</p>
                  <p className="relative mt-3 text-sm text-muted-foreground">{s.description}</p>
                  <ul className="relative mt-4 flex flex-wrap gap-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="rounded-full border border-border/50 bg-background/40 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
