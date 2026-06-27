import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/shared/icons";
import { Reveal } from "@/components/motion/reveal";
import { Aurora } from "@/components/shared/aurora";
import { Button } from "@/components/ui/button";
import { projects, getProject } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden pt-32 pb-10 md:pt-40">
        <Aurora className="opacity-50" />
        <div className="container-page">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            All work
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full border border-border/60 bg-card/40 px-2.5 py-1">
              {project.category}
            </span>
            <span>{project.year}</span>
          </div>

          <Reveal>
            <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight text-balance md:text-6xl">
              {project.title}
            </h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground text-pretty">
              {project.summary}
            </p>
          </Reveal>

          {project.repo && (
            <Reveal delay={0.1}>
              <Button asChild variant="outline" className="mt-6 rounded-full">
                <a href={project.repo} target="_blank" rel="noreferrer">
                  <GitHubIcon className="size-4" />
                  View source
                </a>
              </Button>
            </Reveal>
          )}
        </div>
      </section>

      {/* Hero band */}
      <section className="container-page">
        <Reveal>
          <div
            className={cn(
              "relative flex aspect-[21/9] items-end overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br p-8",
              project.accent
            )}
          >
            <div className="absolute inset-0 bg-grid opacity-25 mix-blend-overlay" />
            <span className="relative font-display text-3xl font-semibold tracking-tight md:text-5xl">
              {project.title}
            </span>
          </div>
        </Reveal>
      </section>

      {/* Body */}
      <section className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
          <Reveal className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">Overview</h2>
              <p className="mt-3 text-muted-foreground text-pretty">{project.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Focus areas
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border/60 bg-card/40 px-3 py-1 text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="rounded-2xl border border-border/60 bg-card/40 p-6">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Stack
              </h3>
              <ul className="mt-3 space-y-2">
                {project.stack.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm">
                    <span className="size-1.5 rounded-full bg-gradient-to-r from-brand-2 to-brand-3" />
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl border border-border/50 bg-background/40 p-4">
                <p className="text-sm text-muted-foreground">
                  Want something like this for your team?
                </p>
                <Button asChild size="sm" className="mt-3 w-full rounded-full">
                  <Link href="/contact">
                    Start a project
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="container-page pb-24">
        <h2 className="mb-8 font-display text-2xl font-semibold tracking-tight">More work</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {related.map((p) => (
            <Reveal key={p.slug} className="h-full">
              <Link
                href={`/work/${p.slug}`}
                className="group flex h-full items-center justify-between rounded-2xl border border-border/60 bg-card/40 p-5 transition-colors hover:border-brand-1/40"
              >
                <div>
                  <p className="text-xs text-muted-foreground">{p.category}</p>
                  <p className="mt-1 font-medium">{p.title}</p>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
