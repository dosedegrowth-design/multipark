"use client";

import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import Link from "next/link";
import type { Unit } from "@/lib/data/units";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

/**
 * Marker MultiPark — pino circular vermelho com preço.
 * Anchored center-bottom (a pontinha aponta pro local exato).
 */
function priceIcon(price: number) {
  return L.divIcon({
    className: "mp-pin-wrapper",
    html: `
      <div class="mp-pin">
        <div class="mp-pin-bubble">R$ ${price}</div>
        <div class="mp-pin-tail"></div>
      </div>
    `,
    iconSize: [60, 36],
    iconAnchor: [30, 36],
    popupAnchor: [0, -36],
  });
}

/**
 * Cluster icon — círculo vermelho com count
 */
function clusterIcon(count: number) {
  const size = count < 5 ? 38 : count < 10 ? 44 : 52;
  return L.divIcon({
    className: "mp-cluster",
    html: `
      <div class="mp-cluster-inner" style="width:${size}px;height:${size}px;line-height:${size}px;">
        ${count}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

type Props = {
  units: Unit[];
  center?: [number, number];
  zoom?: number;
  interactive?: boolean;
};

/**
 * Componente que adiciona os markers num cluster e dispara fitBounds.
 */
function ClusterLayer({ units }: { units: Unit[] }) {
  const map = useMap();

  useEffect(() => {
    if (units.length === 0) return;

    // Criar cluster group via plugin
    const cluster = (L as unknown as {
      markerClusterGroup: (opts: Record<string, unknown>) => L.LayerGroup;
    }).markerClusterGroup({
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      disableClusteringAtZoom: 14,
      maxClusterRadius: 50,
      iconCreateFunction: (c: { getChildCount: () => number }) =>
        clusterIcon(c.getChildCount()),
    });

    units.forEach((u) => {
      const marker = L.marker([u.geo.lat, u.geo.lng], {
        icon: priceIcon(u.prices.avulso.promo),
      });

      const popupHTML = `
        <div style="min-width:220px;font-family:Inter,system-ui,sans-serif;">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.12em;color:#6B6B6B;margin-bottom:4px;">
            ${u.airport ? u.airport + " · Aeroporto" : u.region}
          </div>
          <div style="font-weight:600;font-size:15px;color:#0A0A0A;margin-bottom:4px;">
            ${u.name}
          </div>
          <div style="font-size:12px;color:#6B6B6B;margin-bottom:8px;">
            ${
              u.distance
                ? `${u.distance.km} km · ${u.distance.minutes} min até ${u.distance.to}`
                : `${u.city}, ${u.state}`
            } · ★ ${u.rating}
          </div>
          <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:10px;">
            <span style="color:#9A9A9A;text-decoration:line-through;font-size:11px;">R$ ${u.prices.avulso.full}</span>
            <span style="color:#E11D2E;font-size:18px;font-weight:700;">R$ ${u.prices.avulso.promo}</span>
            <span style="color:#6B6B6B;font-size:11px;">/dia</span>
          </div>
          <a href="/unidades/${u.slug}" style="display:block;text-align:center;background:#E11D2E;color:white;padding:8px 14px;border-radius:8px;font-size:13px;font-weight:600;text-decoration:none;">
            Ver unidade →
          </a>
        </div>
      `;
      marker.bindPopup(popupHTML);
      cluster.addLayer(marker);
    });

    map.addLayer(cluster);

    // Auto-fit pra todas as unidades caberem
    if (units.length > 1) {
      const bounds = L.latLngBounds(units.map((u) => [u.geo.lat, u.geo.lng]));
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }

    return () => {
      map.removeLayer(cluster);
    };
  }, [map, units]);

  return null;
}

export default function MapInner({
  units,
  center,
  zoom = 11,
  interactive = true,
}: Props) {
  const autoCenter: [number, number] =
    center ??
    (units.length > 0
      ? [
          units.reduce((s, u) => s + u.geo.lat, 0) / units.length,
          units.reduce((s, u) => s + u.geo.lng, 0) / units.length,
        ]
      : [-23.5505, -46.6333]);

  // Single unit: usa Marker + Popup direto (sem cluster)
  if (units.length === 1) {
    const u = units[0];
    return (
      <MapContainer
        center={[u.geo.lat, u.geo.lng]}
        zoom={zoom}
        scrollWheelZoom={interactive}
        dragging={interactive}
        doubleClickZoom={interactive}
        zoomControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />
        {interactive && <ZoomControl position="bottomright" />}
        <Marker
          position={[u.geo.lat, u.geo.lng]}
          icon={priceIcon(u.prices.avulso.promo)}
        >
          <Popup>
            <div style={{ minWidth: 200, fontFamily: "Inter,system-ui,sans-serif" }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: "#0A0A0A" }}>
                {u.name}
              </div>
              <div style={{ fontSize: 12, color: "#6B6B6B", marginTop: 4 }}>
                {u.address}
              </div>
              <Link
                href={`/unidades/${u.slug}`}
                style={{
                  display: "block",
                  marginTop: 10,
                  textAlign: "center",
                  background: "#E11D2E",
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Ver unidade →
              </Link>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    );
  }

  return (
    <MapContainer
      center={autoCenter}
      zoom={zoom}
      scrollWheelZoom={interactive}
      dragging={interactive}
      doubleClickZoom={interactive}
      zoomControl={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        maxZoom={19}
      />
      {interactive && <ZoomControl position="bottomright" />}
      <ClusterLayer units={units} />
    </MapContainer>
  );
}
