"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const Inner = dynamic(() => import("./BrazilMapInner"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-mp-wine-900)]">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
        Carregando mapa…
      </span>
    </div>
  ),
});

export function BrazilMap() {
  return (
    <div className="absolute inset-0">
      <Inner />
    </div>
  );
}
