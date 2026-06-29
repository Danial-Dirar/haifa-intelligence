"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Auto-hide: slide the bar away when scrolling down, bring it back on scroll up.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      // Ignore tiny jitter; never hide while near the very top of the page.
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 80);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 transition-transform duration-300 ease-out md:pt-4",
        hidden ? "-translate-y-[150%]" : "translate-y-0"
      )}
    >
      <div
        className={cn(
          "flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl border px-3 py-2 transition-[background-color,border-color,box-shadow] duration-300 md:px-4",
          scrolled
            ? "glass-strong border-border/60 shadow-lg shadow-black/5"
            : "border-transparent bg-transparent"
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {active && (
                  <span className="absolute inset-0 rounded-full bg-accent/70" />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Button asChild size="sm" className="hidden rounded-full md:inline-flex">
            <Link href="/contact">
              Start a project
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
