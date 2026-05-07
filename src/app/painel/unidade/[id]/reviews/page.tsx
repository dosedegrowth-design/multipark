"use client";

import { useState } from "react";
import { PainelShell } from "@/components/painel/PainelShell";
import { PanelCard, PanelEyebrow, FilterChip } from "@/components/painel/PanelCard";
import { Star, MessageCircle, Reply } from "lucide-react";
import { cn } from "@/lib/cn";

const REVIEWS = [
  { author: "Mariana Silva", rating: 5, source: "Google", date: "12 mai", text: "Reservei pelo celular na noite antes da viagem. Cheguei e em 90 segundos meu carro tava no pátio. Voltei e o WhatsApp já tinha avisado que o transfer ia me buscar. Perfeito.", replied: true },
  { author: "Pedro V.", rating: 5, source: "Google", date: "10 mai", text: "Atendimento excelente, manobrista cuidadoso, preço justo. Já é a 4ª vez que uso e nunca tive problema.", replied: true },
  { author: "Carla M.", rating: 4, source: "Interno", date: "09 mai", text: "Local seguro e bem sinalizado. Único ponto: tive que esperar uns 8 minutos pelo shuttle da volta.", replied: false },
  { author: "João C.", rating: 5, source: "Google", date: "07 mai", text: "Muito bom! Mostrou que vale cada centavo. Carro lavado por dentro, voltei com tudo limpinho.", replied: false },
  { author: "Ana B.", rating: 3, source: "Interno", date: "05 mai", text: "O serviço é bom mas o preço subiu bastante esse ano. O seguro de R$1M ajuda a justificar mas tá no limite.", replied: false },
  { author: "Roberto L.", rating: 5, source: "Google", date: "03 mai", text: "Recomendo! Uso há 4 anos e nunca tive problema. O carro sempre limpinho, a equipe lembra do meu nome.", replied: true },
];

const FILTERS = [
  { id: "all", label: "Todos" },
  { id: "unanswered", label: "Sem resposta" },
  { id: "google", label: "Google" },
  { id: "internal", label: "Internos" },
  { id: "5", label: "5 estrelas" },
  { id: "low", label: "1–3 estrelas" },
];

export default function ReviewsPage() {
  const [active, setActive] = useState("all");

  return (
    <PainelShell
      variant="operador"
      active="reviews"
      pageSubtitle="Reviews · Cumbica · GRU"
      pageTitle="Avaliações dos clientes"
      badge={
        <button className="h-9 px-3 rounded-lg bg-mp-red text-sm font-medium flex items-center gap-2">
          Solicitar review
        </button>
      }
    >
      {/* KPIs */}
      <div className="grid lg:grid-cols-[1fr_2fr] gap-3 mb-5">
        <PanelCard>
          <PanelEyebrow className="mb-2">Rating geral</PanelEyebrow>
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-5xl font-semibold tabular-nums">4.8</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-mp-warning text-mp-warning"
                />
              ))}
            </div>
          </div>
          <div className="text-sm text-white/55">
            Baseado em <strong className="text-white">1.247 reviews</strong>
          </div>
          <div className="mt-4 space-y-1.5">
            <RatingBar stars={5} count={989} total={1247} />
            <RatingBar stars={4} count={184} total={1247} />
            <RatingBar stars={3} count={48} total={1247} />
            <RatingBar stars={2} count={18} total={1247} />
            <RatingBar stars={1} count={8} total={1247} />
          </div>
        </PanelCard>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Mini label="Reviews 30d" value="184" trend="+22" />
          <Mini label="Taxa resposta" value="78%" trend="+8 pts" />
          <Mini label="Tempo médio resp." value="2h 14m" trend="-1h 22m" />
          <Mini label="NPS estimado" value="72" trend="+5" />
          <Mini label="Promotores" value="79%" />
          <Mini label="Detratores" value="2.1%" trend="-0.8 pts" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <FilterChip key={f.id} active={active === f.id} onClick={() => setActive(f.id)}>
            {f.label}
          </FilterChip>
        ))}
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {REVIEWS.map((r, i) => (
          <PanelCard key={i}>
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-full bg-mp-red flex items-center justify-center font-semibold shrink-0">
                {r.author[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{r.author}</span>
                    <SourceBadge source={r.source} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                    {r.date}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={cn(
                          "h-3.5 w-3.5",
                          idx < r.rating
                            ? "fill-mp-warning text-mp-warning"
                            : "text-white/20"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-3">
                  {r.text}
                </p>

                {r.replied ? (
                  <div className="ml-4 mt-3 p-3 rounded-xl bg-white/[0.03] border-l-2 border-mp-red">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-mp-red mb-1">
                      <Reply className="h-3 w-3" />
                      Sua resposta
                    </div>
                    <p className="text-xs text-white/65">
                      Obrigado pelo feedback, {r.author.split(" ")[0]}! Ficamos felizes em ter te servido bem. Volte sempre 🚗
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button className="h-8 px-3 rounded-lg bg-mp-red text-white text-xs font-medium flex items-center gap-1.5">
                      <Reply className="h-3 w-3" />
                      Responder
                    </button>
                    <button className="h-8 px-3 rounded-lg border border-white/15 text-xs font-medium flex items-center gap-1.5 text-white/65 hover:text-white">
                      Sugerir resposta IA
                    </button>
                    <button className="h-8 px-3 rounded-lg text-xs text-white/45 hover:text-white">
                      Marcar como spam
                    </button>
                  </div>
                )}
              </div>
            </div>
          </PanelCard>
        ))}
      </div>
    </PainelShell>
  );
}

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = (count / total) * 100;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-3 tabular-nums text-white/55">{stars}</span>
      <Star className="h-2.5 w-2.5 fill-mp-warning text-mp-warning" />
      <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className="h-full bg-mp-warning" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-10 text-right tabular-nums text-white/55">{count}</span>
    </div>
  );
}

function Mini({ label, value, trend }: { label: string; value: string; trend?: string }) {
  return (
    <PanelCard className="p-4">
      <PanelEyebrow className="mb-1.5">{label}</PanelEyebrow>
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
      {trend && <div className="mt-1 text-[11px] text-mp-success">{trend}</div>}
    </PanelCard>
  );
}

function SourceBadge({ source }: { source: string }) {
  return (
    <span
      className={cn(
        "px-1.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider",
        source === "Google"
          ? "bg-blue-500/20 text-blue-300"
          : "bg-white/10 text-white/65"
      )}
    >
      {source}
    </span>
  );
}
