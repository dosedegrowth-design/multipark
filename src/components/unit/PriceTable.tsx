"use client";

import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { Unit } from "@/lib/data/units";

export function PriceTable({ unit }: { unit: Unit }) {
  const rows = [
    { label: "Avulso · 1 dia", full: unit.prices.avulso.full, promo: unit.prices.avulso.promo },
    { label: "3 dias", full: unit.prices.pkg3.full, promo: unit.prices.pkg3.promo },
    { label: "7 dias", full: unit.prices.pkg7.full, promo: unit.prices.pkg7.promo, popular: true },
    { label: "15 dias", full: unit.prices.pkg15.full, promo: unit.prices.pkg15.promo },
  ];

  return (
    <div className="border border-[var(--color-mp-line)] rounded-2xl overflow-hidden bg-white">
      <div className="px-5 py-3.5 border-b border-[var(--color-mp-line)] flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-mp-text-soft)]">
          Tabela de preços · até 28/mai
        </span>
        <Badge variant="redSoft" size="sm">
          Promoção
        </Badge>
      </div>
      <div className="divide-y divide-[var(--color-mp-line)]">
        {rows.map((r) => (
          <div
            key={r.label}
            className={cn(
              "flex items-center justify-between px-5 py-3.5",
              r.popular && "bg-mp-red-soft"
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{r.label}</span>
              {r.popular && (
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase bg-[var(--color-mp-red)] text-white px-1.5 py-0.5 rounded">
                  ★ Popular
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-[var(--color-mp-text-muted)] line-through tabular-nums">
                R$ {r.full}
              </span>
              <span
                className={cn(
                  "font-semibold tabular-nums",
                  r.popular
                    ? "text-[var(--color-mp-red)] text-lg"
                    : "text-[var(--color-mp-text)]"
                )}
              >
                R$ {r.promo}
              </span>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between px-5 py-3.5 bg-mp-cream-50">
          <span className="text-sm font-medium">Mensalista</span>
          <span className="font-semibold tabular-nums">
            R$ {unit.prices.mensalista}
            <span className="text-xs text-[var(--color-mp-text-soft)] font-normal">
              /mês
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
