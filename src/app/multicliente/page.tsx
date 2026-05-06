import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingChat } from "@/components/site/FloatingChat";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Star } from "lucide-react";

export const metadata = {
  title: "Multicliente · 30% off em 150+ estacionamentos",
  description: "Programa de fidelidade da MultiPark. Mensalistas e parceiros credenciados ganham desconto automático em toda a rede.",
};

export default function MulticlientePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Programa Multicliente"
          title="Fidelidade que vale"
          highlight="em 150+ unidades."
          subtitle="Mensalistas Multipark e parceiros credenciados ganham 30% off em qualquer unidade da rede. Sem letra miúda, sem prazo de validade."
        />

        <section className="py-20 md:py-24">
          <Container>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { stat: "30%", label: "off em diárias", desc: "Aplicado automaticamente no checkout" },
                { stat: "150+", label: "estacionamentos", desc: "Toda a rede MultiPark + parceiros credenciados" },
                { stat: "0", label: "anuidade", desc: "Cadastro grátis para mensalistas" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-[var(--color-mp-line)] p-7 bg-white">
                  <div className="text-5xl font-semibold tabular-nums tracking-tight text-[var(--color-mp-red)]">
                    {s.stat}
                  </div>
                  <div className="font-semibold mt-2">{s.label}</div>
                  <div className="text-sm text-[var(--color-mp-text-soft)] mt-1">{s.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-3xl bg-[var(--color-mp-ink)] text-white p-8 md:p-14 text-center">
              <Star className="h-7 w-7 text-[var(--color-mp-red)] mx-auto mb-4" />
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] max-w-2xl mx-auto">
                Já é mensalista? Seu desconto está esperando.
              </h2>
              <div className="mt-7">
                <Button size="lg" href="/reservar">
                  Cadastrar grátis
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}
