import { ArrowUpRight, BookOpen } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { publications, doiUrl } from "@/lib/data/publications";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Peer-reviewed publications. Each card is a single link to the paper's DOI
 * resolver, so a click lands on the actual article. The studio author is
 * highlighted in the byline.
 */
export function Publications({ className }: { className?: string }) {
  if (publications.length === 0) return null;

  return (
    <section className={cn("container-page py-16", className)}>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              Publications
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Peer-reviewed research — click any paper to open it at the source.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <a
              href={site.founder.scholar}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              Google Scholar
              <ArrowUpRight className="size-3.5" />
            </a>
            <a
              href={site.founder.orcid}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              ORCID
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 space-y-4">
        {publications.map((p, i) => (
          <Reveal key={p.doi} delay={(i % 4) * 0.06}>
            <a
              href={doiUrl(p.doi)}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 transition-colors hover:border-brand-1/50 hover:bg-card/60"
            >
              <div className="absolute -right-12 -top-12 size-40 rounded-full bg-brand-1/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-2/30 bg-brand-2/10 px-2.5 py-0.5 font-medium text-brand-2">
                    <BookOpen className="size-3" />
                    {p.venue}
                  </span>
                  <span className="text-muted-foreground tabular-nums">{p.year}</span>
                  <span className="text-muted-foreground/50">·</span>
                  <span className="text-muted-foreground">{p.type}</span>
                </div>

                <h3 className="mt-3 max-w-3xl font-medium leading-snug text-balance transition-colors group-hover:text-brand-1 md:text-lg">
                  {p.title}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground">
                  {p.authors.map((a, j) => (
                    <span key={a.name}>
                      <span className={cn(a.self && "font-semibold text-foreground")}>{a.name}</span>
                      {j < p.authors.length - 1 && ", "}
                    </span>
                  ))}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand-2">
                  <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-brand-2">
                    doi.org/{p.doi}
                  </span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
