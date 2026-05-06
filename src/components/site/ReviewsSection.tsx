import { Container } from "@/components/ui/Container";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Mariana S.",
    unit: "Cumbica · GRU",
    rating: 5,
    text: "Reservei pelo celular na noite antes da viagem. Cheguei e em 90 segundos meu carro tava no pátio. Voltei e o WhatsApp já tinha avisado que o transfer ia me buscar.",
  },
  {
    name: "Roberto V.",
    unit: "Viracopos",
    rating: 5,
    text: "Uso há 4 anos e nunca tive problema. O carro sempre limpinho, a equipe lembra do meu nome e o seguro de R$1M dá tranquilidade.",
  },
  {
    name: "Camila P.",
    unit: "Av. Paulista",
    rating: 5,
    text: "Mensalista no centro. Vagas garantidas, manobrista educado e o app pra renovar mensalidade resolve tudo em 1 minuto.",
  },
];

export function ReviewsSection() {
  return (
    <section className="py-20 md:py-24 bg-[--color-mp-cream]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="eyebrow mb-3">Prova social</div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-[--color-mp-ink]">
              4.8 ★ no Google,
              <br />
              <span className="text-[--color-mp-text-muted]">
                12 mil avaliações.
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-[--color-mp-warning] text-[--color-mp-warning]"
                />
              ))}
            </div>
            <div className="text-sm text-[--color-mp-text-soft]">
              Google Reviews · todas as unidades
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="bg-white p-7 rounded-2xl border border-[--color-mp-line]"
            >
              <div className="flex mb-4">
                {[...Array(r.rating)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4 fill-[--color-mp-warning] text-[--color-mp-warning]"
                  />
                ))}
              </div>
              <p className="text-[--color-mp-text] leading-relaxed mb-6">
                “{r.text}”
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[--color-mp-cream] flex items-center justify-center font-semibold text-[--color-mp-ink]">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-medium text-sm">{r.name}</div>
                  <div className="text-xs text-[--color-mp-text-soft]">
                    {r.unit}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
