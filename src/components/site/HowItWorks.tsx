import { Container } from "@/components/ui/Container";
import { Search, CreditCard, Car } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Reserve online",
    desc: "Escolha sua unidade, datas e pague em PIX, cartão ou na chegada.",
    icon: Search,
  },
  {
    n: "02",
    title: "Estacione tranquilo",
    desc: "Apresente o QR Code na entrada. Manobrista cuida do resto.",
    icon: Car,
  },
  {
    n: "03",
    title: "Volte para o seu carro",
    desc: "WhatsApp avisa antes da chegada. Saída em 90 segundos.",
    icon: CreditCard,
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="max-w-2xl mb-14">
          <div className="eyebrow mb-4">Como funciona</div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-[--color-mp-ink]">
            Da reserva ao QR Code,
            <br />
            <span className="text-[--color-mp-text-muted]">em 3 passos.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-[--color-mp-line] rounded-2xl overflow-hidden border border-[--color-mp-line]">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className="bg-white p-8 md:p-10 group hover:bg-[--color-mp-cream]/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[--color-mp-red]">
                    {s.n}
                  </span>
                  <div className="h-11 w-11 rounded-full bg-[--color-mp-cream] flex items-center justify-center group-hover:bg-white transition-colors">
                    <Icon className="h-5 w-5 text-[--color-mp-ink]" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold leading-tight text-[--color-mp-ink] mb-3">
                  {s.title}
                </h3>
                <p className="text-sm md:text-base text-[--color-mp-text-soft] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
