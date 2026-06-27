import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ModelCard } from "@/components/shared/model-card";
import { Aurora } from "@/components/shared/aurora";
import { Button } from "@/components/ui/button";
import { models } from "@/lib/data/models";

export function ModelsShowcase() {
  return (
    <section id="models" className="relative overflow-hidden py-20 md:py-28">
      <Aurora className="opacity-50" />
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Models you can see"
            title={
              <>
                A growing shelf of <span className="text-gradient">live models</span>.
              </>
            }
            description="Some are research, some are in production. Each one started as someone's real problem — and any of them can be tailored to yours."
          />
          <Reveal>
            <Button asChild variant="ghost" className="rounded-full">
              <Link href="/models">
                Browse the shelf
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {models.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 4) * 0.06} className="h-full">
              <ModelCard model={m} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
