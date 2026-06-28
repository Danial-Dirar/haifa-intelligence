import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { styleGalleries } from "@/lib/data/gallery";

/**
 * "Every style in action" — two real studio outputs per style, so visitors know
 * exactly what each look produces. Images are next/image (lazy + blur placeholder)
 * so the gallery is light and loads smoothly.
 */
export function StyleGallery() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Style library"
          title={
            <>
              Every style, <span className="text-gradient">in action</span>.
            </>
          }
          description="Real images from the studio — two per style, so you know the look before you generate."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {styleGalleries.map((g, i) => (
            <Reveal key={g.id} delay={(i % 3) * 0.06} className="h-full">
              <div className="h-full overflow-hidden rounded-2xl border border-border/60 bg-card/40">
                <div className="grid grid-cols-2 gap-px bg-border/40">
                  {g.examples.map((e) => (
                    <div key={e.src} className="relative aspect-square overflow-hidden bg-background">
                      <Image
                        src={e.src}
                        alt={`${g.name} style example`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                        placeholder="blur"
                        blurDataURL={e.blur}
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm font-medium">{g.name}</span>
                  <span className="text-xs text-muted-foreground">Live style</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
