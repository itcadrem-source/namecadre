"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type SwiperGlobalModule = {
  default?: unknown;
  Swiper?: unknown;
};

declare global {
  interface Window {
    $: JQueryStatic;
    jQuery: JQueryStatic;
    Swiper: unknown;
  }
}

export default function HostvibeFooterScripts() {
  const pathname = usePathname();

  useEffect(() => {
    const normalizedPathname = (pathname || "").replace(/\/+$/, "") || "/";
    const shouldLoadLegacyScripts = normalizedPathname === "/";

    if (!shouldLoadLegacyScripts) {
      return;
    }

    let cancelled = false;

    function loadScriptOnce(id: string, src: string) {
      return new Promise<void>((resolve, reject) => {
        const existing = document.getElementById(id) as HTMLScriptElement | null;
        if (existing) {
          if (existing.dataset.loaded === "true") {
            resolve();
            return;
          }
          existing.addEventListener("load", () => resolve(), { once: true });
          existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), {
            once: true,
          });
          return;
        }

        const script = document.createElement("script");
        script.id = id;
        script.src = src;
        script.defer = true;
        script.addEventListener(
          "load",
          () => {
            script.dataset.loaded = "true";
            resolve();
          },
          { once: true },
        );
        script.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), {
          once: true,
        });
        document.body.appendChild(script);
      });
    }

    async function bootHostvibeScripts() {
      const jqueryModule = await import("jquery");
      const $ = (jqueryModule.default ?? jqueryModule) as JQueryStatic;

      window.$ = $;
      window.jQuery = $;
      const jq = window.jQuery as JQueryStatic & {
        fn: JQueryStatic["fn"] & Record<string, unknown>;
      };
      if (typeof jq.fn.popover !== "function") {
        jq.fn.popover = function popoverShim() {
          return this;
        };
      }
      if (typeof jq.fn.tooltip !== "function") {
        jq.fn.tooltip = function tooltipShim() {
          return this;
        };
      }

      const swiperModule = await import("swiper/bundle");
      const typedSwiperModule = swiperModule as SwiperGlobalModule;
      window.Swiper =
        typedSwiperModule.default ?? typedSwiperModule.Swiper ?? typedSwiperModule;

      await import("jquery-nice-select");

      if (cancelled) {
        return;
      }

      await loadScriptOnce("hostvibe-slick-js", "/hostvibe/js/slick.min.js");

      if (cancelled) {
        return;
      }

      await loadScriptOnce("hostvibe-main-js", "/hostvibe/js/main.js");
    }

    void bootHostvibeScripts().catch((error) => {
      // Prevent third-party legacy script failures from crashing React routes.
      console.error("Hostvibe legacy script bootstrap failed:", error);
    });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
