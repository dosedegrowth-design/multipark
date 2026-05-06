import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-[0.12em] uppercase px-2.5 py-1 rounded-full whitespace-nowrap",
  {
    variants: {
      variant: {
        red: "bg-[var(--color-mp-red)] text-white",
        redSoft: "bg-[var(--color-mp-red-soft)] text-[var(--color-mp-red)]",
        dark: "bg-[var(--color-mp-ink)] text-white",
        outline: "border border-[var(--color-mp-line)] text-[var(--color-mp-text)]",
        success: "bg-[var(--color-mp-success-soft)] text-[var(--color-mp-success)]",
        warning: "bg-[var(--color-mp-warning-soft)] text-[var(--color-mp-warning)]",
        ghost: "bg-[var(--color-mp-cream)] text-[var(--color-mp-text-soft)]",
      },
      size: {
        sm: "text-[10px] px-2 py-0.5",
        md: "text-[11px] px-2.5 py-1",
        lg: "text-xs px-3 py-1.5",
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  }
);

export function Badge({
  children,
  className,
  variant,
  size,
  dot,
}: React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    dot?: boolean;
  }) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "success" ? "bg-[var(--color-mp-success)] animate-pulse-dot" : "bg-current"
          )}
        />
      )}
      {children}
    </span>
  );
}
