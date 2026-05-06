"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { ImageIcon } from "lucide-react";

export function UnitGallery({ count = 12 }: { count?: number }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-3 gap-2 h-[420px]">
      {/* Big */}
      <div className="col-span-2 row-span-2 relative bg-[var(--color-mp-ink)] rounded-2xl overflow-hidden group cursor-pointer">
        <PhotoTile featured />
        <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-md font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mp-text)]">
          Fachada
        </div>
      </div>

      {/* Small grid */}
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          onClick={() => setActive(i)}
          className={cn(
            "relative bg-[var(--color-mp-ink)] rounded-xl overflow-hidden cursor-pointer ring-2 ring-transparent hover:ring-[var(--color-mp-red)] transition-all",
            i === 4 && "flex items-center justify-center"
          )}
        >
          {i < 4 ? (
            <PhotoTile variant={i} />
          ) : (
            <>
              <PhotoTile variant={i} />
              <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] flex flex-col items-center justify-center text-white">
                <ImageIcon className="h-5 w-5 mb-1" />
                <span className="font-medium text-sm">+{count - 4} fotos</span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function PhotoTile({ variant = 0, featured = false }: { variant?: number; featured?: boolean }) {
  const palettes = [
    "from-[#1A0A0F] via-[#3D0A12] to-[#1A0A0F]",
    "from-[#0A0A0A] via-[#1F1F1F] to-[#0A0A0A]",
    "from-[#3D0A12] via-[#1A0A0F] to-[#0A0A0A]",
    "from-[#1A1A1A] via-[#2A0D14] to-[#0A0A0A]",
    "from-[#0A0A0A] via-[#3D0A12] to-[#1A0A0F]",
  ];
  return (
    <div
      className={cn(
        "absolute inset-0 bg-gradient-to-br",
        palettes[variant % palettes.length]
      )}
    >
      {/* fake car silhouette */}
      <svg
        className={cn(
          "absolute opacity-15 text-[var(--color-mp-red)]",
          featured
            ? "bottom-8 right-8 h-32 w-32"
            : "bottom-2 right-2 h-12 w-12"
        )}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M6.5 11h11l-1.45-4.34A2 2 0 0 0 14.16 5H9.84a2 2 0 0 0-1.9 1.66L6.5 11zm12 1H5.5a2.5 2.5 0 0 0-2.5 2.5v3a1 1 0 0 0 1 1h1.05a3 3 0 0 0 5.9 0h2.1a3 3 0 0 0 5.9 0H20a1 1 0 0 0 1-1v-3a2.5 2.5 0 0 0-2.5-2.5z" />
      </svg>
      {/* parking lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-1/2 h-px w-8 bg-white" />
        <div className="absolute left-1/2 top-1/2 h-px w-8 bg-white" />
      </div>
    </div>
  );
}
