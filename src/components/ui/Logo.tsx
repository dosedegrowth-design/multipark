import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  /** "color" = logo PNG completa (fundo claro) | "white" = ícone + texto branco (fundo escuro) */
  variant?: "color" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  asLink?: boolean;
};

const HEIGHTS = { sm: 24, md: 32, lg: 44 } as const;
const WIDTHS = { sm: 102, md: 136, lg: 187 } as const;

/**
 * Ícone vectorial (SVG) — círculo vermelho + seta branca diagonal apontando pra baixo-direita.
 * Replica o símbolo da logo MultiPark.
 */
function MultiparkIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="24" cy="24" r="22" fill="var(--color-mp-red)" />
      <circle cx="24" cy="24" r="22" stroke="#9A0F1B" strokeWidth="1" opacity="0.4" />
      {/* Seta diagonal */}
      <path
        d="M16 16 L32 32 M32 32 L32 22 M32 32 L22 32"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function Logo({
  variant = "color",
  size = "md",
  className,
  asLink = false,
}: LogoProps) {
  const content =
    variant === "color" ? (
      <Image
        src="/multipark-logo.png"
        alt="MultiPark"
        width={WIDTHS[size]}
        height={HEIGHTS[size]}
        priority
        className="object-contain"
      />
    ) : (
      <span className="inline-flex items-center gap-2 select-none">
        <MultiparkIcon size={HEIGHTS[size]} />
        <span
          className={cn(
            "font-semibold tracking-tight text-white leading-none",
            size === "sm" && "text-base",
            size === "md" && "text-lg",
            size === "lg" && "text-2xl"
          )}
        >
          Multi
          <span className="italic text-[var(--color-mp-red)]">ParK</span>
        </span>
      </span>
    );

  if (asLink) {
    return (
      <Link
        href="/"
        className={cn("inline-flex items-center shrink-0", className)}
        aria-label="MultiPark"
      >
        {content}
      </Link>
    );
  }
  return <span className={cn("inline-flex items-center", className)}>{content}</span>;
}
