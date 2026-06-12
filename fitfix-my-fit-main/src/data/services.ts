import mensImg from "@/assets/mens.jpg";
import womensImg from "@/assets/womens.jpg";
import jeansImg from "@/assets/jeans.jpg";
import expressImg from "@/assets/express.jpg";
import heroImg from "@/assets/hero.jpg";
import workspaceImg from "@/assets/tailor-workspace.jpg";

export type ServicePrice = { S: number; M: number; L: number };
export type ServiceItem = {
  slug: string;
  name: string;
  desc: string;
  prices: ServicePrice;
};
export type ServiceCategory = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  images: string[];
  items: ServiceItem[];
};

export const fmtPKR = (n: number) =>
  "Rs " + n.toLocaleString("en-PK");

export const categories: ServiceCategory[] = [
  {
    slug: "mens-wear",
    title: "Men's Wear",
    subtitle: "Shirts, trousers, suits & blazers",
    description:
      "Tailored adjustments for shirts, pants and suits — handled by master tailors with 10+ years of experience.",
    images: [mensImg, heroImg, workspaceImg],
    items: [
      { slug: "shirt-fitting", name: "Shirt fitting", desc: "Tapered sides, sleeve and collar adjustments.", prices: { S: 1500, M: 2000, L: 2500 } },
      { slug: "pant-fitting", name: "Pant fitting", desc: "Waist, length and taper for the perfect drape.", prices: { S: 1800, M: 2300, L: 2800 } },
      { slug: "suit-alteration", name: "Suit alteration", desc: "Jacket, trousers and full ensemble tailoring.", prices: { S: 8000, M: 10000, L: 13000 } },
      { slug: "blazer-resize", name: "Blazer resize", desc: "Shoulder, body and sleeve resize.", prices: { S: 5000, M: 6500, L: 8500 } },
    ],
  },
  {
    slug: "womens-wear",
    title: "Women's Wear",
    subtitle: "Dresses, tops & skirts",
    description:
      "Refined silhouette work for dresses, kurtas and tops with invisible stitching and color-matched threads.",
    images: [womensImg, heroImg, jeansImg],
    items: [
      { slug: "dress-fitting", name: "Dress fitting", desc: "Bust, waist, hip and silhouette refinement.", prices: { S: 2500, M: 3500, L: 4500 } },
      { slug: "sleeve-adjustment", name: "Sleeve adjustment", desc: "Length, width and cuff modifications.", prices: { S: 1200, M: 1600, L: 2000 } },
      { slug: "length-alteration", name: "Length alteration", desc: "Hemming with invisible stitching.", prices: { S: 1500, M: 2000, L: 2800 } },
      { slug: "skirt-resize", name: "Skirt resize", desc: "Waist and length adjustments.", prices: { S: 1800, M: 2300, L: 3000 } },
    ],
  },
  {
    slug: "jeans-pants",
    title: "Jeans & Pants",
    subtitle: "Denim, chinos & trousers",
    description:
      "From hemming to full taper — denim and chinos finished with the right thread weight and back-tack reinforcement.",
    images: [jeansImg, mensImg, workspaceImg],
    items: [
      { slug: "hem-length", name: "Hem & length", desc: "Original-hem or clean-hem finish.", prices: { S: 1200, M: 1600, L: 2000 } },
      { slug: "waist-alteration", name: "Waist alteration", desc: "In or out at the waistband.", prices: { S: 1800, M: 2300, L: 3000 } },
      { slug: "taper-legs", name: "Taper legs", desc: "Slim through the thigh and ankle.", prices: { S: 2000, M: 2800, L: 3500 } },
      { slug: "zip-replacement", name: "Zip replacement", desc: "Quality YKK zippers, color-matched.", prices: { S: 1500, M: 1800, L: 2200 } },
    ],
  },
  {
    slug: "repairs",
    title: "Repairs",
    subtitle: "Quick fixes & restorations",
    description:
      "Zippers, buttons, tears and seam reinforcement — turn around in 48 hours.",
    images: [workspaceImg, jeansImg, mensImg],
    items: [
      { slug: "zip-replacement-r", name: "Zip replacement", desc: "Quality YKK zippers, color-matched.", prices: { S: 1500, M: 1800, L: 2200 } },
      { slug: "button-fixing", name: "Button fixing", desc: "Replace, reattach or refresh buttons.", prices: { S: 500, M: 800, L: 1200 } },
      { slug: "stitching-repairs", name: "Stitching repairs", desc: "Tears, hems and seam reinforcement.", prices: { S: 1000, M: 1500, L: 2000 } },
    ],
  },
  {
    slug: "express",
    title: "Express Services",
    subtitle: "48-hour turnaround",
    description:
      "Need it tomorrow? Our express line jumps the queue without compromising on finish.",
    images: [expressImg, heroImg, jeansImg],
    items: [
      { slug: "same-day-stitch", name: "Same-day stitch", desc: "Pickup before noon, back by evening.", prices: { S: 3000, M: 3800, L: 4800 } },
      { slug: "48hr-full-alteration", name: "48hr full alteration", desc: "Complete alteration in 48 hours.", prices: { S: 4500, M: 5800, L: 7500 } },
      { slug: "rush-button-zip", name: "Rush button & zip", desc: "Same-day rush repair.", prices: { S: 1800, M: 2300, L: 2800 } },
    ],
  },
];

export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
