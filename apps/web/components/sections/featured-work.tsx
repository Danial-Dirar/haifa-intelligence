import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/shared/project-card";
import { Button } from "@/components/ui/button";
import { featuredProjects } from "@/lib/data/projects";

export function FeaturedWork() {
  return (
    <section id="work" className="relative py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Things we&apos;ve <span className="text-gradient">shipped</span>.
              </>
            }
            description="Research models, full-stack platforms, and mobile apps — a sample of what comes out of the studio."
          />
          <Reveal>
            <Button asChild variant="ghost" className="rounded-full">
              <Link href="/work">
                All projects
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.07} className="h-full">
              {/* Gentle parallax offset per column for depth */}
              <Parallax speed={i % 3 === 1 ? 28 : 14} className="h-full">
                <ProjectCard project={p} className="h-full" />
              </Parallax>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
