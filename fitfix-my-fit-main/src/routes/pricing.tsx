import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Section } from "@/components/Section";
import { ArrowRight, Check, Zap, Truck, MapPin } from "lucide-react";
import mensImg from "@/assets/mens.jpg";
import womensImg from "@/assets/womens.jpg";
import jeansImg from "@/assets/jeans.jpg";
import expressImg from "@/assets/express.jpg";
import workspaceImg from "@/assets/tailor-workspace.jpg";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — FixMyFit" },
      { name: "description", content: "Transparent PKR pricing for shirts, dresses, jeans, express alterations and pickup & delivery." },
      { property: "og:title", content: "Pricing — FixMyFit" },
      { property: "og:description", content: "Transparent alteration pricing in PKR with pickup & delivery." },
    ],
  }),
  component: PricingPage,
});

type Sizing = "S" | "M" | "L";

const fmtPKR = (n: number) => "Rs " + n.toLocaleString("en-PK");

type SizedRow = { name: string; S: number; M: number; L: number };
type FlatRow = { name: string; price: number };

type SizedTable = {
  slug: string;
  title: string;
  subtitle: string;
  images: string[];
  rows: SizedRow[];
};

type FlatTable = {
  slug: string;
  title: string;
  subtitle: string;
  images: string[];
  unitLabel: string;
  rows: FlatRow[];
  icon: "zap" | "truck";
};

const mens: SizedTable = {
  slug: "mens-wear",
  title: "Men's Wear",
  subtitle: "Shirts, pants & suits",
  images: [mensImg, heroImg, workspaceImg],
  rows: [
    { name: "Shirt Fitting", S: 500, M: 700, L: 900 },
    { name: "Sleeve Adjustment", S: 300, M: 400, L: 500 },
    { name: "Collar Adjustment", S: 250, M: 350, L: 450 },
    { name: "Pant Length Adjustment", S: 400, M: 500, L: 600 },
    { name: "Waist Alteration", S: 450, M: 550, L: 700 },
    { name: "Suit Fitting", S: 1200, M: 1500, L: 1800 },
  ],
};

const womens: SizedTable = {
  slug: "womens-wear",
  title: "Women's Wear",
  subtitle: "Dresses, tops & party wear",
  images: [womensImg, heroImg, jeansImg],
  rows: [
    { name: "Dress Fitting", S: 700, M: 900, L: 1200 },
    { name: "Sleeve Adjustment", S: 350, M: 450, L: 550 },
    { name: "Length Alteration", S: 500, M: 650, L: 800 },
    { name: "Waist Adjustment", S: 600, M: 750, L: 950 },
    { name: "Party Dress Fitting", S: 1200, M: 1500, L: 2000 },
  ],
};

const jeans: SizedTable = {
  slug: "jeans-pants",
  title: "Jeans & Pants",
  subtitle: "Denim, chinos & trousers",
  images: [jeansImg, mensImg, workspaceImg],
  rows: [
    { name: "Length Adjustment", S: 400, M: 500, L: 600 },
    { name: "Waist Tightening", S: 500, M: 650, L: 800 },
    { name: "Zip Replacement", S: 350, M: 450, L: 550 },
    { name: "Stitch Repair", S: 300, M: 400, L: 500 },
  ],
};

const express: FlatTable = {
  slug: "express",
  title: "Express Services",
  subtitle: "When you need it fast",
  images: [expressImg, heroImg, jeansImg],
  unitLabel: "Per garment",
  icon: "zap",
  rows: [
    { name: "Same Day Service", price: 500 },
    { name: "Urgent Alteration", price: 700 },
  ],
};

const delivery: FlatTable = {
  slug: "pickup-delivery",
  title: "Pickup & Delivery",
  subtitle: "Door-to-door logistics",
  images: [workspaceImg, mensImg, womensImg],
  unitLabel: "Per pickup",
  icon: "truck",
  rows: [
    { name: "Within City", price: 200 },
    { name: "Outside City", price: 400 },
  ],
};

const sized = [mens, womens, jeans];
const flat = [express, delivery];

function PricingPage() {
  const [size, setSize] = useState<Sizing>("M");

  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-28">
          <p className="text-xs uppercase tracking-[0.24em] text-accent">Pricing</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            Honest, by the garment.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            All prices in PKR. No surprises, no hidden fees. Toggle Small,
            Medium or Large to see size-based pricing. Hover any card to
            preview the work.
          </p>

          <div className="mt-10 inline-flex rounded-full border border-border bg-card p-1">
            {(["S", "M", "L"] as Sizing[]).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  size === s
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s === "S" ? "Small" : s === "M" ? "Medium" : "Large"}
              </button>
            ))}
          </div>
        </div>
      </section>

      <Section eyebrow="By category" title="Size-based pricing.">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {sized.map((t) => (
            <SizedCard key={t.slug} table={t} size={size} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Fast & logistics" title="Flat-rate services." className="!pt-0">
        <div className="grid gap-8 md:grid-cols-2">
          {flat.map((t) => (
            <FlatCard key={t.slug} table={t} />
          ))}
        </div>

        <div className="mt-10 grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
          {[
            "Free pickup on orders above Rs 5,000",
            "Live tracking via WhatsApp",
            "Cashless or pay-on-delivery",
            "100% fit guarantee or re-alter free",
          ].map((p) => (
            <div key={p} className="flex items-center gap-3">
              <Check className="h-4 w-4 text-accent" />
              {p}
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="rounded-3xl bg-primary px-8 py-20 text-center text-primary-foreground md:px-16">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            Ready when you are.
          </h2>
          <Link
            to="/book"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground hover:scale-[1.02] transition-transform"
          >
            Book a pickup <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}

function CardCover({
  images,
  title,
  subtitle,
  hover,
  idx,
}: {
  images: string[];
  title: string;
  subtitle: string;
  hover: boolean;
  idx: number;
}) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={title}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
            i === idx ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
      <div className="absolute bottom-5 left-6 text-white">
        <h3 className="font-display text-2xl font-semibold">{title}</h3>
        <p className="text-sm text-white/80">{subtitle}</p>
      </div>
      <div className="absolute right-5 bottom-5 flex gap-1.5">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-6 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
      {!hover && (
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
          Hover to preview
        </span>
      )}
    </div>
  );
}

function useHoverCycle(length: number) {
  const [hover, setHover] = useState(false);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!hover) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % length), 1100);
    return () => clearInterval(t);
  }, [hover, length]);
  useEffect(() => {
    if (!hover) setIdx(0);
  }, [hover]);
  return { hover, idx, setHover };
}

function SizedCard({ table, size }: { table: SizedTable; size: Sizing }) {
  const { hover, idx, setHover } = useHoverCycle(table.images.length);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:shadow-[var(--shadow-elegant)]"
    >
      <CardCover
        images={table.images}
        title={table.title}
        subtitle={table.subtitle}
        hover={hover}
        idx={idx}
      />
      <div className="p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Service
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {size === "S" ? "Small" : size === "M" ? "Medium" : "Large"}
          </p>
        </div>
        <ul className="divide-y divide-border">
          {table.rows.map((r) => (
            <li key={r.name} className="flex items-center justify-between py-3.5">
              <span className="text-sm font-medium">{r.name}</span>
              <span className="font-display text-xl font-semibold tabular-nums">
                {fmtPKR(r[size])}
              </span>
            </li>
          ))}
        </ul>
        <Link
          to="/book"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]"
        >
          Book {table.title} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function FlatCard({ table }: { table: FlatTable }) {
  const { hover, idx, setHover } = useHoverCycle(table.images.length);
  const Icon = table.icon === "zap" ? Zap : Truck;
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:shadow-[var(--shadow-elegant)]"
    >
      <CardCover
        images={table.images}
        title={table.title}
        subtitle={table.subtitle}
        hover={hover}
        idx={idx}
      />
      <div className="p-6 md:p-8">
        <div className="mb-4 flex items-center gap-3">
          <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {table.unitLabel}
          </p>
        </div>
        <ul className="divide-y divide-border">
          {table.rows.map((r) => (
            <li key={r.name} className="flex items-center justify-between py-3.5">
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                {table.icon === "truck" && (
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                )}
                {r.name}
              </span>
              <span className="font-display text-xl font-semibold tabular-nums">
                {fmtPKR(r.price)}
              </span>
            </li>
          ))}
        </ul>
        <Link
          to="/book"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]"
        >
          Book now <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
