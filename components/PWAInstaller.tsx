"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

type NavigatorWithStandalone = Navigator & {
  standalone?: boolean;
};

export default function PWAInstaller() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function registerServiceWorker() {
      if ("serviceWorker" in navigator) {
        try {
          await navigator.serviceWorker.register("/sw.js");
          console.log("Service Worker registered successfully");
        } catch (error) {
          console.error("Service Worker registration failed:", error);
        }
      }
    }

    registerServiceWorker();

    const userAgent = window.navigator.userAgent.toLowerCase();

    const ios =
      /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    const navigatorWithStandalone =
      window.navigator as NavigatorWithStandalone;

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      navigatorWithStandalone.standalone === true;

    setIsIOS(ios);
    setIsStandalone(standalone);

    if (!standalone) {
      setIsVisible(true);
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  async function handleInstallClick() {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const choiceResult = await installPrompt.userChoice;

    if (choiceResult.outcome === "accepted") {
      setInstallPrompt(null);
      setIsVisible(false);
    }
  }

  if (!isVisible || isStandalone) {
    return null;
  }

  return (
    <section className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg rounded-3xl border border-[#D4A83F]/30 bg-[#111622]/95 p-4 text-right text-white shadow-2xl backdrop-blur-xl">
      <div className="mb-3 flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
          aria-label="Close install prompt"
        >
          ✕
        </button>

        <div>
          <h3 className="mb-1 text-base font-bold text-white">
            ثبّت FlyAlrafah Alert
          </h3>
          <p className="text-xs leading-6 text-gray-400">
            أضف التطبيق إلى شاشة هاتفك لتصلك تنبيهات الرحلات بشكل أسرع.
          </p>
        </div>
      </div>

      {isIOS ? (
        <div className="rounded-2xl bg-[#060914] p-4 text-sm leading-7 text-gray-300">
          على الآيفون: افتح الموقع في Safari ثم اضغط زر المشاركة واختر{" "}
          <span className="font-bold text-[#D4A83F]">
            Add to Home Screen
          </span>
          .
        </div>
      ) : (
        <button
          type="button"
          onClick={handleInstallClick}
          disabled={!installPrompt}
          className="w-full rounded-2xl bg-[#D4A83F] px-5 py-3 text-sm font-bold text-black shadow-lg transition hover:scale-[1.02] hover:bg-[#E5B94B] disabled:cursor-not-allowed disabled:opacity-60"
        >
          📲 تثبيت التطبيق
        </button>
      )}
    </section>
  );
}