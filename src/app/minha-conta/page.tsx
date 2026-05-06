import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingChat } from "@/components/site/FloatingChat";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Car, Tag, FileText, Settings, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Minha conta · MultiPark" };

export default function MinhaContaPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[var(--color-mp-paper)]">
        <Container>
          <div className="py-12">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-mp-red)] mb-2">
              Minha conta
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Olá, Mariana 👋
            </h1>
            <p className="mt-2 text-[var(--color-mp-text-soft)]">
              Você tem 1 reserva ativa e 12 reservas no histórico.
            </p>
          </div>

          <div className="grid md:grid-cols-[260px_1fr] gap-6 pb-20">
            {/* Sidebar */}
            <aside className="space-y-1">
              {[
                { label: "Visão geral", icon: FileText, active: true },
                { label: "Minhas reservas", icon: Calendar },
                { label: "Meus veículos", icon: Car },
                { label: "TAG MultiPark", icon: Tag },
                { label: "Multicliente", icon: Tag },
                { label: "Configurações", icon: Settings },
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.label}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      m.active
                        ? "bg-[var(--color-mp-ink)] text-white"
                        : "hover:bg-[var(--color-mp-cream)]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {m.label}
                  </button>
                );
              })}
            </aside>

            {/* Main */}
            <div className="space-y-6">
              {/* Active reservation */}
              <div className="rounded-2xl bg-white border border-[var(--color-mp-line)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="success" dot>Reserva ativa</Badge>
                  <span className="font-mono text-xs text-[var(--color-mp-text-soft)]">
                    MP-2026-A8F3K
                  </span>
                </div>
                <div className="grid md:grid-cols-[1fr_auto] gap-4 items-end">
                  <div>
                    <div className="text-2xl font-semibold">Multipark Cumbica</div>
                    <div className="mt-1 text-[var(--color-mp-text-soft)]">
                      14 mai · 06:00 → 21 mai · 22:00 · 7 dias
                    </div>
                    <div className="mt-1 text-sm text-[var(--color-mp-text-soft)]">
                      Honda Civic · ABC1D23
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="md">Comprovante</Button>
                    <Button size="md" href="/unidades/cumbica-01">Detalhes</Button>
                  </div>
                </div>
              </div>

              {/* History */}
              <div className="rounded-2xl bg-white border border-[var(--color-mp-line)] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg">Histórico</h2>
                  <Link href="#" className="text-sm font-medium text-[var(--color-mp-red)]">
                    Ver tudo →
                  </Link>
                </div>
                <div className="divide-y divide-[var(--color-mp-line)]">
                  {[
                    { unit: "Multipark Premium GRU", date: "Mar 2026", value: "R$ 623" },
                    { unit: "Multipark Cumbica", date: "Jan 2026", value: "R$ 343" },
                    { unit: "Multipark Viracopos", date: "Dez 2025", value: "R$ 269" },
                  ].map((h) => (
                    <div key={h.date} className="py-3.5 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{h.unit}</div>
                        <div className="text-xs text-[var(--color-mp-text-soft)] mt-0.5">{h.date}</div>
                      </div>
                      <div className="font-semibold tabular-nums">{h.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Programs */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[var(--color-mp-ink)] text-white p-6">
                  <Tag className="h-6 w-6 text-[var(--color-mp-red)] mb-3" />
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 mb-1">
                    TAG MultiPark · saldo
                  </div>
                  <div className="text-3xl font-semibold tabular-nums">R$ 142,80</div>
                  <button className="mt-3 text-sm font-medium text-[var(--color-mp-red)] flex items-center gap-1">
                    Recarregar <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="rounded-2xl bg-white border border-[var(--color-mp-line)] p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-mp-text-soft)] mb-1">
                    Multicliente · status
                  </div>
                  <div className="text-3xl font-semibold">30% off ativo</div>
                  <div className="mt-1 text-sm text-[var(--color-mp-text-soft)]">
                    válido em 150+ unidades da rede
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}
