import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingChat } from "@/components/site/FloatingChat";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Sobre · MultiPark",
  description: "50 anos cuidando do seu carro. A história da maior rede de estacionamentos do Brasil.",
};

const TIMELINE = [
  { year: "1975", title: "O começo", desc: "Primeira unidade Multipark inaugurada no centro de São Paulo." },
  { year: "1996", title: "Expansão urbana", desc: "Chegamos a 30 unidades na Grande SP. Lançamento do Multicliente." },
  { year: "2008", title: "Selo ABF", desc: "Primeira certificação de excelência em franquia. Abertura para franqueados oficiais." },
  { year: "2018", title: "Aeroportos", desc: "Operação em Guarulhos, Congonhas, Viracopos e Confins. Transfer 24h gratuito." },
  { year: "2025", title: "TAG MultiPark", desc: "Lançamento da TAG free-flow em parceria com a Move Mais. 40+ unidades." },
  { year: "2026", title: "Ecossistema digital", desc: "Reserva online integrada, painel multi-tenant e WhatsApp inteligente." },
];

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Há 50 anos"
          title="A história não começa"
          highlight="com a tecnologia."
          subtitle="Começa com cada cliente que confiou o carro pra gente desde 1975. Hoje somos +200 unidades e 50k carros por mês — mas continuamos cuidando como se fosse o único."
        />

        <section className="py-20 md:py-24">
          <Container>
            <div className="grid md:grid-cols-3 gap-5 mb-20">
              <Stat n="50" label="anos de mercado" />
              <Stat n="200+" label="unidades" />
              <Stat n="50k" label="carros / mês" />
            </div>

            <div className="max-w-4xl">
              <div className="eyebrow mb-3">Linha do tempo</div>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] mb-12">
                50 anos em 6 marcos.
              </h2>

              <div className="space-y-8">
                {TIMELINE.map((t) => (
                  <div key={t.year} className="grid md:grid-cols-[140px_1fr] gap-4 md:gap-8 pb-8 border-b border-[--color-mp-line] last:border-b-0">
                    <div className="font-mono text-3xl md:text-4xl font-semibold text-[--color-mp-red] tabular-nums">
                      {t.year}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold mb-2">
                        {t.title}
                      </h3>
                      <p className="text-[--color-mp-text-soft] leading-relaxed">
                        {t.desc}
                      </p>
                    </div>
                  </div>
                ))}
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

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[--color-mp-line] p-7 bg-white">
      <div className="text-6xl font-semibold tabular-nums text-[--color-mp-red] tracking-tight">
        {n}
      </div>
      <div className="mt-2 text-[--color-mp-text-soft]">{label}</div>
    </div>
  );
}
