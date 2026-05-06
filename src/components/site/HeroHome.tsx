import { Container } from "@/components/ui/Container";
import { SearchBar } from "@/components/site/SearchBar";
import { AIRPORTS } from "@/lib/data/units";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function HeroHome() {
  return (
    <section className="relative bg-hero-dark text-white pb-16 pt-12 md:pt-16 lg:pt-20 overflow-hidden">
      {/* Decorative arrow logo background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        aria-hidden
      >
        <svg
          className="absolute right-0 top-0 h-full"
          viewBox="0 0 800 800"
          fill="none"
        >
          <path
            d="M200 200 L600 400 L200 600 Z"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      </div>

      <Container>
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-end relative">
          <div className="pt-8 md:pt-12">
            <div className="eyebrow text-[var(--color-mp-red)] mb-5 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              50 anos cuidando do seu carro
            </div>
            <h1 className="text-[44px] md:text-[64px] lg:text-[80px] leading-[0.95] font-semibold tracking-[-0.03em] text-white">
              Reserve sua
              <br />
              vaga em{" "}
              <span className="text-[var(--color-mp-red)] italic font-semibold">
                2 minutos.
              </span>
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Aeroporto, urbano ou mensalista. PIX, cartão ou pague na chegada.
              Suporte humano via WhatsApp em todas as etapas.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono uppercase tracking-[0.18em] text-white/45">
              <Stat>50 anos</Stat>
              <Stat>+200 unidades</Stat>
              <Stat>+50k carros/mês</Stat>
              <Stat last>Selo ABF</Stat>
            </div>
          </div>

          {/* Cards lateriais aeroportos */}
          <div className="grid grid-cols-2 gap-3">
            {AIRPORTS.map((a) => (
              <AirportCard key={a.code} airport={a} />
            ))}
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-10 lg:mt-14 relative z-10">
          <SearchBar />
        </div>

        {/* Resumo de unidades por aeroporto */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          <AirportSummary city="Guarulhos" units={12} note="transfer 24h" />
          <AirportSummary city="Viracopos" units={5} note="valet" />
          <AirportSummary city="Congonhas" units={3} note="coberto" />
          <AirportSummary city="Confins" units={2} note="24h" />
        </div>
      </Container>
    </section>
  );
}

function Stat({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="text-[var(--color-mp-red)]">✦</span>
      <span>{children}</span>
      {!last && <span className="ml-1 text-white/20">·</span>}
    </span>
  );
}

function AirportCard({
  airport,
}: {
  airport: { code: string; name: string; priceFrom: number };
}) {
  const dark = airport.code === "CGH" || airport.code === "CNF";
  return (
    <Link
      href={`/aeroportos/${airport.name.toLowerCase()}`}
      className={`relative rounded-[14px] p-4 md:p-5 h-[140px] md:h-[160px] flex flex-col justify-between border transition-transform hover:-translate-y-0.5 ${
        dark
          ? "bg-[var(--color-mp-ink)] border-white/5"
          : "bg-white text-[var(--color-mp-ink)] border-transparent"
      }`}
    >
      <span
        className={`label-tag inline-flex items-center px-2 py-0.5 rounded ${
          dark
            ? "bg-white/10 text-white"
            : "bg-[var(--color-mp-cream)] text-[var(--color-mp-text-soft)]"
        } w-fit`}
      >
        {airport.code}
      </span>

      <div>
        <div className="font-semibold text-base md:text-lg leading-tight">
          {airport.name}
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-[var(--color-mp-red)] text-white text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md">
        a partir R$ {airport.priceFrom}
      </div>
    </Link>
  );
}

function AirportSummary({
  city,
  units,
  note,
}: {
  city: string;
  units: number;
  note: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
      <div className="font-medium text-white">{city}</div>
      <div className="text-xs text-white/50 mt-0.5">
        {units} unidades · {note}
      </div>
    </div>
  );
}
