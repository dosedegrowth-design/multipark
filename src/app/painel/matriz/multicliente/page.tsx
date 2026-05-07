import { PainelShell } from "@/components/painel/PainelShell";
import { PanelCard, PanelEyebrow } from "@/components/painel/PanelCard";
import { Plus, Star, TrendingUp, Users, Award, Gift } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const TIERS = [
  { name: "Bronze", desc: "0-12 reservas/ano", discount: 10, members: 188320, color: "from-amber-700 to-amber-900" },
  { name: "Prata", desc: "13-24 reservas/ano", discount: 20, members: 38420, color: "from-zinc-300 to-zinc-500" },
  { name: "Ouro", desc: "25-48 reservas/ano", discount: 30, members: 12480, color: "from-amber-400 to-amber-600" },
  { name: "Diamante", desc: "49+ reservas/ano", discount: 40, members: 1842, color: "from-cyan-400 to-blue-600" },
];

const PARTNERS = [
  { name: "Localiza", desc: "Locação de carros · 15% off na Multipark", active: true },
  { name: "GOL Smiles", desc: "Acumule milhas estacionando", active: true },
  { name: "Itaú Personnalité", desc: "Acesso prioritário valet", active: true },
  { name: "Livelo", desc: "Pontos em todas as reservas", active: false },
];

export const metadata = { title: "Multicliente · Matriz" };

export default function MatrizMulticlientePage() {
  return (
    <PainelShell
      variant="matriz"
      active="multicliente"
      pageSubtitle="Programa Multicliente · Fidelidade da rede"
      pageTitle="241 mil membros ativos"
      badge={
        <button className="h-9 px-3 rounded-lg bg-mp-red text-sm font-medium flex items-center gap-2">
          <Plus className="h-3.5 w-3.5" />
          Nova regra
        </button>
      }
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <Mini label="Membros ativos" value="241k" Icon={Users} trend="+18% MoM" />
        <Mini label="Cadastros · 30d" value="8.2k" Icon={Star} trend="+22%" />
        <Mini label="Descontos pagos" value="R$ 1,8M" Icon={Gift} desc="Em 30 dias" />
        <Mini label="LTV multicliente" value="R$ 4.842" Icon={TrendingUp} trend="2,4x maior" />
      </div>

      {/* Tiers */}
      <PanelCard className="p-0 overflow-hidden mb-3">
        <div className="px-5 py-4 border-b border-white/10">
          <PanelEyebrow>Tiers do programa</PanelEyebrow>
          <div className="font-semibold mt-0.5">4 níveis · descontos progressivos</div>
        </div>
        <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {TIERS.map((t) => (
            <div key={t.name} className="p-5 relative overflow-hidden">
              <div
                className={`absolute -top-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-br ${t.color} opacity-30 blur-2xl`}
              />
              <div className="flex items-center gap-2 mb-2 relative">
                <Award className="h-4 w-4 text-mp-red" />
                <span className="font-semibold">{t.name}</span>
              </div>
              <div className="text-3xl font-semibold tabular-nums mb-1 relative">
                {t.discount}%
                <span className="text-sm font-normal text-white/55"> off</span>
              </div>
              <div className="text-[11px] text-white/55 mb-3 relative">{t.desc}</div>
              <div className="text-xs text-white/65 relative">
                <strong className="text-white">{t.members.toLocaleString("pt-BR")}</strong>{" "}
                membros
              </div>
            </div>
          ))}
        </div>
      </PanelCard>

      <div className="grid xl:grid-cols-[1fr_1fr] gap-3">
        {/* Parceiros */}
        <PanelCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <PanelEyebrow>Parceiros do programa</PanelEyebrow>
              <div className="font-semibold mt-0.5">Cross-benefits ativos</div>
            </div>
            <button className="h-7 px-2.5 rounded-md bg-white/10 hover:bg-white/15 text-xs font-medium flex items-center gap-1">
              <Plus className="h-3 w-3" />
              Adicionar
            </button>
          </div>
          <div className="space-y-2">
            {PARTNERS.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10"
              >
                <div className="h-10 w-10 rounded-lg bg-mp-red flex items-center justify-center font-semibold shrink-0">
                  {p.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-[11px] text-white/55 truncate">{p.desc}</div>
                </div>
                <Badge
                  variant={p.active ? "success" : "warning"}
                  size="sm"
                  dot
                >
                  {p.active ? "Ativo" : "Pausado"}
                </Badge>
              </div>
            ))}
          </div>
        </PanelCard>

        {/* Highlights */}
        <PanelCard variant="red">
          <Star className="h-7 w-7 mb-3" />
          <div className="font-semibold text-lg mb-1">Multicliente vale 2,4x mais</div>
          <p className="text-sm text-white/85 mb-4">
            Cliente Multicliente reserva 4,2x ao ano e tem ticket médio 28% maior que cliente avulso.
          </p>
          <div className="grid grid-cols-3 gap-2">
            <Stat n="4,2x" label="reservas/ano" />
            <Stat n="+28%" label="ticket médio" />
            <Stat n="2,4x" label="LTV vs avulso" />
          </div>
        </PanelCard>
      </div>
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

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="p-2 rounded-lg bg-black/30 text-center">
      <div className="text-xl font-semibold tabular-nums">{n}</div>
      <div className="text-[9px] font-mono uppercase tracking-wider text-white/65 mt-0.5">
        {label}
      </div>
    </div>
  );
}
