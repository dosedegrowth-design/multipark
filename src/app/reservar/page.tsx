"use client";

import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingChat } from "@/components/site/FloatingChat";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MercosulPlate } from "@/components/ui/MercosulPlate";
import { ArrowRight, Check, Star, MapPin, Calendar, ChevronRight, Copy } from "lucide-react";
import { UNITS } from "@/lib/data/units";
import { cn } from "@/lib/cn";

const STEPS = [
  { n: 1, label: "Busca" },
  { n: 2, label: "Listagem" },
  { n: 3, label: "Veículo" },
  { n: 4, label: "Pagar" },
  { n: 5, label: "Confirmado" },
];

export default function ReservarPage() {
  const [step, setStep] = useState(1);
  const [unit, setUnit] = useState(UNITS[0]);

  return (
    <>
      <Header />
      <main className="flex-1 bg-[--color-mp-paper] pb-20">
        <Container>
          {/* Stepper */}
          <div className="py-7 md:py-10">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {STEPS.map((s, i) => (
                <div key={s.n} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={cn(
                        "h-9 w-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all",
                        step > s.n
                          ? "bg-[--color-mp-success] text-white"
                          : step === s.n
                          ? "bg-[--color-mp-red] text-white"
                          : "bg-[--color-mp-cream] text-[--color-mp-text-soft]"
                      )}
                    >
                      {step > s.n ? <Check className="h-4 w-4" /> : s.n}
                    </div>
                    <span
                      className={cn(
                        "font-mono text-[10px] uppercase tracking-[0.18em]",
                        step >= s.n
                          ? "text-[--color-mp-text]"
                          : "text-[--color-mp-text-muted]"
                      )}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-px mx-2 mb-7",
                        step > s.n ? "bg-[--color-mp-success]" : "bg-[--color-mp-line]"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            {step === 1 && <Step1 onNext={() => setStep(2)} />}
            {step === 2 && (
              <Step2
                onNext={(u) => {
                  setUnit(u);
                  setStep(3);
                }}
              />
            )}
            {step === 3 && <Step3 onNext={() => setStep(4)} />}
            {step === 4 && <Step4 unit={unit} onNext={() => setStep(5)} />}
            {step === 5 && <Step5 unit={unit} />}
          </div>
        </Container>
      </main>
      <Footer />
      <FloatingChat />
    </>
  );
}

// ====================================================================
function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="bg-white border border-[--color-mp-line] rounded-3xl p-6 md:p-10">
      <Badge variant="redSoft" size="md" className="mb-4">
        01 · Busca
      </Badge>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] text-[--color-mp-ink]">
        Onde você está indo?
      </h1>
      <p className="mt-2 text-[--color-mp-text-soft]">
        Aeroporto, endereço ou CEP. Geolocalização ativa pra detectar o mais próximo.
      </p>

      <div className="mt-6 space-y-3">
        <Field icon={MapPin} label="Origem" value="Aeroporto de Guarulhos · GRU" />
        <div className="grid grid-cols-2 gap-3">
          <Field icon={Calendar} label="Check-in" value="14 mai · 06:00" />
          <Field icon={Calendar} label="Check-out" value="21 mai · 22:00" />
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between">
        <span className="text-xs text-[--color-mp-text-soft]">
          7 dias selecionados
        </span>
        <Button size="lg" onClick={onNext}>
          Buscar vagas
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <button className="w-full flex items-center gap-3 p-4 rounded-xl border border-[--color-mp-line] hover:border-[--color-mp-text] transition-colors text-left">
      <div className="h-10 w-10 rounded-lg bg-[--color-mp-cream] flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-[--color-mp-text-soft]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[--color-mp-text-soft]">
          {label}
        </div>
        <div className="text-sm font-medium truncate mt-0.5">{value}</div>
      </div>
    </button>
  );
}

// ====================================================================
function Step2({ onNext }: { onNext: (u: (typeof UNITS)[number]) => void }) {
  const list = UNITS.filter((u) => u.airport === "GRU");
  return (
    <div>
      <Badge variant="redSoft" size="md" className="mb-4">
        02 · Listagem
      </Badge>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] text-[--color-mp-ink]">
        {list.length} unidades encontradas
        <span className="text-[--color-mp-text-muted] font-normal text-2xl block mt-1">
          em Guarulhos · 14 → 21 mai
        </span>
      </h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4">
        {list.map((u) => (
          <button
            key={u.id}
            onClick={() => onNext(u)}
            className="group text-left bg-white border border-[--color-mp-line] rounded-2xl p-5 hover:border-[--color-mp-red] hover:shadow-[var(--shadow-card)] transition-all"
          >
            <div className="aspect-[5/3] rounded-xl bg-[--color-mp-ink] mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(225,29,46,0.4),transparent_60%)]" />
              <div className="absolute top-3 left-3 flex gap-1.5">
                {u.badges.slice(0, 2).map((b) => (
                  <Badge key={b} variant="dark" size="sm">
                    {b}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="font-semibold text-base">{u.name}</span>
              <div className="text-right shrink-0">
                <div className="text-xs text-[--color-mp-text-muted] line-through">
                  R$ {u.prices.avulso.full}
                </div>
                <div className="text-lg font-semibold text-[--color-mp-red]">
                  R$ {u.prices.avulso.promo}
                  <span className="text-xs font-normal text-[--color-mp-text-soft]">
                    /dia
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[--color-mp-text-soft]">
              <MapPin className="h-3 w-3" />
              {u.distance?.km} km · {u.distance?.minutes} min
              <span className="mx-1">·</span>
              <Star className="h-3 w-3 fill-[--color-mp-warning] text-[--color-mp-warning]" />
              {u.rating}
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm font-medium text-[--color-mp-red] group-hover:gap-2 transition-all">
              Ver opção <ChevronRight className="h-4 w-4" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ====================================================================
function Step3({ onNext }: { onNext: () => void }) {
  return (
    <div className="bg-white border border-[--color-mp-line] rounded-3xl p-6 md:p-10">
      <Badge variant="redSoft" size="md" className="mb-4">
        03 · Veículo
      </Badge>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] text-[--color-mp-ink]">
        Cadastre seu veículo
      </h1>
      <p className="mt-2 text-[--color-mp-text-soft]">
        Usamos a placa pra liberação automática na cancela.
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-[--color-mp-text-soft] mb-2 block">
            Placa
          </label>
          <input
            type="text"
            defaultValue="ABC1D23"
            className="w-full px-4 py-3 rounded-xl border border-[--color-mp-line] font-plate text-lg tracking-[0.2em] uppercase focus:outline-none focus:border-[--color-mp-red]"
          />
          <div className="mt-4">
            <MercosulPlate plate="ABC1D23" size="md" />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-[--color-mp-text-soft] mb-2 block">
              Modelo
            </label>
            <input
              type="text"
              defaultValue="Honda Civic 2024"
              className="w-full px-4 py-3 rounded-xl border border-[--color-mp-line] focus:outline-none focus:border-[--color-mp-red]"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-[--color-mp-text-soft] mb-2 block">
              Cor
            </label>
            <input
              type="text"
              defaultValue="Preto"
              className="w-full px-4 py-3 rounded-xl border border-[--color-mp-line] focus:outline-none focus:border-[--color-mp-red]"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[--color-mp-line]">
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[--color-mp-text-soft] mb-3">
          Identifique-se
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <button className="px-4 py-3 rounded-xl border border-[--color-mp-line] hover:border-[--color-mp-text] text-sm font-medium flex items-center justify-center gap-2">
            <span>Continuar com Google</span>
          </button>
          <button className="px-4 py-3 rounded-xl border border-[--color-mp-line] hover:border-[--color-mp-text] text-sm font-medium flex items-center justify-center gap-2">
            <span>Continuar com Apple</span>
          </button>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Email"
            className="px-4 py-3 rounded-xl border border-[--color-mp-line] focus:outline-none focus:border-[--color-mp-red]"
          />
          <input
            type="text"
            placeholder="WhatsApp"
            className="px-4 py-3 rounded-xl border border-[--color-mp-line] focus:outline-none focus:border-[--color-mp-red]"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button size="lg" onClick={onNext}>
          Continuar pro pagamento
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ====================================================================
function Step4({
  unit,
  onNext,
}: {
  unit: (typeof UNITS)[number];
  onNext: () => void;
}) {
  const [method, setMethod] = useState<"pix" | "card" | "later">("pix");
  const total = unit.prices.avulso.full * 7;
  const totalPix = unit.prices.avulso.promo * 7;

  return (
    <div>
      <Badge variant="redSoft" size="md" className="mb-4">
        04 · Pagar
      </Badge>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] text-[--color-mp-ink]">
        Como você quer pagar?
      </h1>
      <p className="mt-2 text-[--color-mp-text-soft]">
        Pague agora com PIX e economize 12%, ou pague na chegada sem desconto.
      </p>

      <div className="mt-7 grid md:grid-cols-[1.5fr_1fr] gap-6">
        <div className="space-y-3">
          <PayOption
            id="pix"
            label="Pagar agora · PIX"
            badge="Economiza 12%"
            badgeVariant="success"
            full={total}
            value={totalPix}
            description="Aprovação instantânea. Confirmação por WhatsApp e email."
            active={method === "pix"}
            onClick={() => setMethod("pix")}
          />
          <PayOption
            id="card"
            label="Pagar agora · Cartão"
            badge="até 6x sem juros"
            badgeVariant="ghost"
            value={total}
            description="Cobrado na confirmação. Aceita Visa, Master, Elo e Amex."
            active={method === "card"}
            onClick={() => setMethod("card")}
          />
          <PayOption
            id="later"
            label="Pagar na chegada"
            badge="Pré-reserva"
            badgeVariant="ghost"
            value={total}
            description="Sua vaga fica garantida por 30 minutos depois do horário do check-in."
            active={method === "later"}
            onClick={() => setMethod("later")}
          />
        </div>

        <div className="bg-white border border-[--color-mp-line] rounded-2xl p-5 h-fit lg:sticky lg:top-24">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[--color-mp-text-soft] mb-3">
            Resumo da reserva
          </div>
          <div className="space-y-2.5 mb-4 text-sm">
            <Row label="Unidade" value={unit.name} />
            <Row label="Datas" value="14 mai → 21 mai" />
            <Row label="Diárias" value="7" />
            <Row label="Veículo" value="ABC1D23 · Civic" />
          </div>
          <div className="border-t border-[--color-mp-line] pt-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <div className="text-right">
                {method === "pix" && (
                  <div className="text-xs text-[--color-mp-text-muted] line-through">
                    R$ {total}
                  </div>
                )}
                <div className="text-2xl font-semibold tabular-nums">
                  R$ {method === "pix" ? totalPix : total}
                </div>
              </div>
            </div>
            <Button size="lg" className="w-full mt-4" onClick={onNext}>
              {method === "pix" && "Pagar com PIX"}
              {method === "card" && "Pagar com cartão"}
              {method === "later" && "Garantir vaga"}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <div className="text-center text-[10px] text-[--color-mp-text-muted] font-mono uppercase tracking-wider mt-3">
              Pagamento processado pelo Asaas · split automático
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[--color-mp-text-soft]">{label}</span>
      <span className="font-medium text-right truncate">{value}</span>
    </div>
  );
}

function PayOption({
  label,
  badge,
  badgeVariant,
  full,
  value,
  description,
  active,
  onClick,
}: {
  id: string;
  label: string;
  badge: string;
  badgeVariant: "success" | "ghost";
  full?: number;
  value: number;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-5 rounded-2xl border-2 transition-all",
        active
          ? "border-[--color-mp-red] bg-white shadow-[var(--shadow-card)]"
          : "border-[--color-mp-line] bg-white hover:border-[--color-mp-text]"
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0",
              active
                ? "border-[--color-mp-red] bg-[--color-mp-red]"
                : "border-[--color-mp-line]"
            )}
          >
            {active && <div className="h-1.5 w-1.5 bg-white rounded-full" />}
          </div>
          <span className="font-semibold">{label}</span>
        </div>
        <Badge variant={badgeVariant} size="sm">
          {badge}
        </Badge>
      </div>
      <div className="ml-7 mt-1 flex items-baseline gap-2">
        {full && (
          <span className="text-xs text-[--color-mp-text-muted] line-through tabular-nums">
            R$ {full}
          </span>
        )}
        <span className="text-xl font-semibold tabular-nums">R$ {value}</span>
      </div>
      <p className="ml-7 mt-1.5 text-xs text-[--color-mp-text-soft]">
        {description}
      </p>
    </button>
  );
}

// ====================================================================
function Step5({ unit }: { unit: (typeof UNITS)[number] }) {
  return (
    <div className="bg-white border border-[--color-mp-line] rounded-3xl p-6 md:p-10 text-center">
      <div className="inline-flex h-16 w-16 rounded-full bg-[--color-mp-success-soft] items-center justify-center mb-6">
        <Check className="h-7 w-7 text-[--color-mp-success]" />
      </div>
      <Badge variant="success" size="md" dot className="mb-3 mx-auto">
        Reserva confirmada
      </Badge>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] text-[--color-mp-ink]">
        Tudo pronto, Mariana 🚗
      </h1>
      <p className="mt-2 text-[--color-mp-text-soft] max-w-md mx-auto">
        Sua vaga está garantida em {unit.name}. Comprovante e QR Code chegaram
        no seu email + WhatsApp.
      </p>

      {/* QR mock */}
      <div className="mt-8 inline-flex flex-col items-center gap-3 p-7 rounded-2xl bg-[--color-mp-ink]">
        <div className="h-40 w-40 bg-white p-3 rounded-xl flex items-center justify-center">
          <FakeQR />
        </div>
        <div className="text-white font-mono text-xs tracking-[0.18em] uppercase">
          MP-2026-A8F3K · 14 mai · 06:00
        </div>
      </div>

      <div className="mt-7 grid grid-cols-2 md:grid-cols-3 gap-2 max-w-lg mx-auto">
        <Button variant="outline" size="md">
          Abrir no Maps
        </Button>
        <Button variant="outline" size="md">
          <Copy className="h-3.5 w-3.5" />
          Comprovante
        </Button>
        <Button variant="outline" size="md" className="col-span-2 md:col-span-1">
          Falar no WhatsApp
        </Button>
      </div>

      <div className="mt-8 max-w-md mx-auto p-4 rounded-xl bg-[--color-mp-cream]/60 text-left">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[--color-mp-red] mb-2">
          Próximos passos
        </div>
        <ul className="text-sm space-y-1.5 text-[--color-mp-text]">
          <li>• Lembrete por WhatsApp 24h e 2h antes</li>
          <li>• Apresente o QR na entrada da unidade</li>
          <li>• Cancelamento grátis até 48h antes</li>
        </ul>
      </div>
    </div>
  );
}

function FakeQR() {
  return (
    <div className="grid grid-cols-12 gap-px h-full w-full">
      {Array.from({ length: 144 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "aspect-square",
            (i * 17) % 3 === 0 || (i * 7) % 5 === 0 ? "bg-[--color-mp-ink]" : "bg-white"
          )}
        />
      ))}
    </div>
  );
}
