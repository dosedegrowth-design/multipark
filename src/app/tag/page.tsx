import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingChat } from "@/components/site/FloatingChat";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Zap, Check, ArrowRight } from "lucide-react";

export const metadata = {
  title: "TAG MultiPark · 40+ unidades + 100% das rodovias",
  description: "Passe sem parar em estacionamentos e pedágios. Tarifa única, recarga automática e benefícios exclusivos.",
};

export default function TagPage() {
  return (
    <>
      <Header variant="dark" />
      <main className="flex-1">
        <PageHero
          variant="dark"
          eyebrow="TAG MultiPark · by Move Mais"
          title="Passe sem parar"
          highlight="em qualquer cancela."
          subtitle="A TAG MultiPark integra estacionamento e pedágio no mesmo dispositivo. 40+ unidades da rede e 100% das rodovias pedagiadas do Brasil."
        />

        {/* Beneficios */}
        <section className="py-20 md:py-24">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Sem mensalidade", desc: "Você paga só o que usa" },
                  { label: "Sem fila no balcão", desc: "Cancela abre automática" },
                  { label: "10% off recargas", desc: "Cashback na conta" },
                  { label: "Aceita 5 redes", desc: "Sem Parar, ConectCar, Veloe" },
                ].map((b) => (
                  <div key={b.label} className="rounded-2xl border border-[--color-mp-line] p-5 bg-white">
                    <div className="h-9 w-9 rounded-lg bg-[--color-mp-red]/10 flex items-center justify-center mb-3">
                      <Check className="h-4 w-4 text-[--color-mp-red]" />
                    </div>
                    <div className="font-semibold mb-1">{b.label}</div>
                    <div className="text-xs text-[--color-mp-text-soft]">{b.desc}</div>
                  </div>
                ))}
              </div>

              <div>
                <Badge variant="redSoft" className="mb-5">
                  <Zap className="h-3 w-3" />
                  Adesão grátis
                </Badge>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
                  Cole a tag no parabrisa
                  <br />
                  <span className="text-[--color-mp-text-muted]">e esquece dela.</span>
                </h2>
                <p className="mt-5 text-[--color-mp-text-soft] leading-relaxed">
                  Recarga automática, fatura mensal consolidada e suporte 24h
                  via WhatsApp. Mesmo dispositivo serve para estacionamento e
                  pedágio.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button size="lg" href="/reservar">
                    Pedir minha TAG
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" href="#">
                    Como funciona
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Como funciona */}
        <section className="py-20 bg-[--color-mp-cream]">
          <Container>
            <div className="eyebrow mb-3">Como funciona</div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] mb-12">
              3 passos pra ter a sua.
            </h2>
            <div className="grid md:grid-cols-3 gap-px bg-[--color-mp-line] rounded-2xl overflow-hidden border border-[--color-mp-line]">
              {[
                { n: "01", title: "Solicite online", desc: "Pelo site ou app, em 2 minutos." },
                { n: "02", title: "Receba em casa", desc: "Entrega grátis em até 5 dias úteis." },
                { n: "03", title: "Ative no app", desc: "Recarga automática + uso imediato." },
              ].map((s) => (
                <div key={s.n} className="bg-white p-8 md:p-10">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[--color-mp-red]">
                    {s.n}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold mt-4 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-[--color-mp-text-soft]">{s.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}
