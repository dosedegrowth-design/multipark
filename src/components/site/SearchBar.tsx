"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function SearchBar({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const [days, setDays] = useState(7);
  const dailyPrice = 65;
  const total = days * dailyPrice;

  return (
    <div
      className={cn(
        "rounded-[14px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden",
        variant === "hero" && "border border-[--color-mp-line]"
      )}
    >
      {/* row de inputs */}
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] divide-y md:divide-y-0 md:divide-x divide-[--color-mp-line]">
        <SearchField icon={MapPin} label="Origem" value="Aeroporto de Guarulhos · GRU" />
        <SearchField icon={Calendar} label="Check-in" value="14 mai · 06:00" />
        <SearchField icon={Calendar} label="Check-out" value="21 mai · 22:00" />
        <div className="p-2 md:p-3">
          <Button size="lg" className="w-full md:w-auto md:h-full md:px-7">
            Buscar vagas
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* slider preço */}
      <div className="px-5 py-4 border-t border-[--color-mp-line] bg-[--color-mp-cream]/40 flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="label-tag text-[--color-mp-text-soft]">
            Deslize os dias
          </span>
          <span className="font-mono text-[11px] text-[--color-mp-text]">
            · {days} dias
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="flex-1 mp-range"
        />
        <div className="text-right shrink-0">
          <div className="text-xs text-[--color-mp-text-soft]">
            R$ {dailyPrice}/dia
          </div>
          <div className="font-semibold text-[--color-mp-text] tabular-nums">
            total R$ {total.toLocaleString("pt-BR")}
          </div>
        </div>
      </div>

      <style jsx>{`
        .mp-range {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: linear-gradient(
            to right,
            var(--color-mp-red) 0%,
            var(--color-mp-red) ${(days / 30) * 100}%,
            var(--color-mp-line) ${(days / 30) * 100}%,
            var(--color-mp-line) 100%
          );
          border-radius: 2px;
          outline: none;
        }
        .mp-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          background: white;
          border: 3px solid var(--color-mp-red);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }
        .mp-range::-moz-range-thumb {
          height: 20px;
          width: 20px;
          background: white;
          border: 3px solid var(--color-mp-red);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}

function SearchField({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-[--color-mp-cream]/40 transition-colors group">
      <div className="h-9 w-9 rounded-lg bg-[--color-mp-cream] flex items-center justify-center shrink-0 group-hover:bg-[--color-mp-red-soft] transition-colors">
        <Icon className="h-4 w-4 text-[--color-mp-text-soft] group-hover:text-[--color-mp-red] transition-colors" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="label-tag text-[--color-mp-text-soft]">{label}</div>
        <div className="text-sm font-medium text-[--color-mp-text] truncate mt-0.5">
          {value}
        </div>
      </div>
    </div>
  );
}
