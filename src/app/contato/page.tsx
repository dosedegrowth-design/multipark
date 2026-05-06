import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingChat } from "@/components/site/FloatingChat";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export const metadata = { title: "Contato · MultiPark" };

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="Suporte 24h"
          title="Como podemos"
          highlight="te ajudar?"
          subtitle="WhatsApp é o canal mais rápido. Resposta humana em até 1 minuto, 24h por dia."
        />

        <section className="py-20 md:py-24">
          <Container>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <Channel icon={MessageCircle} title="WhatsApp" value="(11) 4000-1234" cta="Abrir chat" highlight />
                <Channel icon={Phone} title="Plantão 24h" value="0800 000 1234" cta="Ligar agora" />
                <Channel icon={Mail} title="Email" value="contato@multipark.com.br" cta="Enviar email" />
                <Channel icon={MapPin} title="Sede administrativa" value="Av. Paulista, 1374 — São Paulo/SP" cta="Ver no mapa" />
              </div>

              <div className="rounded-3xl border border-[var(--color-mp-line)] bg-white p-7">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-mp-text-soft)] mb-2">
                  Formulário
                </div>
                <h2 className="text-2xl font-semibold mb-5">Mande uma mensagem</h2>
                <div className="space-y-3">
                  <input placeholder="Nome" className="w-full px-4 py-3 rounded-xl border border-[var(--color-mp-line)] focus:outline-none focus:border-[var(--color-mp-red)]" />
                  <div className="grid grid-cols-2 gap-3">
                    <input placeholder="Email" className="px-4 py-3 rounded-xl border border-[var(--color-mp-line)] focus:outline-none focus:border-[var(--color-mp-red)]" />
                    <input placeholder="WhatsApp" className="px-4 py-3 rounded-xl border border-[var(--color-mp-line)] focus:outline-none focus:border-[var(--color-mp-red)]" />
                  </div>
                  <select className="w-full px-4 py-3 rounded-xl border border-[var(--color-mp-line)] focus:outline-none focus:border-[var(--color-mp-red)] bg-white">
                    <option>Sobre uma reserva existente</option>
                    <option>Mensalista</option>
                    <option>Empresas (B2B)</option>
                    <option>Franquia</option>
                    <option>Outro</option>
                  </select>
                  <textarea rows={4} placeholder="Como podemos ajudar?" className="w-full px-4 py-3 rounded-xl border border-[var(--color-mp-line)] focus:outline-none focus:border-[var(--color-mp-red)] resize-none" />
                  <Button size="lg" className="w-full">Enviar mensagem</Button>
                </div>
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

function Channel({
  icon: Icon,
  title,
  value,
  cta,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  cta: string;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-5 flex items-center gap-4 transition-all ${highlight ? "bg-[var(--color-mp-red)] border-[var(--color-mp-red)] text-white" : "bg-white border-[var(--color-mp-line)] hover:border-[var(--color-mp-text)]"}`}>
      <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${highlight ? "bg-white/15" : "bg-[var(--color-mp-cream)]"}`}>
        <Icon className={`h-5 w-5 ${highlight ? "text-white" : "text-[var(--color-mp-text-soft)]"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className={`font-mono text-[10px] uppercase tracking-[0.15em] ${highlight ? "text-white/70" : "text-[var(--color-mp-text-soft)]"}`}>{title}</div>
        <div className="font-semibold mt-0.5 truncate">{value}</div>
      </div>
      <button className={`text-sm font-medium shrink-0 ${highlight ? "text-white" : "text-[var(--color-mp-red)]"}`}>{cta} →</button>
    </div>
  );
}
