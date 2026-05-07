"use client";

import { useState } from "react";
import { PainelShell } from "@/components/painel/PainelShell";
import { PanelCard, PanelEyebrow } from "@/components/painel/PanelCard";
import { Clock, Users, Shield, Plug, Globe, Bell, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

const TABS = [
  { id: "geral", label: "Geral", icon: Globe },
  { id: "horario", label: "Horário", icon: Clock },
  { id: "equipe", label: "Equipe", icon: Users },
  { id: "politicas", label: "Políticas", icon: Shield },
  { id: "integracoes", label: "Integrações", icon: Plug },
  { id: "notificacoes", label: "Notificações", icon: Bell },
];

const HORARIOS = [
  { day: "Segunda", open: "00:00", close: "23:59", h24: true },
  { day: "Terça", open: "00:00", close: "23:59", h24: true },
  { day: "Quarta", open: "00:00", close: "23:59", h24: true },
  { day: "Quinta", open: "00:00", close: "23:59", h24: true },
  { day: "Sexta", open: "00:00", close: "23:59", h24: true },
  { day: "Sábado", open: "00:00", close: "23:59", h24: true },
  { day: "Domingo", open: "00:00", close: "23:59", h24: true },
];

const EQUIPE = [
  { name: "Roberto Almeida", role: "Gerente", email: "roberto@multipark.com", status: "owner" },
  { name: "Joana Mendes", role: "Operação", email: "joana@multipark.com", status: "admin" },
  { name: "Carlos Tavares", role: "Manobrista", email: "carlos@multipark.com", status: "member" },
  { name: "Patrícia Rocha", role: "Atendimento", email: "patricia@multipark.com", status: "member" },
];

const INTEGRACOES = [
  { name: "Asaas (split payment)", status: "connected", desc: "Recebimentos PIX/cartão + repasse automático" },
  { name: "WhatsApp Cloud API", status: "connected", desc: "Notificações + chatbot automatizado" },
  { name: "Google Reviews", status: "connected", desc: "Sincronização de avaliações" },
  { name: "Google Business Profile", status: "connected", desc: "Posts e horários sincronizados" },
  { name: "Meta Pixel", status: "connected", desc: "Tracking de conversões da unidade" },
  { name: "TAG MultiPark (Move Mais)", status: "connected", desc: "Free-flow + recargas" },
  { name: "Sem Parar", status: "available", desc: "Aceitar tag Sem Parar" },
  { name: "ConectCar", status: "available", desc: "Aceitar tag ConectCar" },
];

export default function ConfigPage() {
  const [tab, setTab] = useState("geral");

  return (
    <PainelShell
      variant="operador"
      active="configurações"
      pageSubtitle="Configurações · Cumbica · GRU"
      pageTitle="Ajustes da unidade"
    >
      <div className="grid lg:grid-cols-[240px_1fr] gap-3">
        {/* Tab nav */}
        <PanelCard className="p-2 h-fit lg:sticky lg:top-20">
          {TABS.map((t) => {
            const I = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors text-left",
                  tab === t.id
                    ? "bg-mp-red text-white"
                    : "text-white/65 hover:text-white hover:bg-white/5"
                )}
              >
                <I className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </PanelCard>

        {/* Content */}
        <div className="space-y-3">
          {tab === "geral" && <GeralSection />}
          {tab === "horario" && <HorarioSection />}
          {tab === "equipe" && <EquipeSection />}
          {tab === "politicas" && <PoliticasSection />}
          {tab === "integracoes" && <IntegracoesSection />}
          {tab === "notificacoes" && <NotificacoesSection />}
        </div>
      </div>
    </PainelShell>
  );
}

function GeralSection() {
  return (
    <>
      <PanelCard>
        <PanelEyebrow className="mb-4">Identidade da unidade</PanelEyebrow>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Nome público" value="Multipark Cumbica" />
          <Field label="Slug (URL)" value="cumbica-01" mono />
          <Field
            label="Endereço completo"
            value="Av. Cumbica, 2.840 — Cidade Industrial Cumbica"
            full
          />
          <Field label="CEP" value="07221-010" mono />
          <Field label="CNPJ" value="00.000.000/0001-00" mono />
          <Field label="Telefone" value="(11) 4000-1234" />
          <Field label="WhatsApp" value="(11) 99999-1234" />
          <Field label="Email" value="cumbica@multipark.com.br" />
        </div>
      </PanelCard>

      <PanelCard>
        <PanelEyebrow className="mb-3">Categoria & serviços</PanelEyebrow>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            "Aeroporto", "24h", "Coberto", "Valet", "Transfer",
            "Seguro R$1M", "EV Charger", "Lavagem", "Câmeras"
          ].map((s) => (
            <ToggleChip key={s} label={s} on={["Aeroporto", "24h", "Coberto", "Valet", "Transfer", "Seguro R$1M", "EV Charger"].includes(s)} />
          ))}
        </div>
      </PanelCard>
    </>
  );
}

function HorarioSection() {
  return (
    <>
      <PanelCard>
        <div className="flex items-center justify-between mb-4">
          <PanelEyebrow>Horário de funcionamento</PanelEyebrow>
          <button className="text-xs text-mp-red font-medium hover:underline">
            Aplicar 24h em todos
          </button>
        </div>
        <div className="space-y-2">
          {HORARIOS.map((h) => (
            <div key={h.day} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/10">
              <span className="font-medium w-24 shrink-0">{h.day}</span>
              <Badge variant="success" size="sm" dot>
                {h.h24 ? "24h" : `${h.open} → ${h.close}`}
              </Badge>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-white/45 font-mono uppercase tracking-wider">
                  Aberto 24h
                </span>
                <Toggle on={h.h24} />
              </div>
            </div>
          ))}
        </div>
      </PanelCard>

      <PanelCard>
        <PanelEyebrow className="mb-3">Feriados e datas especiais</PanelEyebrow>
        <p className="text-sm text-white/55 mb-4">
          Defina horários especiais para feriados, eventos esportivos ou shows que aumentam a demanda na região.
        </p>
        <button className="px-4 h-9 rounded-lg border border-white/15 hover:bg-white/5 text-sm font-medium">
          Adicionar data especial
        </button>
      </PanelCard>
    </>
  );
}

function EquipeSection() {
  return (
    <>
      <PanelCard className="p-0 overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <PanelEyebrow>Membros da equipe</PanelEyebrow>
            <div className="font-semibold mt-0.5">{EQUIPE.length} membros ativos</div>
          </div>
          <button className="px-3 h-9 rounded-lg bg-mp-red text-sm font-medium">
            Convidar membro
          </button>
        </div>
        <div className="divide-y divide-white/5">
          {EQUIPE.map((m) => (
            <div key={m.email} className="p-4 flex items-center gap-4 hover:bg-white/[0.02]">
              <div className="h-10 w-10 rounded-full bg-mp-red flex items-center justify-center font-semibold shrink-0">
                {m.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium">{m.name}</div>
                <div className="text-[11px] text-white/55">{m.email}</div>
              </div>
              <div className="hidden sm:block text-sm text-white/65">{m.role}</div>
              <RoleBadge role={m.status} />
              <button className="h-8 w-8 rounded-md hover:bg-white/10 flex items-center justify-center">
                <MoreHorizontal className="h-4 w-4 text-white/55" />
              </button>
            </div>
          ))}
        </div>
      </PanelCard>
    </>
  );
}

function PoliticasSection() {
  return (
    <>
      <PanelCard>
        <PanelEyebrow className="mb-4">Política de cancelamento</PanelEyebrow>
        <div className="space-y-2">
          <PolicyOption label="Grátis até 48h antes" desc="Padrão da rede MultiPark" active />
          <PolicyOption label="Grátis até 24h antes" desc="Mais flexível para o cliente" />
          <PolicyOption label="Sem reembolso" desc="Eventos especiais (shows, jogos)" />
        </div>
      </PanelCard>

      <PanelCard>
        <PanelEyebrow className="mb-3">Tolerância de atraso</PanelEyebrow>
        <div className="grid grid-cols-3 gap-2">
          <ToggleChip label="0 min" />
          <ToggleChip label="30 min" />
          <ToggleChip label="2h" on />
        </div>
      </PanelCard>

      <PanelCard>
        <PanelEyebrow className="mb-3">No-show</PanelEyebrow>
        <p className="text-sm text-white/55 mb-3">
          Após 2h do horário de check-in sem aparecer, sistema marca como no-show. Cliente recebe email + WhatsApp e perde 50% do valor.
        </p>
        <Toggle on label="Cobrar 50% em caso de no-show" />
      </PanelCard>
    </>
  );
}

function IntegracoesSection() {
  return (
    <PanelCard className="p-0 overflow-hidden">
      <div className="px-5 py-4 border-b border-white/10">
        <PanelEyebrow>Integrações ativas</PanelEyebrow>
        <div className="font-semibold mt-0.5">{INTEGRACOES.filter(i => i.status === "connected").length} conectadas · {INTEGRACOES.filter(i => i.status === "available").length} disponíveis</div>
      </div>
      <div className="divide-y divide-white/5">
        {INTEGRACOES.map((i) => (
          <div key={i.name} className="p-4 flex items-center gap-4 hover:bg-white/[0.02]">
            <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <Plug className="h-4 w-4 text-white/65" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium">{i.name}</div>
              <div className="text-[11px] text-white/55">{i.desc}</div>
            </div>
            {i.status === "connected" ? (
              <Badge variant="success" size="sm" dot>Conectada</Badge>
            ) : (
              <button className="h-8 px-3 rounded-md border border-mp-red text-mp-red text-xs font-medium hover:bg-mp-red-15">
                Conectar
              </button>
            )}
          </div>
        ))}
      </div>
    </PanelCard>
  );
}

function NotificacoesSection() {
  return (
    <PanelCard>
      <PanelEyebrow className="mb-4">Quando notificar a equipe</PanelEyebrow>
      <div className="space-y-2">
        <NotifRow label="Nova reserva" desc="Email + push pra responsável de plantão" on />
        <NotifRow label="Cancelamento" desc="Email pro gerente" on />
        <NotifRow label="Review com nota baixa (≤3)" desc="WhatsApp imediato pro gerente" on />
        <NotifRow label="Lotação 80%" desc="WhatsApp pro gerente" on />
        <NotifRow label="Vagas zeradas" desc="Push pra todos" />
        <NotifRow label="Falha de pagamento" desc="Email + push" on />
        <NotifRow label="Repasse processado" desc="Email pro financeiro" on />
      </div>
    </PanelCard>
  );
}

// ====================================================================
function Field({
  label,
  value,
  full,
  mono,
}: {
  label: string;
  value: string;
  full?: boolean;
  mono?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/45 mb-1.5 block">
        {label}
      </label>
      <input
        defaultValue={value}
        className={cn(
          "w-full px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-sm focus:outline-none focus:border-mp-red",
          mono && "font-mono text-xs"
        )}
      />
    </div>
  );
}

function ToggleChip({ label, on }: { label: string; on?: boolean }) {
  return (
    <button
      className={cn(
        "px-3 py-2 rounded-lg text-sm font-medium border transition-colors",
        on
          ? "bg-mp-red border-mp-red text-white"
          : "border-white/15 text-white/65 hover:text-white"
      )}
    >
      {label}
    </button>
  );
}

function Toggle({ on, label }: { on?: boolean; label?: string }) {
  return (
    <div className={`flex items-center gap-3 ${label ? "" : "inline-flex"}`}>
      {label && <span className="text-sm flex-1">{label}</span>}
      <div
        className={cn(
          "h-6 w-10 rounded-full p-0.5 transition-colors",
          on ? "bg-mp-red" : "bg-white/15"
        )}
      >
        <div
          className={cn(
            "h-5 w-5 bg-white rounded-full transition-transform",
            on && "translate-x-4"
          )}
        />
      </div>
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const map: Record<string, string> = {
    owner: "bg-mp-red text-white",
    admin: "bg-mp-warning-15 text-mp-warning",
    member: "bg-white/10 text-white/65",
  };
  const labels: Record<string, string> = {
    owner: "Owner",
    admin: "Admin",
    member: "Membro",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${map[role]}`}
    >
      {labels[role]}
    </span>
  );
}

function PolicyOption({
  label,
  desc,
  active,
}: {
  label: string;
  desc: string;
  active?: boolean;
}) {
  return (
    <button
      className={cn(
        "w-full text-left p-3 rounded-xl border-2 transition-all",
        active
          ? "border-mp-red bg-mp-red-15"
          : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
      )}
    >
      <div className="flex items-center gap-2 mb-0.5">
        <div
          className={cn(
            "h-4 w-4 rounded-full border-2 flex items-center justify-center",
            active ? "border-mp-red" : "border-white/30"
          )}
        >
          {active && <div className="h-1.5 w-1.5 rounded-full bg-mp-red" />}
        </div>
        <span className="font-medium">{label}</span>
      </div>
      <div className="ml-6 text-[11px] text-white/55">{desc}</div>
    </button>
  );
}

function NotifRow({
  label,
  desc,
  on,
}: {
  label: string;
  desc: string;
  on?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-white/10 hover:bg-white/[0.02]">
      <Bell className="h-4 w-4 text-white/55 mt-0.5 shrink-0" />
      <div className="flex-1">
        <div className="font-medium text-sm">{label}</div>
        <div className="text-[11px] text-white/55">{desc}</div>
      </div>
      <Toggle on={on} />
    </div>
  );
}
