"use client";

import { useState } from "react";
import { PainelShell } from "@/components/painel/PainelShell";
import { PanelCard, PanelEyebrow } from "@/components/painel/PanelCard";
import { Badge } from "@/components/ui/Badge";
import { Car, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/cn";

export default function VagasPage() {
  const [livres, setLivres] = useState(124);
  const [status, setStatus] = useState<"aberto" | "lotado" | "fechado">("aberto");
  const total = 380;
  const ocupacao = ((total - livres) / total) * 100;

  return (
    <PainelShell
      variant="operador"
      active="vagas"
      pageSubtitle="Vagas livres · Cumbica · GRU"
      pageTitle="Controle em tempo real"
      badge={
        <Badge variant="success" size="lg" dot>
          Sincronizado · ao vivo no site público
        </Badge>
      }
    >
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-3">
        {/* Status & contador */}
        <div className="space-y-3">
          {/* Status switch */}
          <PanelCard>
            <PanelEyebrow className="mb-3">Status da unidade</PanelEyebrow>
            <div className="grid grid-cols-3 gap-2">
              <StatusButton
                active={status === "aberto"}
                onClick={() => setStatus("aberto")}
                label="Aberto"
                desc="Aceita reservas"
                color="success"
              />
              <StatusButton
                active={status === "lotado"}
                onClick={() => setStatus("lotado")}
                label="Lotado"
                desc="Sem vagas no momento"
                color="warning"
              />
              <StatusButton
                active={status === "fechado"}
                onClick={() => setStatus("fechado")}
                label="Fechado"
                desc="Manutenção / off"
                color="red"
              />
            </div>
          </PanelCard>

          {/* Contador */}
          <PanelCard>
            <PanelEyebrow className="mb-2">Vagas livres agora</PanelEyebrow>
            <div className="flex items-baseline gap-3 mb-4">
              <div className="text-6xl font-semibold tabular-nums">{livres}</div>
              <div className="text-white/55">de {total}</div>
            </div>

            {/* Barra ocupação */}
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-white/55">Ocupação atual</span>
              <span className="font-semibold tabular-nums">{ocupacao.toFixed(0)}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-6">
              <div
                className={cn(
                  "h-full transition-all",
                  ocupacao < 50
                    ? "bg-mp-success"
                    : ocupacao < 80
                    ? "bg-mp-warning"
                    : "bg-mp-red"
                )}
                style={{ width: `${ocupacao}%` }}
              />
            </div>

            {/* Slider de ajuste rápido */}
            <PanelEyebrow className="mb-2">Ajuste manual</PanelEyebrow>
            <input
              type="range"
              min={0}
              max={total}
              step={1}
              value={livres}
              onChange={(e) => setLivres(parseInt(e.target.value))}
              className="w-full mp-range-dark"
              style={{
                background: `linear-gradient(to right, var(--color-mp-red) 0%, var(--color-mp-red) ${(livres / total) * 100}%, rgba(255,255,255,0.1) ${(livres / total) * 100}%, rgba(255,255,255,0.1) 100%)`,
              }}
            />
            <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
              <span>0</span>
              <span>{total}</span>
            </div>

            {/* Quick adjust */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[-10, -5, +5, +10].map((d) => (
                <button
                  key={d}
                  onClick={() =>
                    setLivres(Math.max(0, Math.min(total, livres + d)))
                  }
                  className="h-9 rounded-lg border border-white/15 hover:bg-white/5 text-sm font-medium tabular-nums"
                >
                  {d > 0 ? `+${d}` : d}
                </button>
              ))}
            </div>
          </PanelCard>

          {/* Layout do pátio */}
          <PanelCard>
            <div className="flex items-center justify-between mb-4">
              <div>
                <PanelEyebrow>Layout do pátio</PanelEyebrow>
                <div className="font-semibold mt-0.5">
                  4 setores · {total} vagas totais
                </div>
              </div>
              <button className="text-xs font-medium text-mp-red hover:underline">
                Editar layout →
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { name: "A · Coberto", livres: 28, total: 80 },
                { name: "B · Coberto", livres: 42, total: 100 },
                { name: "C · Descoberto", livres: 35, total: 120 },
                { name: "D · Valet", livres: 19, total: 80 },
              ].map((s) => {
                const occ = ((s.total - s.livres) / s.total) * 100;
                return (
                  <div
                    key={s.name}
                    className="rounded-xl border border-white/10 p-3 bg-white/[0.02]"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/45 mb-1">
                      {s.name}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-semibold tabular-nums">
                        {s.livres}
                      </span>
                      <span className="text-[10px] text-white/40">
                        /{s.total}
                      </span>
                    </div>
                    <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={cn(
                          "h-full",
                          occ < 50
                            ? "bg-mp-success"
                            : occ < 80
                            ? "bg-mp-warning"
                            : "bg-mp-red"
                        )}
                        style={{ width: `${occ}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </PanelCard>
        </div>

        {/* Logs + automação */}
        <div className="space-y-3">
          <PanelCard>
            <PanelEyebrow className="mb-3">Histórico recente</PanelEyebrow>
            <div className="space-y-2">
              {[
                { time: "agora", action: "Vagas atualizadas", from: "120 → 124", icon: Car },
                { time: "12 min atrás", action: "Saída registrada", from: "ABC1D23", icon: Car },
                { time: "28 min atrás", action: "Entrada registrada", from: "RFK2H88", icon: Car },
                { time: "1h atrás", action: "Status alterado", from: "Aberto · 380 vagas", icon: AlertCircle },
                { time: "3h atrás", action: "Pico do dia", from: "Ocupação 89% · 14h", icon: Clock },
              ].map((l, i) => {
                const I = l.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="h-7 w-7 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                      <I className="h-3.5 w-3.5 text-white/65" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{l.action}</div>
                      <div className="text-[11px] text-white/50">{l.from}</div>
                    </div>
                    <span className="text-[10px] font-mono uppercase text-white/40 shrink-0">
                      {l.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </PanelCard>

          <PanelCard variant="red">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 mb-1">
              Automação inteligente
            </div>
            <div className="font-semibold text-lg mb-2">
              Lotação &gt; 80% bloqueia novas reservas
            </div>
            <p className="text-sm text-white/85 mb-4">
              Quando a ocupação ultrapassa o limite, o site público mostra "Lotado · entre na fila" automaticamente. Cliente entra em waitlist via WhatsApp.
            </p>
            <div className="flex items-center justify-between p-3 rounded-lg bg-black/20">
              <span className="text-sm">Bloqueio automático</span>
              <Toggle on />
            </div>
          </PanelCard>
        </div>
      </div>

    </PainelShell>
  );
}

function StatusButton({
  active,
  onClick,
  label,
  desc,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  desc: string;
  color: "success" | "warning" | "red";
}) {
  const palette = {
    success: { dot: "bg-mp-success", ring: "border-mp-success", bg: "bg-mp-success-15" },
    warning: { dot: "bg-mp-warning", ring: "border-mp-warning", bg: "bg-mp-warning-15" },
    red: { dot: "bg-mp-red", ring: "border-mp-red", bg: "bg-mp-red-15" },
  }[color];

  return (
    <button
      onClick={onClick}
      className={cn(
        "p-4 rounded-xl text-left transition-all border-2",
        active
          ? `${palette.ring} ${palette.bg}`
          : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className={cn("h-2 w-2 rounded-full", palette.dot, active && "animate-pulse-dot")} />
        <span className="font-semibold">{label}</span>
      </div>
      <div className="text-[11px] text-white/55">{desc}</div>
    </button>
  );
}

function Toggle({ on }: { on?: boolean }) {
  return (
    <div
      className={cn(
        "h-6 w-10 rounded-full p-0.5 transition-colors",
        on ? "bg-white" : "bg-black/30"
      )}
    >
      <div
        className={cn(
          "h-5 w-5 rounded-full transition-transform",
          on ? "bg-mp-red translate-x-4" : "bg-white"
        )}
      />
    </div>
  );
}
