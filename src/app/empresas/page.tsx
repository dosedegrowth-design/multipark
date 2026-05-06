import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingChat } from "@/components/site/FloatingChat";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Building2, Users, FileText, BadgeCheck } from "lucide-react";

export const metadata = {
  title: "Empresas · Multiselo + Parcerias B2B",
  description: "Ofereça estacionamento aos seus clientes. Multiselo, parcerias corporativas e gestão terceirizada de pátios.",
};

export default function EmpresasPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Empresas · B2B"
          title="Mobilidade pra"
          highlight="quem cuida da operação."
          subtitle="Selos digitais, gestão terceirizada de estacionamento e mensalista corporativo. 50 anos de operação a serviço da sua empresa."
        />

        <section className="py-20 md:py-24">
          <Container>
            <div className="grid md:grid-cols-3 gap-5">
              <Card
                icon={BadgeCheck}
                title="Multiselo"
                desc="Selos digitais que sua empresa entrega aos clientes pra validar estacionamento. A empresa paga, o cliente economiza."
                cta="Solicitar cotação"
              />
              <Card
                icon={Users}
                title="Mensalista corporativo"
                desc="Vagas dedicadas pra equipe e visitantes. Faturamento mensal consolidado, sem dor de cabeça operacional."
                cta="Falar com B2B"
              />
              <Card
                icon={Building2}
                title="Gestão terceirizada"
                desc="Operação completa do estacionamento da sua empresa, shopping ou condomínio. Tecnologia, equipe e SLA Multipark."
                cta="Conhecer modelo"
              />
            </div>

            {/* Lead form */}
            <div className="mt-16 rounded-3xl border border-[--color-mp-line] bg-white p-8 md:p-12 grid md:grid-cols-[1fr_1.2fr] gap-8 items-start">
              <div>
                <FileText className="h-7 w-7 text-[--color-mp-red] mb-4" />
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.05]">
                  Conte sobre sua empresa.
                </h2>
                <p className="mt-3 text-[--color-mp-text-soft]">
                  Em até 1 dia útil nosso comercial entra em contato com proposta personalizada.
                </p>
              </div>
              <div className="space-y-3">
                <input
                  placeholder="Nome"
                  className="w-full px-4 py-3 rounded-xl border border-[--color-mp-line] focus:outline-none focus:border-[--color-mp-red]"
                />
                <input
                  placeholder="Empresa"
                  className="w-full px-4 py-3 rounded-xl border border-[--color-mp-line] focus:outline-none focus:border-[--color-mp-red]"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    placeholder="Email"
                    className="px-4 py-3 rounded-xl border border-[--color-mp-line] focus:outline-none focus:border-[--color-mp-red]"
                  />
                  <input
                    placeholder="WhatsApp"
                    className="px-4 py-3 rounded-xl border border-[--color-mp-line] focus:outline-none focus:border-[--color-mp-red]"
                  />
                </div>
                <textarea
                  placeholder="Conte sobre a sua necessidade..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[--color-mp-line] focus:outline-none focus:border-[--color-mp-red] resize-none"
                />
                <Button size="lg" className="w-full">
                  Solicitar contato comercial
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

function Card({
  icon: Icon,
  title,
  desc,
  cta,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  cta: string;
}) {
  return (
    <div className="rounded-2xl border border-[--color-mp-line] p-7 bg-white hover:shadow-[var(--shadow-card)] transition-shadow">
      <div className="h-11 w-11 rounded-xl bg-[--color-mp-red]/10 flex items-center justify-center mb-5">
        <Icon className="h-5 w-5 text-[--color-mp-red]" />
      </div>
      <div className="font-semibold text-xl mb-2">{title}</div>
      <p className="text-sm text-[--color-mp-text-soft] mb-5 leading-relaxed">
        {desc}
      </p>
      <button className="text-sm font-medium text-[--color-mp-red] flex items-center gap-1 hover:gap-2 transition-all">
        {cta}
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </div>
  );
}
