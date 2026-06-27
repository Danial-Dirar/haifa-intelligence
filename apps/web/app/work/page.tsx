import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/shared/project-card";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects, models, and products built by Haifa Intelligence.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title={
          <>
            What comes out of the <span className="text-gradient">studio</span>.
          </>
        }
        description="Research models, full-stack platforms, and mobile apps — spanning machine learning, systems, and graphics."
      />

      <section className="container-page pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06} className="h-full">
              <ProjectCard project={p} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
