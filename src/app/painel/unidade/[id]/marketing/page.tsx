"use client";

import { PainelShell } from "@/components/painel/PainelShell";
import { PanelCard, PanelEyebrow } from "@/components/painel/PanelCard";
import { Plus, MessageCircle, Mail, Megaphone, Eye, MousePointerClick, Users, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const CAMPANHAS = [
  { name: "Black Friday · 30% off", channel: "WhatsApp", status: "ativa", reach: 1247, opens: 982, clicks: 421, conversions: 87, sentAt: "12/05" },
  { name: "Boas-vindas · novos clientes", channel: "Email", status: "ativa", reach: 8234, opens: 4912, clicks: 1102, conversions: 188, sentAt: "Automatizada" },
  { name: "Reativação dormentes", channel: "WhatsApp", status: "agendada", reach: 312, opens: 0, clicks: 0, conversions: 0, sentAt: "Agendada 18/05" },
  { name: "Mensalista · renovação", channel: "Email + WhatsApp", status: "rascunho", reach: 0, opens: 0, clicks: 0, conversions: 0, sentAt: "—" },
];

const BANNERS = [
  { title: "Cupom BLACK30", desc: "Hero da página da unidade", clicks: 421, status: "ativo" },
  { title: "Reserva antecipada PIX", desc: "Banner sticky topo", clicks: 1240, status: "ativo" },
];

export default function MarketingPage() {
  return (
    <PainelShell
      variant="operador"
      active="marketing"
      pageSubtitle="Marketing local · Cumbica · GRU"
      pageTitle="Campanhas e canais"
      badge={
        <button className="h-9 px-3 rounded-lg bg-mp-red text-sm font-medium flex items-center gap-2">
          <Plus className="h-3.5 w-3.5" />
          Nova campanha
        </button>
      }
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <Mini label="Campanhas ativas" value="3" Icon={Megaphone} />
        <Mini label="Alcance · 30d" value="11.4k" Icon={Users} trend="+22%" />
        <Mini label="Taxa de abertura" value="68%" Icon={Eye} trend="+5 pts" />
        <Mini label="Conversões" value="275" Icon={MousePointerClick} trend="+R$ 18.420" />
      </div>

      <div className="grid xl:grid-cols-[2fr_1fr] gap-3">
        {/* Campanhas */}
        <PanelCard className="p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <PanelEyebrow>Campanhas</PanelEyebrow>
              <div className="font-semibold mt-0.5">{CAMPANHAS.length} campanhas</div>
            </div>
            <button className="text-xs font-medium text-mp-red hover:underline">
              Ver todas →
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {CAMPANHAS.map((c) => (
              <div key={c.name} className="p-5 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-start justify-between mb-3 gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold truncate">{c.name}</span>
                      <StatusBadge status={c.status} />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/55">
                      <ChannelIcon channel={c.channel} />
                      {c.channel} · {c.sentAt}
                    </div>
                  </div>
                  <button className="text-xs font-medium text-white/65 hover:text-white shrink-0">
                    Detalhes →
                  </button>
                </div>

                {c.reach > 0 && (
                  <div className="grid grid-cols-4 gap-3 pt-3 border-t border-white/5">
                    <Stat label="Alcance" value={c.reach.toLocaleString("pt-BR")} />
                    <Stat label="Aberturas" value={c.opens.toLocaleString("pt-BR")} pct={(c.opens / c.reach) * 100} />
                    <Stat label="Cliques" value={c.clicks.toLocaleString("pt-BR")} pct={(c.clicks / c.reach) * 100} />
                    <Stat label="Reservas" value={c.conversions.toString()} highlight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </PanelCard>

        {/* Side */}
        <div className="space-y-3">
          {/* Quick action */}
          <PanelCard variant="red">
            <MessageCircle className="h-7 w-7 mb-3" />
            <div className="font-semibold text-lg mb-1">Disparar WhatsApp em massa</div>
            <p className="text-sm text-white/85 mb-4">
              Segmente sua base e envie cupons, lembretes ou avisos. Templates aprovados pela Meta.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <Pill>1.247 clientes</Pill>
              <Pill>R$ 0,03/msg</Pill>
              <Pill>3 templates</Pill>
            </div>
            <button className="mt-4 w-full h-10 rounded-lg bg-white text-mp-red text-sm font-semibold">
              Criar disparo →
            </button>
          </PanelCard>

          {/* Banners */}
          <PanelCard>
            <div className="flex items-center justify-between mb-4">
              <div>
                <PanelEyebrow>Banners da página</PanelEyebrow>
                <div className="font-semibold mt-0.5">No site público</div>
              </div>
              <button className="h-7 px-2.5 rounded-md bg-white/10 hover:bg-white/15 text-xs font-medium flex items-center gap-1">
                <Plus className="h-3 w-3" />
                Novo
              </button>
            </div>
            <div className="space-y-2">
              {BANNERS.map((b) => (
                <div key={b.title} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="h-12 w-16 rounded-md bg-gradient-to-br from-mp-red-15 to-transparent flex items-center justify-center shrink-0">
                    <ImageIcon className="h-4 w-4 text-mp-red" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{b.title}</div>
                    <div className="text-[11px] text-white/55 truncate">{b.desc}</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 mt-1">
                      {b.clicks} cliques
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PanelCard>

          {/* Templates */}
          <PanelCard>
            <PanelEyebrow className="mb-3">Templates aprovados Meta</PanelEyebrow>
            <div className="space-y-2 text-sm">
              <TemplateRow name="reserva_lembrete_24h" status="active" />
              <TemplateRow name="reserva_lembrete_2h" status="active" />
              <TemplateRow name="post_check_review" status="active" />
              <TemplateRow name="cupom_promocional" status="active" />
              <TemplateRow name="reativacao_dormente" status="pending" />
            </div>
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
  Icon,
}: {
  label: string;
  value: string;
  trend?: string;
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
    </PanelCard>
  );
}

function Stat({
  label,
  value,
  pct,
  highlight,
}: {
  label: string;
  value: string;
  pct?: number;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </div>
      <div
        className={`text-base font-semibold tabular-nums mt-0.5 ${highlight ? "text-mp-red" : ""}`}
      >
        {value}
      </div>
      {pct !== undefined && (
        <div className="text-[10px] text-white/40 mt-0.5 font-mono">
          {pct.toFixed(0)}%
        </div>
      )}
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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-black/30 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider text-center">
      {children}
    </span>
  );
}

function TemplateRow({ name, status }: { name: string; status: "active" | "pending" }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.04]">
      <span className="font-mono text-xs">{name}</span>
      <Badge variant={status === "active" ? "success" : "warning"} size="sm" dot>
        {status === "active" ? "Ativo" : "Pending"}
      </Badge>
    </div>
  );
}
