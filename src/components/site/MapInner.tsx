"use client";

import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import type { Unit } from "@/lib/data/units";

/**
 * Marker customizado MultiPark — pin vermelho com preço.
 * Usa divIcon (HTML) ao invés de imagem, pra não precisar lidar com sprites.
 */
function priceIcon(price: number) {
  return L.divIcon({
    className: "mp-pin",
    html: `
      <div style="position: relative; transform: translate(-50%, -100%);">
        <div style="
          background: #E11D2E;
          color: white;
          font-family: Inter, system-ui, sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 999px;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0,0,0,0.18);
          line-height: 1;
        ">R$ ${price}</div>
        <div style="
          position: absolute;
          left: 50%;
          top: 100%;
          transform: translate(-50%, 2px);
          width: 8px;
          height: 8px;
          background: #E11D2E;
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(225,29,46,0.18);
        "></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}

type Props = {
  units: Unit[];
  center?: [number, number];
  zoom?: number;
  interactive?: boolean;
};

export default function MapInner({
  units,
  center,
  zoom = 11,
  interactive = true,
}: Props) {
  // Calcula centro automaticamente se não vier
  const autoCenter: [number, number] =
    center ??
    (units.length > 0
      ? [
          units.reduce((s, u) => s + u.geo.lat, 0) / units.length,
          units.reduce((s, u) => s + u.geo.lng, 0) / units.length,
        ]
      : [-23.5505, -46.6333]); // São Paulo default

  return (
    <MapContainer
      center={autoCenter}
      zoom={zoom}
      scrollWheelZoom={interactive}
      dragging={interactive}
      doubleClickZoom={interactive}
      zoomControl={false}
      style={{ width: "100%", height: "100%" }}
      className="rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        maxZoom={19}
      />
      {interactive && <ZoomControl position="bottomright" />}

      {units.map((u) => (
        <Marker
          key={u.id}
          position={[u.geo.lat, u.geo.lng]}
          icon={priceIcon(u.prices.avulso.promo)}
        >
          <Popup>
            <div style={{ minWidth: 200 }}>
              <div
                style={{
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#6B6B6B",
                  marginBottom: 4,
                }}
              >
                {u.airport ? `${u.airport} · Aeroporto` : u.region}
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#0A0A0A",
                  marginBottom: 4,
                }}
              >
                {u.name}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6B6B6B",
                  marginBottom: 8,
                }}
              >
                {u.distance
                  ? `${u.distance.km} km · ${u.distance.minutes} min até ${u.distance.to}`
                  : `${u.city}, ${u.state}`}
                {" · ★ "}
                {u.rating}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 6,
                  marginBottom: 10,
                }}
              >
                <span
                  style={{
                    color: "#9A9A9A",
                    textDecoration: "line-through",
                    fontSize: "11px",
                  }}
                >
                  R$ {u.prices.avulso.full}
                </span>
                <span
                  style={{
                    color: "#E11D2E",
                    fontSize: "18px",
                    fontWeight: 700,
                  }}
                >
                  R$ {u.prices.avulso.promo}
                </span>
                <span style={{ color: "#6B6B6B", fontSize: "11px" }}>/dia</span>
              </div>
              <Link
                href={`/unidades/${u.slug}`}
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#E11D2E",
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Ver unidade
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
