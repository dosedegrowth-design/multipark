import { PainelShell } from "@/components/painel/PainelShell";
import { Badge } from "@/components/ui/Badge";
import {
  Calendar,
  TrendingUp,
  Users,
  Star,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const metadata = { title: "Dashboard · Painel Operador" };

export default function DashboardPage() {
  return (
    <PainelShell
      variant="operador"
      active="dashboard"
      pageSubtitle="Unidade · Cumbica · GRU"
      pageTitle="Bom dia, Roberto. 47 reservas hoje."
      badge={
        <Badge variant="success" dot size="lg">
          Aberto · 124 vagas
        </Badge>
      }
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KPI label="Receita · hoje" value="R$ 4.872" trend="+18%" Icon={TrendingUp} />
        <KPI label="Ocupação" value="68%" trend="+4 pts" Icon={Users} />
        <KPI label="Ticket médio" value="R$ 124" trend="+R$ 8" Icon={Calendar} />
        <KPI label="NPS · 30d" value="72" trend="+5" Icon={Star} />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-3 mb-6">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1">
                Ocupação por hora
              </div>
              <div className="font-semibold">Hoje · 14 mai</div>
            </div>
            <Badge variant="ghost" size="sm" className="bg-white/5 text-white/70">
              Pico 14h-18h
            </Badge>
          </div>
          <FakeChart />
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 mb-3">
            Próximas reservas
          </div>
          <div className="space-y-2.5">
            {[
              { time: "06:00", plate: "ABC1D23", name: "Mariana S.", days: 7, status: "confirmada" },
              { time: "07:30", plate: "RFK2H88", name: "Pedro V.", days: 3, status: "confirmada" },
              { time: "09:00", plate: "GHX5T11", name: "Carla M.", days: 14, status: "pendente" },
              { time: "11:15", plate: "QWE3R45", name: "João C.", days: 5, status: "confirmada" },
            ].map((r) => (
              <div
                key={r.plate}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <div className="h-9 w-9 rounded-lg bg-[--color-mp-red]/15 flex items-center justify-center text-[--color-mp-red] shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{r.plate}</span>
                    <span className="text-xs text-white/40">·</span>
                    <span className="text-sm truncate">{r.name}</span>
                  </div>
                  <div className="text-[11px] text-white/45">
                    {r.time} · {r.days} dias
                  </div>
                </div>
                {r.status === "confirmada" ? (
                  <CheckCircle2 className="h-4 w-4 text-[--color-mp-success]" />
                ) : (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[--color-mp-warning]">
                    pendente
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-3 gap-3">
        <ActionCard
          title="Atualizar vagas"
          desc="120 livres · ajuste em tempo real no site público"
          cta="Atualizar agora"
        />
        <ActionCard
          title="Editar preços"
          desc="Crie cupons promocionais e regras dinâmicas"
          cta="Abrir editor"
        />
        <ActionCard
          title="Disparar campanha"
          desc="WhatsApp para 1.247 clientes da sua base"
          cta="Criar campanha"
          highlight
        />
      </div>
    </PainelShell>
  );
}

function KPI({
  label,
  value,
  trend,
  Icon,
}: {
  label: string;
  value: string;
  trend: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
          {label}
        </div>
        <Icon className="h-4 w-4 text-white/30" />
      </div>
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
      <div className="mt-1 flex items-center gap-1 text-xs text-[--color-mp-success]">
        <ArrowUpRight className="h-3 w-3" />
        {trend} vs ontem
      </div>
    </div>
  );
}

function ActionCard({
  title,
  desc,
  cta,
  highlight,
}: {
  title: string;
  desc: string;
  cta: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 border ${
        highlight
          ? "bg-[--color-mp-red] border-[--color-mp-red] text-white"
          : "bg-white/[0.03] border-white/10 text-white"
      }`}
    >
      <div className="font-semibold text-lg mb-1">{title}</div>
      <p className={highlight ? "text-white/85 text-sm" : "text-white/55 text-sm"}>
        {desc}
      </p>
      <button
        className={`mt-4 text-sm font-medium flex items-center gap-1 ${
          highlight ? "" : "text-[--color-mp-red]"
        } hover:gap-2 transition-all`}
      >
        <Plus className="h-3.5 w-3.5" />
        {cta}
      </button>
    </div>
  );
}

function FakeChart() {
  const points = [12, 18, 22, 28, 34, 42, 55, 68, 72, 65, 58, 50, 44, 38, 30, 22, 16, 12];
  const max = Math.max(...points);
  return (
    <div className="h-44 flex items-end gap-1.5">
      {points.map((p, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <div
            className="w-full rounded-t-sm bg-gradient-to-t from-[--color-mp-red]/80 to-[--color-mp-red]/30"
            style={{ height: `${(p / max) * 100}%` }}
          />
          {i % 3 === 0 && (
            <span className="text-[9px] text-white/40 font-mono">
              {String(6 + i).padStart(2, "0")}h
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
