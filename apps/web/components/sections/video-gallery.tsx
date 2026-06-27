"use client";

import { useState } from "react";
import { Play, Clock, Film } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { videos, type VideoEdit } from "@/lib/data/videos";
import { cn } from "@/lib/utils";

export function VideoGallery() {
  const [active, setActive] = useState<VideoEdit | null>(null);

  return (
    <section id="video" className="container-page py-20 md:py-28">
      <SectionHeading
        eyebrow="Video & generative edits"
        title={
          <>
            Cuts that <span className="text-gradient">hold attention</span>.
          </>
        }
        description="A selection of edits and fully generative pieces — from product reels to AI brand films."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => (
          <Reveal key={v.slug} delay={(i % 3) * 0.06}>
            <button
              onClick={() => setActive(v)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-border/60 text-left"
            >
              <div className={cn("relative flex aspect-video items-center justify-center bg-gradient-to-br", v.accent)}>
                <div className="absolute inset-0 bg-grid opacity-20 mix-blend-overlay" />
                <span className="relative grid size-14 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition-transform duration-300 group-hover:scale-110">
                  <Play className="size-5 translate-x-0.5 fill-current" />
                </span>
                <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-background/70 px-2.5 py-1 text-xs backdrop-blur">
                  <Film className="size-3" />
                  {v.kind}
                </span>
                <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-background/70 px-2.5 py-1 text-xs backdrop-blur">
                  <Clock className="size-3" />
                  {v.duration}
                </span>
              </div>
              <div className="bg-card/40 p-4">
                <h3 className="font-medium">{v.title}</h3>
                <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{v.description}</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o: boolean) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl overflow-hidden p-0">
          {active && (
            <>
              <div className={cn("relative flex aspect-video items-center justify-center bg-gradient-to-br", active.accent)}>
                <div className="absolute inset-0 bg-grid opacity-20 mix-blend-overlay" />
                {active.src ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video src={active.src} controls autoPlay className="size-full object-cover" />
                ) : (
                  <div className="relative flex flex-col items-center gap-3 text-center">
                    <span className="grid size-16 place-items-center rounded-full bg-background/80 backdrop-blur">
                      <Play className="size-6 translate-x-0.5 fill-current" />
                    </span>
                    <p className="text-sm text-muted-foreground">
                      Preview reel drops in here — sample on request.
                    </p>
                  </div>
                )}
              </div>
              <DialogHeader className="p-6">
                <DialogTitle className="font-display text-xl">{active.title}</DialogTitle>
                <DialogDescription>{active.description}</DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
