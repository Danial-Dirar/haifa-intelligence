"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ArrowUpRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Logo } from "@/components/layout/logo";
import { nav, site } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open menu"
          className="inline-flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/40 text-foreground/80 md:hidden"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[88vw] max-w-sm border-l border-border/60">
        <SheetHeader>
          <SheetTitle asChild>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-4 flex flex-col gap-1 px-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-3 text-lg font-medium text-foreground/80 transition-colors hover:bg-accent/60 hover:text-foreground"
            >
              {item.label}
              <ArrowUpRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 p-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/contact" onClick={() => setOpen(false)}>
              Start a project
            </Link>
          </Button>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{site.email}</span>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
