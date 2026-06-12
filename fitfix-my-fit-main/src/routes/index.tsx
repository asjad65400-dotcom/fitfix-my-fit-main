import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Truck,
  Scissors,
  PackageCheck,
  Sparkles,
  Shirt,
  Star,
  ShieldCheck,
  Quote,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import mensImg from "@/assets/mens.jpg";
import womensImg from "@/assets/womens.jpg";
import jeansImg from "@/assets/jeans.jpg";
import expressImg from "@/assets/express.jpg";
import workspaceImg from "@/assets/tailor-workspace.jpg";
import { Section } from "@/components/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FixMyFit — Premium Clothing Alterations at Home" },
      { name: "description", content: "Book a pickup. We alter. We deliver. The fastest way to get clothes that actually fit — across Karachi." },
    ],
  }),
  component: HomePage,
});

const steps = [
  { icon: Truck, title: "Schedule pickup", text: "Pick a slot. We collect your clothes from your door." },
  { icon: Scissors, title: "Master tailoring", text: "Our experts measure, mark, and alter to perfection." },
  { icon: PackageCheck, title: "Delivered fitted", text: "Pressed, packed, and back to you in 3–5 days." },
];

const highlights = [
  { to: "/services/mens-wear", title: "Men's Wear", img: mensImg, sub: "Shirts · Pants · Suits" },
  { to: "/services/womens-wear", title: "Women's Wear", img: womensImg, sub: "Dresses · Tops · Skirts" },
  { to: "/services/jeans-pants", title: "Jeans & Pants", img: jeansImg, sub: "Hem · Taper · Waist" },
  { to: "/services/express", title: "Express", img: expressImg, sub: "48-hour turnaround" },
] as const;

const reviews = [
  {
    name: "Ayesha K.",
    city: "Gulshan-e-Iqbal, Karachi",
    text: "Got three kurtas altered — fit perfectly. Pickup was on time and the WhatsApp updates were great.",
    rating: 5,
  },
  {
    name: "Bilal R.",
    city: "DHA, Karachi",
    text: "I had two suits sitting unworn. FixMyFit returned them in four days fitting better than the day I bought them.",
    rating: 5,
  },
  {
    name: "Sana M.",
    city: "Clifton, Karachi",
    text: "Lengthened a wedding dress with invisible stitching. Couldn't tell it was altered. Highly recommend.",
    rating: 5,
  },
  {
    name: "Hamza A.",
    city: "Bahadurabad, Karachi",
    text: "Replaced a broken zip on my favourite jacket overnight. Express service is 100% worth it.",
    rating: 5,
  },
  {
    name: "Mariam S.",
    city: "PECHS, Karachi",
    text: "Tapered five pairs of jeans. Loved the transparent PKR pricing — no surprises at delivery.",
    rating: 5,
  },
];

function HomePage() {
  const [reviewIdx, setReviewIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setReviewIdx((i) => (i + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-16 pb-24 md:grid-cols-12 md:gap-8 md:pt-24 md:pb-32">
          <div className="md:col-span-6 md:pt-10">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.24em] text-accent">
              Tailoring · At your door · Karachi
            </p>
            <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              Clothes that
              <span className="italic text-accent"> fit </span>
              like they were made for you.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              FixMyFit picks up the clothes that don't fit right, alters them with master
              tailors, and returns them perfectly tailored — without you ever leaving home.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/book"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Book a pickup
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-medium hover:bg-secondary"
              >
                Browse services
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 rounded-full px-3 py-3.5 text-sm font-medium text-accent hover:gap-3 transition-all"
              >
                See PKR pricing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" /> 12,000+ garments altered</div>
              <div className="flex items-center gap-2"><Shirt className="h-4 w-4 text-accent" /> Free pickup & delivery</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> Fit guarantee</div>
            </div>
          </div>
          <div className="md:col-span-6">
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/20 to-transparent blur-2xl" />
              <img
                src={heroImg}
                alt="Tailoring tools laid out with folded cream and navy shirts"
                width={1536}
                height={1024}
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[var(--shadow-elegant)]"
              />
              <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-card p-5 shadow-[var(--shadow-soft)] md:block">
                <p className="font-display text-3xl font-semibold">3–5 days</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">average turnaround</p>
              </div>
              <div className="absolute -top-4 -right-4 hidden rounded-xl bg-accent p-4 text-accent-foreground shadow-[var(--shadow-soft)] md:block">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-1 text-xs">4.9 · 1,200+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY HIGHLIGHTS */}
      <Section eyebrow="Browse by category" title="Find the right alteration." className="border-t border-border/60">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <Link
              key={h.to}
              to={h.to}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <img
                src={h.img}
                alt={h.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-white/80">{h.sub}</p>
                <h3 className="mt-1 font-display text-2xl font-semibold">{h.title}</h3>
                <span className="mt-3 inline-flex items-center gap-2 text-sm opacity-0 transition-all group-hover:opacity-100 group-hover:gap-3">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section eyebrow="How it works" title="Three steps to a perfect fit.">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="bg-card p-10 transition-colors hover:bg-secondary/50">
              <div className="flex items-center justify-between">
                <s.icon className="h-7 w-7 text-accent" strokeWidth={1.5} />
                <span className="font-display text-5xl text-muted-foreground/40">0{i + 1}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WORKSHOP STRIP */}
      <Section eyebrow="Inside the studio" title="Master tailors at work." className="!pt-0">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 overflow-hidden rounded-2xl">
            <img src={workspaceImg} alt="Tailor workspace" loading="lazy" className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105 md:h-[420px]" />
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="overflow-hidden rounded-2xl">
              <img src={mensImg} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img src={womensImg} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </div>
        </div>
      </Section>

      {/* ROTATING REVIEWS */}
      <Section eyebrow="Verified reviews" title="What customers are saying.">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="relative min-h-[260px] rounded-3xl border border-border bg-card p-8 md:p-10 shadow-[var(--shadow-soft)]">
              <Quote className="absolute right-8 top-8 h-10 w-10 text-accent/20" />
              <div key={reviewIdx} className="animate-fade-in">
                <div className="flex items-center gap-1 text-accent">
                  {[...Array(reviews[reviewIdx].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="ml-3 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">
                    <ShieldCheck className="h-3 w-3" /> Verified
                  </span>
                </div>
                <p className="mt-5 font-display text-2xl font-medium leading-snug md:text-3xl">
                  "{reviews[reviewIdx].text}"
                </p>
                <p className="mt-6 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{reviews[reviewIdx].name}</span> · {reviews[reviewIdx].city}
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === reviewIdx ? "w-10 bg-accent" : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Show review ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4 content-start">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="font-display text-3xl font-semibold">4.9★</p>
              <p className="mt-1 text-xs text-muted-foreground">Average rating</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="font-display text-3xl font-semibold">12k+</p>
              <p className="mt-1 text-xs text-muted-foreground">Garments altered</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="font-display text-3xl font-semibold">98%</p>
              <p className="mt-1 text-xs text-muted-foreground">On-time delivery</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="font-display text-3xl font-semibold">3–5d</p>
              <p className="mt-1 text-xs text-muted-foreground">Turnaround</p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="!pt-0">
        <div className="rounded-3xl bg-primary px-8 py-20 text-center text-primary-foreground md:px-16">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            Stop letting clothes sit unworn.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/70">
            Schedule a pickup in under a minute. We handle the rest.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground hover:scale-[1.02] transition-transform"
            >
              Book your pickup <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-7 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/10"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
