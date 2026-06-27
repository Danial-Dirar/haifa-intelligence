import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Aurora } from "@/components/shared/aurora";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function CTA() {
  return (
    <section className="container-page py-12 md:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-br from-card/80 to-card/40 px-6 py-16 text-center md:px-12 md:py-24">
          <Aurora />
          <div className="absolute inset-0 bg-dots opacity-40 mask-fade" />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance md:text-6xl">
              Let&apos;s build your{" "}
              <span className="text-gradient">intelligent</span> thing.
            </h2>
            <p className="mt-5 max-w-lg text-muted-foreground md:text-lg text-pretty">
              Tell us the problem. We&apos;ll come back with an approach, a timeline,
              and a price — usually within a day.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/contact">
                  Start a project
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
