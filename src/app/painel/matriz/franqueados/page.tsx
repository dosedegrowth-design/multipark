"use client";

import { useState } from "react";
import { PainelShell } from "@/components/painel/PainelShell";
import { PanelCard, PanelEyebrow, FilterChip } from "@/components/painel/PanelCard";
import { Search, Plus, MapPin, MessageCircle, Mail, MoreHorizontal, ChevronRight, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

const FRANQUEADOS = [
  { name: "Roberto Almeida", unit: "Multipark Cumbica", city: "Guarulhos · GRU", since: "Jan 2024", status: "ativo", revenue: 1280000, score: 94 },
  { name: "Joana Ferreira", unit: "Multipark Premium GRU", city: "Guarulhos · GRU", since: "Mar 2024", status: "ativo", revenue: 945000, score: 89 },
  { name: "Carlos Tavares", unit: "Multipark Viracopos", city: "Campinas · VCP", since: "Set 2023", status: "ativo", revenue: 720000, score: 87 },
  { name: "Patrícia Rocha", unit: "Multipark Confins", city: "Lagoa Santa · CNF", since: "Nov 2023", status: "ativo", revenue: 510000, score: 82 },
  { name: "Eduardo Lima", unit: "Multipark Av. Paulista", city: "São Paulo", since: "Jul 2023", status: "ativo", revenue: 387000, score: 76 },
  { name: "Marcia Santos", unit: "Multipark BH", city: "Belo Horizonte", since: "Mai 2026", status: "onboarding", revenue: 0, score: null, progress: 75 },
  { name: "Bruno Costa", unit: "Multipark Recife", city: "Recife · REC", since: "Mai 2026", status: "onboarding", revenue: 0, score: null, progress: 50 },
  { name: "Talita Borges", unit: "Multipark POA", city: "Porto Alegre · POA", since: "Mai 2026", status: "onboarding", revenue: 0, score: null, progress: 25 },
];

const PIPELINE = [
  { stage: "Lead", count: 23, color: "bg-white/40" },
  { stage: "Qualificado", count: 12, color: "bg-blue-500" },
  { stage: "Visita técnica", count: 7, color: "bg-mp-warning" },
  { stage: "Contrato", count: 4, color: "bg-mp-red" },
  { stage: "Onboarding", count: 3, color: "bg-mp-success" },
];

const FILTERS = ["Todos", "Ativos", "Onboarding", "Em risco", "Suspensos"];

export default function FranqueadosPage() {
  const [active, setActive] = useState("Todos");

  return (
    <PainelShell
      variant="matriz"
      active="franqueados"
      pageSubtitle="Gestão de franqueados · Rede MultiPark"
      pageTitle="231 franqueados ativos · 7 em onboarding"
      badge={
        <button className="h-9 px-3 rounded-lg bg-mp-red text-sm font-medium flex items-center gap-2">
          <Plus className="h-3.5 w-3.5" />
          Adicionar franqueado
        </button>
      }
    >
      {/* Pipeline */}
      <PanelCard className="mb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <PanelEyebrow>Pipeline de novos franqueados</PanelEyebrow>
            <div className="font-semibold mt-0.5">49 leads no funil</div>
          </div>
          <button className="text-xs text-mp-red font-medium hover:underline">
            Ver pipeline completo →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {PIPELINE.map((p, i) => (
            <div key={p.stage} className="relative">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn("h-2 w-2 rounded-full", p.color)} />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/65">
                    {p.stage}
                  </span>
                </div>
                <div className="text-3xl font-semibold tabular-nums">
                  {p.count}
                </div>
              </div>
              {i < PIPELINE.length - 1 && (
                <ChevronRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 h-4 w-4 text-white/30" />
              )}
            </div>
          ))}
        </div>
      </PanelCard>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 px-3.5 h-10 rounded-lg bg-white/5 border border-white/10">
          <Search className="h-4 w-4 text-white/40" />
          <input
            placeholder="Buscar nome, unidade ou cidade..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/40"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
          {FILTERS.map((f) => (
            <FilterChip
              key={f}
              active={active === f}
              onClick={() => setActive(f)}
            >
              {f}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Lista */}
      <PanelCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.02] text-left text-[10px] font-mono uppercase tracking-[0.15em] text-white/45">
                <th className="py-3 px-4 font-medium">Franqueado</th>
                <th className="py-3 px-4 font-medium">Unidade</th>
                <th className="py-3 px-4 font-medium">Desde</th>
                <th className="py-3 px-4 font-medium text-right">Receita 30d</th>
                <th className="py-3 px-4 font-medium">Health score</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {FRANQUEADOS.map((f) => (
                <tr key={f.unit} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-mp-red flex items-center justify-center font-semibold text-sm shrink-0">
                        {f.name[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate">{f.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium truncate">{f.unit}</div>
                    <div className="text-[11px] text-white/45 flex items-center gap-1">
                      <MapPin className="h-2.5 w-2.5" />
                      {f.city}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white/65">{f.since}</td>
                  <td className="py-3 px-4 text-right tabular-nums font-medium">
                    {f.revenue > 0
                      ? `R$ ${(f.revenue / 1000).toFixed(0)}k`
                      : "—"}
                  </td>
                  <td className="py-3 px-4">
                    {f.score ? (
                      <HealthScore score={f.score} />
                    ) : (
                      <ProgressBar progress={f.progress || 0} />
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={f.status === "ativo" ? "success" : "warning"}
                      size="sm"
                      dot
                    >
                      {f.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="h-7 w-7 rounded-md hover:bg-white/10 flex items-center justify-center">
                        <MessageCircle className="h-3.5 w-3.5 text-white/55" />
                      </button>
                      <button className="h-7 w-7 rounded-md hover:bg-white/10 flex items-center justify-center">
                        <Mail className="h-3.5 w-3.5 text-white/55" />
                      </button>
                      <button className="h-7 w-7 rounded-md hover:bg-white/10 flex items-center justify-center">
                        <MoreHorizontal className="h-4 w-4 text-white/50" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelCard>

      {/* Onboarding template */}
      <PanelCard variant="red" className="mt-3">
        <div className="flex items-start gap-4">
          <Building2 className="h-7 w-7 mt-1 shrink-0" />
          <div className="flex-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/85 mb-1">
              Onboarding self-service
            </div>
            <div className="font-semibold text-lg mb-1">
              Novo franqueado entra no ar em horas
            </div>
            <p className="text-sm text-white/85 mb-3">
              Sistema autoatendimento: cadastra unidade → sobe fotos → define preços → publica. Sem ticket pra matriz, sem TI.
            </p>
            <div className="flex flex-wrap gap-2">
              <Pill>4 passos · ~22 min</Pill>
              <Pill>SEO indexado em 24h</Pill>
              <Pill>WhatsApp + pagamento prontos</Pill>
            </div>
          </div>
        </div>
      </PanelCard>
    </PainelShell>
  );
}

function HealthScore({ score }: { score: number }) {
  const color =
    score >= 85 ? "text-mp-success" : score >= 70 ? "text-mp-warning" : "text-mp-red";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className={cn(
            "h-full",
            score >= 85
              ? "bg-mp-success"
              : score >= 70
              ? "bg-mp-warning"
              : "bg-mp-red"
          )}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={`tabular-nums font-semibold text-sm ${color}`}>
        {score}
      </span>
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full bg-mp-warning" style={{ width: `${progress}%` }} />
      </div>
      <span className="text-xs font-mono text-mp-warning">{progress}%</span>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-black/30 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider">
      {children}
    </span>
  );
}
