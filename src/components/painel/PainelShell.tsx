"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { PanelThemeProvider, usePanelTheme } from "./ThemeProvider";
import {
  LayoutDashboard,
  Calendar,
  Car,
  Tag,
  FileText,
  Users,
  Wallet,
  Megaphone,
  Star,
  Plug,
  ChevronDown,
  Bell,
  Search,
  Settings,
  BadgeCheck,
  Sun,
  Moon,
} from "lucide-react";

export function PainelShell(props: PainelShellProps) {
  return (
    <PanelThemeProvider defaultTheme="dark">
      <PainelShellInner {...props} />
    </PanelThemeProvider>
  );
}

type PainelShellProps = {
  variant?: "operador" | "matriz";
  unitName?: string;
  active?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  badge?: ReactNode;
  children: ReactNode;
};

function PainelShellInner({
  variant = "operador",
  unitName = "Cumbica · GRU",
  active,
  pageTitle,
  pageSubtitle,
  badge,
  children,
}: PainelShellProps) {
  const { theme, toggle } = usePanelTheme();
  const isMatriz = variant === "matriz";
  const isLight = theme === "light";

  const navOperador = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/painel/unidade/cumbica-01/dashboard" },
    { label: "Reservas", icon: Calendar, href: "/painel/unidade/cumbica-01/reservas" },
    { label: "Vagas livres", icon: Car, href: "/painel/unidade/cumbica-01/vagas" },
    { label: "Preços", icon: Tag, href: "/painel/unidade/cumbica-01/precos" },
    { label: "Conteúdo", icon: FileText, href: "/painel/unidade/cumbica-01/conteudo" },
    { label: "Clientes", icon: Users, href: "/painel/unidade/cumbica-01/clientes" },
    { label: "Financeiro", icon: Wallet, href: "/painel/unidade/cumbica-01/financeiro" },
    { label: "Marketing", icon: Megaphone, href: "/painel/unidade/cumbica-01/marketing" },
    { label: "Reviews", icon: Star, href: "/painel/unidade/cumbica-01/reviews" },
    { label: "Configurações", icon: Settings, href: "/painel/unidade/cumbica-01/configuracoes" },
  ];

  const navMatriz = [
    { label: "Visão geral", icon: LayoutDashboard, href: "/painel/matriz/rede" },
    { label: "Financeiro", icon: Wallet, href: "/painel/matriz/financeiro" },
    { label: "Franqueados", icon: Users, href: "/painel/matriz/franqueados" },
    { label: "Marketing", icon: Megaphone, href: "/painel/matriz/marketing" },
    { label: "Multicliente", icon: BadgeCheck, href: "/painel/matriz/multicliente" },
    { label: "TAG MultiPark", icon: Tag, href: "/painel/matriz/tag" },
    { label: "CMS", icon: FileText, href: "/painel/matriz/cms" },
    { label: "Integrações", icon: Plug, href: "/painel/matriz/integracoes" },
  ];

  const nav = isMatriz ? navMatriz : navOperador;

  return (
    <div
      className="panel-shell min-h-screen"
      data-panel-theme={theme}
      style={{ color: "var(--panel-text)" }}
    >
      {/* Topbar */}
      <header
        className="panel-topbar sticky top-0 z-30 h-14"
        style={{
          backgroundColor: "var(--panel-bg)",
          borderBottom: "1px solid var(--panel-border)",
        }}
      >
        <div className="h-full flex items-center px-5 gap-5">
          <Logo variant={isLight ? "color" : "white"} size="sm" asLink />

          {/* Path */}
          <nav
            className="hidden md:flex items-center gap-2 text-xs font-mono"
            style={{ color: "var(--panel-text-muted)" }}
          >
            <span>painel.multipark.com.br</span>
            <span>/</span>
            {isMatriz ? (
              <>
                <span style={{ color: "var(--panel-text-soft)" }}>matriz</span>
                <span>/</span>
                <span style={{ color: "var(--panel-text)" }}>{active || "rede"}</span>
              </>
            ) : (
              <>
                <span style={{ color: "var(--panel-text-soft)" }}>unidade</span>
                <span>/</span>
                <span style={{ color: "var(--panel-text)" }}>
                  {unitName.toLowerCase().replace(/\s/g, "-")}
                </span>
                <span>/</span>
                <span style={{ color: "var(--panel-text)" }}>{active || "dashboard"}</span>
              </>
            )}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <button
              className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-lg text-xs transition-colors"
              style={{
                backgroundColor: "var(--panel-surface)",
                color: "var(--panel-text-soft)",
                border: "1px solid var(--panel-border)",
              }}
            >
              <Search className="h-3.5 w-3.5" />
              <span>Buscar...</span>
              <kbd
                className="ml-2 text-[10px] font-mono rounded px-1.5"
                style={{ backgroundColor: "var(--panel-surface-hover)" }}
              >
                ⌘K
              </kbd>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              title={isLight ? "Modo escuro" : "Modo claro"}
              aria-label="Alternar tema"
              className="h-9 w-9 rounded-lg flex items-center justify-center transition-colors"
              style={{
                backgroundColor: "var(--panel-surface)",
                color: "var(--panel-text-soft)",
                border: "1px solid var(--panel-border)",
              }}
            >
              {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            <button
              className="h-9 w-9 rounded-lg flex items-center justify-center relative transition-colors"
              style={{
                backgroundColor: "var(--panel-surface)",
                color: "var(--panel-text-soft)",
                border: "1px solid var(--panel-border)",
              }}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-[var(--color-mp-red)] rounded-full" />
            </button>

            <button
              className="h-9 px-2.5 rounded-lg flex items-center gap-2 transition-colors"
              style={{
                backgroundColor: "var(--panel-surface)",
                border: "1px solid var(--panel-border)",
              }}
            >
              <div className="h-6 w-6 rounded-full bg-[var(--color-mp-red)] flex items-center justify-center text-xs font-semibold text-white">
                R
              </div>
              <span
                className="hidden sm:inline text-sm font-medium"
                style={{ color: "var(--panel-text)" }}
              >
                {isMatriz ? "Super Admin" : "Roberto"}
              </span>
              <ChevronDown
                className="h-3.5 w-3.5"
                style={{ color: "var(--panel-text-muted)" }}
              />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className="hidden md:flex flex-col w-[220px] min-h-[calc(100vh-3.5rem)] sticky top-14"
          style={{ borderRight: "1px solid var(--panel-border)" }}
        >
          <div className="px-4 pt-5 pb-3">
            <div
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "var(--panel-text-muted)" }}
            >
              {isMatriz ? "Super Admin" : "Operador"}
            </div>
            <div
              className="font-semibold mt-0.5"
              style={{ color: "var(--panel-text)" }}
            >
              {isMatriz ? "Rede MultiPark" : unitName}
            </div>
          </div>
          <nav className="px-2 flex-1 overflow-y-auto pb-6">
            {nav.map((n) => {
              const Icon = n.icon;
              const isActive =
                active && n.label.toLowerCase().includes(active.toLowerCase());
              return (
                <Link
                  key={n.label}
                  href={n.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors mb-0.5",
                    isActive
                      ? "bg-[var(--color-mp-red)] text-white"
                      : "panel-nav-link"
                  )}
                  style={
                    !isActive
                      ? { color: "var(--panel-text-soft)" }
                      : undefined
                  }
                >
                  <Icon className="h-4 w-4" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div
            className="p-4 text-[11px]"
            style={{
              borderTop: "1px solid var(--panel-border)",
              color: "var(--panel-text-muted)",
            }}
          >
            v1.0 · DDG × MultiPark
          </div>
        </aside>

        {/* Content */}
        <main
          className="flex-1 min-w-0"
          style={{ backgroundColor: "var(--panel-bg)" }}
        >
          {(pageTitle || badge) && (
            <div
              className="px-6 md:px-10 pt-7 pb-5 flex flex-wrap items-start justify-between gap-3"
              style={{ borderBottom: "1px solid var(--panel-border)" }}
            >
              <div>
                {pageSubtitle && (
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: "var(--panel-text-muted)" }}
                  >
                    {pageSubtitle}
                  </div>
                )}
                {pageTitle && (
                  <h1
                    className="text-2xl md:text-3xl font-semibold tracking-tight"
                    style={{ color: "var(--panel-text)" }}
                  >
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
