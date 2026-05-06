import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingChat } from "@/components/site/FloatingChat";
import { Container } from "@/components/ui/Container";
import { MapSection } from "@/components/site/MapSection";
import { UNITS } from "@/lib/data/units";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const metadata = {
  title: "Unidades · MultiPark",
  description: "+200 unidades em todo o Brasil. Encontre o estacionamento mais próximo de você.",
};

export default function UnidadesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[--color-mp-paper] border-b border-[--color-mp-line] py-12 md:py-16">
          <Container>
            <div className="eyebrow mb-3">+200 unidades · todo o Brasil</div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] text-[--color-mp-ink] max-w-3xl">
              Encontre a unidade
              <br />
              <span className="text-[--color-mp-text-muted]">mais próxima de você.</span>
            </h1>
          </Container>
        </section>

        {/* Map + filters */}
        <MapSection />

        {/* Lista completa */}
        <section className="py-20 bg-white">
          <Container>
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Todas as unidades
              </h2>
              <span className="text-sm font-mono uppercase tracking-wider text-[--color-mp-text-soft]">
                {UNITS.length} unidades
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {UNITS.map((u) => (
                <Link
                  key={u.id}
                  href={`/unidades/${u.slug}`}
                  className="group block rounded-2xl border border-[--color-mp-line] bg-white overflow-hidden hover:shadow-[var(--shadow-card)] hover:border-[--color-mp-text] transition-all"
                >
                  <div className="aspect-[5/3] bg-[--color-mp-ink] relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(225,29,46,0.45),transparent_60%)]" />
                    <div className="absolute top-3 left-3">
                      <Badge variant="dark" size="sm">
                        {u.category === "aeroporto"
                          ? `${u.airport} · Aeroporto`
                          : u.region}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[--color-mp-red] text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                      a partir R$ {u.prices.avulso.promo}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="font-semibold text-lg mb-1 truncate">
                      {u.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[--color-mp-text-soft] mb-3">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">
                        {u.city}, {u.state}
                      </span>
                      <span>·</span>
                      <Star className="h-3 w-3 fill-[--color-mp-warning] text-[--color-mp-warning]" />
                      <span>{u.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {u.badges.slice(0, 3).map((b) => (
                        <Badge key={b} variant="ghost" size="sm">
                          {b}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
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
