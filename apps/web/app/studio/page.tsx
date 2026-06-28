import type { Metadata } from "next";
import { Cpu, GraduationCap, Layers, ShieldCheck, Wand2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/motion/reveal";
import { StudioClient } from "@/components/sections/studio-client";
import { StyleGallery } from "@/components/sections/style-gallery";

export const metadata: Metadata = {
  title: "AI Studio",
  description:
    "Generate images in any style with Haifa Intelligence's local AI pipeline. Pick a style, write a prompt, create.",
};

const facts = [
  { icon: Layers, title: "Pick a style", text: "Curated looks — cinematic, anime, watercolor and more. No model jargon." },
  { icon: Cpu, title: "Local GPU", text: "Runs on our own ComfyUI pipeline, not a paid cloud API." },
  { icon: ShieldCheck, title: "Fair use", text: "One image at a time, with limits to keep it free and abuse-free." },
];

const roadmap = [
  {
    icon: Wand2,
    title: "Prompt optimizer",
    text: "Type a rough idea and our model rewrites it into a rich, well-structured prompt — the right detail, lighting and composition cues — so even a one-line idea generates beautifully.",
  },
  {
    icon: GraduationCap,
    title: "Selective training",
    text: "Train the studio on your own subject or style — a product, a character, a brand look — and generate images that stay true to it, on demand.",
  },
];

export default function StudioPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Studio · beta"
        title={
          <>
            Make an image. Pick a <span className="text-gradient">style</span>, not a model.
          </>
        }
        description="Type what you want, choose a look, and our own GPU generates it live — with a real queue and step-by-step progress. No model jargon, just styles."
      />

      <section className="container-page pb-12">
        <Reveal>
          <StudioClient />
        </Reveal>
      </section>

      <StyleGallery />

      <section className="container-page pb-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {facts.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={i * 0.06}>
                <div className="flex h-full flex-col gap-2 rounded-2xl border border-border/60 bg-card/40 p-5">
                  <span className="grid size-10 place-items-center rounded-xl border border-border/60 bg-background/60 text-brand-2">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-1 font-medium">{f.title}</p>
                  <p className="text-sm text-muted-foreground">{f.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-page pb-24">
        <Reveal>
          <div className="rounded-3xl border border-border/60 bg-card/30 p-8 sm:p-10">
            <div className="mb-8 flex flex-col gap-2">
              <span className="w-fit rounded-full border border-brand-2/40 bg-brand-2/10 px-3 py-1 text-xs font-medium text-brand-2">
                Coming soon
              </span>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Where the studio is <span className="text-gradient">heading</span>
              </h2>
              <p className="max-w-2xl text-sm text-muted-foreground">
                We&apos;re just getting started. Two big upgrades are on the way to make the
                studio smarter and truly yours.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {roadmap.map((r, i) => {
                const Icon = r.icon;
                return (
                  <Reveal key={r.title} delay={i * 0.08}>
                    <div className="flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-background/40 p-6">
                      <span className="grid size-11 place-items-center rounded-xl border border-border/60 bg-card/60 text-brand-2">
                        <Icon className="size-5" />
                      </span>
                      <p className="text-lg font-medium">{r.title}</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{r.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
