import { Link } from "@tanstack/react-router";
import { Scissors } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40 mt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-accent" strokeWidth={1.5} />
            <span className="font-display text-xl font-semibold">FixMyFit</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Premium clothing alterations, picked up and delivered to your door.
            Wear what fits — finally.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/book" className="hover:text-foreground">Book a pickup</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Reach us</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>hello@fixmyfit.com</li>
            <li>+1 (555) 010-2222</li>
            <li>Mon–Sat, 9am–8pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-6 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FixMyFit. Tailored with care.
      </div>
    </footer>
  );
}
