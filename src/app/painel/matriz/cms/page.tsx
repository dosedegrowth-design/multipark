import { PainelShell } from "@/components/painel/PainelShell";
import { PanelCard, PanelEyebrow } from "@/components/painel/PanelCard";
import { Plus, FileText, Edit3, Eye, Globe, Image as ImageIcon, ExternalLink, Layers } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const PAGES = [
  { title: "Home", path: "/", lastEdit: "há 2h", editor: "Lucas C.", views30d: 184320, status: "publicado" },
  { title: "TAG MultiPark", path: "/tag", lastEdit: "há 1d", editor: "Marina S.", views30d: 38420, status: "publicado" },
  { title: "Multicliente", path: "/multicliente", lastEdit: "há 3d", editor: "Lucas C.", views30d: 28940, status: "publicado" },
  { title: "Empresas (B2B)", path: "/empresas", lastEdit: "há 5d", editor: "Pedro T.", views30d: 12480, status: "publicado" },
  { title: "Franquia", path: "/franquia", lastEdit: "há 7d", editor: "Marina S.", views30d: 9240, status: "publicado" },
  { title: "Sobre", path: "/sobre", lastEdit: "há 2 sem", editor: "Lucas C.", views30d: 6820, status: "publicado" },
  { title: "Contato", path: "/contato", lastEdit: "há 3 sem", editor: "Pedro T.", views30d: 4180, status: "publicado" },
  { title: "Blog · Como reservar", path: "/blog/como-reservar", lastEdit: "há 1d", editor: "Marina S.", views30d: 0, status: "rascunho" },
];

const SECTIONS = [
  { name: "Hero da Home", desc: "Headline + busca + slider", lastEdit: "há 2h" },
  { name: "Banner TAG", desc: "Promoção da TAG MultiPark", lastEdit: "há 4 dias" },
  { name: "Cards de aeroportos", desc: "GRU/CGH/VCP/CNF preços", lastEdit: "há 1 semana" },
  { name: "Reviews destacadas", desc: "Carrossel de prova social", lastEdit: "há 2 semanas" },
];

export const metadata = { title: "CMS · Matriz" };

export default function MatrizCMSPage() {
  return (
    <PainelShell
      variant="matriz"
      active="cms"
      pageSubtitle="Gestão de conteúdo · Site institucional"
      pageTitle="Páginas e seções globais"
      badge={
        <button className="h-9 px-3 rounded-lg bg-mp-red text-sm font-medium flex items-center gap-2">
          <Plus className="h-3.5 w-3.5" />
          Nova página
        </button>
      }
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <Mini label="Páginas publicadas" value="32" Icon={FileText} />
        <Mini label="Seções globais" value="14" Icon={Layers} />
        <Mini label="Views site · 30d" value="284k" Icon={Eye} trend="+22%" />
        <Mini label="Tempo médio" value="3:42" Icon={Globe} trend="+12s" />
      </div>

      <div className="grid xl:grid-cols-[2fr_1fr] gap-3">
        {/* Páginas */}
        <PanelCard className="p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <PanelEyebrow>Páginas do site</PanelEyebrow>
              <div className="font-semibold mt-0.5">{PAGES.length} páginas</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs text-white/65 hover:text-white">Filtrar</button>
              <button className="text-xs text-mp-red font-medium hover:underline">
                Ver todas →
              </button>
            </div>
          </div>
          <div className="divide-y divide-white/5">
            {PAGES.map((p) => (
              <div key={p.path} className="p-4 hover:bg-white/[0.02] flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4 text-white/65" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{p.title}</span>
                    <Badge
                      variant={p.status === "publicado" ? "success" : "warning"}
                      size="sm"
                      dot
                    >
                      {p.status}
                    </Badge>
                  </div>
                  <div className="text-[11px] font-mono text-white/45 mt-0.5 flex items-center gap-2">
                    <code className="text-mp-red">{p.path}</code>
                    <span>·</span>
                    <span>Editado {p.lastEdit} por {p.editor}</span>
                  </div>
                </div>
                <div className="hidden md:block text-right shrink-0">
                  <div className="text-sm font-semibold tabular-nums">
                    {p.views30d.toLocaleString("pt-BR")}
                  </div>
                  <div className="text-[10px] font-mono text-white/45 uppercase">views 30d</div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="h-8 px-2.5 rounded-md hover:bg-white/10 flex items-center gap-1.5 text-xs">
                    <Edit3 className="h-3 w-3" />
                    Editar
                  </button>
                  <button className="h-8 w-8 rounded-md hover:bg-white/10 flex items-center justify-center">
                    <ExternalLink className="h-3.5 w-3.5 text-white/55" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </PanelCard>

        {/* Seções globais + assets */}
        <div className="space-y-3">
          <PanelCard>
            <div className="flex items-center justify-between mb-3">
              <div>
                <PanelEyebrow>Seções globais</PanelEyebrow>
                <div className="font-semibold mt-0.5">Aparecem em várias páginas</div>
              </div>
              <button className="h-7 w-7 rounded-md bg-white/10 hover:bg-white/15 flex items-center justify-center">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="space-y-2">
              {SECTIONS.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04]"
                >
                  <div className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <Layers className="h-4 w-4 text-white/65" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{s.name}</div>
                    <div className="text-[11px] text-white/55 truncate">{s.desc}</div>
                    <div className="text-[10px] font-mono text-white/40 mt-0.5">
                      {s.lastEdit}
                    </div>
                  </div>
                  <button className="h-7 w-7 rounded-md hover:bg-white/10 flex items-center justify-center">
                    <Edit3 className="h-3 w-3 text-white/55" />
                  </button>
                </div>
              ))}
            </div>
          </PanelCard>

          <PanelCard>
            <div className="flex items-center justify-between mb-3">
              <PanelEyebrow>Biblioteca de mídia</PanelEyebrow>
              <Badge variant="ghost" size="sm" className="bg-white/5 text-white/65">
                428 arquivos
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-md bg-gradient-to-br from-mp-red-15 to-transparent"
                />
              ))}
            </div>
            <button className="w-full h-9 rounded-lg border border-white/15 text-sm font-medium hover:bg-white/5 flex items-center justify-center gap-1.5">
              <ImageIcon className="h-3.5 w-3.5" />
              Acessar biblioteca
            </button>
          </PanelCard>

          <PanelCard variant="red">
            <Globe className="h-6 w-6 mb-2" />
            <div className="font-semibold mb-1">SEO global</div>
            <p className="text-sm text-white/85 mb-3">
              Schema.org, sitemap, robots, redirects 301 e Search Console todos sincronizados.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Pill>Schema ✓</Pill>
              <Pill>Sitemap ✓</Pill>
              <Pill>301s ✓</Pill>
              <Pill>GSC ✓</Pill>
            </div>
          </PanelCard>
        </div>
      </div>
    </PainelShell>
  );
}

function Mini({
  label,
  value,
  trend,
  Icon,
}: {
  label: string;
  value: string;
  trend?: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <PanelCard className="p-4">
      <div className="flex items-center justify-between mb-1.5">
        <PanelEyebrow>{label}</PanelEyebrow>
        <Icon className="h-3.5 w-3.5 text-white/30" />
      </div>
      <div className="text-2xl font-semibold tabular-nums">{value}</div>
      {trend && <div className="mt-1 text-[11px] text-mp-success">{trend}</div>}
    </PanelCard>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-black/30 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider text-center">
      {children}
    </span>
  );
}
