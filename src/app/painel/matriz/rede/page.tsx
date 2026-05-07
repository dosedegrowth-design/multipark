import { PainelShell } from "@/components/painel/PainelShell";
import { Badge } from "@/components/ui/Badge";
import { TrendingUp, AlertCircle, Clock, Building2 } from "lucide-react";
import { BrazilMap } from "@/components/painel/BrazilMap";

export const metadata = { title: "Rede · Painel Matriz" };

export default function MatrizPage() {
  return (
    <PainelShell
      variant="matriz"
      active="rede"
      pageSubtitle="Rede MultiPark · todas as unidades"
      pageTitle="238 unidades · 12,4M de receita / mês"
      badge={
        <Badge variant="success" size="lg" dot>
          Operação saudável
        </Badge>
      }
    >
      {/* Mapa */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 mb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              Cobertura nacional
            </div>
            <div className="font-semibold mt-0.5">
              SP · GRU · CGH · VCP · CNF · BH · RJ
            </div>
          </div>
          <div className="flex gap-1.5 text-[10px] font-mono uppercase tracking-wider">
            <Pill color="success">231 ativas</Pill>
            <Pill color="red">14 lotadas</Pill>
            <Pill color="warning">7 onboarding</Pill>
          </div>
        </div>

        <div className="relative h-[300px] md:h-[400px] rounded-xl bg-[var(--color-mp-wine-900)] overflow-hidden">
          {/* mapa estilizado do Brasil */}
          <BrazilMap />

          {/* legend */}
          <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md rounded-lg p-3 text-xs space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--color-mp-red)]" />
              <span className="text-white/80">Próprias</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--color-mp-warning)]" />
              <span className="text-white/80">Parceiras</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--color-mp-success)]" />
              <span className="text-white/80">Onboarding</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <BigKPI label="Receita · mês" value="R$ 12,4M" trend="+18% vs MoM" />
        <BigKPI label="Reservas · mês" value="62.4k" trend="+12% vs MoM" />
        <BigKPI label="Ticket médio" value="R$ 198" trend="+R$ 14" />
        <BigKPI label="NPS rede" value="78" trend="+6 pts" />
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-3">
        {/* Ranking */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                Ranking
              </div>
              <div className="font-semibold mt-0.5">Unidades top 5 · receita</div>
            </div>
            <Badge variant="ghost" size="sm" className="bg-white/5 text-white/65">
              Mês corrente
            </Badge>
          </div>

          <div className="space-y-2">
            {[
              { rank: 1, name: "Multipark Cumbica", city: "Guarulhos", revenue: 1280000, share: 100 },
              { rank: 2, name: "Multipark Premium GRU", city: "Guarulhos", revenue: 945000, share: 74 },
              { rank: 3, name: "Multipark Viracopos", city: "Campinas", revenue: 720000, share: 56 },
              { rank: 4, name: "Multipark Confins", city: "Lagoa Santa", revenue: 510000, share: 40 },
              { rank: 5, name: "Multipark Cargo", city: "Guarulhos", revenue: 430000, share: 34 },
            ].map((u) => (
              <div
                key={u.rank}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center font-mono text-xs text-white/65 shrink-0">
                  {u.rank.toString().padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{u.name}</div>
                  <div className="text-[11px] text-white/45">{u.city}</div>
                </div>
                <div className="hidden md:block w-32">
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-mp-red)]"
                      style={{ width: `${u.share}%` }}
                    />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-semibold tabular-nums">
                    R$ {(u.revenue / 1000).toFixed(0)}k
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 mb-3">
            Alertas operacionais
          </div>
          <div className="space-y-2.5">
            <Alert
              icon={AlertCircle}
              title="14 unidades lotadas"
              desc="Pico de demanda · feriado em 5 dias"
              variant="red"
            />
            <Alert
              icon={Clock}
              title="3 franqueados em onboarding"
              desc="Aguardando aprovação de fotos"
              variant="warning"
            />
            <Alert
              icon={Building2}
              title="Nova unidade no ar"
              desc="Multipark Recife · publicada 2h atrás"
              variant="success"
            />
            <Alert
              icon={TrendingUp}
              title="Receita +18% MoM"
              desc="Maior crescimento dos últimos 6 meses"
              variant="success"
            />
          </div>
        </div>
      </div>
    </PainelShell>
  );
}

function Pill({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "success" | "red" | "warning";
}) {
  const colors = {
    success: "bg-mp-success-20 text-[var(--color-mp-success)]",
    red: "bg-mp-red-20 text-[var(--color-mp-red)]",
    warning: "bg-mp-warning-20 text-[var(--color-mp-warning)]",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full ${colors[color]}`}>{children}</span>
  );
}

function BigKPI({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 mb-2">
        {label}
      </div>
      <div className="text-3xl font-semibold tabular-nums">{value}</div>
      <div className="mt-1 flex items-center gap-1 text-xs text-[var(--color-mp-success)]">
        <TrendingUp className="h-3 w-3" />
        {trend}
      </div>
    </div>
  );
}

function Alert({
  icon: Icon,
  title,
  desc,
  variant,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  variant: "red" | "warning" | "success";
}) {
  const variants = {
    red: "bg-mp-red-10 text-[var(--color-mp-red)]",
    warning: "bg-mp-warning-15 text-[var(--color-mp-warning)]",
    success: "bg-mp-success-15 text-[var(--color-mp-success)]",
  };
  return (
    <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors">
      <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${variants[variant]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="font-medium text-sm">{title}</div>
        <div className="text-[11px] text-white/55 mt-0.5">{desc}</div>
      </div>
    </div>
  );
}

