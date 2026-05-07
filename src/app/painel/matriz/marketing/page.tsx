import { PainelShell } from "@/components/painel/PainelShell";
import { PanelCard, PanelEyebrow } from "@/components/painel/PanelCard";
import { Plus, Megaphone, Mail, MessageCircle, Globe, Eye, MousePointerClick, Users, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const CAMPAIGNS = [
  { name: "Black Friday Nacional · 30% off", channel: "Multi-channel", status: "ativa", reach: 84200, conv: 3142, roi: "+R$ 482k", color: "red" },
  { name: "Push WhatsApp · feriado de Maio", channel: "WhatsApp", status: "ativa", reach: 38400, conv: 1820, roi: "+R$ 218k", color: "warning" },
  { name: "Newsletter mensal · maio 2026", channel: "Email", status: "agendada", reach: 0, conv: 0, roi: "—", color: "blue" },
  { name: "Reativação dormentes Q2", channel: "WhatsApp + Email", status: "rascunho", reach: 0, conv: 0, roi: "—", color: "default" },
];

const ADS = [
  { platform: "Google Ads", budget: 48000, spent: 32400, conv: 1842, cpa: 17.6, ctr: 4.2 },
  { platform: "Meta Ads", budget: 32000, spent: 21200, conv: 921, cpa: 23.0, ctr: 2.8 },
  { platform: "TikTok Ads", budget: 12000, spent: 7800, conv: 142, cpa: 54.9, ctr: 3.1 },
];

export const metadata = { title: "Marketing global · Matriz" };

export default function MatrizMarketing() {
  return (
    <PainelShell
      variant="matriz"
      active="marketing"
      pageSubtitle="Marketing global · Rede MultiPark"
      pageTitle="Campanhas e mídia paga"
      badge={
        <button className="h-9 px-3 rounded-lg bg-mp-red text-sm font-medium flex items-center gap-2">
          <Plus className="h-3.5 w-3.5" />
          Nova campanha
        </button>
      }
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <Mini label="Reach total · 30d" value="124k" Icon={Users} trend="+18%" />
        <Mini label="Conversões" value="5.9k" Icon={MousePointerClick} trend="+22%" />
        <Mini label="ROAS médio" value="6.4x" Icon={TrendingUp} trend="+0.8x" />
        <Mini label="Orçamento gasto" value="R$ 92k" Icon={Megaphone} desc="de R$ 92k" />
      </div>

      <div className="grid xl:grid-cols-[2fr_1fr] gap-3">
        <div className="space-y-3">
          {/* Campanhas globais */}
          <PanelCard className="p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <PanelEyebrow>Campanhas globais ativas</PanelEyebrow>
                <div className="font-semibold mt-0.5">Disparadas pra toda a rede</div>
              </div>
              <button className="text-xs text-mp-red font-medium hover:underline">
                Ver todas →
              </button>
            </div>
            <div className="divide-y divide-white/5">
              {CAMPAIGNS.map((c) => (
                <div key={c.name} className="p-5 hover:bg-white/[0.02]">
                  <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold truncate">{c.name}</span>
                        <StatusBadge status={c.status} />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/55">
                        <ChannelIcon channel={c.channel} />
                        {c.channel}
                      </div>
                    </div>
                    {c.roi !== "—" && (
                      <div className="text-right">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                          ROI estimado
                        </div>
                        <div className="text-mp-success font-semibold">{c.roi}</div>
                      </div>
                    )}
                  </div>
                  {c.reach > 0 && (
                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5">
                      <Stat label="Alcance" value={c.reach.toLocaleString("pt-BR")} />
                      <Stat label="Conversões" value={c.conv.toLocaleString("pt-BR")} />
                      <Stat
                        label="Taxa conversão"
                        value={`${((c.conv / c.reach) * 100).toFixed(1)}%`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </PanelCard>

          {/* Mídia paga */}
          <PanelCard className="p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10">
              <PanelEyebrow>Mídia paga</PanelEyebrow>
              <div className="font-semibold mt-0.5">3 plataformas · R$ 92k investidos</div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.02] text-left text-[10px] font-mono uppercase tracking-[0.15em] text-white/45">
                  <th className="py-3 px-4 font-medium">Plataforma</th>
                  <th className="py-3 px-4 font-medium">Orçamento</th>
                  <th className="py-3 px-4 font-medium">Gasto</th>
                  <th className="py-3 px-4 font-medium">Conversões</th>
                  <th className="py-3 px-4 font-medium">CPA</th>
                  <th className="py-3 px-4 font-medium">CTR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {ADS.map((a) => (
                  <tr key={a.platform} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-4 font-medium">{a.platform}</td>
                    <td className="py-3 px-4 tabular-nums">R$ {a.budget.toLocaleString("pt-BR")}</td>
                    <td className="py-3 px-4 tabular-nums">R$ {a.spent.toLocaleString("pt-BR")}</td>
                    <td className="py-3 px-4 tabular-nums">{a.conv.toLocaleString("pt-BR")}</td>
                    <td className="py-3 px-4 tabular-nums">R$ {a.cpa.toFixed(2)}</td>
                    <td className="py-3 px-4 tabular-nums">{a.ctr}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PanelCard>
        </div>

        <div className="space-y-3">
          <PanelCard variant="red">
            <Globe className="h-7 w-7 mb-3" />
            <div className="font-semibold text-lg mb-1">Campanha pra toda a rede</div>
            <p className="text-sm text-white/85 mb-4">
              Dispare WhatsApp + email + push pros 200k+ clientes do programa Multicliente em todas as 238 unidades.
            </p>
            <div className="space-y-2">
              <Stat2 label="Base total" value="247.382 clientes" />
              <Stat2 label="Custo estimado" value="~R$ 8.420" />
              <Stat2 label="Templates aprovados" value="14" />
            </div>
            <button className="mt-4 w-full h-10 rounded-lg bg-white text-mp-red text-sm font-semibold">
              Criar disparo nacional →
            </button>
          </PanelCard>

          <PanelCard>
            <PanelEyebrow className="mb-3">Centro de criativos</PanelEyebrow>
            <div className="space-y-2">
              <CreativeRow label="Hero institucional" type="Banner" downloads={234} />
              <CreativeRow label="Cupom Black Friday" type="Stories IG" downloads={189} />
              <CreativeRow label="TAG MultiPark" type="Vídeo 30s" downloads={156} />
              <CreativeRow label="Mensalista B2B" type="LinkedIn" downloads={87} />
            </div>
            <button className="mt-3 w-full h-9 rounded-lg border border-white/15 text-sm font-medium hover:bg-white/5">
              Acessar biblioteca →
            </button>
          </PanelCard>
        </div>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">{label}</div>
      <div className="text-base font-semibold tabular-nums mt-0.5">{value}</div>
    </div>
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

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    ativa: "bg-mp-success-15 text-mp-success",
    agendada: "bg-mp-warning-15 text-mp-warning",
    rascunho: "bg-white/10 text-white/60",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
        map[status] || ""
      }`}
    >
      {status}
    </span>
  );
}

function ChannelIcon({ channel }: { channel: string }) {
  if (channel.includes("WhatsApp")) return <MessageCircle className="h-3 w-3" />;
  if (channel.includes("Email")) return <Mail className="h-3 w-3" />;
  return <Megaphone className="h-3 w-3" />;
}

function CreativeRow({ label, type, downloads }: { label: string; type: string; downloads: number }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.04]">
      <div className="h-9 w-12 rounded bg-gradient-to-br from-mp-red-15 to-transparent shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{label}</div>
        <div className="text-[11px] text-white/45">
          {type} · {downloads} downloads
        </div>
      </div>
    </div>
  );
}
