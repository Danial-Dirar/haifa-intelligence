import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, Quote } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { reviews } from "@/lib/data/reviews";
import { cn } from "@/lib/utils";

/**
 * Curated client reviews. Each card carries the testimonial, a portrait, and the
 * client's own contacts so a reader can verify the review is genuine. Scales from
 * one card to a grid as more entries are added in lib/data/reviews.ts.
 */
export function Reviews({ withHeading = true }: { withHeading?: boolean }) {
  if (reviews.length === 0) return null;

  return (
    <section className="container-page py-16 md:py-20">
      {withHeading && (
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-wider text-brand-2">Reviews</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">
            In our clients&rsquo; <span className="text-gradient">words</span>
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            A few of the people we&rsquo;ve built for, quoted with their permission.
          </p>
        </Reveal>
      )}

      <div className={cn("grid gap-5 lg:grid-cols-2", withHeading && "mt-8")}>
        {reviews.map((r, i) => (
          <Reveal key={r.name} delay={(i % 2) * 0.06} className="h-full">
            <figure className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-6 md:p-8">
              <figcaption className="flex items-center gap-4 border-b border-border/50 pb-5">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border/60">
                  <Image
                    src={r.photo.src}
                    alt={r.photo.alt}
                    fill
                    sizes="64px"
                    placeholder="blur"
                    blurDataURL={r.photo.blurDataURL}
                    className="object-cover"
                    style={{ objectPosition: r.photo.position ?? "center" }}
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-semibold leading-tight">{r.name}</p>
                  {r.affiliationUrl ? (
                    <a
                      href={r.affiliationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-brand-2 underline-offset-2 transition-colors hover:text-brand-1 hover:underline"
                    >
                      {r.affiliation}
                    </a>
                  ) : (
                    <p className="text-sm text-brand-2">{r.affiliation}</p>
                  )}
                  <div className="mt-1.5 flex flex-col gap-0.5">
                    {r.emails.map((email) => (
                      <a
                        key={email}
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Mail className="size-3 shrink-0" />
                        <span className="truncate">{email}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </figcaption>

              <blockquote className="relative mt-6 text-pretty text-muted-foreground">
                <Quote className="mb-2 size-7 text-brand-1/20" aria-hidden />
                {r.quote}
              </blockquote>

              {r.projectSlug && (
                <Link
                  href={`/work/${r.projectSlug}`}
                  className="mt-5 inline-flex w-fit items-center gap-1 text-sm font-medium text-brand-2 transition-colors hover:text-brand-1"
                >
                  See the project
                  <ArrowUpRight className="size-4" />
                </Link>
              )}
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
