"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Aeroportos", href: "/aeroportos" },
  { label: "Unidades", href: "/unidades" },
  { label: "TAG", href: "/tag" },
  { label: "Multicliente", href: "/multicliente" },
  { label: "Empresas", href: "/empresas" },
  { label: "Franquia", href: "/franquia" },
];

export function Header({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const isDark = variant === "dark";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 backdrop-blur-md border-b",
        isDark
          ? "bg-mp-wine-85 border-white/10"
          : "bg-mp-paper-85 border-[var(--color-mp-line)]"
      )}
    >
      <Container>
        <div className="flex items-center h-16 md:h-[72px] gap-6">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="relative h-8 w-8 rounded-full bg-[var(--color-mp-red)] flex items-center justify-center transition-transform group-hover:scale-105">
              <ArrowRight className="h-4 w-4 text-white" />
            </div>
            <span
              className={cn(
                "font-semibold text-lg tracking-tight",
                isDark ? "text-white" : "text-[var(--color-mp-ink)]"
              )}
            >
              MultiPar<span className="text-[var(--color-mp-red)]">K</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 ml-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  isDark
                    ? "text-white/75 hover:text-white"
                    : "text-[var(--color-mp-text-soft)] hover:text-[var(--color-mp-text)]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant={isDark ? "ghost" : "outline"}
              size="md"
              href="/minha-conta"
              className={cn(
                "hidden sm:inline-flex",
                isDark && "text-white border-white/20 hover:bg-white/10"
              )}
            >
              Entrar
            </Button>
            <Button variant="primary" size="md" href="/reservar">
              Reservar
            </Button>
            <button
              className={cn(
                "md:hidden p-2 -mr-2 rounded-md",
                isDark ? "text-white" : "text-[var(--color-mp-ink)]"
              )}
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div
            className={cn(
              "md:hidden border-t py-4",
              isDark ? "border-white/10" : "border-[var(--color-mp-line)]"
            )}
          >
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "py-2.5 text-base font-medium",
                    isDark ? "text-white" : "text-[var(--color-mp-text)]"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/minha-conta"
                className={cn(
                  "py-2.5 text-base font-medium border-t mt-2 pt-4",
                  isDark
                    ? "text-white border-white/10"
                    : "text-[var(--color-mp-text)] border-[var(--color-mp-line)]"
                )}
                onClick={() => setOpen(false)}
              >
                Entrar na minha conta
              </Link>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}
