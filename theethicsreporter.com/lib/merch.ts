import merchData from "@/data/merch.json";

export interface MerchProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  baseCost: number;
  category: string;
  image: string;
  quote: string;
  attribution: string;
  sizes?: string[];
  colors?: string[];
  printMethod: string;
  blank: string;
  theme: string;
}

export const merch: MerchProduct[] = merchData as MerchProduct[];

export function getMerchById(id: string): MerchProduct | undefined {
  return merch.find((p) => p.id === id);
}

export function getMerchByCategory(category: string): MerchProduct[] {
  return merch.filter((p) => p.category === category);
}

export function getMerchByTheme(theme: string): MerchProduct[] {
  return merch.filter((p) => p.theme === theme);
}

// Normalize the merch image path: data references "/products/x.jpg"; on the
// main site the files live under "/shop/x.jpg".
export function merchImage(p: MerchProduct): string {
  const file = p.image.replace(/^\/products\//, "").replace(/^\//, "");
  return `/shop/${file}`;
}

export const merchCategories = [
  { id: "all", name: "All Products", slug: "all" },
  { id: "tshirt", name: "T-Shirts", slug: "t-shirts" },
  { id: "hoodie", name: "Hoodies", slug: "hoodies" },
  { id: "crewneck", name: "Crewnecks", slug: "crewnecks" },
  { id: "longsleeve", name: "Long Sleeve", slug: "long-sleeve" },
  { id: "hat", name: "Hats", slug: "hats" },
  { id: "beanie", name: "Beanies", slug: "beanies" },
  { id: "mug", name: "Mugs", slug: "mugs" },
  { id: "tumbler", name: "Tumblers", slug: "tumblers" },
  { id: "tote", name: "Totes", slug: "totes" },
  { id: "socks", name: "Socks", slug: "socks" },
  { id: "sticker", name: "Stickers", slug: "stickers" },
  { id: "pin", name: "Pins", slug: "pins" },
  { id: "yardsign", name: "Yard Signs", slug: "yard-signs" },
];

export const merchThemes = [
  { id: "revolution", name: "Revolution", tagline: "The spirit of 1776" },
  { id: "liberty", name: "Liberty", tagline: "The first principle" },
  { id: "freedom", name: "Freedom", tagline: "The cause we defend" },
  { id: "resistance", name: "Resistance", tagline: "Duty in the face of tyranny" },
  { id: "constitution", name: "Constitution", tagline: "The document we never abandon" },
];

export function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    tshirt: "T-Shirt", hoodie: "Hoodie", crewneck: "Crewneck", longsleeve: "Long Sleeve",
    hat: "Hat", beanie: "Beanie", mug: "Mug", tumbler: "Tumbler", tote: "Tote",
    socks: "Socks", sticker: "Sticker", pin: "Enamel Pin", yardsign: "Yard Sign",
  };
  return map[cat] || cat;
}

export const SHIPPING_PER_ITEM = 999; // $9.99 per item, US only
