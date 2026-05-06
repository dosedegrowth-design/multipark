"use client";

import { PainelShell } from "@/components/painel/PainelShell";
import { Badge } from "@/components/ui/Badge";
import {
  Upload,
  Image as ImageIcon,
  Plus,
  GripVertical,
  X,
  ChevronRight,
  Check,
} from "lucide-react";
import { cn } from "@/lib/cn";

export default function ConteudoPage() {
  return (
    <PainelShell
      variant="operador"
      active="conteudo"
      pageSubtitle="Conteúdo · Multipark Cumbica"
      pageTitle="Fotos & preços"
      badge={
        <Badge variant="success" dot size="lg">
          Salvo · ao vivo em 30s
        </Badge>
      }
    >
      <div className="grid xl:grid-cols-[1.45fr_1fr] gap-3">
        {/* COLUNA ESQ: editor */}
        <div className="space-y-3">
          {/* FOTOS */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                  Fotos · 12 de 20
                </div>
                <div className="text-base font-semibold mt-0.5">Galeria pública</div>
              </div>
              <Badge variant="ghost" size="sm" className="bg-white/5 text-white/65">
                Drag & drop
              </Badge>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 mb-3">
              {[...Array(12)].map((_, i) => (
                <PhotoThumb key={i} idx={i} cover={i === 0} />
              ))}
            </div>

            <div className="border-2 border-dashed border-mp-red-50 rounded-xl p-5 text-center bg-mp-red-10 hover:bg-mp-red-10 transition-colors cursor-pointer">
              <Upload className="h-5 w-5 text-[var(--color-mp-red)] mx-auto mb-1.5" />
              <div className="text-sm font-medium text-[var(--color-mp-red)]">
                Arrastar fotos aqui
              </div>
              <div className="text-xs text-white/40 mt-0.5 font-mono uppercase tracking-wider">
                JPG · PNG · até 10MB · otimização automática
              </div>
            </div>
          </Card>

          {/* TABELA DE PREÇOS */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="text-base font-semibold">Tabela de preços</div>
              <button className="text-xs font-medium text-[var(--color-mp-red)] flex items-center gap-1 hover:gap-2 transition-all">
                <Plus className="h-3.5 w-3.5" />
                Criar cupom
              </button>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[10px] font-mono uppercase tracking-[0.15em] text-white/40">
                  <th className="pb-2 font-medium">Tipo</th>
                  <th className="pb-2 font-medium">Cheio</th>
                  <th className="pb-2 font-medium">Promo</th>
                  <th className="pb-2 font-medium">Vigência</th>
                  <th />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <PriceRow type="1 dia" cheio="79" promo="65" vig="28/MAI" />
                <PriceRow type="3 dias" cheio="195" promo="159" vig="28/MAI" />
                <PriceRow type="7 dias" cheio="455" promo="343" vig="28/MAI" popular />
                <PriceRow type="15 dias" cheio="870" promo="649" vig="28/MAI" />
                <PriceRow type="Mensalista" cheio="—" promo="890" vig="PERM." />
              </tbody>
            </table>

            <div className="mt-5 flex items-center justify-between p-3 rounded-xl bg-mp-red-10 border border-mp-red-30">
              <div>
                <div className="font-medium text-sm">Preço dinâmico</div>
                <div className="text-xs text-white/55 mt-0.5">
                  Lotação &gt;80% = +20% automático
                </div>
              </div>
              <Toggle on />
            </div>
          </Card>
        </div>

        {/* COLUNA DIR: tags & pixels + onboarding preview */}
        <div className="space-y-3">
          {/* TAGS & PIXELS */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                  Configurações › Tags & pixels
                </div>
                <div className="font-semibold mt-0.5">Conectados nesta unidade</div>
              </div>
              <Badge variant="success" size="sm" dot>
                Ativo
              </Badge>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              <ConnectedTag label="GTM-K7H2P" type="GTM" />
              <ConnectedTag label="G-9KX2L" type="GA4" />
              <ConnectedTag label="Meta Pixel" type="Meta" />
              <ConnectedTag label="TikTok" type="TikTok" placeholder />
            </div>

            <div className="space-y-3">
              <Field
                label="Google Tag Manager"
                value="GTM-K7H2P5Q"
                badge="Ativo"
                badgeVariant="success"
              />
              <Field label="Meta Pixel ID" value="847291056334821" badge="Editar" />
            </div>

            <div className="mt-4 p-3 rounded-xl bg-mp-red-10 border border-mp-red-30">
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-mp-red)] mb-1.5">
                Escopo isolado
              </div>
              <p className="text-xs text-white/65 leading-relaxed">
                Os pixels carregam apenas em{" "}
                <span className="font-mono text-white">/unidades/cumbica-01</span>.
                Tracking de cada franqueado fica isolado — sem vazamento entre painéis.
              </p>
            </div>
          </Card>

          {/* ONBOARDING WIZARD */}
          <Card variant="red">
            <div className="flex items-center justify-between mb-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                Onboarding · 4 passos · ~22 minutos
              </div>
              <span className="font-mono text-[10px] tracking-wider text-white/70">
                2/4
              </span>
            </div>
            <div className="font-semibold text-lg mb-4">No ar no mesmo dia.</div>

            {/* progress bar */}
            <div className="flex items-center gap-1 mb-5">
              <div className="h-1 flex-1 rounded-full bg-white" />
              <div className="h-1 flex-1 rounded-full bg-white" />
              <div className="h-1 flex-1 rounded-full bg-white/30" />
              <div className="h-1 flex-1 rounded-full bg-white/30" />
            </div>

            <div className="space-y-2">
              <WizardStep n={1} title="Dados da unidade" desc="Nome, endereço, horário · Google Places" status="done" />
              <WizardStep n={2} title="Fotos & descrição" desc="Drag & drop · otimização automática" status="active" />
              <WizardStep n={3} title="Tabela de preços" desc="Tarifas + métodos de pagamento" status="pending" />
              <WizardStep n={4} title="Publicar" desc="Preview + ir ao ar" status="pending" />
            </div>

            <div className="mt-5 p-3 rounded-xl bg-black/30 border border-white/10">
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/50 mb-1">
                Ao publicar
              </div>
              <div className="font-mono text-sm text-white">
                multipark.com.br/unidades/<span className="text-[var(--color-mp-red)]">[slug]</span>
              </div>
              <div className="text-[11px] text-white/50 mt-1.5">
                SEO indexado · WhatsApp ativo · pagamentos prontos
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PainelShell>
  );
}

function Card({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "red";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 border",
        variant === "red"
          ? "bg-[var(--color-mp-red)] border-[var(--color-mp-red)] text-white"
          : "bg-white/[0.03] border-white/10"
      )}
    >
      {children}
    </div>
  );
}

function PhotoThumb({ idx, cover }: { idx: number; cover?: boolean }) {
  return (
    <div className="aspect-square rounded-lg bg-gradient-to-br from-[#3D0A12] via-[#1A0A0F] to-[#0A0A0A] relative overflow-hidden group cursor-grab">
      {cover && (
        <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-[var(--color-mp-red)] text-white text-[8px] font-mono uppercase tracking-wider rounded">
          Capa
        </div>
      )}
      <button className="absolute top-1 right-1 h-5 w-5 rounded bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <X className="h-3 w-3 text-white" />
      </button>
      <div className="absolute bottom-1 left-1 opacity-0 group-hover:opacity-70 transition-opacity">
        <GripVertical className="h-3 w-3 text-white" />
      </div>
    </div>
  );
}

function PriceRow({
  type,
  cheio,
  promo,
  vig,
  popular,
}: {
  type: string;
  cheio: string;
  promo: string;
  vig: string;
  popular?: boolean;
}) {
  return (
    <tr
      className={cn(
        "text-sm",
        popular && "bg-mp-red-15"
      )}
    >
      <td className="py-3">
        <div className="flex items-center gap-2">
          <span className="font-medium">{type}</span>
          {popular && (
            <span className="font-mono text-[9px] tracking-[0.18em] uppercase bg-[var(--color-mp-red)] text-white px-1.5 py-0.5 rounded">
              ★ Popular
            </span>
          )}
        </div>
      </td>
      <td className="py-3 text-white/40 line-through tabular-nums">
        {cheio !== "—" ? `R$ ${cheio}` : "—"}
      </td>
      <td className="py-3 font-semibold tabular-nums">R$ {promo}</td>
      <td className="py-3 font-mono text-xs text-white/55 tracking-wider">{vig}</td>
      <td className="py-3 text-right">
        <input
          type="checkbox"
          defaultChecked
          className="h-4 w-4 accent-[var(--color-mp-red)]"
        />
      </td>
    </tr>
  );
}

function ConnectedTag({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder?: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium",
        placeholder
          ? "border border-dashed border-white/20 text-white/40"
          : "bg-mp-success-15 text-[var(--color-mp-success)]"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          placeholder ? "bg-white/20" : "bg-[var(--color-mp-success)]"
        )}
      />
      <span className="font-semibold">{type}</span>
      <span className="font-mono text-[10px] opacity-80">{label}</span>
    </div>
  );
}

function Field({
  label,
  value,
  badge,
  badgeVariant = "default",
}: {
  label: string;
  value: string;
  badge: string;
  badgeVariant?: "success" | "default";
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/45">
          {label}
        </label>
        <span
          className={cn(
            "font-mono text-[10px] uppercase tracking-wider",
            badgeVariant === "success"
              ? "text-[var(--color-mp-success)]"
              : "text-[var(--color-mp-red)] cursor-pointer"
          )}
        >
          ● {badge}
        </span>
      </div>
      <div className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 font-mono text-sm">
        {value}
      </div>
    </div>
  );
}

function WizardStep({
  n,
  title,
  desc,
  status,
}: {
  n: number;
  title: string;
  desc: string;
  status: "done" | "active" | "pending";
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-xl border",
        status === "done" && "bg-black/20 border-white/10",
        status === "active" && "bg-[var(--color-mp-wine-900)] border-white/20",
        status === "pending" && "bg-black/10 border-white/5 opacity-60"
      )}
    >
      <div
        className={cn(
          "h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0",
          status === "done" && "bg-[var(--color-mp-success)] text-white",
          status === "active" && "bg-white text-[var(--color-mp-red)]",
          status === "pending" && "bg-white/10 text-white/50"
        )}
      >
        {status === "done" ? <Check className="h-3.5 w-3.5" /> : n}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-[11px] text-white/65 mt-0.5">{desc}</div>
      </div>
      {status === "active" && (
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] bg-white/15 px-2 py-1 rounded">
          Em andamento
        </span>
      )}
      {status === "pending" && (
        <ChevronRight className="h-4 w-4 text-white/30" />
      )}
    </div>
  );
}

function Toggle({ on }: { on?: boolean }) {
  return (
    <div
      className={cn(
        "h-6 w-10 rounded-full p-0.5 transition-colors",
        on ? "bg-[var(--color-mp-red)]" : "bg-white/15"
      )}
    >
      <div
        className={cn(
          "h-5 w-5 bg-white rounded-full transition-transform",
          on && "translate-x-4"
        )}
      />
    </div>
  );
}
