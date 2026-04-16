// Register the service worker and handle PWA install prompt
import { useEffect } from "react";

export default function PWABridge() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js");
      });
    }

    let deferredPrompt;
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      // Optionally, show your own install button here
      // window.deferredPrompt = deferredPrompt;
      // You can trigger deferredPrompt.prompt() from a button click
    });
  }, []);
  return null;
}
