"use client";

import { Button } from "@/components/ui/Button";
import { ExternalLink } from "lucide-react";
import { UnitsMap } from "@/components/site/UnitsMap";
import type { Unit } from "@/lib/data/units";

export function UnitMapMini({
  geo,
  distance,
  unit,
}: {
  geo: { lat: number; lng: number };
  distance?: { km: number; minutes: number; to: string };
  unit?: Unit;
}) {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${geo.lat},${geo.lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${geo.lat},${geo.lng}&navigate=yes`;

  return (
    <div className="relative h-[280px] md:h-[320px] rounded-2xl overflow-hidden border border-[var(--color-mp-line)] bg-[var(--color-mp-cream)]">
      {/* Mapa real (Leaflet + OSM) */}
      {unit ? (
        <UnitsMap units={[unit]} center={[geo.lat, geo.lng]} zoom={15} />
      ) : null}

      {/* Bottom info — sobrepõe o mapa */}
      <div className="absolute left-3 bottom-3 right-3 z-[400] flex items-center justify-between gap-2 pointer-events-none">
        {distance && (
          <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm text-xs pointer-events-auto">
            <span className="font-semibold">
              {distance.km} km · {distance.minutes} min
            </span>{" "}
            <span className="text-[var(--color-mp-text-soft)]">até {distance.to}</span>
          </div>
        )}
        <div className="flex gap-2 pointer-events-auto ml-auto">
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
