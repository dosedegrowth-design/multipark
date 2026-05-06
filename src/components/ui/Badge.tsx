import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-mono text-[11px] font-medium tracking-[0.12em] uppercase px-2.5 py-1 rounded-full whitespace-nowrap",
  {
    variants: {
      variant: {
        red: "bg-[--color-mp-red] text-white",
        redSoft: "bg-[--color-mp-red-soft] text-[--color-mp-red]",
        dark: "bg-[--color-mp-ink] text-white",
        outline: "border border-[--color-mp-line] text-[--color-mp-text]",
        success: "bg-[--color-mp-success-soft] text-[--color-mp-success]",
        warning: "bg-[--color-mp-warning-soft] text-[--color-mp-warning]",
        ghost: "bg-[--color-mp-cream] text-[--color-mp-text-soft]",
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
            variant === "success" ? "bg-[--color-mp-success] animate-pulse-dot" : "bg-current"
          )}
        />
      )}
      {children}
    </span>
  );
}
