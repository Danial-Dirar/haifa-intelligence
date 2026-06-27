import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Process } from "@/components/sections/process";
import { CTA } from "@/components/sections/cta";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom ML models, web platforms, mobile apps, generative AI, video editing, and AI strategy.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title={
          <>
            Everything you need, <span className="text-gradient">under one roof</span>.
          </>
        }
        description="Six service lines that connect — so the model you train can power the app we build and the content we generate."
      >
        <Button asChild className="rounded-full">
          <Link href="/contact">
            Start a project
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </PageHeader>

      <section className="container-page py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={(i % 2) * 0.06} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-7 transition-colors hover:border-brand-1/40">
                  <div className="absolute -right-12 -top-12 size-40 rounded-full bg-brand-1/10 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl border border-border/60 bg-background/60 text-brand-2">
                      <Icon className="size-6" />
                    </span>
                  </div>
                  <h2 className="relative mt-5 font-display text-2xl font-semibold tracking-tight">
                    {s.title}
                  </h2>
                  <p className="relative mt-1 font-medium text-brand-2">{s.tagline}</p>
                  <p className="relative mt-3 text-muted-foreground text-pretty">{s.description}</p>

                  <div className="relative mt-6 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        What we do
                      </p>
                      <ul className="space-y-1.5">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="mt-0.5 size-3.5 shrink-0 text-brand-2" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        You get
                      </p>
                      <ul className="flex flex-wrap gap-1.5">
                        {s.deliverables.map((d) => (
                          <li
                            key={d}
                            className="rounded-full border border-border/50 bg-background/40 px-2.5 py-1 text-xs text-muted-foreground"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Process />
      <CTA />
    </>
  );
}
