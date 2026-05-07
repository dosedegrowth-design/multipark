"use client";

import { PainelShell } from "@/components/painel/PainelShell";
import { PanelCard, FilterChip, PanelEyebrow } from "@/components/painel/PanelCard";
import { Badge } from "@/components/ui/Badge";
import {
  Search,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

const RESERVAS = [
  { id: "MP-2026-A8F3K", plate: "ABC1D23", car: "Honda Civic 2024", color: "Preto", customer: "Mariana Silva", phone: "(11) 99876-5432", checkin: "14 mai · 06:00", checkout: "21 mai · 22:00", days: 7, total: 343, paid: "PIX", status: "confirmada" },
  { id: "MP-2026-RFK2H", plate: "RFK2H88", car: "Toyota Corolla 2023", color: "Prata", customer: "Pedro Vasconcelos", phone: "(11) 98123-4567", checkin: "14 mai · 07:30", checkout: "17 mai · 18:00", days: 3, total: 195, paid: "Cartão · 3x", status: "confirmada" },
  { id: "MP-2026-GHX5T", plate: "GHX5T11", car: "VW Golf 2022", color: "Branco", customer: "Carla Mendes", phone: "(11) 97456-1230", checkin: "14 mai · 09:00", checkout: "28 mai · 14:00", days: 14, total: 649, paid: "PIX", status: "pendente" },
  { id: "MP-2026-QWE34", plate: "QWE3R45", car: "Hyundai HB20 2024", color: "Vermelho", customer: "João Carvalho", phone: "(11) 96321-7890", checkin: "14 mai · 11:15", checkout: "19 mai · 08:00", days: 5, total: 285, paid: "Pré-reserva", status: "confirmada" },
  { id: "MP-2026-LKM77", plate: "LKM7821", car: "Honda HR-V 2023", color: "Cinza", customer: "Ana Beatriz", phone: "(11) 99987-6543", checkin: "13 mai · 22:00", checkout: "16 mai · 12:00", days: 3, total: 195, paid: "PIX", status: "no-show" },
  { id: "MP-2026-XYZ91", plate: "XYZ9123", car: "Jeep Compass 2024", color: "Preto", customer: "Roberto Lima", phone: "(11) 95432-1098", checkin: "12 mai · 14:00", checkout: "15 mai · 14:00", days: 3, total: 195, paid: "PIX", status: "finalizada" },
  { id: "MP-2026-FFA22", plate: "FFA2208", car: "Fiat Pulse 2024", color: "Azul", customer: "Fernanda Almeida", phone: "(11) 94321-5678", checkin: "10 mai · 06:00", checkout: "17 mai · 22:00", days: 7, total: 343, paid: "Cartão · 6x", status: "cancelada" },
];

const FILTERS = [
  { id: "all", label: "Todas", count: RESERVAS.length },
  { id: "confirmada", label: "Confirmadas", count: 4 },
  { id: "pendente", label: "Pendentes", count: 1 },
  { id: "finalizada", label: "Finalizadas", count: 1 },
  { id: "no-show", label: "No-show", count: 1 },
  { id: "cancelada", label: "Canceladas", count: 1 },
];

export default function ReservasPage() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? RESERVAS : RESERVAS.filter((r) => r.status === active);

  return (
    <PainelShell
      variant="operador"
      active="reservas"
      pageSubtitle="Reservas · Cumbica · GRU"
      pageTitle="Todas as reservas"
      badge={
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 rounded-lg border border-white/15 text-sm flex items-center gap-2 hover:bg-white/5">
            <Download className="h-3.5 w-3.5" />
            Exportar CSV
          </button>
          <button className="h-9 px-3 rounded-lg bg-mp-red text-sm font-medium flex items-center gap-2">
            Nova reserva
          </button>
        </div>
      }
    >
      {/* Search + filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 px-3.5 h-10 rounded-lg bg-white/5 border border-white/10">
          <Search className="h-4 w-4 text-white/40" />
          <input
            placeholder="Buscar por placa, código, cliente..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-white/40"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {FILTERS.map((f) => (
            <FilterChip
              key={f.id}
              active={active === f.id}
              onClick={() => setActive(f.id)}
            >
              {f.label} <span className="opacity-50">{f.count}</span>
            </FilterChip>
          ))}
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <Mini label="Confirmadas hoje" value="47" />
        <Mini label="Receita do dia" value="R$ 5.842" />
        <Mini label="No-show 7d" value="2,3%" />
        <Mini label="Cancelamento 7d" value="1,1%" />
      </div>

      {/* Table */}
      <PanelCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-white/[0.02] text-left text-[10px] font-mono uppercase tracking-[0.15em] text-white/45">
                <th className="py-3 px-4 font-medium">Reserva</th>
                <th className="py-3 px-4 font-medium">Cliente</th>
                <th className="py-3 px-4 font-medium">Veículo</th>
                <th className="py-3 px-4 font-medium">Check-in</th>
                <th className="py-3 px-4 font-medium">Dias</th>
                <th className="py-3 px-4 font-medium">Total</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-xs text-white/85">{r.id}</div>
                    <div className="text-[11px] text-white/40 mt-0.5">{r.paid}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium">{r.customer}</div>
                    <div className="text-[11px] text-white/45">{r.phone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-xs">{r.plate}</div>
                    <div className="text-[11px] text-white/45">
                      {r.car} · {r.color}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-white/80">{r.checkin}</td>
                  <td className="py-3.5 px-4 tabular-nums">{r.days}</td>
                  <td className="py-3.5 px-4 font-semibold tabular-nums">
                    R$ {r.total}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="py-3.5 px-4">
                    <button className="h-7 w-7 rounded-md hover:bg-white/10 flex items-center justify-center">
                      <MoreHorizontal className="h-4 w-4 text-white/50" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 text-xs text-white/55">
          <span>
            Mostrando <strong className="text-white">{filtered.length}</strong> de{" "}
            {RESERVAS.length} reservas
          </span>
          <div className="flex items-center gap-1">
            <button className="h-7 w-7 rounded-md hover:bg-white/10 flex items-center justify-center">
              <ChevronRight className="h-4 w-4 rotate-180" />
            </button>
            <span className="px-2">1 / 1</span>
            <button className="h-7 w-7 rounded-md hover:bg-white/10 flex items-center justify-center">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </PanelCard>
    </PainelShell>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <PanelCard className="p-4">
      <PanelEyebrow className="mb-1.5">{label}</PanelEyebrow>
      <div className="text-xl font-semibold tabular-nums">{value}</div>
    </PanelCard>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<
    string,
    { label: string; Icon: React.ComponentType<{ className?: string }>; className: string }
  > = {
    confirmada: { label: "Confirmada", Icon: CheckCircle2, className: "bg-mp-success-15 text-mp-success" },
    pendente: { label: "Pendente", Icon: Clock, className: "bg-mp-warning-15 text-mp-warning" },
    finalizada: { label: "Finalizada", Icon: CheckCircle2, className: "bg-white/10 text-white/70" },
    cancelada: { label: "Cancelada", Icon: XCircle, className: "bg-mp-red-15 text-mp-red" },
    "no-show": { label: "No-show", Icon: AlertCircle, className: "bg-mp-red-15 text-mp-red" },
  };
  const s = map[status] || map.pendente;
  const I = s.Icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider",
        s.className
      )}
    >
      <I className="h-3 w-3" />
      {s.label}
    </span>
  );
}
