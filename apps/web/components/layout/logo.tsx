import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label={site.name}
    >
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-2 via-brand-1 to-brand-3 text-[0.95rem] font-bold text-white shadow-lg shadow-brand-1/30">
        <span className="font-display tracking-tight">{site.monogram}</span>
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.95rem] font-semibold tracking-tight">
            Haifa <span className="text-muted-foreground">Intelligence</span>
          </span>
        </span>
      )}
    </Link>
  );
}
