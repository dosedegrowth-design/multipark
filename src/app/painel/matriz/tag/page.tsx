import { PainelShell } from "@/components/painel/PainelShell";
import { PanelCard, PanelEyebrow } from "@/components/painel/PanelCard";
import { Plus, Zap, TrendingUp, CreditCard, Activity, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const STATS_BY_UNIT = [
  { unit: "Cumbica · GRU", txs: 38420, revenue: 480250 },
  { unit: "Premium GRU", txs: 18920, revenue: 284820 },
  { unit: "Viracopos", txs: 14820, revenue: 188640 },
  { unit: "Av. Paulista", txs: 12480, revenue: 142080 },
  { unit: "Confins", txs: 9420, revenue: 118420 },
  { unit: "Cargo", txs: 7820, revenue: 89240 },
];

const RECARGAS = [
  { user: "Mariana S.", value: 200, method: "PIX", time: "agora" },
  { user: "Pedro V.", value: 150, method: "Cartão recorrente", time: "12 min atrás" },
  { user: "Carla M.", value: 500, method: "PIX", time: "28 min atrás" },
  { user: "João C.", value: 100, method: "Cartão", time: "1h atrás" },
  { user: "Ana B.", value: 200, method: "PIX", time: "1h 32 min" },
];

export const metadata = { title: "TAG MultiPark · Matriz" };

export default function MatrizTagPage() {
  return (
    <PainelShell
      variant="matriz"
      active="tag multipark"
      pageSubtitle="TAG MultiPark · Programa nacional"
      pageTitle="84 mil TAGs ativas"
      badge={
        <Badge variant="success" dot size="lg">
          Integração Move Mais · operacional
        </Badge>
      }
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <Mini label="TAGs ativas" value="84.230" Icon={Zap} trend="+18% MoM" />
        <Mini label="Recargas · 30d" value="R$ 4,2M" Icon={CreditCard} trend="+22%" />
        <Mini label="Transações · 30d" value="248k" Icon={Activity} trend="+24%" />
        <Mini label="Ticket médio" value="R$ 16,90" Icon={TrendingUp} desc="Por transação" />
      </div>

      <div className="grid xl:grid-cols-[1.5fr_1fr] gap-3 mb-3">
        {/* Por unidade */}
        <PanelCard className="p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <PanelEyebrow>Top unidades · uso da TAG</PanelEyebrow>
              <div className="font-semibold mt-0.5">Por transações no mês</div>
            </div>
            <button className="text-xs text-mp-red font-medium hover:underline">
              Ver todas →
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.02] text-left text-[10px] font-mono uppercase tracking-[0.15em] text-white/45">
                <th className="py-3 px-4 font-medium">Unidade</th>
                <th className="py-3 px-4 font-medium text-right">Transações</th>
                <th className="py-3 px-4 font-medium text-right">Receita TAG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {STATS_BY_UNIT.map((s) => (
                <tr key={s.unit} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-medium">{s.unit}</td>
                  <td className="py-3 px-4 text-right tabular-nums">
                    {s.txs.toLocaleString("pt-BR")}
                  </td>
                  <td className="py-3 px-4 text-right tabular-nums font-semibold">
                    R$ {s.revenue.toLocaleString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </PanelCard>

        {/* Hero TAG */}
        <PanelCard variant="red">
          <div className="flex items-start gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/85 mb-0.5">
                TAG MultiPark by Move Mais
              </div>
              <div className="font-semibold text-lg">Free-flow nacional</div>
            </div>
          </div>
          <p className="text-sm text-white/85 mb-4">
            Aceita em 40+ unidades MultiPark + 100% das rodovias pedagiadas do Brasil. Recarga automática.
          </p>
          <div className="space-y-2 mb-4">
            <Stat2 label="Unidades cobertas" value="40+" />
            <Stat2 label="Rodovias" value="100% Brasil" />
            <Stat2 label="Adesão grátis" value="✓" />
            <Stat2 label="Cashback recargas" value="10%" />
          </div>
          <button className="w-full h-10 rounded-lg bg-white text-mp-red text-sm font-semibold">
            Gerenciar parceria Move Mais →
          </button>
        </PanelCard>
      </div>

      {/* Recargas em tempo real */}
      <PanelCard className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <PanelEyebrow>Recargas em tempo real</PanelEyebrow>
            <div className="font-semibold mt-0.5">Últimas transações da rede</div>
          </div>
          <Badge variant="success" dot size="sm">Ao vivo</Badge>
        </div>
        <div className="divide-y divide-white/5">
          {RECARGAS.map((r, i) => (
            <div key={i} className="p-4 flex items-center gap-4 hover:bg-white/[0.02]">
              <div className="h-9 w-9 rounded-full bg-mp-red flex items-center justify-center font-semibold shrink-0">
                {r.user[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium">{r.user}</div>
                <div className="text-[11px] text-white/55">{r.method}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-semibold tabular-nums text-mp-success">
                  +R$ {r.value}
                </div>
                <div className="text-[10px] text-white/45 font-mono uppercase tracking-wider">
                  {r.time}
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-white/30" />
            </div>
          ))}
        </div>
      </PanelCard>
    </PainelShell>
  );
}

function Mini({
  label,
  value,
  trend,
  desc,
  Icon,
}: {
  label: string;
  value: string;
  trend?: string;
  desc?: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <PanelCard className="p-4">
      <div className="flex items-center justify-between mb-1.5">
        <PanelEyebrow>{label}</PanelEyebrow>
        <Icon className="h-3.5 w-3.5 text-white/30" />
      </div>
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
      {trend && <div className="mt-1 text-[11px] text-mp-success">{trend}</div>}
      {desc && <div className="mt-1 text-[11px] text-white/45">{desc}</div>}
    </PanelCard>
  );
}

function Stat2({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-white/85">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
