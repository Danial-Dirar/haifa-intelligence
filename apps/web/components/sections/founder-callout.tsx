import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/shared/icons";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function FounderCallout() {
  return (
    <section className="container-page py-20 md:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-8 md:p-12">
          <div className="absolute -right-16 -top-16 size-64 rounded-full bg-brand-1/15 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 size-64 rounded-full bg-brand-3/10 blur-3xl" />

          <div className="relative grid items-center gap-10 md:grid-cols-[auto_1fr]">
            <div className="flex items-center gap-5">
              <div className="grid size-24 place-items-center rounded-3xl bg-gradient-to-br from-brand-2 via-brand-1 to-brand-3 font-display text-3xl font-bold text-white shadow-xl shadow-brand-1/30">
                DD
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Behind the studio
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-4xl">
                {site.founder.name}
              </h2>
              <p className="mt-1 text-brand-2">{site.founder.role}</p>
              <p className="mt-4 max-w-xl text-muted-foreground text-pretty">
                Computer engineer and ML researcher — currently writing a thesis on
                groundwater-level prediction. Haifa Intelligence grew out of that
                research and a habit of building things end-to-end.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-full">
                  <Link href="/founder">
                    View portfolio
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <a href={site.social.github} target="_blank" rel="noreferrer">
                    <GitHubIcon className="size-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
