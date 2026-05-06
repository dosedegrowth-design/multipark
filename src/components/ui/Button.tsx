import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { forwardRef } from "react";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-mp-red] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[--color-mp-red] text-white hover:bg-[--color-mp-red-hover] active:scale-[0.98]",
        secondary:
          "bg-[--color-mp-ink] text-white hover:bg-[--color-mp-ink-soft] active:scale-[0.98]",
        outline:
          "border border-[--color-mp-line] bg-transparent text-[--color-mp-text] hover:border-[--color-mp-text] hover:bg-white",
        ghost:
          "bg-transparent text-[--color-mp-text] hover:bg-[--color-mp-line]/40",
        link: "text-[--color-mp-red] hover:underline underline-offset-4 px-0",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-[6px]",
        md: "h-10 px-4 text-sm rounded-[8px]",
        lg: "h-12 px-6 text-base rounded-[10px]",
        xl: "h-14 px-8 text-base rounded-[10px] font-semibold",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    href?: string;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size }), className)}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
