import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingChat } from "@/components/site/FloatingChat";
import { PageHero } from "@/components/site/PageHero";
import { Container } from "@/components/ui/Container";
import { UNITS } from "@/lib/data/units";
import Link from "next/link";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Aeroportos · MultiPark",
  description: "Estacionamento em GRU, CGH, VCP e CNF. Transfer 24h, valet e seguro de R$1M incluso.",
};

const AIRPORTS_INFO = [
  { code: "GRU", name: "Guarulhos", desc: "12 unidades · transfer 24h · valet" },
  { code: "VCP", name: "Viracopos", desc: "5 unidades · valet · coberto" },
  { code: "CGH", name: "Congonhas", desc: "3 unidades · coberto" },
  { code: "CNF", name: "Confins", desc: "2 unidades · 24h" },
];

export default function AeroportosPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageHero
          eyebrow="4 aeroportos · transfer 24h"
          title="Estacionamento"
          highlight="pra quem viaja."
          subtitle="Aeroporto de Guarulhos (GRU), Congonhas (CGH), Viracopos (VCP) e Confins (CNF). Manobrista, shuttle 24h e seguro de R$1M incluso."
        />

        <section className="py-20 md:py-24">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {AIRPORTS_INFO.map((a) => (
                <Link
                  key={a.code}
                  href={`#${a.code}`}
                  className="rounded-2xl border border-[var(--color-mp-line)] p-5 hover:border-[var(--color-mp-text)] transition-colors group"
                >
                  <Badge variant="dark" className="mb-3">
                    {a.code}
                  </Badge>
                  <div className="text-2xl font-semibold mb-1">{a.name}</div>
                  <div className="text-sm text-[var(--color-mp-text-soft)] mb-4">
                    {a.desc}
                  </div>
                  <div className="text-sm font-medium text-[var(--color-mp-red)] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Ver unidades
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Por aeroporto */}
            {AIRPORTS_INFO.map((a) => {
              const units = UNITS.filter((u) => u.airport === a.code);
              if (!units.length) return null;
              return (
                <div key={a.code} id={a.code} className="mb-16 scroll-mt-24">
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-mp-red)] mb-1">
                        {a.code}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                        Aeroporto {a.name}
                      </h2>
                    </div>
                    <span className="text-sm text-[var(--color-mp-text-soft)] font-mono uppercase tracking-wider">
                      {units.length} unidades
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {units.map((u) => (
                      <Link
                        key={u.id}
                        href={`/unidades/${u.slug}`}
                        className="block rounded-2xl border border-[var(--color-mp-line)] bg-white p-5 hover:border-[var(--color-mp-text)] hover:shadow-[var(--shadow-card)] transition-all"
                      >
                        <div className="aspect-[5/3] rounded-xl bg-[var(--color-mp-ink)] mb-4 relative overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(225,29,46,0.4),transparent_60%)]" />
                          <div className="absolute top-3 left-3">
                            <Badge variant="dark" size="sm">
                              {u.distance?.km} km · {u.distance?.minutes} min
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="font-semibold truncate">{u.name}</span>
                          <span className="text-base font-semibold text-[var(--color-mp-red)] tabular-nums shrink-0">
                            R$ {u.prices.avulso.promo}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[var(--color-mp-text-soft)] mb-3">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{u.address.split("—")[0]}</span>
                          <span>·</span>
                          <Star className="h-3 w-3 fill-[var(--color-mp-warning)] text-[var(--color-mp-warning)]" />
                          {u.rating}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {u.badges.slice(0, 3).map((b) => (
                            <Badge key={b} variant="ghost" size="sm">
                              {b}
                            </Badge>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </Container>
        </section>
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}
