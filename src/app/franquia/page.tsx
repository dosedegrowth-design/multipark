"use client";

import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingChat } from "@/components/site/FloatingChat";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, TrendingUp, Award } from "lucide-react";

export default function FranquiaPage() {
  const [vagas, setVagas] = useState(80);
  const ticketMedio = 90;
  const ocupacao = 0.55;
  const receitaMensal = vagas * 30 * ticketMedio * ocupacao;
  const lucroEstimado = receitaMensal * 0.32;

  return (
    <>
      <Header variant="dark" />
      <main className="flex-1">
        <PageHero
          variant="dark"
          eyebrow="Franquia · Selo Excelência ABF"
          title="Seja dono"
          highlight="da sua MultiPark."
          subtitle="50 anos de marca, sistema completo plug-and-play e suporte de operação. Investimento a partir de R$ 58.000."
        />

        {/* Calc ROI */}
        <section className="py-20 md:py-24">
          <Container>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <Badge variant="redSoft" className="mb-4">
                  <TrendingUp className="h-3 w-3" />
                  Simulador de ROI
                </Badge>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
                  Veja quanto sua
                  <br />
                  <span className="text-[--color-mp-text-muted]">
                    unidade pode faturar.
                  </span>
                </h2>
                <p className="mt-5 text-[--color-mp-text-soft] leading-relaxed">
                  Estimativa baseada no ticket médio nacional MultiPark e
                  ocupação histórica de unidades urbanas. Discovery refina os
                  números pro seu mercado específico.
                </p>
              </div>

              <div className="rounded-2xl border-2 border-[--color-mp-line] p-7 bg-white">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[--color-mp-text-soft] mb-2">
                  Tamanho da unidade
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-semibold tabular-nums">
                    {vagas}
                  </span>
                  <span className="text-[--color-mp-text-soft]">vagas</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={400}
                  step={10}
                  value={vagas}
                  onChange={(e) => setVagas(parseInt(e.target.value))}
                  className="w-full mp-range"
                />
                <div className="flex justify-between text-xs text-[--color-mp-text-soft] mt-1 mb-6 font-mono">
                  <span>30</span>
                  <span>400</span>
                </div>

                <div className="space-y-2 border-t border-[--color-mp-line] pt-5">
                  <Row
                    label="Receita estimada / mês"
                    value={`R$ ${receitaMensal.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`}
                  />
                  <Row label="Margem operacional" value="~32%" />
                  <Row
                    label="Lucro estimado / mês"
                    value={`R$ ${lucroEstimado.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}`}
                    highlight
                  />
                </div>

                <Button size="lg" className="w-full mt-6">
                  Quero saber mais
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* O que está incluso */}
        <section className="py-20 bg-[--color-mp-cream]">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <Award className="h-8 w-8 text-[--color-mp-red] mb-3" />
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
                  O que vem
                  <br />
                  <span className="text-[--color-mp-text-muted]">no kit franquia.</span>
                </h2>
              </div>
              <div className="space-y-2">
                {[
                  "Sistema completo de reserva online + painel multi-tenant",
                  "Página individual da unidade no multipark.com.br/unidades",
                  "WhatsApp embarcado + chatbot IA pré-configurado",
                  "Treinamento operacional + base de conhecimento",
                  "Marketing local: GBP, posts semanais, criativos",
                  "Integração com gateway de pagamento (Asaas split)",
                  "Programa Multicliente, TAG MultiPark e Multiselo",
                  "Helpdesk dedicado nos primeiros 90 dias",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[--color-mp-line]"
                  >
                    <div className="h-5 w-5 rounded-full bg-[--color-mp-red] flex items-center justify-center shrink-0 mt-0.5">
                      <ArrowRight className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <FloatingChat />
      <style jsx global>{`
        .mp-range {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: var(--color-mp-line);
          border-radius: 2px;
          outline: none;
        }
        .mp-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          background: white;
          border: 3px solid var(--color-mp-red);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-[--color-mp-text-soft]">{label}</span>
      <span
        className={`tabular-nums ${
          highlight
            ? "text-2xl font-semibold text-[--color-mp-red]"
            : "font-medium"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
