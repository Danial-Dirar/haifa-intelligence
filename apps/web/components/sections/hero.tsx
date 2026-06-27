"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Play, Sparkles } from "lucide-react";
import { Aurora } from "@/components/shared/aurora";
import { Eyebrow } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/motion/marquee";
import { capabilities } from "@/lib/data/misc";

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

const headline = ["We", "build", "the", "intelligence"];
const headline2 = ["behind", "great", "products."];

const word = {
  hidden: { opacity: 0, y: "40%", filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: 0.15 + i * 0.07, ease: EASE },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-32 pb-16 md:pt-40">
      <Aurora />
      <div className="absolute inset-0 -z-10 bg-grid mask-fade opacity-60" />

      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div className="flex flex-col items-start gap-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Eyebrow>AI &amp; ML Studio</Eyebrow>
            </motion.div>

            <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block overflow-hidden">
                {headline.map((w, i) => (
                  <motion.span
                    key={w}
                    custom={i}
                    variants={word}
                    initial="hidden"
                    animate="show"
                    className="mr-[0.25em] inline-block"
                  >
                    {w === "intelligence" ? <span className="text-gradient">{w}</span> : w}
                  </motion.span>
                ))}
              </span>
              <span className="block overflow-hidden">
                {headline2.map((w, i) => (
                  <motion.span
                    key={w}
                    custom={i + headline.length}
                    variants={word}
                    initial="hidden"
                    animate="show"
                    className="mr-[0.25em] inline-block"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="max-w-xl text-base text-muted-foreground md:text-lg text-pretty"
            >
              Haifa Intelligence is an AI &amp; ML studio. We train custom models,
              ship web &amp; mobile products, and generate image / video work —
              end to end, in-house.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.82 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg" className="rounded-full">
                <Link href="/contact">
                  Start a project
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link href="/work">
                  <Play className="size-4" />
                  See our work
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Live model visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
            className="relative"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Capability marquee */}
      <div className="relative mt-16 md:mt-24">
        <Marquee duration={32} className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {capabilities.map((c) => (
            <span
              key={c}
              className="flex items-center gap-2 rounded-full border border-border/50 bg-card/30 px-4 py-2 text-sm text-muted-foreground"
            >
              <Sparkles className="size-3.5 text-brand-2" />
              {c}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function HeroVisual() {
  const bars = [62, 78, 54, 88, 71, 95, 66, 82];
  return (
    <div className="relative mx-auto w-full max-w-md animate-float">
      {/* glow */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-1/20 via-brand-3/10 to-transparent blur-2xl" />

      <div className="glass glow-ring rounded-[1.75rem] p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium">Aquifer Forecast</span>
          </div>
          <span className="rounded-full bg-accent/60 px-2 py-0.5 text-[0.7rem] text-muted-foreground">
            live
          </span>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">Groundwater level · 12-week horizon</p>

        {/* animated chart */}
        <div className="mt-5 flex h-36 items-end gap-2">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: "8%" }}
              animate={{ height: `${h}%` }}
              transition={{
                duration: 1.1,
                delay: 0.8 + i * 0.08,
                ease: "easeOut",
              }}
              className="flex-1 rounded-md bg-gradient-to-t from-brand-1/40 to-brand-2"
            />
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { k: "R²", v: "0.93" },
            { k: "RMSE", v: "0.21m" },
            { k: "Signals", v: "8" },
          ].map((m) => (
            <div key={m.k} className="rounded-xl border border-border/50 bg-background/40 p-3">
              <p className="text-[0.7rem] text-muted-foreground">{m.k}</p>
              <p className="font-display text-lg font-semibold">{m.v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* floating chip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="glass absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-2xl px-3 py-2 text-xs sm:flex"
      >
        <Sparkles className="size-3.5 text-brand-3" />
        Trained in-house
      </motion.div>
    </div>
  );
}
