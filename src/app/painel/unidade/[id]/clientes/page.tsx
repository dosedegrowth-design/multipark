"use client";

import { useState } from "react";
import { PainelShell } from "@/components/painel/PainelShell";
import { PanelCard, PanelEyebrow, FilterChip } from "@/components/painel/PanelCard";
import { Search, MessageCircle, Mail, Phone, Star, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

const CLIENTES = [
  { name: "Mariana Silva", email: "mariana@email.com", phone: "(11) 99876-5432", reservas: 12, ticket: 432, ltv: 5184, tags: ["Frequente", "Multicliente"], lastVisit: "14 mai" },
  { name: "Pedro Vasconcelos", email: "pedro.v@gmail.com", phone: "(11) 98123-4567", reservas: 8, ticket: 298, ltv: 2384, tags: ["Frequente"], lastVisit: "12 mai" },
  { name: "Carla Mendes", email: "carla.m@empresa.com", phone: "(11) 97456-1230", reservas: 24, ticket: 489, ltv: 11736, tags: ["VIP", "Mensalista", "Multicliente"], lastVisit: "10 mai" },
  { name: "João Carvalho", email: "j.carvalho@gmail.com", phone: "(11) 96321-7890", reservas: 3, ticket: 195, ltv: 585, tags: ["Novo"], lastVisit: "5 mai" },
  { name: "Ana Beatriz", email: "ana.bea@hotmail.com", phone: "(11) 99987-6543", reservas: 6, ticket: 254, ltv: 1524, tags: ["Frequente"], lastVisit: "30 abr" },
  { name: "Roberto Lima", email: "roberto@empresa.com", phone: "(11) 95432-1098", reservas: 15, ticket: 388, ltv: 5820, tags: ["VIP", "Corporativo"], lastVisit: "28 abr" },
  { name: "Fernanda Almeida", email: "fer.almeida@gmail.com", phone: "(11) 94321-5678", reservas: 1, ticket: 343, ltv: 343, tags: ["Novo"], lastVisit: "20 abr" },
  { name: "Lucas Henrique", email: "l.henrique@gmail.com", phone: "(11) 93210-9876", reservas: 0, ticket: 0, ltv: 0, tags: ["Dormente"], lastVisit: "08 fev" },
];

const TAGS = ["Todos", "VIP", "Frequente", "Mensalista", "Multicliente", "Corporativo", "Novo", "Dormente"];

export default function ClientesPage() {
  const [active, setActive] = useState("Todos");

  const filtered =
    active === "Todos"
      ? CLIENTES
      : CLIENTES.filter((c) => c.tags.includes(active));

  return (
    <PainelShell
      variant="operador"
      active="clientes"
      pageSubtitle="Clientes · Cumbica · GRU"
      pageTitle="CRM da unidade"
      badge={
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 rounded-lg border border-white/15 text-sm">
            Exportar
          </button>
          <button className="h-9 px-3 rounded-lg bg-mp-red text-sm font-medium flex items-center gap-2">
            <MessageCircle className="h-3.5 w-3.5" />
            Disparar campanha
          </button>
        </div>
      }
    >
      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <Mini label="Total clientes" value="1.247" trend="+38 este mês" />
        <Mini label="Recorrentes" value="68%" trend="+5 pts" />
        <Mini label="Ticket médio" value="R$ 312" trend="+R$ 18" />
        <Mini label="LTV médio" value="R$ 1.842" trend="+12%" />
      </div>

      {/* Search + tags */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 px-3.5 h-10 rounded-lg bg-white/5 border border-white/10">
          <Search className="h-4 w-4 text-white/40" />
          <input
            placeholder="Buscar nome, email ou telefone..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/40"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
          {TAGS.map((t) => (
            <FilterChip
              key={t}
              active={active === t}
              onClick={() => setActive(t)}
            >
              {t}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Lista */}
      <PanelCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.02] text-left text-[10px] font-mono uppercase tracking-[0.15em] text-white/45">
                <th className="py-3 px-4 font-medium">Cliente</th>
                <th className="py-3 px-4 font-medium">Reservas</th>
                <th className="py-3 px-4 font-medium">Ticket médio</th>
                <th className="py-3 px-4 font-medium">LTV</th>
                <th className="py-3 px-4 font-medium">Tags</th>
                <th className="py-3 px-4 font-medium">Última visita</th>
                <th className="py-3 px-4 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((c) => (
                <tr key={c.email} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-mp-red flex items-center justify-center font-semibold text-sm shrink-0">
                        {c.name[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate">{c.name}</div>
                        <div className="text-[11px] text-white/45 truncate">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 tabular-nums">{c.reservas}</td>
                  <td className="py-3 px-4 tabular-nums">R$ {c.ticket}</td>
                  <td className="py-3 px-4 font-semibold tabular-nums">
                    R$ {c.ltv.toLocaleString("pt-BR")}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {c.tags.map((t) => (
                        <TagChip key={t} tag={t} />
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white/65">{c.lastVisit}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <ActionBtn Icon={MessageCircle} label="WhatsApp" />
                      <ActionBtn Icon={Mail} label="Email" />
                      <ActionBtn Icon={Phone} label="Ligar" />
                      <button className="h-7 w-7 rounded-md hover:bg-white/10 flex items-center justify-center">
                        <MoreHorizontal className="h-4 w-4 text-white/50" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelCard>
    </PainelShell>
  );
}

function Mini({ label, value, trend }: { label: string; value: string; trend?: string }) {
  return (
    <PanelCard className="p-4">
      <PanelEyebrow className="mb-1.5">{label}</PanelEyebrow>
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
      {trend && <div className="mt-1 text-[11px] text-mp-success">{trend}</div>}
    </PanelCard>
  );
}

function TagChip({ tag }: { tag: string }) {
  const map: Record<string, string> = {
    VIP: "bg-mp-warning-15 text-mp-warning",
    Frequente: "bg-mp-success-15 text-mp-success",
    Multicliente: "bg-mp-red-15 text-mp-red",
    Mensalista: "bg-white/10 text-white",
    Corporativo: "bg-white/10 text-white",
    Novo: "bg-white/5 text-white/65 border border-white/15",
    Dormente: "bg-white/5 text-white/45 border border-white/10",
  };
  return (
    <span
      className={cn(
        "px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider",
        map[tag] || "bg-white/5 text-white/65"
      )}
    >
      {tag}
    </span>
  );
}

function ActionBtn({
  Icon,
  label,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      title={label}
      className="h-7 w-7 rounded-md hover:bg-white/10 flex items-center justify-center"
    >
      <Icon className="h-3.5 w-3.5 text-white/55" />
    </button>
  );
}
