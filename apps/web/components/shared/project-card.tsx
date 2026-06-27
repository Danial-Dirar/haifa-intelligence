import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/data/projects";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/40 transition-all duration-300 hover:-translate-y-1 hover:border-brand-1/40",
        className
      )}
    >
      {/* Visual band */}
      <Link
        href={`/work/${project.slug}`}
        className={cn(
          "relative flex aspect-[16/10] items-end overflow-hidden bg-gradient-to-br p-5",
          project.accent
        )}
      >
        <div className="absolute inset-0 bg-grid opacity-30 mix-blend-overlay" />
        <div className="absolute right-4 top-4 rounded-full bg-background/70 px-2.5 py-1 text-xs font-medium backdrop-blur">
          {project.category}
        </div>
        <span className="relative font-display text-2xl font-semibold tracking-tight text-foreground drop-shadow-sm">
          {project.title}
        </span>
        <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/[0.03]" />
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{project.year}</span>
          <span className="size-1 rounded-full bg-muted-foreground/50" />
          <span>{project.tags[0]}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-border/50 bg-background/40 px-2 py-0.5 text-[0.7rem] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand-2"
          >
            Case study
            <ArrowUpRight className="size-4" />
          </Link>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              aria-label="View source on GitHub"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <GitHubIcon className="size-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
