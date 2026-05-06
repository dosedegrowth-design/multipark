import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

const FOOTER_NAV = [
  {
    title: "Unidades",
    links: [
      { label: "Guarulhos · GRU", href: "/aeroportos/guarulhos" },
      { label: "Viracopos · VCP", href: "/aeroportos/viracopos" },
      { label: "Congonhas · CGH", href: "/aeroportos/congonhas" },
      { label: "Confins · CNF", href: "/aeroportos/confins" },
      { label: "Todas as unidades", href: "/unidades" },
    ],
  },
  {
    title: "Produtos",
    links: [
      { label: "Reserva online", href: "/reservar" },
      { label: "Mensalista", href: "/mensalista" },
      { label: "TAG MultiPark", href: "/tag" },
      { label: "Multicliente", href: "/multicliente" },
      { label: "Multiselo", href: "/empresas" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: "/sobre" },
      { label: "Franquia", href: "/franquia" },
      { label: "Empresas", href: "/empresas" },
      { label: "Blog", href: "/blog" },
      { label: "Contato", href: "/contato" },
      { label: "Trabalhe conosco", href: "/trabalhe-conosco" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Central de ajuda", href: "/ajuda" },
      { label: "Política de cancelamento", href: "/cancelamento" },
      { label: "Privacidade & LGPD", href: "/privacidade" },
      { label: "Termos de uso", href: "/termos" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-mp-wine-900)] text-white mt-32">
      <Container>
        <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="h-8 w-8 rounded-full bg-[var(--color-mp-red)] flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-lg">
                MultiPar<span className="text-[var(--color-mp-red)]">K</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 max-w-xs leading-relaxed mb-6">
              50 anos cuidando do seu carro. Aeroportos, urbano e mensalista — a
              maior rede de estacionamentos pra quem viaja.
            </p>
            <div className="flex items-center gap-3">
              <SocialLink label="Instagram" href="https://instagram.com/multiparkoficial">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </SocialLink>
              <SocialLink label="Facebook" href="#">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </SocialLink>
              <SocialLink label="LinkedIn" href="#">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14M18.5 18.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </SocialLink>
              <SocialLink label="YouTube" href="#">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M23 9.71a8.5 8.5 0 0 0-.91-4.13 2.92 2.92 0 0 0-1.72-1A78.36 78.36 0 0 0 12 4.27a78.45 78.45 0 0 0-8.34.3 2.87 2.87 0 0 0-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 0 0 0 6.48 9.55 9.55 0 0 0 .3 2 3.14 3.14 0 0 0 .71 1.36 2.86 2.86 0 0 0 1.49.78A45.18 45.18 0 0 0 8 19.71c2.61.04 4.9 0 7.61-.21a2.84 2.84 0 0 0 1.53-.78c.3-.3.53-.66.7-1.05A8.84 8.84 0 0 0 23 14.39c.04-.79 0-3.85 0-4.68zM9.74 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08z" />
                </svg>
              </SocialLink>
            </div>
          </div>

          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-mp-red)] mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/75 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/45">
          <div>
            © {new Date().getFullYear()} MultiPark Estacionamentos · CNPJ
            00.000.000/0001-00 · 50 anos
          </div>
          <div className="flex items-center gap-4 font-mono uppercase tracking-wider">
            <span>SELO ABF</span>
            <span>·</span>
            <span>SSL</span>
            <span>·</span>
            <span>LGPD</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-[var(--color-mp-wine-900)] transition-colors"
    >
      {children}
    </Link>
  );
}
