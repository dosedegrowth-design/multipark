import { PainelShell } from "@/components/painel/PainelShell";
import { PanelCard, PanelEyebrow } from "@/components/painel/PanelCard";
import { Download, TrendingUp, ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const TOP_REVENUE = [
  { rank: 1, name: "Multipark Cumbica", city: "Guarulhos · GRU", revenue: 1280000, share: 100 },
  { rank: 2, name: "Multipark Premium GRU", city: "Guarulhos · GRU", revenue: 945000, share: 74 },
  { rank: 3, name: "Multipark Viracopos", city: "Campinas · VCP", revenue: 720000, share: 56 },
  { rank: 4, name: "Multipark Confins", city: "Lagoa Santa · CNF", revenue: 510000, share: 40 },
  { rank: 5, name: "Multipark Cargo", city: "Guarulhos · GRU", revenue: 430000, share: 34 },
  { rank: 6, name: "Multipark Av. Paulista", city: "São Paulo", revenue: 387000, share: 30 },
  { rank: 7, name: "Multipark Centro SP", city: "São Paulo", revenue: 248000, share: 19 },
  { rank: 8, name: "Multipark Congonhas", city: "São Paulo · CGH", revenue: 195000, share: 15 },
];

const REPASSES = [
  { date: "20/05", franqueado: "Multipark Cumbica", value: 1216000, status: "processado" },
  { date: "20/05", franqueado: "Multipark Premium GRU", value: 897750, status: "processado" },
  { date: "20/05", franqueado: "Multipark Viracopos", value: 684000, status: "processado" },
  { date: "20/05", franqueado: "Multipark Confins", value: 484500, status: "agendado" },
  { date: "20/05", franqueado: "Multipark Cargo", value: 408500, status: "agendado" },
  { date: "20/05", franqueado: "Multipark Av. Paulista", value: 367650, status: "agendado" },
];

export const metadata = { title: "Financeiro · Matriz" };

export default function MatrizFinanceiro() {
  return (
    <PainelShell
      variant="matriz"
      active="financeiro"
      pageSubtitle="Financeiro consolidado · Rede MultiPark"
      pageTitle="R$ 12,4M faturados em maio"
      badge={
        <button className="h-9 px-3 rounded-lg border border-white/15 text-sm flex items-center gap-2 hover:bg-white/5">
          <Download className="h-3.5 w-3.5" />
          Exportar relatório
        </button>
      }
    >
      {/* KPIs */}
      <div className="grid md:grid-cols-4 gap-3 mb-5">
        <BigKPI label="GMV consolidado" value="R$ 12,4M" trend="+18% MoM" Icon={TrendingUp} />
        <BigKPI label="Royalties recebidos" value="R$ 620k" trend="+18% MoM" Icon={ArrowUpRight} />
        <BigKPI label="Repasses a pagar" value="R$ 11,2M" desc="Pagamento 20/MAI" Icon={ArrowDownRight} negative />
        <BigKPI label="Líquido matriz" value="R$ 620k" trend="+18% MoM" Icon={Wallet} highlight />
      </div>

      {/* Chart + breakdown */}
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-3 mb-5">
        <PanelCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <PanelEyebrow>GMV consolidado</PanelEyebrow>
              <div className="font-semibold mt-0.5">Últimos 12 meses</div>
            </div>
            <Badge variant="success" size="sm" dot>
              +24% YoY
            </Badge>
          </div>
          <FakeBigChart />
        </PanelCard>

        <PanelCard>
          <PanelEyebrow className="mb-3">Por categoria de unidade</PanelEyebrow>
          <div className="space-y-3">
            <CategoryRow label="Aeroporto" value={8240000} pct={66} color="bg-mp-red" />
            <CategoryRow label="Urbano" value={2870000} pct={23} color="bg-mp-warning" />
            <CategoryRow label="Mensalista" value={912000} pct={8} color="bg-blue-500" />
            <CategoryRow label="Eventos" value={378000} pct={3} color="bg-white/40" />
          </div>

          <div className="mt-5 pt-4 border-t border-white/10">
            <PanelEyebrow className="mb-3">Resumo do mês</PanelEyebrow>
            <div className="space-y-2 text-sm">
              <SumRow label="GMV bruto" value="R$ 12.400.000" />
              <SumRow label="− Repasses (95%)" value="R$ 11.780.000" />
              <SumRow label="− Custos plataforma" value="R$ 18.500" />
              <div className="pt-2 mt-2 border-t border-white/10">
                <SumRow label="Líquido matriz" value="R$ 601.500" highlight />
              </div>
            </div>
          </div>
        </PanelCard>
      </div>

      {/* Top revenue */}
      <PanelCard className="p-0 overflow-hidden mb-3">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <PanelEyebrow>Ranking · top unidades</PanelEyebrow>
            <div className="font-semibold mt-0.5">Por receita do mês</div>
          </div>
          <button className="text-xs text-mp-red font-medium hover:underline">
            Ver todas →
          </button>
        </div>
        <div className="divide-y divide-white/5">
          {TOP_REVENUE.map((u) => (
            <div key={u.rank} className="flex items-center gap-3 p-4 hover:bg-white/[0.02]">
              <div className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center font-mono text-xs text-white/65 shrink-0">
                {u.rank.toString().padStart(2, "0")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{u.name}</div>
                <div className="text-[11px] text-white/45">{u.city}</div>
              </div>
              <div className="hidden md:block w-40">
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-mp-red"
                    style={{ width: `${u.share}%` }}
                  />
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-semibold tabular-nums">
                  R$ {(u.revenue / 1000).toFixed(0)}k
                </div>
                <div className="text-[10px] text-white/45 font-mono">
                  {((u.revenue / 12400000) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </PanelCard>

      {/* Repasses */}
      <PanelCard className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10">
          <PanelEyebrow>Repasses programados</PanelEyebrow>
          <div className="font-semibold mt-0.5">Próximo lote · 20/MAI · R$ 11,2M</div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/[0.02] text-left text-[10px] font-mono uppercase tracking-[0.15em] text-white/45">
              <th className="py-3 px-4 font-medium">Data</th>
              <th className="py-3 px-4 font-medium">Franqueado</th>
              <th className="py-3 px-4 font-medium text-right">Valor</th>
              <th className="py-3 px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {REPASSES.map((r, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="py-3 px-4 font-mono text-xs">{r.date}</td>
                <td className="py-3 px-4">{r.franqueado}</td>
                <td className="py-3 px-4 text-right tabular-nums font-medium">
                  R$ {(r.value / 1000).toLocaleString("pt-BR")}k
                </td>
                <td className="py-3 px-4">
                  <Badge
                    variant={r.status === "processado" ? "success" : "warning"}
                    size="sm"
                    dot
                  >
                    {r.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </PanelCard>
    </PainelShell>
  );
}

function BigKPI({
  label,
  value,
  trend,
  desc,
  Icon,
  highlight,
  negative,
}: {
  label: string;
  value: string;
  trend?: string;
  desc?: string;
  Icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
  negative?: boolean;
}) {
  return (
    <PanelCard
      className={highlight ? "bg-mp-red border-mp-red text-white" : undefined}
    >
      <div className="flex items-start justify-between mb-2">
        <PanelEyebrow className={highlight ? "text-white/80" : undefined}>
          {label}
        </PanelEyebrow>
        <Icon className={highlight ? "h-4 w-4 text-white/80" : "h-4 w-4 text-white/30"} />
      </div>
      <div className="text-3xl font-semibold tabular-nums">{value}</div>
      {trend && (
        <div
          className={`mt-1 text-xs ${
            negative
              ? "text-mp-warning"
              : highlight
              ? "text-white/85"
              : "text-mp-success"
          }`}
        >
          {trend}
        </div>
      )}
      {desc && <div className="mt-1 text-xs text-white/55">{desc}</div>}
    </PanelCard>
  );
}

function CategoryRow({
  label,
  value,
  pct,
  color,
}: {
  label: string;
  value: number;
  pct: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 text-sm">
        <span className="font-medium">{label}</span>
        <span className="tabular-nums">R$ {(value / 1_000_000).toFixed(2)}M</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="text-[10px] font-mono text-white/40 mt-0.5">{pct}%</div>
    </div>
  );
}

function SumRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={highlight ? "font-semibold" : "text-white/65"}>{label}</span>
      <span
        className={`tabular-nums ${
          highlight ? "text-2xl font-semibold text-mp-red" : "font-medium"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function FakeBigChart() {
  const data = [62, 68, 71, 78, 82, 88, 94, 102, 98, 108, 116, 124];
  const labels = ["Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai"];
  const max = 130;
  return (
    <div className="h-52 flex items-end gap-2">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <div
            className={`w-full rounded-t-sm transition-all ${
              i === data.length - 1
                ? "bg-mp-red"
                : "bg-gradient-to-t from-mp-red/70 to-mp-red/40"
            }`}
            style={{ height: `${(v / max) * 100}%` }}
          />
          <span className="text-[9px] text-white/45 font-mono">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}
