import { cn } from "@/lib/utils";

/**
 * Soft animated gradient blobs for section/hero backgrounds.
 * Purely decorative — pointer-events disabled, masked at the edges.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div className="absolute -left-[10%] top-[-20%] size-[42rem] rounded-full bg-brand-1/25 blur-[120px] animate-aurora" />
      <div className="absolute right-[-10%] top-[10%] size-[36rem] rounded-full bg-brand-3/20 blur-[120px] animate-aurora [animation-delay:-4s]" />
      <div className="absolute bottom-[-20%] left-[30%] size-[40rem] rounded-full bg-brand-2/20 blur-[130px] animate-aurora [animation-delay:-8s]" />
    </div>
  );
}
