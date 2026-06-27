"use client";

import { cn } from "@/lib/utils";

/**
 * Seamless infinite marquee. Duplicates children once and translates -50%,
 * so the loop is gapless. Pauses on hover.
 */
export function Marquee({
  children,
  className,
  duration = 40,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn("group relative flex overflow-hidden", className)}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-4 pr-4 animate-marquee group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "flex shrink-0 items-center gap-4 pr-4 animate-marquee group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {children}
      </div>
    </div>
  );
}
