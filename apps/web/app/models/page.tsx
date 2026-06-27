import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ModelCard } from "@/components/shared/model-card";
import { CTA } from "@/components/sections/cta";
import { models } from "@/lib/data/models";

export const metadata: Metadata = {
  title: "Models",
  description: "The shelf of AI models built and trained by Haifa Intelligence.",
};

export default function ModelsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Model shelf"
        title={
          <>
            Models we&apos;ve <span className="text-gradient">trained</span> — and can tailor.
          </>
        }
        description="Every model here started as a real problem. Commission a new one, or have us fine-tune one of these for your data."
      />

      <section className="container-page pb-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 3) * 0.06} className="h-full">
              <ModelCard model={m} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
