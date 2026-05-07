"use client";

import dynamic from "next/dynamic";
import type { Unit } from "@/lib/data/units";
import "leaflet/dist/leaflet.css";

/**
 * UnitsMap — wrapper que carrega o mapa Leaflet apenas no client.
 * Usa OpenStreetMap (sem API key, gratuito).
 */

// Carrega o conteúdo só no client (Leaflet não funciona em SSR)
const MapInner = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-mp-cream)]">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-mp-text-soft)]">
        Carregando mapa…
      </div>
    </div>
  ),
});

type Props = {
  units: Unit[];
  /** centro inicial [lat, lng] — default centro de SP */
  center?: [number, number];
  /** zoom inicial — default 11 */
  zoom?: number;
  className?: string;
  /** mostra footer "Mapa OpenStreetMap" */
  showAttribution?: boolean;
  /** trava interação (scroll/zoom) — útil pra mapa pequeno na lateral */
  interactive?: boolean;
};

export function UnitsMap({
  units,
  center,
  zoom = 11,
  className = "absolute inset-0",
  interactive = true,
}: Props) {
  return (
    <div className={className}>
      <MapInner
        units={units}
        center={center}
        zoom={zoom}
        interactive={interactive}
      />
    </div>
  );
}
