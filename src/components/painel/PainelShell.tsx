"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  LayoutDashboard,
  Calendar,
  Car,
  Tag,
  FileText,
  Image as ImageIcon,
  Users,
  Wallet,
  Megaphone,
  Star,
  Plug,
  ArrowRight,
  ChevronDown,
  Bell,
  Search,
  Grid3x3,
  Building2,
  TrendingUp,
  Globe,
} from "lucide-react";

export function PainelShell({
  variant = "operador",
  unitName = "Cumbica · GRU",
  active,
  pageTitle,
  pageSubtitle,
  badge,
  children,
}: {
  variant?: "operador" | "matriz";
  unitName?: string;
  active?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  badge?: ReactNode;
  children: ReactNode;
}) {
  const isMatriz = variant === "matriz";

  const navOperador = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/painel/unidade/cumbica-01/dashboard" },
    { label: "Reservas", icon: Calendar, href: "/painel/unidade/cumbica-01/reservas" },
    { label: "Vagas livres", icon: Car, href: "/painel/unidade/cumbica-01/vagas" },
    { label: "Preços", icon: Tag, href: "/painel/unidade/cumbica-01/precos" },
    { label: "Conteúdo", icon: FileText, href: "/painel/unidade/cumbica-01/conteudo" },
    { label: "Fotos", icon: ImageIcon, href: "/painel/unidade/cumbica-01/conteudo" },
    { label: "Clientes", icon: Users, href: "/painel/unidade/cumbica-01/clientes" },
    { label: "Financeiro", icon: Wallet, href: "/painel/unidade/cumbica-01/financeiro" },
    { label: "Marketing", icon: Megaphone, href: "/painel/unidade/cumbica-01/marketing" },
    { label: "Reviews", icon: Star, href: "/painel/unidade/cumbica-01/reviews" },
    { label: "Integrações", icon: Plug, href: "/painel/unidade/cumbica-01/conteudo" },
  ];

  const navMatriz = [
    { label: "Visão geral", icon: LayoutDashboard, href: "/painel/matriz/rede" },
    { label: "Rede", icon: Globe, href: "/painel/matriz/rede" },
    { label: "Unidades", icon: Building2, href: "/painel/matriz/rede" },
    { label: "Financeiro", icon: Wallet, href: "/painel/matriz/financeiro" },
    { label: "Marketing", icon: Megaphone, href: "/painel/matriz/marketing" },
    { label: "Franqueados", icon: Users, href: "/painel/matriz/franqueados" },
    { label: "Performance", icon: TrendingUp, href: "/painel/matriz/financeiro" },
    { label: "CMS", icon: FileText, href: "/painel/matriz/cms" },
    { label: "Integrações", icon: Plug, href: "/painel/matriz/integracoes" },
  ];

  const nav = isMatriz ? navMatriz : navOperador;

  return (
    <div className="min-h-screen bg-[var(--color-mp-ink)] text-white">
      {/* Topbar */}
      <header className="sticky top-0 z-30 bg-[var(--color-mp-ink)] border-b border-white/10 h-14">
        <div className="h-full flex items-center px-5 gap-5">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-7 w-7 rounded-full bg-[var(--color-mp-red)] flex items-center justify-center">
              <ArrowRight className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-semibold text-base">
              MultiPar<span className="text-[var(--color-mp-red)]">K</span>
            </span>
          </Link>

          {/* Path */}
          <nav className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50">
            <span>painel.multipark.com.br</span>
            <span>/</span>
            {isMatriz ? (
              <>
                <span className="text-white/80">matriz</span>
                <span>/</span>
                <span className="text-white">{active || "rede"}</span>
              </>
            ) : (
              <>
                <span className="text-white/80">unidade</span>
                <span>/</span>
                <span className="text-white">{unitName.toLowerCase().replace(/\s/g, "-")}</span>
                <span>/</span>
                <span className="text-white">{active || "dashboard"}</span>
              </>
            )}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 text-xs">
              <Search className="h-3.5 w-3.5" />
              <span>Buscar...</span>
              <kbd className="ml-2 text-[10px] font-mono bg-white/10 rounded px-1.5">
                ⌘K
              </kbd>
            </button>
            <button className="h-9 w-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center relative">
              <Bell className="h-4 w-4 text-white/70" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-[var(--color-mp-red)] rounded-full" />
            </button>
            <button className="h-9 px-2.5 rounded-lg bg-white/5 hover:bg-white/10 flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-[var(--color-mp-red)] flex items-center justify-center text-xs font-semibold">
                R
              </div>
              <span className="hidden sm:inline text-sm font-medium">
                {isMatriz ? "Super Admin" : "Roberto"}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-white/50" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-[220px] border-r border-white/10 min-h-[calc(100vh-3.5rem)] sticky top-14">
          <div className="px-4 pt-5 pb-3">
            {isMatriz ? (
              <>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Super Admin
                </div>
                <div className="font-semibold mt-0.5">Rede MultiPark</div>
              </>
            ) : (
              <>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Operador
                </div>
                <div className="font-semibold mt-0.5">{unitName}</div>
              </>
            )}
          </div>
          <nav className="px-2 flex-1 overflow-y-auto pb-6">
            {nav.map((n) => {
              const Icon = n.icon;
              const isActive =
                active &&
                n.label.toLowerCase().includes(active.toLowerCase());
              return (
                <Link
                  key={n.label}
                  href={n.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-[var(--color-mp-red)] text-white"
                      : "text-white/65 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-white/10 text-[11px] text-white/40">
            v1.0 · DDG × MultiPark
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 bg-[var(--color-mp-ink)] text-white">
          {(pageTitle || badge) && (
            <div className="px-6 md:px-10 pt-7 pb-5 border-b border-white/5 flex flex-wrap items-start justify-between gap-3">
              <div>
                {pageSubtitle && (
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1.5">
                    {pageSubtitle}
                  </div>
                )}
                {pageTitle && (
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    {pageTitle}
                  </h1>
                )}
              </div>
              {badge}
            </div>
          )}
          <div className="px-6 md:px-10 py-7">{children}</div>
        </main>
      </div>
    </div>
  );
}
