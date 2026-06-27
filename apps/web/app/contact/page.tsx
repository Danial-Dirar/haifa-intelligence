import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { GitHubIcon } from "@/components/shared/icons";
import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with Haifa Intelligence. Tell us what you want to build.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Start a project"
        title={
          <>
            Tell us what you want to <span className="text-gradient">build</span>.
          </>
        }
        description="Send a quick brief and we'll come back with an approach, a timeline, and a price — usually within a day."
      />

      <section className="container-page pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="rounded-3xl border border-border/60 bg-card/40 p-6 md:p-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-4">
              <InfoCard icon={<Mail className="size-5" />} label="Email" value={site.email} href={`mailto:${site.email}`} />
              <InfoCard icon={<GitHubIcon className="size-5" />} label="GitHub" value="Danial-Dirar" href={site.social.github} />
              <InfoCard icon={<MapPin className="size-5" />} label="Location" value={site.location} />
              <InfoCard icon={<Clock className="size-5" />} label="Response time" value="Within 1 business day" />

              <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-brand-1/10 to-transparent p-6">
                <p className="font-display text-lg font-semibold">Not sure what you need?</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  That&apos;s fine — describe the problem in plain words. Part of our
                  job is figuring out whether AI even belongs in the solution.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function InfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card/40 p-5 transition-colors hover:border-brand-1/40">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border/60 bg-background/60 text-brand-2">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate font-medium">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}
