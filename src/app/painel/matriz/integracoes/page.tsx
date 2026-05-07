import { PainelShell } from "@/components/painel/PainelShell";
import { PanelCard, PanelEyebrow } from "@/components/painel/PanelCard";
import { Plug, CheckCircle2, AlertCircle, ExternalLink, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const PAYMENTS = [
  { name: "Asaas", desc: "Gateway principal · PIX, cartão, boleto, split", status: "connected", health: 99.9, txs: 84320 },
  { name: "Mercado Pago", desc: "Gateway secundário · backup", status: "connected", health: 99.7, txs: 12480 },
  { name: "Stripe Brasil", desc: "Pagamentos internacionais", status: "available", health: null, txs: 0 },
];

const COMMS = [
  { name: "WhatsApp Cloud API", desc: "Meta · 200 mil mensagens/mês", status: "connected", health: 99.8, txs: 184250 },
  { name: "Evolution API", desc: "WhatsApp não-oficial · fallback", status: "connected", health: 98.2, txs: 12480 },
  { name: "Resend", desc: "Email transacional", status: "connected", health: 99.9, txs: 84320 },
  { name: "Zenvia", desc: "SMS fallback", status: "connected", health: 99.5, txs: 1842 },
];

const TAGS = [
  { name: "TAG MultiPark (Move Mais)", desc: "Free-flow oficial da rede", status: "connected", health: 99.9, txs: 38420 },
  { name: "Sem Parar", desc: "Tag aceita em 89 unidades", status: "connected", health: 99.8, txs: 14820 },
  { name: "ConectCar", desc: "Tag aceita em 67 unidades", status: "connected", health: 99.5, txs: 8420 },
  { name: "Veloe", desc: "Tag aceita em 42 unidades", status: "connected", health: 99.7, txs: 4210 },
  { name: "Green Pass", desc: "Tag aceita em 28 unidades", status: "available", health: null, txs: 0 },
];

const ANALYTICS = [
  { name: "Google Analytics 4", desc: "Tracking completo da rede", status: "connected" },
  { name: "Google Tag Manager", desc: "GTM-NACIONAL", status: "connected" },
  { name: "Meta Pixel", desc: "Conversões do Meta Ads", status: "connected" },
  { name: "Google Search Console", desc: "SEO + sitemap monitorados", status: "connected" },
  { name: "Google Business Profile", desc: "238 fichas sincronizadas", status: "connected" },
  { name: "Hotjar", desc: "Heatmap + session recording", status: "available" },
  { name: "Mapbox", desc: "Mapas interativos", status: "connected" },
];

const AUTOMATION = [
  { name: "n8n Cloud", desc: "Workflows de notificação + IA", status: "connected", workflows: 18 },
  { name: "Chatwoot", desc: "Atendimento humano + handoff IA", status: "connected", workflows: null },
  { name: "Claude API (Anthropic)", desc: "Chatbot + IA de respostas", status: "connected", workflows: null },
];

export const metadata = { title: "Integrações · Matriz" };

export default function MatrizIntegracoesPage() {
  return (
    <PainelShell
      variant="matriz"
      active="integrações"
      pageSubtitle="Integrações da rede · Toda a operação"
      pageTitle="22 integrações ativas"
      badge={
        <Badge variant="success" dot size="lg">
          Todas operacionais · 99,8% uptime
        </Badge>
      }
    >
      {/* Resumo */}
      <div className="grid md:grid-cols-4 gap-3 mb-5">
        <Mini label="Conectadas" value="22" Icon={CheckCircle2} color="success" />
        <Mini label="Disponíveis" value="3" Icon={Plug} color="white" />
        <Mini label="Com erro" value="0" Icon={AlertCircle} color="success" />
        <Mini label="Uptime médio" value="99,8%" Icon={Zap} color="success" />
      </div>

      {/* Pagamentos */}
      <Section title="Pagamentos" desc="Gateway e split">
        {PAYMENTS.map((i) => <IntegrationRow key={i.name} {...i} />)}
      </Section>

      {/* Comunicação */}
      <Section title="Comunicação" desc="WhatsApp, email, SMS">
        {COMMS.map((i) => <IntegrationRow key={i.name} {...i} />)}
      </Section>

      {/* TAGs */}
      <Section title="TAGs de pedágio" desc="Free-flow nacional">
        {TAGS.map((i) => <IntegrationRow key={i.name} {...i} />)}
      </Section>

      {/* Analytics */}
      <Section title="Analytics & marketing" desc="Tracking e SEO">
        {ANALYTICS.map((i) => (
          <IntegrationRow key={i.name} name={i.name} desc={i.desc} status={i.status} />
        ))}
      </Section>

      {/* Automação */}
      <Section title="Automação & IA" desc="Workflows e agentes">
        {AUTOMATION.map((i) => (
          <IntegrationRow
            key={i.name}
            name={i.name}
            desc={i.desc}
            status={i.status}
            workflows={i.workflows ?? undefined}
          />
        ))}
      </Section>
    </PainelShell>
  );
}

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <PanelCard className="p-0 overflow-hidden mb-3">
      <div className="px-5 py-4 border-b border-white/10">
        <PanelEyebrow>{title}</PanelEyebrow>
        <div className="font-semibold mt-0.5">{desc}</div>
      </div>
      <div className="divide-y divide-white/5">{children}</div>
    </PanelCard>
  );
}

function IntegrationRow({
  name,
  desc,
  status,
  health,
  txs,
  workflows,
}: {
  name: string;
  desc: string;
  status: string;
  health?: number | null;
  txs?: number;
  workflows?: number;
}) {
  return (
    <div className="p-4 flex items-center gap-4 hover:bg-white/[0.02]">
      <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
        <Plug className="h-4 w-4 text-white/65" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate">{name}</div>
        <div className="text-[11px] text-white/55 truncate">{desc}</div>
        {workflows !== undefined && (
          <div className="text-[10px] font-mono text-mp-red mt-0.5 uppercase tracking-wider">
            {workflows} workflows ativos
          </div>
        )}
      </div>
      <div className="hidden lg:flex items-center gap-4 shrink-0">
        {health !== null && health !== undefined && (
          <div className="text-right w-20">
            <div className="text-sm font-semibold tabular-nums">
              {health.toFixed(1)}%
            </div>
            <div className="text-[10px] text-white/45 font-mono uppercase">uptime</div>
          </div>
        )}
        {txs !== undefined && txs > 0 && (
          <div className="text-right w-24">
            <div className="text-sm font-semibold tabular-nums">
              {txs.toLocaleString("pt-BR")}
            </div>
            <div className="text-[10px] text-white/45 font-mono uppercase">tx 30d</div>
          </div>
        )}
      </div>
      {status === "connected" ? (
        <Badge variant="success" size="sm" dot>Conectada</Badge>
      ) : (
        <button className="h-8 px-3 rounded-md border border-mp-red text-mp-red text-xs font-medium hover:bg-mp-red-15">
          Conectar
        </button>
      )}
      <button className="h-8 w-8 rounded-md hover:bg-white/10 flex items-center justify-center shrink-0">
        <ExternalLink className="h-3.5 w-3.5 text-white/55" />
      </button>
    </div>
  );
}

function Mini({
  label,
  value,
  Icon,
  color,
}: {
  label: string;
  value: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: "success" | "white";
}) {
  return (
    <PanelCard className="p-4">
      <div className="flex items-center justify-between mb-1.5">
        <PanelEyebrow>{label}</PanelEyebrow>
        <Icon
          className={`h-3.5 w-3.5 ${color === "success" ? "text-mp-success" : "text-white/30"}`}
        />
      </div>
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
    </PanelCard>
  );
}
