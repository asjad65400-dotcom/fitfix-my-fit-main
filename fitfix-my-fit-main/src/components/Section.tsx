import type { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-7xl px-6 py-20 md:py-28 ${className}`}>
      {(eyebrow || title || intro) && (
        <div className="mb-14 max-w-2xl">
          {eyebrow && (
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-accent">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-display text-4xl font-semibold leading-[1.05] md:text-5xl">
              {title}
            </h2>
          )}
          {intro && (
            <p className="mt-5 text-lg text-muted-foreground">{intro}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
