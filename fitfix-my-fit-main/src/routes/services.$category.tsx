import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/Section";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getCategory, fmtPKR, type ServiceItem, type ServiceCategory } from "@/data/services";

export const Route = createFileRoute("/services/$category")({
  head: ({ params }) => {
    const cat = getCategory(params.category);
    const title = cat ? `${cat.title} — FixMyFit` : "Service — FixMyFit";
    return {
      meta: [
        { title },
        { name: "description", content: cat?.description ?? "FixMyFit alteration services." },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-4xl font-semibold">Category not found</h1>
      <Link to="/services" className="mt-6 inline-block text-accent hover:underline">
        ← Back to services
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">{error.message}</p>
    </div>
  ),
  loader: ({ params }) => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    return cat;
  },
  component: CategoryPage,
});

type Sizing = "S" | "M" | "L";

function CategoryPage() {
  const cat = Route.useLoaderData() as ServiceCategory;
  const [size, setSize] = useState<Sizing>("M");
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> All services
            </Link>
            <p className="mt-6 text-xs uppercase tracking-[0.24em] text-accent">Category</p>
            <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
              {cat.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{cat.description}</p>

            <div className="mt-8 inline-flex rounded-full border border-border bg-card p-1">
              {(["S", "M", "L"] as Sizing[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    size === s
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s === "S" ? "Small" : s === "M" ? "Medium" : "Large"}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={cat.images[imgIdx]}
              alt={cat.title}
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-[var(--shadow-elegant)] transition-all duration-500"
            />
            <div className="mt-4 flex justify-center gap-2">
              {cat.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === imgIdx ? "w-8 bg-accent" : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Services & pricing" title={`${cat.title} alterations`}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cat.items.map((it) => (
            <ServiceCard key={it.slug} item={it} size={size} categoryTitle={cat.title} />
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground md:px-16">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Ready to fix your fit?
          </h2>
          <Link
            to="/book"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground hover:scale-[1.02] transition-transform"
          >
            Book a pickup <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}

function ServiceCard({
  item,
  size,
  categoryTitle,
}: {
  item: ServiceItem;
  size: Sizing;
  categoryTitle: string;
}) {
  return (
    <article className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-xl font-semibold">{item.name}</h3>
        <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
          {size === "S" ? "Small" : size === "M" ? "Medium" : "Large"}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
      <p className="mt-6 font-display text-3xl font-semibold tabular-nums">
        {fmtPKR(item.prices[size])}
      </p>
      <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
        <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-accent" /> Free pickup & delivery</li>
        <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-accent" /> Fit guarantee</li>
      </ul>
      <Link
        to="/book"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:scale-[1.01] transition-transform"
        aria-label={`Book ${item.name} for ${categoryTitle}`}
      >
        Book this service <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
