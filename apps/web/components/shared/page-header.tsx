import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { Aurora } from "@/components/shared/aurora";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-12 md:pt-44 md:pb-16">
      <Aurora className="opacity-60" />
      <div className="absolute inset-0 -z-10 bg-grid mask-fade opacity-50" />
      <div className="container-page">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold tracking-tight text-balance md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground text-pretty">
              {description}
            </p>
          </Reveal>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
