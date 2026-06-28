import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Wand2 } from "lucide-react";
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { showcase } from "@/lib/data/gallery";

/**
 * Homepage teaser for the AI Studio — a marquee of real outputs + a CTA. Images
 * are next/image (lazy, blur placeholder) and the strip is full-bleed with a
 * fade mask, so it adds energy without weighing the page down.
 */
export function StudioShowcase() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="AI Studio"
            title={
              <>
                Make an image. Pick a <span className="text-gradient">style</span>.
              </>
            }
            description="Type a prompt, choose a look, and our own GPU generates it live — with real-time progress. Here's a taste of what comes out."
          />
          <Reveal>
            <Button asChild className="rounded-full">
              <Link href="/studio">
                <Wand2 className="size-4" />
                Open the Studio
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-12" blur={false}>
        <Marquee
          duration={55}
          className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        >
          {showcase.map((e) => (
            <div
              key={e.src}
              className="relative h-44 w-44 shrink-0 overflow-hidden rounded-2xl border border-border/60 sm:h-52 sm:w-52"
            >
              <Image
                src={e.src}
                alt={`${e.style} studio example`}
                fill
                sizes="208px"
                placeholder="blur"
                blurDataURL={e.blur}
                className="object-cover"
              />
              <span className="absolute bottom-2 left-2 rounded-full bg-background/70 px-2 py-0.5 text-[0.65rem] font-medium backdrop-blur">
                {e.style}
              </span>
            </div>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
