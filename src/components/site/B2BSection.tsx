import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";

export function B2BSection() {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {/* Multicliente */}
          <div className="relative rounded-[24px] p-8 md:p-12 overflow-hidden bg-gradient-to-br from-[var(--color-mp-cream)] to-white border border-[var(--color-mp-line)] group hover:shadow-[var(--shadow-pop)] transition-shadow">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-mp-red)] mb-3">
              Programa Multicliente
            </div>
            <h3 className="text-2xl md:text-4xl font-semibold tracking-tight leading-[1.05] text-[var(--color-mp-ink)] max-w-md">
              30% off em 150+ estacionamentos.
            </h3>
            <p className="mt-4 text-[var(--color-mp-text-soft)] max-w-md leading-relaxed">
              Para mensalistas Multipark e parceiros credenciados. Funciona
              automaticamente no checkout.
            </p>
            <div className="mt-6">
              <Button variant="outline" size="md" href="/multicliente">
                Cadastrar grátis
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Empresas */}
          <div className="relative rounded-[24px] p-8 md:p-12 overflow-hidden bg-[var(--color-mp-ink)] text-white border border-[var(--color-mp-ink)] group hover:shadow-[var(--shadow-pop)] transition-shadow">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-mp-red)] mb-3">
              Multiselo · Empresas
            </div>
            <h3 className="text-2xl md:text-4xl font-semibold tracking-tight leading-[1.05] max-w-md">
              Ofereça estacionamento aos seus clientes.
            </h3>
            <p className="mt-4 text-white/65 max-w-md leading-relaxed">
              Selos digitais para escritórios, lojas e shoppings validarem
              estadias dos clientes — paga a empresa, ganha o cliente.
            </p>
            <div className="mt-6">
              <Button
                variant="ghost"
                size="md"
                href="/empresas"
                className="text-white border border-white/20 hover:bg-white/10"
              >
                Falar com B2B
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
