import { PainelShell } from "@/components/painel/PainelShell";
import { Badge } from "@/components/ui/Badge";
import { TrendingUp, AlertCircle, Clock, Building2 } from "lucide-react";

export const metadata = { title: "Rede · Painel Matriz" };

export default function MatrizPage() {
  return (
    <PainelShell
      variant="matriz"
      active="rede"
      pageSubtitle="Rede MultiPark · todas as unidades"
      pageTitle="238 unidades · 12,4M de receita / mês"
      badge={
        <Badge variant="success" size="lg" dot>
          Operação saudável
        </Badge>
      }
    >
      {/* Mapa */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 mb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              Cobertura nacional
            </div>
            <div className="font-semibold mt-0.5">
              SP · GRU · CGH · VCP · CNF · BH · RJ
            </div>
          </div>
          <div className="flex gap-1.5 text-[10px] font-mono uppercase tracking-wider">
            <Pill color="success">231 ativas</Pill>
            <Pill color="red">14 lotadas</Pill>
            <Pill color="warning">7 onboarding</Pill>
          </div>
        </div>

        <div className="relative h-[300px] md:h-[400px] rounded-xl bg-[--color-mp-wine-900] overflow-hidden">
          {/* mapa estilizado do Brasil */}
          <BrazilMap />

          {/* legend */}
          <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md rounded-lg p-3 text-xs space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[--color-mp-red]" />
              <span className="text-white/80">Próprias</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[--color-mp-warning]" />
              <span className="text-white/80">Parceiras</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[--color-mp-success]" />
              <span className="text-white/80">Onboarding</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <BigKPI label="Receita · mês" value="R$ 12,4M" trend="+18% vs MoM" />
        <BigKPI label="Reservas · mês" value="62.4k" trend="+12% vs MoM" />
        <BigKPI label="Ticket médio" value="R$ 198" trend="+R$ 14" />
        <BigKPI label="NPS rede" value="78" trend="+6 pts" />
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-3">
        {/* Ranking */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                Ranking
              </div>
              <div className="font-semibold mt-0.5">Unidades top 5 · receita</div>
            </div>
            <Badge variant="ghost" size="sm" className="bg-white/5 text-white/65">
              Mês corrente
            </Badge>
          </div>

          <div className="space-y-2">
            {[
              { rank: 1, name: "Multipark Cumbica", city: "Guarulhos", revenue: 1280000, share: 100 },
              { rank: 2, name: "Multipark Premium GRU", city: "Guarulhos", revenue: 945000, share: 74 },
              { rank: 3, name: "Multipark Viracopos", city: "Campinas", revenue: 720000, share: 56 },
              { rank: 4, name: "Multipark Confins", city: "Lagoa Santa", revenue: 510000, share: 40 },
              { rank: 5, name: "Multipark Cargo", city: "Guarulhos", revenue: 430000, share: 34 },
            ].map((u) => (
              <div
                key={u.rank}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center font-mono text-xs text-white/65 shrink-0">
                  {u.rank.toString().padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{u.name}</div>
                  <div className="text-[11px] text-white/45">{u.city}</div>
                </div>
                <div className="hidden md:block w-32">
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[--color-mp-red]"
                      style={{ width: `${u.share}%` }}
                    />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-semibold tabular-nums">
                    R$ {(u.revenue / 1000).toFixed(0)}k
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 mb-3">
            Alertas operacionais
          </div>
          <div className="space-y-2.5">
            <Alert
              icon={AlertCircle}
              title="14 unidades lotadas"
              desc="Pico de demanda · feriado em 5 dias"
              variant="red"
            />
            <Alert
              icon={Clock}
              title="3 franqueados em onboarding"
              desc="Aguardando aprovação de fotos"
              variant="warning"
            />
            <Alert
              icon={Building2}
              title="Nova unidade no ar"
              desc="Multipark Recife · publicada 2h atrás"
              variant="success"
            />
            <Alert
              icon={TrendingUp}
              title="Receita +18% MoM"
              desc="Maior crescimento dos últimos 6 meses"
              variant="success"
            />
          </div>
        </div>
      </div>
    </PainelShell>
  );
}

function Pill({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "success" | "red" | "warning";
}) {
  const colors = {
    success: "bg-[--color-mp-success]/20 text-[--color-mp-success]",
    red: "bg-[--color-mp-red]/20 text-[--color-mp-red]",
    warning: "bg-[--color-mp-warning]/20 text-[--color-mp-warning]",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full ${colors[color]}`}>{children}</span>
  );
}

function BigKPI({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 mb-2">
        {label}
      </div>
      <div className="text-3xl font-semibold tabular-nums">{value}</div>
      <div className="mt-1 flex items-center gap-1 text-xs text-[--color-mp-success]">
        <TrendingUp className="h-3 w-3" />
        {trend}
      </div>
    </div>
  );
}

function Alert({
  icon: Icon,
  title,
  desc,
  variant,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  variant: "red" | "warning" | "success";
}) {
  const variants = {
    red: "bg-[--color-mp-red]/10 text-[--color-mp-red]",
    warning: "bg-[--color-mp-warning]/15 text-[--color-mp-warning]",
    success: "bg-[--color-mp-success]/15 text-[--color-mp-success]",
  };
  return (
    <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors">
      <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${variants[variant]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="font-medium text-sm">{title}</div>
        <div className="text-[11px] text-white/55 mt-0.5">{desc}</div>
      </div>
    </div>
  );
}

function BrazilMap() {
  // pinos com posições aproximadas
  const pins = [
    { city: "GRU", x: 56, y: 65, type: "red" },
    { city: "CGH", x: 55, y: 67, type: "red" },
    { city: "VCP", x: 52, y: 64, type: "red" },
    { city: "CNF", x: 60, y: 56, type: "red" },
    { city: "RJ", x: 62, y: 67, type: "warning" },
    { city: "BH", x: 60, y: 58, type: "red" },
    { city: "POA", x: 50, y: 82, type: "warning" },
    { city: "REC", x: 75, y: 35, type: "success" },
    { city: "SSA", x: 71, y: 47, type: "warning" },
    { city: "FOR", x: 73, y: 28, type: "warning" },
    { city: "CWB", x: 53, y: 75, type: "red" },
    { city: "BSB", x: 53, y: 50, type: "warning" },
  ];

  return (
    <div className="absolute inset-0">
      {/* SVG do Brasil simplificado */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(225,29,46,0.15)" />
            <stop offset="100%" stopColor="rgba(225,29,46,0)" />
          </radialGradient>
        </defs>
        {/* shape simplificado */}
        <path
          d="M 35 30 L 50 25 L 65 22 L 75 30 L 80 45 L 75 60 L 70 75 L 60 85 L 50 88 L 42 80 L 35 70 L 30 55 L 28 40 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.3"
        />
        <circle cx="55" cy="60" r="30" fill="url(#glow)" />
      </svg>

      {/* Pins */}
      {pins.map((p) => (
        <div
          key={p.city}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <div
            className={`h-2.5 w-2.5 rounded-full animate-pulse-dot ${
              p.type === "red"
                ? "bg-[--color-mp-red] ring-4 ring-[--color-mp-red]/20"
                : p.type === "warning"
                ? "bg-[--color-mp-warning] ring-4 ring-[--color-mp-warning]/20"
                : "bg-[--color-mp-success] ring-4 ring-[--color-mp-success]/20"
            }`}
          />
          <div className="absolute top-3.5 left-1/2 -translate-x-1/2 font-mono text-[8px] text-white/65 whitespace-nowrap pointer-events-none">
            {p.city}
          </div>
        </div>
      ))}
    </div>
  );
}
