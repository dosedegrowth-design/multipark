export type UnitBadge =
  | "ABERTO 24H"
  | "COBERTO"
  | "VALET"
  | "TRANSFER 24H"
  | "SEGURO R$1M"
  | "EV CHARGER"
  | "MANOBRISTA"
  | "LAVAGEM";

export type UnitCategory = "aeroporto" | "urbano" | "shopping";

export type UnitStatus = "aberto" | "lotado" | "fechado" | "manutencao";

export type Unit = {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  region: string;
  category: UnitCategory;
  airport?: "GRU" | "CGH" | "VCP" | "CNF";
  airportCode?: string;
  address: string;
  zip: string;
  distance?: { km: number; minutes: number; to: string };
  rating: number;
  reviews: number;
  status: UnitStatus;
  vagasLivres: number;
  totalVagas: number;
  badges: UnitBadge[];
  prices: {
    avulso: { full: number; promo: number };
    pkg3: { full: number; promo: number };
    pkg7: { full: number; promo: number };
    pkg15: { full: number; promo: number };
    mensalista: number;
    transfer?: number;
    valet?: number;
  };
  description: string;
  geo: { lat: number; lng: number };
  cover: string;
  gallery: string[];
};

export const UNITS: Unit[] = [
  {
    id: "cumbica-01",
    slug: "cumbica-01",
    name: "Multipark Cumbica",
    city: "Guarulhos",
    state: "SP",
    region: "Aeroporto",
    category: "aeroporto",
    airport: "GRU",
    airportCode: "GRU",
    address: "Av. Cumbica, 2.840 — Cidade Industrial Cumbica",
    zip: "07221-010",
    distance: { km: 2.1, minutes: 6, to: "GRU" },
    rating: 4.8,
    reviews: 1247,
    status: "aberto",
    vagasLivres: 124,
    totalVagas: 380,
    badges: ["ABERTO 24H", "COBERTO", "VALET", "TRANSFER 24H", "SEGURO R$1M", "EV CHARGER"],
    prices: {
      avulso: { full: 79, promo: 65 },
      pkg3: { full: 195, promo: 159 },
      pkg7: { full: 455, promo: 343 },
      pkg15: { full: 870, promo: 649 },
      mensalista: 890,
      transfer: 0,
      valet: 49,
    },
    description:
      "A unidade mais próxima do Terminal 2 de Guarulhos. Pátio coberto com câmeras 24h, manobrista CLT e shuttle gratuito a cada 15 minutos. Aceita TAG MultiPark, Sem Parar, ConectCar, Veloe e Green Pass.",
    geo: { lat: -23.4263, lng: -46.4828 },
    cover: "/units/cumbica-01/cover.jpg",
    gallery: [],
  },
  {
    id: "cumbica-premium",
    slug: "cumbica-premium",
    name: "Multipark Premium GRU",
    city: "Guarulhos",
    state: "SP",
    region: "Aeroporto",
    category: "aeroporto",
    airport: "GRU",
    airportCode: "GRU",
    address: "Av. Monteiro Lobato, 2.738 — Guarulhos",
    zip: "07190-000",
    distance: { km: 0.8, minutes: 3, to: "GRU" },
    rating: 4.9,
    reviews: 856,
    status: "aberto",
    vagasLivres: 41,
    totalVagas: 180,
    badges: ["ABERTO 24H", "COBERTO", "VALET", "TRANSFER 24H", "SEGURO R$1M"],
    prices: {
      avulso: { full: 109, promo: 89 },
      pkg3: { full: 285, promo: 239 },
      pkg7: { full: 623, promo: 499 },
      pkg15: { full: 1185, promo: 949 },
      mensalista: 1290,
      transfer: 0,
      valet: 79,
    },
    description:
      "Acesso direto ao terminal em 3 minutos. Manobrista premium 24h e shuttle exclusivo. Indicado para viagens executivas e corporativas.",
    geo: { lat: -23.4356, lng: -46.4734 },
    cover: "/units/cumbica-premium/cover.jpg",
    gallery: [],
  },
  {
    id: "cumbica-cargo",
    slug: "cumbica-cargo",
    name: "Multipark Cargo",
    city: "Guarulhos",
    state: "SP",
    region: "Aeroporto",
    category: "aeroporto",
    airport: "GRU",
    airportCode: "GRU",
    address: "Av. Industrial Diadema, 1.100 — Cidade Industrial Cumbica",
    zip: "07221-200",
    distance: { km: 3.4, minutes: 10, to: "GRU" },
    rating: 4.7,
    reviews: 612,
    status: "aberto",
    vagasLivres: 220,
    totalVagas: 280,
    badges: ["ABERTO 24H", "TRANSFER 24H", "SEGURO R$1M"],
    prices: {
      avulso: { full: 49, promo: 35 },
      pkg3: { full: 125, promo: 95 },
      pkg7: { full: 285, promo: 215 },
      pkg15: { full: 545, promo: 419 },
      mensalista: 690,
      transfer: 0,
    },
    description:
      "Opção econômica com a mesma segurança Multipark. Descoberto, com transfer gratuito 24h a cada 20 minutos.",
    geo: { lat: -23.4189, lng: -46.4901 },
    cover: "/units/cumbica-cargo/cover.jpg",
    gallery: [],
  },
  {
    id: "viracopos-01",
    slug: "viracopos-01",
    name: "Multipark Viracopos",
    city: "Campinas",
    state: "SP",
    region: "Aeroporto",
    category: "aeroporto",
    airport: "VCP",
    airportCode: "VCP",
    address: "R. Antônio Luchiari, 1.100 — Distrito Industrial",
    zip: "13069-000",
    distance: { km: 1.5, minutes: 5, to: "VCP" },
    rating: 4.7,
    reviews: 423,
    status: "aberto",
    vagasLivres: 88,
    totalVagas: 220,
    badges: ["ABERTO 24H", "COBERTO", "VALET", "TRANSFER 24H"],
    prices: {
      avulso: { full: 59, promo: 39 },
      pkg3: { full: 155, promo: 119 },
      pkg7: { full: 355, promo: 269 },
      pkg15: { full: 685, promo: 519 },
      mensalista: 690,
      transfer: 0,
      valet: 39,
    },
    description:
      "Próximo ao aeroporto de Viracopos com shuttle gratuito 24h. Estrutura coberta e manobrista.",
    geo: { lat: -23.0067, lng: -47.1345 },
    cover: "/units/viracopos-01/cover.jpg",
    gallery: [],
  },
  {
    id: "congonhas-01",
    slug: "congonhas-01",
    name: "Multipark Congonhas",
    city: "São Paulo",
    state: "SP",
    region: "Aeroporto",
    category: "aeroporto",
    airport: "CGH",
    airportCode: "CGH",
    address: "R. Baronesa de Bela Vista, 499 — Vila Congonhas",
    zip: "04612-002",
    distance: { km: 1.2, minutes: 4, to: "CGH" },
    rating: 4.6,
    reviews: 318,
    status: "lotado",
    vagasLivres: 0,
    totalVagas: 140,
    badges: ["ABERTO 24H", "COBERTO", "VALET"],
    prices: {
      avulso: { full: 75, promo: 55 },
      pkg3: { full: 195, promo: 155 },
      pkg7: { full: 425, promo: 339 },
      pkg15: { full: 815, promo: 619 },
      mensalista: 890,
    },
    description:
      "Coberto e próximo ao Aeroporto de Congonhas. Atende voos domésticos e ponte aérea com Rio.",
    geo: { lat: -23.6273, lng: -46.6553 },
    cover: "/units/congonhas-01/cover.jpg",
    gallery: [],
  },
  {
    id: "confins-01",
    slug: "confins-01",
    name: "Multipark Confins",
    city: "Lagoa Santa",
    state: "MG",
    region: "Aeroporto",
    category: "aeroporto",
    airport: "CNF",
    airportCode: "CNF",
    address: "Av. Adélia Issa, 999 — Santo Antônio",
    zip: "33400-000",
    distance: { km: 2.5, minutes: 7, to: "CNF" },
    rating: 4.7,
    reviews: 287,
    status: "aberto",
    vagasLivres: 156,
    totalVagas: 200,
    badges: ["ABERTO 24H", "TRANSFER 24H", "SEGURO R$1M"],
    prices: {
      avulso: { full: 49, promo: 35 },
      pkg3: { full: 129, promo: 99 },
      pkg7: { full: 295, promo: 235 },
      pkg15: { full: 569, promo: 449 },
      mensalista: 590,
      transfer: 0,
    },
    description:
      "Atende o Aeroporto Internacional de Confins / BH com shuttle gratuito 24h.",
    geo: { lat: -19.6336, lng: -43.9686 },
    cover: "/units/confins-01/cover.jpg",
    gallery: [],
  },
  {
    id: "av-paulista",
    slug: "av-paulista",
    name: "Multipark Av. Paulista",
    city: "São Paulo",
    state: "SP",
    region: "Centro",
    category: "urbano",
    address: "Av. Paulista, 1374 — Bela Vista",
    zip: "01310-100",
    rating: 4.5,
    reviews: 542,
    status: "aberto",
    vagasLivres: 32,
    totalVagas: 120,
    badges: ["COBERTO", "MANOBRISTA"],
    prices: {
      avulso: { full: 35, promo: 28 },
      pkg3: { full: 95, promo: 75 },
      pkg7: { full: 215, promo: 165 },
      pkg15: { full: 415, promo: 319 },
      mensalista: 690,
    },
    description:
      "Estacionamento no coração da Paulista. Coberto, com manobrista e câmeras 24h.",
    geo: { lat: -23.5614, lng: -46.6562 },
    cover: "/units/av-paulista/cover.jpg",
    gallery: [],
  },
  {
    id: "centro-sp",
    slug: "centro-sp",
    name: "Multipark Centro SP",
    city: "São Paulo",
    state: "SP",
    region: "Centro",
    category: "urbano",
    address: "R. Líbero Badaró, 425 — Centro Histórico",
    zip: "01009-000",
    rating: 4.4,
    reviews: 387,
    status: "aberto",
    vagasLivres: 48,
    totalVagas: 95,
    badges: ["COBERTO"],
    prices: {
      avulso: { full: 29, promo: 22 },
      pkg3: { full: 79, promo: 59 },
      pkg7: { full: 175, promo: 135 },
      pkg15: { full: 339, promo: 259 },
      mensalista: 590,
    },
    description: "No coração do centro histórico, próximo a Sé, Praça da República e Anhangabaú.",
    geo: { lat: -23.5478, lng: -46.6342 },
    cover: "/units/centro-sp/cover.jpg",
    gallery: [],
  },
];

export const AIRPORTS = [
  { code: "GRU", name: "Guarulhos", units: 12, badge: "transfer 24h", priceFrom: 49 },
  { code: "VCP", name: "Viracopos", units: 5, badge: "valet", priceFrom: 39 },
  { code: "CGH", name: "Congonhas", units: 3, badge: "coberto", priceFrom: 55 },
  { code: "CNF", name: "Confins", units: 2, badge: "24h", priceFrom: 35 },
];

export function getUnitBySlug(slug: string): Unit | undefined {
  return UNITS.find((u) => u.slug === slug);
}

export function getUnitsByAirport(code: string): Unit[] {
  return UNITS.filter((u) => u.airport === code);
}
