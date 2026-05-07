"use client";

import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Star } from "lucide-react";
import { UNITS } from "@/lib/data/units";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { UnitsMap } from "./UnitsMap";

const FILTERS = [
  { id: "all", label: "Todas" },
  { id: "aeroporto", label: "Aeroporto" },
  { id: "urbano", label: "Urbano" },
  { id: "valet", label: "Valet" },
  { id: "coberto", label: "Coberto" },
  { id: "transfer", label: "Transfer 24h" },
];

export function MapSection() {
  const [active, setActive] = useState("all");

  const filtered = UNITS.filter((u) => {
    if (active === "all") return true;
    if (active === "aeroporto") return u.category === "aeroporto";
    if (active === "urbano") return u.category === "urbano";
    if (active === "valet") return u.badges.includes("VALET");
    if (active === "coberto") return u.badges.includes("COBERTO");
    if (active === "transfer") return u.badges.includes("TRANSFER 24H");
    return true;
  }).slice(0, 6);

  return (
    <section className="py-20 md:py-24 bg-[var(--color-mp-cream)]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="eyebrow mb-3">+200 unidades · todo o Brasil</div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-[var(--color-mp-ink)]">
              Encontre a unidade
              <br />
              <span className="text-[var(--color-mp-text-muted)]">mais próxima.</span>
            </h2>
          </div>
          <Link
            href="/unidades"
            className="text-sm font-medium text-[var(--color-mp-red)] hover:underline underline-offset-4"
          >
            Ver todas as unidades →
          </Link>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 -mx-1 px-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap border transition-colors shrink-0",
                active === f.id
                  ? "bg-[var(--color-mp-ink)] text-white border-[var(--color-mp-ink)]"
                  : "bg-white text-[var(--color-mp-text)] border-[var(--color-mp-line)] hover:border-[var(--color-mp-text)]"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
          {/* Map */}
          <div className="relative aspect-square lg:aspect-auto lg:min-h-[600px] rounded-2xl overflow-hidden bg-white border border-[var(--color-mp-line)]">
            <UnitsMap units={filtered} zoom={10} />
          </div>

          {/* Lista de unidades */}
          <div className="space-y-3">
            {filtered.map((u) => (
              <Link
                key={u.id}
                href={`/unidades/${u.slug}`}
                className="block bg-white border border-[var(--color-mp-line)] rounded-2xl p-4 hover:border-[var(--color-mp-text)] hover:shadow-[var(--shadow-card)] transition-all"
              >
                <div className="flex gap-4">
                  <div className="h-20 w-20 shrink-0 rounded-xl bg-[var(--color-mp-ink)] relative overflow-hidden">
                    {/* placeholder cover */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(225,29,46,0.4),transparent_60%)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="font-semibold truncate">{u.name}</div>
                      <div className="text-base font-semibold text-[var(--color-mp-red)] tabular-nums shrink-0">
                        R$ {u.prices.avulso.promo}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[var(--color-mp-text-soft)] mb-2">
                      <MapPin className="h-3 w-3" />
                      {u.distance ? `${u.distance.km} km · ${u.distance.minutes} min ${u.distance.to}` : `${u.city}, ${u.state}`}
                      <span className="mx-1">·</span>
                      <Star className="h-3 w-3 fill-[var(--color-mp-warning)] text-[var(--color-mp-warning)]" />
                      <span>{u.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {u.badges.slice(0, 3).map((b) => (
                        <Badge key={b} variant="ghost" size="sm">
                          {b}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

