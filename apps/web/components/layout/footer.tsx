import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { GitHubIcon } from "@/components/shared/icons";
import { Logo } from "@/components/layout/logo";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/data/services";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-background">
      <div className="container-page py-16">
        {/* Big CTA line */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-border/60 pb-12 md:flex-row md:items-end">
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
            Have something you want built with{" "}
            <span className="text-gradient">AI</span>?
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
          >
            Start a project
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">{site.description}</p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={site.social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid size-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground"
              >
                <GitHubIcon className="size-4" />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="grid size-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Navigate
            </p>
            <ul className="space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Services
            </p>
            <ul className="space-y-2.5 text-sm">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    href="/services"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.location}.
          </p>
          <p>Built in-house with Next.js, NestJS & a lot of compute.</p>
        </div>
      </div>
    </footer>
  );
}
