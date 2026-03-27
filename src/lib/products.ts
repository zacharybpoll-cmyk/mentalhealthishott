export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type ProductColor = "black" | "white" | "cream";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  priceRange: string;
  cogs: number;
  tier: 1 | 2 | 3;
  category: "hoodie" | "tee" | "jogger" | "set";
  colors: ProductColor[];
  sizes: ProductSize[];
  images: string[];
  video?: string; // optional product video
  therapySessions: number;
  stripeProductId?: string;
  stripePriceId?: string;
  details: string[];
  careInstructions: string;
  isFounding: boolean;
}

export const PRODUCTS: Product[] = [
  {
    slug: "black-hoodie",
    name: "Classic Hoodie",
    tagline: "Wear the conversation.",
    description:
      "Our flagship hoodie. Premium heavyweight French terry — the kind that holds its shape, wears soft, and gets better with every wash. Built for people who refuse to shrink from who they are. 'Mental Health is Hott' embroidered on the chest because it is.",
    price: 99,
    priceRange: "$99",
    cogs: 32,
    tier: 1,
    category: "hoodie",
    colors: ["black"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["/images/products/black-hoodie-flat.png", "/images/products/black-hoodie-golden.png", "/images/products/black-hoodie-female.png", "/images/products/black-hoodie-studio.png"],
    video: "/videos/hero-cinematic.mp4",
    therapySessions: 1,
    details: [
      "Premium heavyweight French terry, 400 GSM",
      "Oversized fit — size down for a true fit",
      "Ribbed cuffs and hem",
      "Front embroidered wordmark",
      "Unisex sizing",
    ],
    careInstructions: "Machine wash cold, tumble dry low. Do not bleach.",
    isFounding: true,
  },
  {
    slug: "white-hoodie",
    name: "Classic Hoodie — White",
    tagline: "Clean. Considered. Loud in all the right ways.",
    description:
      "The same premium French terry hoodie in clean white. A statement piece that turns heads and starts conversations about the thing we all need to talk about more. Founding Collection exclusive.",
    price: 99,
    priceRange: "$99",
    cogs: 32,
    tier: 1,
    category: "hoodie",
    colors: ["white"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["/images/products/cream-hoodie-flat.png", "/images/products/white-hoodie-female.png", "/images/products/white-hoodie-golden.png", "/images/products/white-hoodie-close.jpg"],
    video: "/videos/pullback.mp4",
    therapySessions: 1,
    details: [
      "Premium heavyweight French terry, 400 GSM",
      "Oversized fit — size down for a true fit",
      "Ribbed cuffs and hem",
      "Front embroidered wordmark",
      "Unisex sizing",
    ],
    careInstructions: "Machine wash cold, tumble dry low. Do not bleach.",
    isFounding: true,
  },
  {
    slug: "oversized-tee",
    name: "Statement Tee",
    tagline: "The entry point. The conversation starter.",
    description:
      "Heavyweight oversized tee in 100% combed ring-spun cotton. Dropped shoulders, boxy cut — the silhouette that every wellness-forward brand charges $80+ for. We kept it accessible on purpose. Because mental health conversations shouldn't have a price tag.",
    price: 40,
    priceRange: "$35–45",
    cogs: 12,
    tier: 1,
    category: "tee",
    colors: ["black", "white", "cream"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["/images/products/tee-portrait.png", "/images/products/tee-standing.png", "/images/products/tee-seated.png", "/images/products/tee-bw.png"],
    therapySessions: 1,
    details: [
      "100% combed ring-spun cotton, 220 GSM",
      "Oversized boxy fit",
      "Dropped shoulders",
      "Screen-printed front graphic",
      "Available in Black, White, Cream",
    ],
    careInstructions: "Machine wash cold, inside out. Tumble dry low.",
    isFounding: true,
  },
  {
    slug: "joggers",
    name: "Comfort Joggers",
    tagline: "For the days you need to move through it.",
    description:
      "Soft, tapered joggers with an elastic waistband and deep pockets. The kind of pants you reach for when you need to feel held together — literally and figuratively. Pairs perfectly with the Classic Hoodie.",
    price: 89,
    priceRange: "$89",
    cogs: 28,
    tier: 1,
    category: "jogger",
    colors: ["black", "cream"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["/images/products/joggers-seated.png", "/images/products/joggers-standing.png", "/images/products/joggers-set.jpg"],
    therapySessions: 1,
    details: [
      "Heavyweight French terry, 380 GSM",
      "Tapered fit with elastic waistband",
      "Two deep side pockets + back pocket",
      "Small embroidered MHIH logo on left hip",
      "Available in Black and Cream",
    ],
    careInstructions: "Machine wash cold, tumble dry low.",
    isFounding: true,
  },
  {
    slug: "sweatsuit-set",
    name: "Founding Set",
    tagline: "The full statement.",
    description:
      "The Classic Hoodie and Comfort Joggers as a matched set — the highest-impact thing you can wear and the highest-impact purchase you can make. This set funds 3 therapy sessions. Worn by people who are done pretending they have it all together.",
    price: 199,
    priceRange: "$199",
    cogs: 65,
    tier: 1,
    category: "set",
    colors: ["black"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: ["/images/products/sweatsuit-set-full.jpg", "/images/products/sweatsuit-car-v2.jpg", "/images/products/sweatsuit-car-portrait.png", "/images/products/sweatsuit-duo.png"],
    video: "/videos/fashion-2.mp4",
    therapySessions: 3,
    details: [
      "Classic Hoodie + Comfort Joggers",
      "Matched French terry fabric",
      "Funds 3 therapy sessions (vs. 1 for individual pieces)",
      "Founding Collection exclusive — limited to 10 sets",
      "Comes with certificate of founding membership",
    ],
    careInstructions: "Machine wash cold, tumble dry low.",
    isFounding: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByTier(tier: number): Product[] {
  return PRODUCTS.filter((p) => p.tier === tier);
}

export const TOTAL_THERAPY_SESSIONS_PER_UNIT = 1;
