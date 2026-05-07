"use client";

import { useState } from "react";
import { PainelShell } from "@/components/painel/PainelShell";
import { PanelCard, PanelEyebrow } from "@/components/painel/PanelCard";
import { Plus, Calendar, Percent, Zap, Trash2, Edit3 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

const TARIFAS = [
  { type: "Avulso · 1 dia", full: 79, promo: 65, vig: "permanente", active: true },
  { type: "Pacote 3 dias", full: 195, promo: 159, vig: "até 28/MAI", active: true },
  { type: "Pacote 7 dias", full: 455, promo: 343, vig: "até 28/MAI", popular: true, active: true },
  { type: "Pacote 15 dias", full: 870, promo: 649, vig: "até 28/MAI", active: true },
  { type: "Mensalista", full: null, promo: 890, vig: "permanente", active: true },
  { type: "Transfer aeroporto", full: null, promo: 0, vig: "incluído", active: true },
  { type: "Valet (extra)", full: null, promo: 49, vig: "permanente", active: true },
  { type: "Lavagem express", full: 89, promo: 69, vig: "até 30/MAI", active: false },
];

const CUPONS = [
  { code: "PRIMEIRA10", desc: "10% off · primeira reserva", uses: 247, max: 500, expires: "30/JUN" },
  { code: "PIX12", desc: "12% off pra pagamento PIX", uses: 1842, max: null, expires: "permanente" },
  { code: "VOLTANDO15", desc: "15% off · clientes dormentes", uses: 88, max: 200, expires: "15/JUL" },
];

export default function PrecosPage() {
  const [dynamic, setDynamic] = useState(true);

  return (
    <PainelShell
      variant="operador"
      active="preços"
      pageSubtitle="Preços & cupons · Cumbica · GRU"
      pageTitle="Tarifas e promoções"
      badge={
        <Badge variant="success" size="lg" dot>
          Salvo · ao vivo em 30s
        </Badge>
      }
    >
      <div className="grid xl:grid-cols-[1.5fr_1fr] gap-3">
        {/* Tabela de tarifas */}
        <div className="space-y-3">
          <PanelCard className="p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <PanelEyebrow>Tabela de preços</PanelEyebrow>
                <div className="font-semibold mt-0.5">8 tarifas configuradas</div>
              </div>
              <button className="px-3 h-9 rounded-lg bg-mp-red text-white text-sm font-medium flex items-center gap-2">
                <Plus className="h-3.5 w-3.5" />
                Nova tarifa
              </button>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white/[0.02] text-left text-[10px] font-mono uppercase tracking-[0.15em] text-white/45">
                  <th className="py-3 px-4 font-medium">Tipo</th>
                  <th className="py-3 px-4 font-medium">Cheio</th>
                  <th className="py-3 px-4 font-medium">Promo</th>
                  <th className="py-3 px-4 font-medium">Vigência</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {TARIFAS.map((t) => (
                  <tr
                    key={t.type}
                    className={cn(
                      "transition-colors",
                      t.popular ? "bg-mp-red-15" : "hover:bg-white/[0.02]"
                    )}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{t.type}</span>
                        {t.popular && (
                          <span className="font-mono text-[9px] tracking-[0.18em] uppercase bg-mp-red text-white px-1.5 py-0.5 rounded">
                            ★ Popular
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-white/40 line-through tabular-nums">
                      {t.full ? `R$ ${t.full}` : "—"}
                    </td>
                    <td className="py-3.5 px-4 font-semibold tabular-nums">
                      {t.promo === 0 ? "Grátis" : `R$ ${t.promo}`}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-white/55">
                      {t.vig}
                    </td>
                    <td className="py-3.5 px-4">
                      <Toggle on={t.active} />
                    </td>
                    <td className="py-3.5 px-4 flex items-center gap-1">
                      <button className="h-7 w-7 rounded-md hover:bg-white/10 flex items-center justify-center">
                        <Edit3 className="h-3.5 w-3.5 text-white/55" />
                      </button>
                      <button className="h-7 w-7 rounded-md hover:bg-mp-red-15 flex items-center justify-center">
                        <Trash2 className="h-3.5 w-3.5 text-white/55" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PanelCard>

          {/* Preço dinâmico */}
          <PanelCard variant="red">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 mb-1 flex items-center gap-1.5">
                  <Zap className="h-3 w-3" />
                  Preço dinâmico
                </div>
                <div className="font-semibold text-lg">
                  Lotação &gt; 80% = +20% no preço automaticamente
                </div>
                <p className="mt-1.5 text-sm text-white/85">
                  Quando alta demanda detectada (ex: feriado, evento), o sistema ajusta as tarifas em tempo real respeitando o teto definido.
                </p>
              </div>
              <Toggle on={dynamic} onClick={() => setDynamic(!dynamic)} variant="white" />
            </div>

            {dynamic && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="p-3 rounded-lg bg-black/30">
                  <div className="font-mono text-[10px] tracking-wider text-white/65 uppercase">
                    Limite alta
                  </div>
                  <div className="text-lg font-semibold mt-1">+20%</div>
                </div>
                <div className="p-3 rounded-lg bg-black/30">
                  <div className="font-mono text-[10px] tracking-wider text-white/65 uppercase">
                    Limite baixa
                  </div>
                  <div className="text-lg font-semibold mt-1">-15%</div>
                </div>
                <div className="p-3 rounded-lg bg-black/30">
                  <div className="font-mono text-[10px] tracking-wider text-white/65 uppercase">
                    Trigger
                  </div>
                  <div className="text-sm font-semibold mt-1">
                    Lotação &gt; 80%
                  </div>
                </div>
              </div>
            )}
          </PanelCard>
        </div>

        {/* Cupons */}
        <div className="space-y-3">
          <PanelCard>
            <div className="flex items-center justify-between mb-4">
              <div>
                <PanelEyebrow>Cupons ativos</PanelEyebrow>
                <div className="font-semibold mt-0.5">{CUPONS.length} cupons</div>
              </div>
              <button className="px-3 h-9 rounded-lg bg-white text-mp-ink text-sm font-medium flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                Criar cupom
              </button>
            </div>

            <div className="space-y-2">
              {CUPONS.map((c) => (
                <div
                  key={c.code}
                  className="p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-bold text-mp-red">
                      {c.code}
                    </span>
                    <Badge variant="ghost" size="sm" className="bg-white/5 text-white/65">
                      <Percent className="h-2.5 w-2.5" />
                      Ativo
                    </Badge>
                  </div>
                  <div className="text-xs text-white/65 mb-2">{c.desc}</div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/45">
                    <span>
                      {c.uses}{c.max && ` / ${c.max}`} usos
                    </span>
                    <span>Exp: {c.expires}</span>
                  </div>
                  {c.max && (
                    <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-mp-success"
                        style={{ width: `${(c.uses / c.max) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </PanelCard>

          <PanelCard>
            <PanelEyebrow className="mb-3">Regras especiais</PanelEyebrow>
            <div className="space-y-2">
              <RuleRow
                title="Fim de semana"
                desc="Sex 18h até Dom 22h: +10% nas tarifas avulsas"
                active
              />
              <RuleRow
                title="Feriados"
                desc="Aplicar tabela de feriado nas datas marcadas"
                active
              />
              <RuleRow
                title="Multicliente"
                desc="30% off automático para clientes do programa"
                active
              />
              <RuleRow
                title="First-time buyer"
                desc="10% off na primeira reserva (cupom PRIMEIRA10)"
              />
            </div>
          </PanelCard>
        </div>
      </div>
    </PainelShell>
  );
}

function RuleRow({
  title,
  desc,
  active,
}: {
  title: string;
  desc: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border border-white/10">
      <Calendar className="h-4 w-4 text-white/55 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">{title}</div>
        <div className="text-[11px] text-white/55 mt-0.5">{desc}</div>
      </div>
      <Toggle on={active} />
    </div>
  );
}

function Toggle({
  on,
  onClick,
  variant = "default",
}: {
  on?: boolean;
  onClick?: () => void;
  variant?: "default" | "white";
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-6 w-10 rounded-full p-0.5 transition-colors shrink-0",
        on
          ? variant === "white"
            ? "bg-white"
            : "bg-mp-red"
          : "bg-white/15"
      )}
    >
      <div
        className={cn(
          "h-5 w-5 rounded-full transition-transform",
          on ? "translate-x-4" : "",
          on && variant === "white" ? "bg-mp-red" : "bg-white"
        )}
      />
    </button>
  );
}
