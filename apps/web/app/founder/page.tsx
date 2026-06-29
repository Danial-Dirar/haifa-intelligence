import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Mail, MapPin } from "lucide-react";
import { GitHubIcon } from "@/components/shared/icons";
import { Eyebrow } from "@/components/shared/section-heading";
import { Aurora } from "@/components/shared/aurora";
import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";
import { Publications } from "@/components/sections/publications";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data/projects";
import { capabilities } from "@/lib/data/misc";
import { founderPhoto } from "@/lib/data/founder";
import { team } from "@/lib/data/team";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Team — Haifa Intelligence",
  description:
    "Danial Dirar and the people building Haifa Intelligence — ML research, computer vision, and software end-to-end.",
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
      {/* Hero — intro on the left, founder portrait on the right */}
      <section className="relative overflow-hidden pt-36 pb-12 md:pt-44 md:pb-16">
        <Aurora className="opacity-60" />
        <div className="absolute inset-0 -z-10 bg-grid mask-fade opacity-50" />
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
            <div>
              <Reveal>
                <Eyebrow>The people behind Haifa</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold tracking-tight text-balance md:text-6xl">
                  Hi, I&apos;m <span className="text-gradient">Danial Dirar</span>.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
                  Computer science student, ML researcher, and the person building Haifa
                  Intelligence. My thesis is on groundwater-level prediction — and I build
                  software end-to-end, with a small team alongside me.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild className="rounded-full">
                    <a href={site.social.github} target="_blank" rel="noreferrer">
                      <GitHubIcon className="size-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-brand-2/40 bg-brand-2/10 text-brand-2 hover:bg-brand-2/20 hover:text-brand-2"
                  >
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
              </Reveal>
            </div>

            {/* Founder portrait — framed, not a card */}
            <Reveal delay={0.1}>
              <div className="mx-auto w-full max-w-[300px]">
                <div className="relative">
                  <div className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-brand-1/15 blur-3xl" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] ring-1 ring-border/60 shadow-2xl shadow-brand-1/10">
                    <Image
                      src={founderPhoto.src}
                      alt={founderPhoto.alt}
                      fill
                      sizes="300px"
                      placeholder="blur"
                      blurDataURL={founderPhoto.blurDataURL}
                      className="object-cover"
                      style={{ objectPosition: "55% 22%" }}
                    />
                  </div>
                </div>
                <p className="mt-5 text-center text-sm font-medium text-brand-2">
                  {site.founder.role}
                </p>
                <div className="mt-5 space-y-3">
                  <Fact icon={<GraduationCap className="size-4" />} label="Studying" value="BSc. (Hons) in Computer Science" />
                  <Fact icon={<MapPin className="size-4" />} label="Based in" value="Dhaka, Bangladesh" />
                  <Fact icon={<Mail className="size-4" />} label="Reach me" value={site.email} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The team — stacked on the left */}
      <section className="container-page py-8">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">The team</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Building Haifa Intelligence alongside the founder.
          </p>
        </Reveal>
        <div className="mt-6 max-w-2xl space-y-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06}>
              <div className="group flex gap-4 rounded-2xl border border-border/60 bg-card/40 p-4 transition-colors hover:border-brand-1/40">
                <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-border/60">
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
                  <h3 className="font-display text-base font-semibold leading-tight">{m.name}</h3>
                  <p className="text-sm text-brand-2">{m.role}</p>
                  <p className="mt-1.5 line-clamp-3 text-sm text-muted-foreground text-pretty">{m.bio}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
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
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-brand-1/40 hover:text-foreground"
                    >
                      <GitHubIcon className="size-3.5" />
                      GitHub
                    </a>
                  ) : (
                    <span
                      title="Coming soon"
                      className="mt-3 inline-flex cursor-default items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 py-1.5 text-xs font-medium text-muted-foreground/60"
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

      {/* Personal projects — a simple list, not cards */}
      <section className="container-page pb-8">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Things I&apos;ve built
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            A slice of my open-source and academic work — all on GitHub.
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <ul className="mt-6 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60 bg-card/30">
            {myProjects.map((p) => (
              <li key={p.slug}>
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-card/60"
                >
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 font-medium">
                      <span className="truncate">{p.title}</span>
                      <span className="shrink-0 rounded-full border border-border/60 px-2 py-0.5 text-[0.7rem] text-muted-foreground">
                        {p.category} · {p.year}
                      </span>
                    </p>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">{p.summary}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground transition-colors group-hover:text-foreground">
                    <GitHubIcon className="size-4" />
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <Publications />

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
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border/60 bg-background/60 text-brand-2">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate font-medium">{value}</p>
      </div>
    </div>
  );
}
