"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getHostvibeHomepageData } from "@/lib/hostvibe/data";

type HomepageSectionsData = {
  cpanelFeatures: {
    title: string;
    description: string;
    columns?: number;
    items: Array<{ title: string; description: string; icon?: string; iconClass?: string }>;
  };
  features: {
    title: string;
    description: string;
    itemOne: { title: string; description: string; image: string };
    itemTwo: {
      title: string;
      description: string;
      image: string;
      shape: string;
      button: { label: string; url: string };
    };
    itemThree: {
      title: string;
      description: string;
      image: string;
      shape1?: string;
      shape2?: string;
      list: Array<{ title: string; description?: string }>;
      button: { label: string; url: string };
    };
  };
  choose: {
    image: string;
    title: string;
    description: string;
    list: Array<{ label: string }>;
    counters: Array<{ icon: string; color?: string; number: string; suffix?: string; label: string }>;
  };
  support: {
    image: string;
    title: string;
    description?: string;
    buttonUrl?: string;
    buttonLabel?: string;
    items: Array<{ icon: string; title: string; description: string }>;
  };
  supportFramework: {
    sectionId?: string;
    title: string;
    description: string;
    icons: string[];
  };
  faq: {
    title: string;
    description: string;
    bottomText?: string;
    bottomLinkUrl?: string;
    bottomLinkLabel?: string;
    items: Array<{ question: string; answer: string }>;
  };
  joinCommunity: {
    sectionId?: string;
    backgroundColor?: string;
    dotImage?: string;
    title: string;
    description: string;
    cards: Array<{ label: string; url?: string; target?: string; icon: string }>;
  };
};

function listText(item: { label: string }) {
  return item.label;
}

function getRgbFromColor(value?: string) {
  if (!value) return null;
  const color = value.replace(";", "").trim().toLowerCase();
  const hexMatch = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    if (hex.length === 3) {
      return {
        r: Number.parseInt(hex[0] + hex[0], 16),
        g: Number.parseInt(hex[1] + hex[1], 16),
        b: Number.parseInt(hex[2] + hex[2], 16),
      };
    }
    return {
      r: Number.parseInt(hex.slice(0, 2), 16),
      g: Number.parseInt(hex.slice(2, 4), 16),
      b: Number.parseInt(hex.slice(4, 6), 16),
    };
  }

  const rgbMatch = color.match(/^rgba?\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/);
  if (rgbMatch) {
    return {
      r: Number.parseInt(rgbMatch[1], 10),
      g: Number.parseInt(rgbMatch[2], 10),
      b: Number.parseInt(rgbMatch[3], 10),
    };
  }

  return null;
}

function isLightBackground(value?: string) {
  const rgb = getRgbFromColor(value);
  if (!rgb) return false;
  const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
  return luminance > 0.62;
}

const motionViewport = { once: true, amount: 0.2 } as const;

function getSections() {
  return getHostvibeHomepageData() as unknown as HomepageSectionsData;
}

export function CpanelFeaturesSection() {
  const section = getSections().cpanelFeatures;
  const colClass =
    section.columns === 2
      ? "lg:grid-cols-2"
      : section.columns === 4
        ? "lg:grid-cols-4"
        : "lg:grid-cols-3";

  return (
    <section className="hvx-landing-section relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[var(--hv-brand-soft)] opacity-45" />
      <div className="relative mx-auto w-full max-w-[1320px] px-4 sm:px-5 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          viewport={motionViewport}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {section.title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-7 text-slate-600 sm:text-lg">
            {section.description}
          </p>
        </motion.div>
        <div className={`grid gap-5 sm:grid-cols-2 ${colClass}`}>
          {section.items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              viewport={motionViewport}
              className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-6 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.5)] backdrop-blur-sm"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--hv-brand-soft)] blur-xl transition-transform duration-300 group-hover:scale-125" />
              <div className="relative flex items-start gap-4">
                <span className="hvx-brand-icon inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl shadow-lg shadow-[rgba(33,72,245,0.25)]">
                  {item.icon ? <img src={item.icon} alt="" className="h-7 w-7 object-contain" /> : null}
                  {item.iconClass ? <i className={item.iconClass} aria-hidden /> : null}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const section = getSections().features;

  return (
    <section className="hvx-landing-section relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[var(--hv-brand-soft)] opacity-20" />
      <div className="relative mx-auto w-full max-w-[1320px] px-4 sm:px-5 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={motionViewport}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-[var(--hv-landing-heading)] sm:text-4xl">
            {section.title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-7 text-[var(--hv-landing-muted)] sm:text-lg">
            {section.description}
          </p>
        </motion.div>
        <div className="grid gap-6 lg:grid-cols-12">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42 }}
            viewport={motionViewport}
            className="group relative overflow-hidden rounded-3xl border border-[var(--hv-landing-border)] bg-[var(--hv-landing-surface-strong)] p-6 shadow-[0_22px_46px_-32px_rgba(15,23,42,0.42)] lg:col-span-5"
          >
            <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-[var(--hv-brand-a12)] blur-2xl transition-transform duration-300 group-hover:scale-110" />
            <h3 className="relative text-balance text-2xl font-semibold leading-tight text-[var(--hv-landing-heading)] sm:text-3xl">
              {section.itemOne.title}
            </h3>
            <p className="relative mt-4 text-sm leading-6 text-[var(--hv-landing-text)] sm:text-base">
              {section.itemOne.description}
            </p>
            <div className="relative mt-6">
              <img
                src={section.itemOne.image}
                alt={section.itemOne.title}
                className="mx-auto w-full max-w-[230px] object-contain"
              />
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.06 }}
            viewport={motionViewport}
            className="group relative flex overflow-hidden rounded-3xl border border-[var(--hv-landing-border)] bg-[var(--hv-landing-surface-strong)] p-6 shadow-[0_22px_46px_-32px_rgba(15,23,42,0.42)] lg:col-span-7"
          >

            <div className="relative grid items-center gap-6 lg:grid-cols-2">
              <div className="self-center">
                <h3
                  className="text-balance text-2xl font-semibold leading-tight text-[var(--hv-landing-heading)] sm:text-3xl"
                  dangerouslySetInnerHTML={{ __html: section.itemTwo.title }}
                />
                <p className="mt-4 text-sm leading-6 text-[var(--hv-landing-text)] sm:text-base">
                  {section.itemTwo.description}
                </p>
                <Link
                  href={section.itemTwo.button.url}
                  className="hvx-brand-btn mt-6 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5"
                >
                  {section.itemTwo.button.label}
                </Link>
              </div>
              <div className="relative">
                <img src={section.itemTwo.image} alt={section.itemTwo.title} className="relative z-10 w-full object-contain" />
                {section.itemTwo.shape ? (
                  <img
                    src={section.itemTwo.shape}
                    alt=""
                    className="pointer-events-none absolute -bottom-3 -right-3 z-0 w-20 opacity-70"
                  />
                ) : null}
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.12 }}
            viewport={motionViewport}
            className="group relative overflow-hidden rounded-3xl border border-[var(--hv-landing-border)] bg-[var(--hv-landing-surface-strong)] p-6 shadow-[0_22px_46px_-32px_rgba(15,23,42,0.42)] lg:col-span-12"
          >
            <div className="pointer-events-none absolute -left-8 top-6 h-24 w-24 rounded-full bg-[var(--hv-brand-a12)] blur-xl" />
            <div className="relative grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <h3 className="text-balance text-2xl font-semibold leading-tight text-[var(--hv-landing-heading)] sm:text-3xl">
                  {section.itemThree.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[var(--hv-landing-text)] sm:text-base">
                  {section.itemThree.description}
                </p>
                <Link
                  href={section.itemThree.button.url}
                  className="hvx-brand-btn mt-6 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5"
                >
                  {section.itemThree.button.label}
                </Link>
              </div>
              <div className="lg:col-span-4">
                <img src={section.itemThree.image} alt={section.itemThree.title} className="mx-auto w-full max-w-[320px] object-contain" />
              </div>
              <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-1">
                {section.itemThree.list.map((item, index) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={motionViewport}
                    className="rounded-2xl border border-[var(--hv-brand-border)] bg-[var(--hv-brand-soft)] px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-[var(--hv-landing-heading)]">{item.title}</p>
                    {item.description ? (
                      <p className="mt-1 text-xs leading-5 text-[var(--hv-landing-muted)]">{item.description}</p>
                    ) : null}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export function ChooseSection() {
  const section = getSections().choose;

  return (
    <section className="hvx-landing-section hvx-choose-section relative bg-white py-20 sm:py-24">
      <div className="hvx-choose-gradient pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(38,78,255,0.12),rgba(255,255,255,0))]" />
      <div className="relative mx-auto w-full max-w-[1320px] px-4 sm:px-5 lg:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            viewport={motionViewport}
            className="order-2 lg:order-1"
          >
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {section.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{section.description}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {section.list.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  viewport={motionViewport}
                  className="hvx-choose-chip flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-700 shadow-[0_16px_34px_-24px_rgba(15,23,42,0.3)]"
                >
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--hv-brand-soft)] text-[var(--hv-brand)]">
                    <i className="far fa-check-circle text-xs" aria-hidden />
                  </span>
                  {listText(item)}
                </motion.li>
              ))}
            </ul>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {section.counters.map((counter, index) => (
                <motion.div
                  key={counter.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.07 }}
                  viewport={motionViewport}
                  className="hvx-choose-counter rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_18px_36px_-22px_rgba(38,78,255,0.35)]"
                >
                  <div className="flex items-center gap-2 text-slate-500">
                    <i className={counter.icon} style={{ color: counter.color || undefined }} />
                    <span className="text-sm">{counter.label}</span>
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {counter.number}
                    {counter.suffix || ""}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            viewport={motionViewport}
            className="order-1 lg:order-2"
          >
            <div className="hvx-choose-media-card relative mx-auto max-w-[520px] rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_24px_50px_-30px_rgba(38,78,255,0.28)]">
              <div className="pointer-events-none absolute inset-x-4 top-3 h-14 rounded-2xl bg-[linear-gradient(180deg,rgba(38,78,255,0.1),rgba(38,78,255,0))]" />
              <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-[var(--hv-brand-soft)] blur-2xl" />
              <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[var(--hv-brand-soft)] blur-2xl" />
              <img src={section.image} alt={section.title} className="relative w-full rounded-2xl object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SupportSection() {
  const section = getSections().support;

  return (
    <section className="hvx-landing-section relative py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[var(--hv-brand-soft)] opacity-45" />
      <div className="relative mx-auto w-full max-w-[1320px] px-4 sm:px-5 lg:px-6">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={motionViewport}
            className="lg:col-span-7"
          >
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {section.title}
            </h2>
            {section.description ? <p className="mt-4 text-base leading-7 text-slate-600">{section.description}</p> : null}
            <div className="mt-6 space-y-4">
              {section.items.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, x: -22 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  viewport={motionViewport}
                  className="rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-[0_20px_44px_-30px_rgba(8,47,73,0.5)]"
                >
                  <div className="flex gap-4">
                    <span className="hvx-brand-icon inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg shadow-lg shadow-[rgba(33,72,245,0.22)]">
                      <i className={item.icon} aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            {section.buttonLabel ? (
              <Link
                href={section.buttonUrl || "/contact"}
                className="hvx-brand-btn mt-7 inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5"
              >
                {section.buttonLabel}
              </Link>
            ) : null}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            viewport={motionViewport}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-[420px]">
              <div className="pointer-events-none absolute -left-7 -top-5 h-20 w-20 rounded-full bg-[var(--hv-brand-soft)] blur-2xl" />
              <div className="pointer-events-none absolute -bottom-7 -right-3 h-24 w-24 rounded-full bg-[var(--hv-brand-soft)] blur-2xl" />
              <img
                src={section.image}
                alt={section.title}
                className="relative w-full rounded-3xl border border-white/70 bg-white p-3 shadow-[0_28px_58px_-34px_rgba(15,23,42,0.55)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SupportFrameworkSection() {
  const section = getSections().supportFramework;
  const firstStripRef = useRef<HTMLUListElement | null>(null);
  const [loopDistance, setLoopDistance] = useState(0);

  useEffect(() => {
    const syncLoopDistance = () => {
      const strip = firstStripRef.current;
      if (!strip) return;
      const style = window.getComputedStyle(strip);
      const gap = Number.parseFloat(style.gap || style.columnGap || "0") || 0;
      setLoopDistance(strip.scrollWidth + gap);
    };

    syncLoopDistance();
    window.addEventListener("resize", syncLoopDistance);
    return () => window.removeEventListener("resize", syncLoopDistance);
  }, [section.icons]);

  return (
    <section
      id={section.sectionId || "supportFramework"}
      className="hvx-landing-section hvx-framework-section relative bg-[var(--hv-surface-card-alt)] py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(33,72,245,0.08),rgba(33,72,245,0.02))]" />
      <div className="relative mx-auto w-full max-w-[1320px] px-4 sm:px-5 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={motionViewport}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {section.title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-7 text-slate-600 sm:text-lg">{section.description}</p>
        </motion.div>
        <div className="hvx-framework-shell mt-10 overflow-hidden rounded-3xl border border-[var(--hv-landing-border)] bg-[var(--hv-landing-surface-strong)] p-3 shadow-[0_24px_50px_-34px_rgba(15,23,42,0.32)]">
          <motion.div
            className="flex w-max gap-4"
            animate={loopDistance > 0 ? { x: [0, -loopDistance] } : { x: 0 }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            <ul ref={firstStripRef} className="flex shrink-0 gap-4">
              {section.icons.map((icon, index) => (
                <li
                  key={`framework-first-${icon}-${index}`}
                  className="hvx-framework-tile group flex min-h-[96px] min-w-[170px] items-center justify-center rounded-2xl border border-slate-200/75 bg-white px-6 py-5 shadow-[0_16px_34px_-26px_rgba(2,132,199,0.4)] transition hover:-translate-y-1"
                >
                  <img alt="framework icon" src={icon} className="h-11 w-auto object-contain" loading="lazy" />
                </li>
              ))}
            </ul>
            <ul aria-hidden="true" className="flex shrink-0 gap-4">
              {section.icons.map((icon, index) => (
                <li
                  key={`framework-second-${icon}-${index}`}
                  className="hvx-framework-tile group flex min-h-[96px] min-w-[170px] items-center justify-center rounded-2xl border border-slate-200/75 bg-white px-6 py-5 shadow-[0_16px_34px_-26px_rgba(2,132,199,0.4)] transition hover:-translate-y-1"
                >
                  <img alt="" src={icon} className="h-11 w-auto object-contain" loading="lazy" />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  const section = getSections().faq;
  const [active, setActive] = useState(0);

  return (
    <section className="hvx-landing-section relative py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[var(--hv-brand-soft)] opacity-30" />
      <div className="relative mx-auto w-full max-w-[980px] px-4 sm:px-5 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={motionViewport}
          className="mb-10 text-center"
        >
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {section.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{section.description}</p>
        </motion.div>
        <div className="space-y-3">
          {section.items.map((item, idx) => {
            const open = idx === active;
            return (
              <motion.article
                key={item.question}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                viewport={motionViewport}
                className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_16px_36px_-26px_rgba(15,23,42,0.48)]"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setActive(open ? -1 : idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-base font-semibold text-slate-900">{item.question}</span>
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition ${open ? "rotate-45" : ""
                      }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 px-5 pb-4 pt-3">
                        <p className="text-sm leading-7 text-slate-600">{item.answer}</p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm text-slate-600 sm:text-base">
          {section.bottomText || "Still have questions?"}{" "}
          <Link
            href={section.bottomLinkUrl || "/submitticket"}
            className="font-semibold text-[var(--hv-brand)] underline decoration-[var(--hv-brand-border)] underline-offset-4 transition hover:opacity-85"
          >
            {section.bottomLinkLabel || "Contact our support team"}
          </Link>
        </p>
      </div>
    </section>
  );
}

export function JoinCommunitySection() {
  const section = getSections().joinCommunity;
  const backgroundColor = section.backgroundColor?.replace(";", "") || "var(--tg-theme-primary, var(--hv-brand-600))";
  const backgroundStyle =
    backgroundColor.includes("var(--tg-theme-primary)") && !backgroundColor.includes(",")
      ? "var(--tg-theme-primary, var(--hv-brand-600))"
      : backgroundColor;
  const lightBg = isLightBackground(backgroundColor);

  return (
    <section id={section.sectionId || "join-community-main"} className="hvx-landing-section relative py-12 sm:py-16">
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-5 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={motionViewport}
          className={`relative overflow-hidden rounded-3xl px-5 py-10 text-center sm:px-10 ${lightBg ? "text-slate-900" : "text-white"}`}
          style={{ backgroundColor: backgroundStyle }}
        >
          <div className={`pointer-events-none absolute inset-0 ${lightBg ? "bg-white/18" : "bg-black/10"}`} />
          <h2 className="relative mx-auto max-w-4xl text-balance text-3xl font-semibold leading-tight sm:text-4xl">
            {section.title}
          </h2>
          <p
            className={`relative mx-auto mt-4 max-w-3xl text-pretty text-sm leading-7 sm:text-base ${lightBg ? "text-slate-700" : "text-white/90"}`}
          >
            {section.description}
          </p>
          <div className="relative mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {section.cards.map((card, index) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                viewport={motionViewport}
              >
                <Link
                  href={card.url || "#"}
                  target={card.target}
                  className={`group flex h-full items-center justify-center gap-2 rounded-xl px-3 py-3 transition hover:-translate-y-0.5 ${
                    lightBg
                      ? "border border-slate-300 bg-white text-slate-900 shadow-[0_12px_28px_-18px_rgba(15,23,42,0.42)]"
                      : "border border-white/25 bg-white text-slate-900 shadow-[0_10px_26px_-18px_rgba(15,23,42,0.65)]"
                  }`}
                >
                  <img src={card.icon} width="30" height="30" alt="" className="h-7 w-7 object-contain" />
                  <span className="text-sm font-semibold">{card.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HostvibeSections() {
  return (
    <>
      <CpanelFeaturesSection />
      <FeaturesSection />
      <ChooseSection />
      <SupportSection />
      <SupportFrameworkSection />
      <FaqSection />
      <JoinCommunitySection />
    </>
  );
}
