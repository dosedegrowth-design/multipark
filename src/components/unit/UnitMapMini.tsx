"use client";

import { Button } from "@/components/ui/Button";
import { ExternalLink } from "lucide-react";

export function UnitMapMini({
  geo,
  distance,
}: {
  geo: { lat: number; lng: number };
  distance?: { km: number; minutes: number; to: string };
}) {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${geo.lat},${geo.lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${geo.lat},${geo.lng}&navigate=yes`;

  return (
    <div className="relative h-[280px] md:h-[320px] rounded-2xl overflow-hidden border border-[var(--color-mp-line)] bg-[var(--color-mp-cream)]">
      {/* Fake map */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-mp-line) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-mp-line) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="40" x2="100" y2="60" stroke="white" strokeWidth="0.6" />
          <line x1="50" y1="0" x2="40" y2="100" stroke="white" strokeWidth="0.5" />
          <line x1="0" y1="80" x2="100" y2="20" stroke="white" strokeWidth="0.4" />
        </svg>

        {/* Pin */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-[var(--color-mp-red)] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap mb-1">
            Multipark Cumbica
          </div>
          <div className="h-3 w-3 bg-[var(--color-mp-red)] rounded-full mx-auto ring-8 ring-[var(--color-mp-red)]/15" />
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute left-3 bottom-3 right-3 flex items-center justify-between gap-2">
        {distance && (
          <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm text-xs">
            <span className="font-semibold">
              {distance.km} km · {distance.minutes} min
            </span>{" "}
            <span className="text-[var(--color-mp-text-soft)]">até {distance.to}</span>
          </div>
        )}
        <div className="flex gap-2">
          <Button
            href={mapsUrl}
            variant="outline"
            size="sm"
            className="bg-white"
          >
            Maps
            <ExternalLink className="h-3 w-3" />
          </Button>
          <Button href={wazeUrl} variant="outline" size="sm" className="bg-white">
            Waze
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
