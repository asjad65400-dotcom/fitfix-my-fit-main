import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/Section";
import { Check } from "lucide-react";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Pickup — FixMyFit" },
      { name: "description", content: "Schedule a free pickup for your clothes. We'll alter and deliver them back to you." },
    ],
  }),
  component: BookPage,
});

const SERVICES = [
  "Shirt fitting", "Pant length adjustment", "Waist alteration",
  "Sleeve adjustment", "Suit fitting", "Dress fitting",
  "Zip replacement", "Button fixing", "Stitching repairs",
];

function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (s: string) =>
    setPicked((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);

  if (submitted) {
    return (
      <Section>
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
            <Check className="h-6 w-6 text-accent" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold">Pickup booked</h1>
          <p className="mt-3 text-muted-foreground">
            We'll send a confirmation email with your pickup window shortly.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.24em] text-accent">Book a service</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.05] md:text-6xl">
            Schedule your free pickup.
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Fill in the details below. Our team will confirm your pickup slot within an hour.
          </p>
        </div>
      </section>

      <Section>
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
          className="grid gap-12 md:grid-cols-5"
        >
          <div className="md:col-span-3 space-y-8">
            <Field label="Full name"><input required className={inputCls} placeholder="Jane Doe" /></Field>
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Email"><input required type="email" className={inputCls} placeholder="you@example.com" /></Field>
              <Field label="Phone"><input required className={inputCls} placeholder="+1 555 010 2222" /></Field>
            </div>
            <Field label="Pickup address"><textarea required rows={3} className={inputCls} placeholder="Street, city, postal code" /></Field>
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Preferred date"><input required type="date" className={inputCls} /></Field>
              <Field label="Time slot">
                <select required className={inputCls} defaultValue="">
                  <option value="" disabled>Select a slot</option>
                  <option>9am – 12pm</option>
                  <option>12pm – 3pm</option>
                  <option>3pm – 6pm</option>
                  <option>6pm – 8pm</option>
                </select>
              </Field>
            </div>
            <Field label="Notes (optional)"><textarea rows={3} className={inputCls} placeholder="Anything we should know about your garments?" /></Field>

            <button type="submit" className="rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground hover:scale-[1.02] transition-transform">
              Confirm pickup
            </button>
          </div>

          <aside className="md:col-span-2">
            <div className="sticky top-28 rounded-2xl border border-border bg-card p-8">
              <h3 className="font-display text-xl font-semibold">Select services</h3>
              <p className="mt-2 text-sm text-muted-foreground">Pick everything that applies — you can add more later.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {SERVICES.map((s) => {
                  const on = picked.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggle(s)}
                      className={`rounded-full border px-4 py-2 text-sm transition-all ${
                        on ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-foreground/40"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
                <p className="flex justify-between"><span>Pickup</span><span className="text-foreground">Free</span></p>
                <p className="mt-2 flex justify-between"><span>Delivery</span><span className="text-foreground">Free</span></p>
                <p className="mt-2 flex justify-between"><span>Turnaround</span><span className="text-foreground">3–5 days</span></p>
              </div>
            </div>
          </aside>
        </form>
      </Section>
    </>
  );
}

const inputCls = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
