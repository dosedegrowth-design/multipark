"use client";

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";

type Pin = {
  city: string;
  cityName: string;
  lat: number;
  lng: number;
  type: "red" | "warning" | "success";
  units: number;
};

export const BRAZIL_PINS: Pin[] = [
  { city: "GRU", cityName: "Guarulhos", lat: -23.4356, lng: -46.4734, type: "red", units: 12 },
  { city: "CGH", cityName: "São Paulo · Congonhas", lat: -23.6273, lng: -46.6553, type: "red", units: 3 },
  { city: "VCP", cityName: "Campinas · Viracopos", lat: -23.0067, lng: -47.1345, type: "red", units: 5 },
  { city: "CNF", cityName: "Belo Horizonte · Confins", lat: -19.6336, lng: -43.9686, type: "red", units: 2 },
  { city: "RJ", cityName: "Rio de Janeiro", lat: -22.9068, lng: -43.1729, type: "warning", units: 8 },
  { city: "BH", cityName: "Belo Horizonte", lat: -19.9167, lng: -43.9345, type: "red", units: 4 },
  { city: "POA", cityName: "Porto Alegre", lat: -30.0346, lng: -51.2177, type: "warning", units: 3 },
  { city: "REC", cityName: "Recife", lat: -8.0476, lng: -34.8770, type: "success", units: 2 },
  { city: "SSA", cityName: "Salvador", lat: -12.9714, lng: -38.5014, type: "warning", units: 2 },
  { city: "FOR", cityName: "Fortaleza", lat: -3.7172, lng: -38.5433, type: "warning", units: 1 },
  { city: "CWB", cityName: "Curitiba", lat: -25.4284, lng: -49.2733, type: "red", units: 4 },
  { city: "BSB", cityName: "Brasília", lat: -15.7942, lng: -47.8825, type: "warning", units: 3 },
];

const COLORS = {
  red: "#E11D2E",
  warning: "#F59E0B",
  success: "#10B981",
};

export default function BrazilMapInner() {
  return (
    <MapContainer
      center={[-15, -52]}
      zoom={4}
      scrollWheelZoom={false}
      dragging={false}
      doubleClickZoom={false}
      zoomControl={false}
      attributionControl={false}
      style={{ width: "100%", height: "100%", background: "#1A0A0F" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
        maxZoom={10}
      />
      {BRAZIL_PINS.map((p) => (
        <CircleMarker
          key={p.city}
          center={[p.lat, p.lng]}
          radius={6}
          pathOptions={{
            color: COLORS[p.type],
            fillColor: COLORS[p.type],
            fillOpacity: 0.9,
            weight: 2,
          }}
        >
          <Tooltip direction="top" offset={[0, -8]} opacity={1} permanent={false}>
            <div style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
              <div style={{ fontWeight: 600 }}>{p.cityName}</div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>
                {p.units} unidade{p.units > 1 ? "s" : ""}
              </div>
            </div>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
