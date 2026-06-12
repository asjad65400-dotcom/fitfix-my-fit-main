import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/Section";
import { Mail, Phone, MapPin, Clock, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — FixMyFit" },
      { name: "description", content: "Get in touch with the FixMyFit team. We're here to help with any tailoring question." },
    ],
  }),
  component: ContactPage,
});

const info = [
  { icon: Mail, label: "Email", value: "hello@fixmyfit.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 010-2222" },
  { icon: MapPin, label: "Studio", value: "Gulshan-e-Iqbal, Block 5, Karachi" },
  { icon: Clock, label: "Hours", value: "Mon–Sat · 9am – 8pm" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.24em] text-accent">Contact</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.05] md:text-7xl">
            Let's talk tailoring.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Questions about an alteration, a special request, or a bulk order?
            We reply within an hour during working hours.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-16 md:grid-cols-5">
          <div className="md:col-span-2 space-y-8">
            {info.map((i) => (
              <div key={i.label} className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15">
                  <i.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{i.label}</p>
                  <p className="mt-1 font-medium">{i.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-3">
            {sent ? (
              <div className="rounded-2xl border border-border bg-card p-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
                  <Check className="h-6 w-6 text-accent" />
                </div>
                <h2 className="mt-6 font-display text-2xl font-semibold">Message sent</h2>
                <p className="mt-2 text-muted-foreground">We'll get back to you very soon.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="rounded-2xl border border-border bg-card p-8 md:p-10 space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Name"><input required className={inputCls} placeholder="Your name" /></Field>
                  <Field label="Email"><input required type="email" className={inputCls} placeholder="you@example.com" /></Field>
                </div>
                <Field label="Subject"><input required className={inputCls} placeholder="How can we help?" /></Field>
                <Field label="Message"><textarea required rows={6} className={inputCls} placeholder="Tell us a bit more..." /></Field>
                <button type="submit" className="rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground hover:scale-[1.02] transition-transform">
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
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
