import Image from "next/image";
import { GitHubIcon } from "@/components/shared/icons";
import { Reveal } from "@/components/motion/reveal";
import { team } from "@/lib/data/team";
import { cn } from "@/lib/utils";

/**
 * The people building Haifa Intelligence alongside the founder. Scales from one
 * card to a full grid as more collaborators are added in lib/data/team.ts.
 */
export function Team() {
  if (team.length === 0) return null;

  return (
    <section className="container-page py-16 md:py-20">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-wider text-brand-2">The team</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">
          Building it <span className="text-gradient">together</span>
        </h2>
        <p className="mt-2 max-w-xl text-muted-foreground">
          A small circle building Haifa Intelligence alongside the founder.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={(i % 3) * 0.06} className="h-full">
            <div className="group flex h-full gap-4 rounded-3xl border border-border/60 bg-card/40 p-4 transition-colors hover:border-brand-1/40">
              <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border/60">
                <Image
                  src={m.photo.src}
                  alt={m.photo.alt}
                  fill
                  sizes="96px"
                  placeholder="blur"
                  blurDataURL={m.photo.blurDataURL}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: m.photo.position ?? "center" }}
                />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold leading-tight">{m.name}</h3>
                <p className="text-sm text-brand-2">{m.role}</p>
                <p className="mt-2 line-clamp-4 text-sm text-muted-foreground text-pretty">{m.bio}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-border/60 bg-background/50 px-2 py-0.5 text-[0.7rem] text-muted-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {m.github ? (
                  <a
                    href={m.github}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-brand-1/40 hover:text-foreground"
                  >
                    <GitHubIcon className="size-3.5" />
                    GitHub
                  </a>
                ) : (
                  <span
                    title="Coming soon"
                    className={cn(
                      "mt-4 inline-flex cursor-default items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 py-1.5 text-xs font-medium text-muted-foreground/60"
                    )}
                  >
                    <GitHubIcon className="size-3.5" />
                    GitHub
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
