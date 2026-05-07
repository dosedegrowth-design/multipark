import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, ChevronRight, Phone, Clock, Shield, MessageCircle } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingChat } from "@/components/site/FloatingChat";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { UnitGallery } from "@/components/unit/UnitGallery";
import { UnitMapMini } from "@/components/unit/UnitMapMini";
import { PriceTable } from "@/components/unit/PriceTable";
import { InlineReserve } from "@/components/unit/InlineReserve";
import { getUnitBySlug, UNITS } from "@/lib/data/units";

export async function generateStaticParams() {
  return UNITS.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const unit = getUnitBySlug(slug);
  if (!unit) return {};
  return {
    title: `${unit.name} · Estacionamento ${unit.city}/${unit.state}`,
    description: unit.description,
  };
}

export default async function UnitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const unit = getUnitBySlug(slug);
  if (!unit) notFound();

  const ocupacao = ((unit.totalVagas - unit.vagasLivres) / unit.totalVagas) * 100;

  return (
    <>
      <Header />
      <main className="flex-1 pb-20">
        {/* Breadcrumb */}
        <Container>
          <nav className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.12em] text-[var(--color-mp-text-soft)] py-5">
            <Link href="/unidades" className="hover:text-[var(--color-mp-text)]">
              Unidades
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span>{unit.region}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--color-mp-text)]">{unit.name}</span>
          </nav>
        </Container>

        {/* Hero */}
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-[var(--color-mp-ink)]">
                {unit.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-[var(--color-mp-text-soft)]">
                <span>{unit.address}</span>
                {unit.distance && (
                  <>
                    <span>·</span>
                    <span>
                      {unit.distance.km} km · {unit.distance.minutes} min até{" "}
                      {unit.distance.to}
                    </span>
                  </>
                )}
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-[var(--color-mp-warning)] text-[var(--color-mp-warning)]" />
                  <strong className="text-[var(--color-mp-text)]">{unit.rating}</strong>
                  <span>· {unit.reviews.toLocaleString("pt-BR")} reviews Google</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              {unit.status === "aberto" && (
                <Badge variant="success" dot>
                  Aberto · {unit.vagasLivres} vagas
                </Badge>
              )}
              {unit.status === "lotado" && (
                <Badge variant="warning" dot>
                  Lotado · entre na fila
                </Badge>
              )}
              <Button size="lg" href="/reservar">
                Reservar agora
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {unit.badges.map((b) => (
              <Badge key={b} variant="outline" size="md">
                {b}
              </Badge>
            ))}
          </div>

          {/* Gallery */}
          <UnitGallery />

          {/* Two-column main */}
          <div className="grid lg:grid-cols-[1.45fr_1fr] gap-6 mt-8">
            <div className="space-y-6">
              <UnitMapMini geo={unit.geo} distance={unit.distance} unit={unit} />

              {/* About */}
              <div className="rounded-2xl bg-white border border-[var(--color-mp-line)] p-6 md:p-7">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-mp-text-soft)] mb-3">
                  Sobre essa unidade
                </div>
                <p className="text-[var(--color-mp-text)] leading-relaxed">
                  {unit.description}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <InfoTile icon={Clock} label="Horário" value="24h · 7 dias" />
                  <InfoTile icon={Phone} label="Plantão" value="(11) 4000-1234" />
                  <InfoTile icon={Shield} label="Seguro" value="R$ 1 milhão" />
                  <InfoTile icon={MessageCircle} label="WhatsApp" value="Resposta em 1 min" />
                </div>
              </div>

              {/* FAQ */}
              <div className="rounded-2xl bg-white border border-[var(--color-mp-line)] p-6 md:p-7">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-mp-text-soft)] mb-4">
                  Perguntas frequentes
                </div>
                <div className="divide-y divide-[var(--color-mp-line)] -mx-1">
                  {FAQ.map((q) => (
                    <details key={q.q} className="group py-3.5 px-1 cursor-pointer">
                      <summary className="flex items-center justify-between font-medium list-none">
                        {q.q}
                        <ChevronRight className="h-4 w-4 text-[var(--color-mp-text-soft)] group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="mt-2 text-sm text-[var(--color-mp-text-soft)] leading-relaxed">
                        {q.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <PriceTable unit={unit} />
              <InlineReserve unit={unit} />
              <OccupancyCard
                livres={unit.vagasLivres}
                total={unit.totalVagas}
                ocupacao={ocupacao}
              />
            </aside>
          </div>

          {/* Outras próximas */}
          <div className="mt-16">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-mp-ink)]">
                Outras unidades próximas
              </h2>
              <Link
                href="/unidades"
                className="text-sm font-medium text-[var(--color-mp-red)] hover:underline"
              >
                Ver todas →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {UNITS.filter((u) => u.id !== unit.id)
                .slice(0, 3)
                .map((u) => (
                  <Link
                    key={u.id}
                    href={`/unidades/${u.slug}`}
                    className="block rounded-2xl border border-[var(--color-mp-line)] bg-white p-5 hover:border-[var(--color-mp-text)] transition-colors group"
                  >
                    <div className="aspect-[5/3] rounded-xl bg-[var(--color-mp-ink)] mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(225,29,46,0.4),transparent_60%)]" />
                    </div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-semibold truncate">{u.name}</span>
                      <span className="text-base font-semibold text-[var(--color-mp-red)] tabular-nums shrink-0">
                        R$ {u.prices.avulso.promo}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--color-mp-text-soft)]">
                      {u.city}, {u.state} · ★ {u.rating}
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-mp-cream-50">
      <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-[var(--color-mp-text-soft)]" />
      </div>
      <div className="min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-mp-text-soft)]">
          {label}
        </div>
        <div className="text-sm font-medium truncate">{value}</div>
      </div>
    </div>
  );
}

function OccupancyCard({
  livres,
  total,
  ocupacao,
}: {
  livres: number;
  total: number;
  ocupacao: number;
}) {
  const tier =
    ocupacao < 50
      ? { label: "Disponível", color: "bg-[var(--color-mp-success)]" }
      : ocupacao < 80
      ? { label: "Movimentado", color: "bg-[var(--color-mp-warning)]" }
      : { label: "Quase lotado", color: "bg-[var(--color-mp-red)]" };

  return (
    <div className="rounded-2xl border border-[var(--color-mp-line)] p-5 bg-white">
      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-mp-text-soft)] mb-3">
        Ocupação ao vivo
      </div>
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <span className="text-3xl font-semibold tabular-nums">{livres}</span>
          <span className="text-sm text-[var(--color-mp-text-soft)] ml-1">
            de {total} vagas
          </span>
        </div>
        <span className="text-sm font-medium">{tier.label}</span>
      </div>
      <div className="h-2 bg-[var(--color-mp-cream)] rounded-full overflow-hidden">
        <div
          className={`h-full ${tier.color} transition-all`}
          style={{ width: `${ocupacao}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-[var(--color-mp-text-soft)]">
        Atualizado pelo operador da unidade · sincronizado em tempo real
      </div>
    </div>
  );
}

const FAQ = [
  {
    q: "Como funciona o transfer pro aeroporto?",
    a: "Shuttle gratuito 24h, sai a cada 15 minutos. Tempo médio de 6 minutos até o terminal.",
  },
  {
    q: "Posso deixar o carro com o tanque cheio?",
    a: "Sim. Recomendamos deixar com no mínimo 1/4 de tanque para ser parqueado com segurança.",
  },
  {
    q: "O seguro de R$1M cobre o quê?",
    a: "Cobre roubo, furto, colisão dentro do pátio e enchente. Cobertura LMI incluída sem custo adicional.",
  },
  {
    q: "Posso cancelar a reserva?",
    a: "Sim, gratuitamente até 48h antes do check-in. Após esse prazo, taxa de 30% sobre o valor.",
  },
  {
    q: "Quais TAGs vocês aceitam?",
    a: "TAG MultiPark by Move Mais, Sem Parar, ConectCar, Veloe e Green Pass.",
  },
];
