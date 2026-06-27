import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-gradient-to-r from-brand-2 to-brand-3" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="max-w-3xl font-display text-3xl font-semibold tracking-tight text-balance md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-base text-muted-foreground md:text-lg text-pretty",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
