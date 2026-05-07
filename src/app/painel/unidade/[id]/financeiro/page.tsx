"use client";

import { useState } from "react";
import { PainelShell } from "@/components/painel/PainelShell";
import { PanelCard, PanelEyebrow, FilterChip } from "@/components/painel/PanelCard";
import { Download, TrendingUp, ArrowDownRight, FileText, Calendar, ArrowUpRight } from "lucide-react";

const PERIODOS = ["Hoje", "7 dias", "30 dias", "Este mês", "Customizar"];

const EXTRATO = [
  { date: "14/05", desc: "Reserva MP-2026-A8F3K", method: "PIX", in: 343, out: 0 },
  { date: "14/05", desc: "Reserva MP-2026-RFK2H", method: "Cartão · 3x", in: 195, out: 0 },
  { date: "14/05", desc: "Repasse para matriz · 5%", method: "Asaas split", in: 0, out: 27 },
  { date: "14/05", desc: "Reserva MP-2026-GHX5T", method: "PIX", in: 649, out: 0 },
  { date: "13/05", desc: "Reserva MP-2026-XYZ91", method: "Cartão · 6x", in: 195, out: 0 },
  { date: "13/05", desc: "Reembolso MP-2026-FFA22", method: "PIX", in: 0, out: 343 },
  { date: "13/05", desc: "Repasse para matriz · 5%", method: "Asaas split", in: 0, out: 17 },
  { date: "12/05", desc: "Mensalidade SaaS DDG", method: "Boleto", in: 0, out: 199 },
  { date: "12/05", desc: "Reserva MP-2026-LKM77", method: "PIX", in: 195, out: 0 },
];

export default function FinanceiroPage() {
  const [active, setActive] = useState("30 dias");

  return (
    <PainelShell
      variant="operador"
      active="financeiro"
      pageSubtitle="Financeiro · Cumbica · GRU"
      pageTitle="Receita, repasses e fluxo de caixa"
      badge={
        <button className="h-9 px-3 rounded-lg border border-white/15 text-sm flex items-center gap-2 hover:bg-white/5">
          <Download className="h-3.5 w-3.5" />
          Relatório PDF
        </button>
      }
    >
      {/* Período */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {PERIODOS.map((p) => (
          <FilterChip key={p} active={active === p} onClick={() => setActive(p)}>
            {p}
          </FilterChip>
        ))}
      </div>

      {/* KPIs principais */}
      <div className="grid md:grid-cols-4 gap-3 mb-5">
        <BigKPI label="Receita bruta" value="R$ 142.840" trend="+18% vs mês anterior" Icon={TrendingUp} />
        <BigKPI label="Comissões pagas" value="R$ 7.142" desc="5% à matriz" Icon={ArrowDownRight} negative />
        <BigKPI label="Custos plataforma" value="R$ 199" desc="SaaS DDG" Icon={ArrowDownRight} negative />
        <BigKPI label="Líquido a receber" value="R$ 135.499" trend="+18% vs mês anterior" highlight Icon={ArrowUpRight} />
      </div>

      {/* Gráfico + breakdown */}
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-3 mb-5">
        <PanelCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <PanelEyebrow>Receita diária</PanelEyebrow>
              <div className="font-semibold mt-0.5">Últimos 30 dias</div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <LegendDot color="bg-mp-red" label="PIX" />
              <LegendDot color="bg-mp-warning" label="Cartão" />
              <LegendDot color="bg-white/40" label="Pré-reserva" />
            </div>
          </div>
          <FakeStackedChart />
        </PanelCard>

        <PanelCard>
          <PanelEyebrow className="mb-3">Por método de pagamento</PanelEyebrow>
          <div className="space-y-3">
            <PaymentRow label="PIX" value={89320} pct={62} color="bg-mp-red" />
            <PaymentRow label="Cartão de crédito" value={42150} pct={29} color="bg-mp-warning" />
            <PaymentRow label="Pré-reserva (balcão)" value={11370} pct={9} color="bg-white/40" />
          </div>

          <div className="mt-5 pt-4 border-t border-white/10">
            <PanelEyebrow className="mb-3">Próximos repasses</PanelEyebrow>
            <div className="space-y-2">
              <ReceivableRow date="20/MAI" desc="Repasse semanal" value="R$ 32.480" />
              <ReceivableRow date="27/MAI" desc="Repasse semanal" value="R$ 28.920" />
              <ReceivableRow date="03/JUN" desc="Repasse semanal" value="R$ 31.250" />
            </div>
          </div>
        </PanelCard>
      </div>

      {/* Extrato */}
      <PanelCard className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <PanelEyebrow>Extrato detalhado</PanelEyebrow>
            <div className="font-semibold mt-0.5">Maio 2026 · {EXTRATO.length} lançamentos</div>
          </div>
          <button className="text-xs font-medium text-mp-red hover:underline flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" />
            Ver todos
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/[0.02] text-left text-[10px] font-mono uppercase tracking-[0.15em] text-white/45">
              <th className="py-3 px-4 font-medium">Data</th>
              <th className="py-3 px-4 font-medium">Descrição</th>
              <th className="py-3 px-4 font-medium">Método</th>
              <th className="py-3 px-4 font-medium text-right">Entrada</th>
              <th className="py-3 px-4 font-medium text-right">Saída</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {EXTRATO.map((e, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4 font-mono text-xs text-white/65">{e.date}</td>
                <td className="py-3 px-4">{e.desc}</td>
                <td className="py-3 px-4 text-white/55 text-xs">{e.method}</td>
                <td className="py-3 px-4 text-right tabular-nums font-medium text-mp-success">
                  {e.in > 0 ? `+R$ ${e.in.toLocaleString("pt-BR")}` : "—"}
                </td>
                <td className="py-3 px-4 text-right tabular-nums font-medium text-mp-red">
                  {e.out > 0 ? `−R$ ${e.out.toLocaleString("pt-BR")}` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-white/[0.04]">
            <tr>
              <td colSpan={3} className="py-3 px-4 font-semibold">Total mês</td>
              <td className="py-3 px-4 text-right tabular-nums font-bold text-mp-success">
                +R$ 142.840
              </td>
              <td className="py-3 px-4 text-right tabular-nums font-bold text-mp-red">
                −R$ 7.341
              </td>
            </tr>
          </tfoot>
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
        <div className={`mt-1 text-xs ${negative ? "text-mp-red" : highlight ? "text-white/85" : "text-mp-success"}`}>
          {trend}
        </div>
      )}
      {desc && (
        <div className="mt-1 text-xs text-white/55">{desc}</div>
      )}
    </PanelCard>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-white/55">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function PaymentRow({
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
        <span className="tabular-nums">R$ {value.toLocaleString("pt-BR")}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="text-[10px] font-mono text-white/40 mt-0.5">{pct}%</div>
    </div>
  );
}

function ReceivableRow({ date, desc, value }: { date: string; desc: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02]">
      <div className="h-8 w-8 rounded-md bg-white/5 flex items-center justify-center shrink-0">
        <Calendar className="h-3.5 w-3.5 text-white/55" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-mono uppercase tracking-wider text-white/45">{date}</div>
        <div className="text-sm font-medium truncate">{desc}</div>
      </div>
      <div className="text-sm font-semibold tabular-nums shrink-0">{value}</div>
    </div>
  );
}

function FakeStackedChart() {
  const data = [40, 55, 48, 62, 78, 88, 92, 75, 68, 58, 50, 62, 71, 84, 95, 88, 76, 70, 65, 58, 52, 60, 68, 76, 84, 92, 88, 75, 68, 72];
  const max = 100;
  return (
    <div className="h-44 flex items-end gap-1">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col gap-0.5 justify-end" style={{ height: "100%" }}>
          <div
            className="w-full bg-mp-red rounded-t-sm"
            style={{ height: `${(v / max) * 0.62 * 100}%` }}
          />
          <div
            className="w-full bg-mp-warning"
            style={{ height: `${(v / max) * 0.29 * 100}%` }}
          />
          <div
            className="w-full bg-white/40 rounded-b-sm"
            style={{ height: `${(v / max) * 0.09 * 100}%` }}
          />
        </div>
      ))}
    </div>
  );
}
