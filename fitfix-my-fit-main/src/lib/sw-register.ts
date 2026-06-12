// Guarded service-worker registration — only runs in production on real domains.
// Never registers in Lovable preview, dev, or iframes.
export async function registerServiceWorker() {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
  const url = new URL(window.location.href);

  // Refuse registration in dev / preview / iframe / ?sw=off
  const isDev = !import.meta.env.PROD;
  const isPreview =
    location.hostname.startsWith("id-preview--") ||
    location.hostname.startsWith("preview--") ||
    location.hostname === "lovableproject.com" ||
    location.hostname.endsWith(".lovableproject.com") ||
    location.hostname === "lovableproject-dev.com" ||
    location.hostname.endsWith(".lovableproject-dev.com") ||
    location.hostname === "beta.lovable.dev" ||
    location.hostname.endsWith(".beta.lovable.dev");
  const isIframe = window.self !== window.top;
  const swOff = url.searchParams.has("sw");

  if (isDev || isPreview || isIframe || swOff) {
    // Unregister any stale app SWs before returning
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        regs
          .filter((r) => r.scope && r.scope.endsWith("/"))
          .map((r) => r.unregister())
      );
    } catch {
      /* ignore */
    }
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;
      if (!newWorker) return;
      newWorker.addEventListener("statechange", () => {
        if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
          // New content available — reload to activate
          window.location.reload();
        }
      });
    });
  } catch (err) {
    console.error("SW registration failed:", err);
  }
}
