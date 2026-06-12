import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/Section";
import { ArrowRight } from "lucide-react";
import { categories, fmtPKR } from "@/data/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — FixMyFit" },
      { name: "description", content: "Browse all alteration services by category. Click any category to see details and pricing in PKR." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <p className="text-xs uppercase tracking-[0.24em] text-accent">Services</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            Every fit, fixed.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Tap any category to open the full menu — every service shown with its
            own price in PKR. Pickup and delivery included on every order.
          </p>
        </div>
      </section>

      <Section eyebrow="Browse" title="Choose a category.">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const min = Math.min(...cat.items.map((i) => i.prices.S));
            return (
              <Link
                key={cat.slug}
                to="/services/$category"
                params={{ category: cat.slug }}
                className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.images[0]}
                    alt={cat.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute left-6 bottom-5 text-white">
                    <h3 className="font-display text-2xl font-semibold">{cat.title}</h3>
                    <p className="text-sm text-white/80">{cat.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Starting from
                    </p>
                    <p className="mt-1 font-display text-2xl font-semibold tabular-nums">
                      {fmtPKR(min)}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-all group-hover:gap-3">
                    Open <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="rounded-3xl bg-primary px-8 py-20 text-center text-primary-foreground md:px-16">
          <h2 className="font-display text-4xl font-semibold md:text-5xl">Ready to get started?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/70">
            Tell us what needs fixing — we'll come collect it tomorrow.
          </p>
          <Link to="/book" className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground hover:scale-[1.02] transition-transform">
            Book a pickup <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
