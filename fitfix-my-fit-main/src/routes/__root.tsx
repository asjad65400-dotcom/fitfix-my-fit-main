import { createRootRouteWithContext, HeadContent, Outlet, Scripts, Link, useRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { registerServiceWorker } from "@/lib/sw-register";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-accent">404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold">Page not found</h1>
        <p className="mt-3 text-muted-foreground">This page doesn't exist or has been moved.</p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">
          Back home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#1e3a5f" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { title: "FixMyFit — Premium Clothing Alterations, Picked Up From Home" },
      { name: "description", content: "FixMyFit picks up your clothes, alters them with master tailors, and delivers them back. Perfect fit, zero hassle." },
      { property: "og:title", content: "FixMyFit — Premium Clothing Alterations, Picked Up From Home" },
      { property: "og:description", content: "FixMyFit picks up your clothes, alters them with master tailors, and delivers them back. Perfect fit, zero hassle." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FixMyFit — Premium Clothing Alterations, Picked Up From Home" },
      { name: "twitter:description", content: "FixMyFit picks up your clothes, alters them with master tailors, and delivers them back. Perfect fit, zero hassle." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0d2c37db-384b-41d0-b2af-be3ca803c5d2/id-preview-0fee2186--d7a57bd8-e948-48d6-b8ac-10aa22067bed.lovable.app-1778574832912.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0d2c37db-384b-41d0-b2af-be3ca803c5d2/id-preview-0fee2186--d7a57bd8-e948-48d6-b8ac-10aa22067bed.lovable.app-1778574832912.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1"><Outlet /></main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
