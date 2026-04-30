"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { getHostvibeFooterData } from "@/lib/hostvibe/data";
import type { HostvibeLink } from "@/lib/hostvibe/types";

function toPublicAsset(src: string) {
  return src.replace(/^\/templates\/hostvibe\/images\//, "/hostvibe/images/");
}

function resolveHref(value: HostvibeLink | string) {
  if (typeof value === "string") return value;
  return value.value.startsWith("/") ? value.value : `/${value.value}`;
}

function Glyph({
  name,
  className = "h-4 w-4",
}: {
  name: "facebook" | "x" | "instagram" | "linkedin";
  className?: string;
}) {
  const common = "fill-none stroke-current stroke-[1.8] stroke-linecap-round stroke-linejoin-round";

  switch (name) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path className={common} d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V8.4c0-.2.1-.4.4-.4Z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path className={common} d="m4 4 7.8 9L4 20h3.4l6.1-7 6 7H20l-8-9 7-8h-3.4l-5.4 6.2L7 4Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <rect className={common} x="4" y="4" width="16" height="16" rx="5" />
          <circle className={common} cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path className={common} d="M6 10v10M6 6.8V7M10 20v-6a2.8 2.8 0 0 1 5.6 0v6M14 14v6M18 10v10" />
        </svg>
      );
  }
}

function PaymentGlyph({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-10 w-16 overflow-hidden rounded-xl border border-[var(--hv-footer-border)] bg-[var(--hv-footer-icon-bg)] p-2">
      <Image src={toPublicAsset(src)} alt={alt} fill className="object-contain p-2" sizes="64px" />
    </div>
  );
}

export default function HostvibeFooter() {
  const footerData = getHostvibeFooterData();
  const top = footerData.top;
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const darkLogoSrc = toPublicAsset(top.logo.src);
  const lightLogoSrc = darkLogoSrc.includes("white-logo") ? "/hostvibe/images/logo.png" : darkLogoSrc;

  useEffect(() => {
    const syncTheme = () => {
      setIsDarkTheme(document.body.classList.contains("hvx-theme-dark"));
    };

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="hvx-footer relative overflow-hidden border-t border-[var(--hv-footer-border)] bg-[var(--hv-footer-bg)] text-[var(--hv-footer-text)]">
      <div className="pointer-events-none absolute inset-0 bg-[var(--hv-footer-overlay)]" />
      <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-[var(--hv-brand-a12)] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-[var(--hv-brand-a12)] blur-3xl" />

      <div className="relative mx-auto max-w-[1360px] px-4 py-16 sm:px-5 lg:px-6 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-[var(--hv-footer-border)] bg-[var(--hv-footer-panel-bg)] p-6 sm:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(340px,1fr)_minmax(0,1.35fr)]">
            <div>
              <Link href={resolveHref(top.logo.href)} className="inline-flex items-center">
                <Image
                  src={isDarkTheme ? darkLogoSrc : lightLogoSrc}
                  alt={top.logo.alt}
                  width={176}
                  height={52}
                  className="h-11 w-auto object-contain"
                />
              </Link>

              <p className="mt-5 max-w-lg text-[15px] leading-8 text-[var(--hv-footer-soft)]">{top.description}</p>

              <div className="mt-7 flex flex-wrap gap-2">
                {top.social.items.map((item) => (
                  <motion.a
                    key={item.label}
                    href={resolveHref(item.href)}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-[var(--hv-footer-icon-border)] bg-[var(--hv-footer-icon-bg)] px-4 text-[13px] font-medium text-[var(--hv-footer-muted)] transition hover:text-[var(--hv-footer-heading)]"
                    aria-label={item.label}
                  >
                    <Glyph name={item.icon as "facebook" | "x" | "instagram" | "linkedin"} />
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {top.columns.map((column, index) => (
                <motion.div
                  key={column.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.32, delay: index * 0.05 }}
                  className="rounded-2xl border border-[var(--hv-footer-border)] bg-[var(--hv-footer-icon-bg)] p-4"
                >
                  <p className="text-sm font-semibold tracking-[-0.01em] text-[var(--hv-footer-heading)]">{column.title}</p>
                  <div className="mt-4 space-y-2.5">
                    {column.links.map((link) => (
                      <Link
                        key={link.label}
                        href={resolveHref(link.href)}
                        className="group block text-sm leading-6 text-[var(--hv-footer-muted)] transition hover:text-[var(--hv-footer-heading)]"
                      >
                        <span className="inline-flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--hv-footer-faint)] transition group-hover:bg-[var(--hv-brand)]" />
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.06 }}
          className="mt-6 rounded-3xl border border-[var(--hv-footer-border)] bg-[var(--hv-footer-panel-bg)] p-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--hv-footer-faint)]">
                Payment Methods
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                {footerData.payment.icons.map((icon) => (
                  <PaymentGlyph key={icon.alt} src={icon.src} alt={icon.alt} />
                ))}
              </div>
            </div>

            <Link
              href={resolveHref(footerData.liveChat.href)}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--hv-brand)] px-7 text-sm font-semibold text-white transition hover:bg-[var(--hv-brand-hover)]"
            >
              {footerData.liveChat.label}
            </Link>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[var(--hv-footer-border)] pt-6 text-sm text-[var(--hv-footer-soft)] lg:flex-row lg:items-center lg:justify-between">
          <p>{top.copyright}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footerData.bottom.links.map((link) => (
              <Link
                key={link.label}
                href={resolveHref(link.href)}
                className="transition hover:text-[var(--hv-footer-heading)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
