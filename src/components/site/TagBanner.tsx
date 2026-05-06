import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function TagBanner() {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <div className="relative rounded-[28px] bg-[--color-mp-ink] text-white overflow-hidden p-8 md:p-14 lg:p-16">
          {/* glow */}
          <div
            className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(225,29,46,0.25) 0%, transparent 60%)",
            }}
          />

          <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-12 items-center relative">
            <div>
              <Badge variant="redSoft" size="md" className="mb-5">
                <Zap className="h-3 w-3" />
                NOVO · TAG MULTIPARK
              </Badge>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
                Passe sem parar
                <br />
                em <span className="text-[--color-mp-red]">40+ unidades</span>
                <br />e em todas as rodovias.
              </h2>
              <p className="mt-5 text-base md:text-lg text-white/65 max-w-md leading-relaxed">
                A TAG MultiPark integra estacionamento e pedágio no mesmo
                dispositivo. Sem fila, sem cartão, sem fricção.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button variant="primary" size="lg" href="/tag">
                  Conheça a TAG
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  href="/tag"
                  className="text-white hover:bg-white/10"
                >
                  Como funciona
                </Button>
              </div>
            </div>

            {/* Mock TAG */}
            <div className="relative h-[280px] md:h-[360px] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-44 w-72 md:h-56 md:w-96 bg-white rounded-2xl shadow-2xl rotate-[-6deg] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[--color-mp-cream]" />
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.2em] text-[--color-mp-text-muted]">
                        TAG · MULTIPARK
                      </div>
                      <div className="text-[--color-mp-ink] font-bold text-2xl md:text-3xl mt-1 tracking-tight">
                        Multi<span className="text-[--color-mp-red]">ParK</span>
                      </div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-[--color-mp-red] flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div className="font-mono text-[10px] text-[--color-mp-text-soft]">
                      ID 0042 8821 · ATIVA
                    </div>
                    <div className="h-1 w-12 bg-[--color-mp-red] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
