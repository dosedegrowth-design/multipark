"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Unit } from "@/lib/data/units";

export function InlineReserve({ unit }: { unit: Unit }) {
  const [days, setDays] = useState(7);
  const dailyPromo = unit.prices.avulso.promo;
  const total = days * dailyPromo;

  return (
    <div className="border-2 border-[var(--color-mp-line)] rounded-2xl bg-white p-5">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-mp-text-soft)] mb-4">
        Reservar nesta unidade
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <DateBox label="Check-in" value="14 mai · 06:00" />
        <DateBox label="Check-out" value="21 mai · 22:00" />
      </div>

      <div className="bg-mp-cream-50 rounded-xl p-4 mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-[var(--color-mp-text-soft)]">{days} dias · total</div>
          <div className="text-2xl font-semibold tabular-nums">
            R$ {total.toLocaleString("pt-BR")}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-[var(--color-mp-text-soft)]">PIX antecipado</div>
          <div className="text-sm font-medium text-[var(--color-mp-success)]">
            economiza 12%
          </div>
        </div>
      </div>

      <Button size="lg" className="w-full" href="/reservar">
        Confirmar reserva
      </Button>

      <div className="mt-3 text-center text-xs text-[var(--color-mp-text-soft)]">
        Cancelamento grátis até 48h antes
      </div>
    </div>
  );
}

function DateBox({ label, value }: { label: string; value: string }) {
  return (
    <button className="flex items-start gap-2.5 p-3 rounded-xl border border-[var(--color-mp-line)] hover:border-[var(--color-mp-text)] transition-colors text-left">
      <div className="h-8 w-8 rounded-lg bg-[var(--color-mp-cream)] flex items-center justify-center shrink-0">
        <Calendar className="h-3.5 w-3.5 text-[var(--color-mp-text-soft)]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-mp-text-soft)]">
          {label}
        </div>
        <div className="text-sm font-medium truncate mt-0.5">{value}</div>
      </div>
    </button>
  );
}
