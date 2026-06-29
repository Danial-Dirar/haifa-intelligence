import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Mail, MapPin } from "lucide-react";
import { GitHubIcon } from "@/components/shared/icons";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { ProjectCard } from "@/components/shared/project-card";
import { Publications } from "@/components/sections/publications";
import { Team } from "@/components/sections/team";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data/projects";
import { capabilities } from "@/lib/data/misc";
import { founderPhoto } from "@/lib/data/founder";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Founder — Danial Dirar",
  description:
    "Danial Dirar — computer engineer, ML researcher, and founder of Haifa Intelligence.",
};

const focus = [
  "Machine learning & deep learning",
  "Time-series forecasting & research",
  "Full-stack web (Next.js / NestJS)",
  "Mobile apps with Flutter",
  "Generative image & video pipelines",
  "Computer graphics & systems",
];

export default function FounderPage() {
  const myProjects = projects.filter((p) => p.repo).slice(0, 6);

  return (
    <>
      <PageHeader
        eyebrow="Founder · personal portfolio"
        title={
          <>
            Hi, I&apos;m <span className="text-gradient">Danial Dirar</span>.
          </>
        }
        description="Computer engineering student, ML researcher, and the person building Haifa Intelligence. My thesis is on groundwater-level prediction — and I build software end-to-end."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild className="rounded-full">
            <a href={site.social.github} target="_blank" rel="noreferrer">
              <GitHubIcon className="size-4" />
              GitHub
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <a href={site.founder.scholar} target="_blank" rel="noreferrer">
              <GraduationCap className="size-4" />
              Publications
              <ArrowUpRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/contact">
              Work with me
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </PageHeader>

      {/* Quick facts */}
      <section className="container-page">
        <Reveal>
          <div className="grid gap-6 rounded-3xl border border-border/60 bg-card/40 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
            <div className="relative mx-auto h-52 w-44 shrink-0 overflow-hidden rounded-2xl ring-1 ring-border/60 sm:mx-0">
              <Image
                src={founderPhoto.src}
                alt={founderPhoto.alt}
                fill
                sizes="176px"
                placeholder="blur"
                blurDataURL={founderPhoto.blurDataURL}
                className="object-cover"
                style={{ objectPosition: "55% 22%" }}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Fact icon={<GraduationCap className="size-4" />} label="Studying" value="Computer Engineering" />
              <Fact icon={<MapPin className="size-4" />} label="Based in" value="Dhaka, Bangladesh" />
              <Fact icon={<Mail className="size-4" />} label="Reach me" value={site.email} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Focus + skills */}
      <section className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight">What I focus on</h2>
            <ul className="mt-5 space-y-3">
              {focus.map((f) => (
                <li key={f} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-r from-brand-2 to-brand-3" />
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-2xl font-semibold tracking-tight">Tools I reach for</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {capabilities.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-sm text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Personal projects */}
      <section className="container-page pb-8">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Things I&apos;ve built
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            A slice of my open-source and academic work — all on GitHub.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myProjects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06} className="h-full">
              <ProjectCard project={p} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      <Publications />

      <Team />

      <section className="py-16">
        <Marquee duration={28} className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {["Research", "Build", "Ship", "Repeat", "Machine Learning", "End-to-end"].map((w, i) => (
            <span key={i} className="font-display text-4xl font-semibold tracking-tight text-muted-foreground/40 md:text-6xl">
              {w} <span className="text-brand-2/40">/</span>
            </span>
          ))}
        </Marquee>
      </section>
    </>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-xl border border-border/60 bg-background/60 text-brand-2">
        {icon}
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
