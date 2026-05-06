import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MultiPark · 50 anos cuidando do seu carro",
  description:
    "Reserve sua vaga em 2 minutos. Aeroportos, urbano e mensalista. PIX, cartão ou pague na chegada. 50 anos de experiência, +200 unidades em todo o Brasil.",
  keywords: [
    "estacionamento",
    "estacionamento aeroporto",
    "GRU",
    "Guarulhos",
    "Viracopos",
    "Congonhas",
    "Confins",
    "valet",
    "transfer aeroporto",
    "MultiPark",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${ibmPlexMono.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-mp-paper)] text-[var(--color-mp-text)]">
        {children}
      </body>
    </html>
  );
}
