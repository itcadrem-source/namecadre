"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getHostvibeHomepageData } from "@/lib/hostvibe/data";
import { MotionTimedItem, MotionTimedList } from "./motion-scroll-reveal";

type PricingData = {
  sectionId?: string;
  title: string;
  description: string;
  locationTitle: string;
  tabs: Array<{ id: string; label: string; active?: boolean }>;
  locations: Record<string, Array<{ id: string; label: string; flag: string; active?: boolean }>>;
  plans: Record<
    string,
    Record<
      string,
      Array<{
        name: string;
        price: string;
        yearly?: string;
        ctaLabel?: string;
        ctaUrl?: string;
        viewLabel?: string;
        viewUrl?: string;
        theme?: string;
        featured?: boolean;
        features: Array<{ label: string; available?: boolean; info?: string; icon?: string }>;
      }>
    >
  >;
};

type CompareRow = {
  key: string;
  label: string;
  cells: Array<{ value: string; info?: string } | null>;
};

const hashToTab: Record<string, string> = {
  startup: "startup",
  pro: "pro",
  vps: "vps",
  "vps-hosting": "vps",
  email: "email",
  "e-mail": "email",
};

const tabToHash: Record<string, string> = {
  startup: "startup",
  pro: "pro",
  vps: "vps-hosting",
  email: "email",
};

function resolveFeatureIcon(feature: { label: string; icon?: string; available?: boolean }) {
  if (feature.icon) {
    return feature.icon;
  }
  if (feature.label.toLowerCase().includes("cpanel")) {
    return "fab fa-cpanel";
  }
  return feature.available ? "fa fa-check-circle" : "fa fa-times-circle";
}

export default function HostvibePricingSection() {
  const pathname = usePathname();
  const homepage = getHostvibeHomepageData() as unknown as { pricingThree: PricingData };
  const section = homepage.pricingThree;

  const pickDefaultLocation = useCallback((tabId: string) => {
    const tabLocations = section.locations[tabId] || [];
    const fromFlag = tabLocations.find((location) => location.active)?.id;
    const fromList = tabLocations[0]?.id;
    const fromPlanMap = Object.keys(section.plans[tabId] || {})[0];
    return fromFlag || fromList || fromPlanMap || "";
  }, [section.locations, section.plans]);

  const defaultTab = section.tabs.find((tab) => tab.active)?.id || section.tabs[0]?.id || "";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [activeLoc, setActiveLoc] = useState(pickDefaultLocation(defaultTab));
  const [isCompareOpen, setIsCompareOpen] = useState(true);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [mobileComparePlanIndex, setMobileComparePlanIndex] = useState(0);

  useEffect(() => {
    const applyHashTab = () => {
      const raw = window.location.hash.replace("#", "").toLowerCase().trim();
      if (!raw) return;
      const mapped = hashToTab[raw];
      if (!mapped) return;
      const tabExists = section.tabs.some((tab) => tab.id === mapped);
      if (!tabExists) return;
      setActiveTab(mapped);
      setActiveLoc(pickDefaultLocation(mapped));
    };

    applyHashTab();
    window.addEventListener("hashchange", applyHashTab);
    return () => window.removeEventListener("hashchange", applyHashTab);
  }, [section.tabs, pickDefaultLocation]);

  useEffect(() => {
    const onTabChange = (event: Event) => {
      const custom = event as CustomEvent<{ tabId?: string }>;
      const tabId = custom.detail?.tabId;
      if (!tabId) return;
      const tabExists = section.tabs.some((tab) => tab.id === tabId);
      if (!tabExists) return;
      setActiveTab(tabId);
      setActiveLoc(pickDefaultLocation(tabId));
    };

    window.addEventListener("pricing-tab-change", onTabChange as EventListener);
    return () => window.removeEventListener("pricing-tab-change", onTabChange as EventListener);
  }, [section.tabs, pickDefaultLocation]);

  const locations = section.locations[activeTab] || [];

  const resolvedLocation = (() => {
    if (locations.some((location) => location.id === activeLoc)) {
      return activeLoc;
    }
    return pickDefaultLocation(activeTab);
  })();

  const visiblePlans = section.plans[activeTab]?.[resolvedLocation] || [];
  const normalizedPath = (pathname || "").replace(/\/+$/, "") || "/";
  const showInlineTabs = normalizedPath !== "/pricing";
  const showCompareSection = normalizedPath === "/pricing";

  const compareRows: CompareRow[] = (() => {
    if (!visiblePlans.length) return [];
    const byLabel = new Map<string, CompareRow>();

    visiblePlans.forEach((plan, planIndex) => {
      plan.features.forEach((feature) => {
        const featureKey = feature.label.trim().toLowerCase();
        if (!byLabel.has(featureKey)) {
          byLabel.set(featureKey, {
            key: featureKey,
            label: feature.label,
            cells: new Array(visiblePlans.length).fill(null),
          });
        }
        const row = byLabel.get(featureKey)!;
        row.cells[planIndex] = {
          value: feature.label,
          info: feature.info || undefined,
        };
      });
    });

    return Array.from(byLabel.values());
  })();

  const compareColumnTemplate = `minmax(160px,1.1fr) repeat(${Math.max(visiblePlans.length, 1)}, minmax(150px,1fr))`;

  useEffect(() => {
    if (!visiblePlans.length) {
      setMobileComparePlanIndex(0);
      return;
    }
    const featuredIndex = visiblePlans.findIndex((plan) => Boolean(plan.featured));
    setMobileComparePlanIndex(featuredIndex >= 0 ? featuredIndex : 0);
  }, [activeTab, resolvedLocation, visiblePlans]);

  useEffect(() => {
    const syncHeaderState = () => {
      setIsHeaderHidden(document.body.classList.contains("hvx-header-hidden"));
    };

    syncHeaderState();
    const observer = new MutationObserver(syncHeaderState);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={section.sectionId || "pricing-three"}
      data-pricing-section="plans"
      className="hvx-landing-section hvx-pricing-section bg-[var(--hv-pricing-bg)]"
    >
      <span id="startup" className="block scroll-mt-28" aria-hidden />
      <span id="pro" className="block scroll-mt-28" aria-hidden />
      <span id="vps-hosting" className="block scroll-mt-28" aria-hidden />
      <span id="email" className="block scroll-mt-28" aria-hidden />
      <span id="e-mail" className="block scroll-mt-28" aria-hidden />
      <div className="relative mx-auto w-full max-w-[1320px] px-4 py-[140px] sm:px-5 lg:px-6">
        <div className="pointer-events-none absolute inset-x-0 top-8 -z-10 mx-auto h-56 max-w-5xl rounded-full bg-[var(--hv-brand-soft)] opacity-55" />

        <div className="mx-auto max-w-3xl text-center">
          <h2 data-anim="fade-up" className="hvx-landing-heading text-balance text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            {section.title}
          </h2>
          <p data-anim="fade-up" className="hvx-landing-muted pricing-three-lead mt-4 text-pretty text-base sm:text-lg">
            {section.description}
          </p>
        </div>

        {showInlineTabs ? (
          <div className="my-10 flex justify-center sm:my-12">
            <div
              data-anim="fade-up"
              className="hvx-landing-card inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border p-2 shadow-[0_14px_42px_rgba(15,23,42,0.08)]"
              role="group"
              aria-label="Plan type"
            >
              {section.tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`pricing-three-tab-btn inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition ${tab.id === activeTab
                    ? "hvx-brand-btn shadow-[0_10px_24px_rgba(33,72,245,0.30)]"
                    : "text-slate-700 hover:bg-slate-100"
                    }`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setActiveLoc(pickDefaultLocation(tab.id));
                    if (typeof window !== "undefined") {
                      const hash = tabToHash[tab.id] || "pricing-three";
                      window.history.replaceState(null, "", `#${hash}`);
                    }
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {locations.length > 0 ? (
          <div className="mb-8 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
              {section.locationTitle}
            </p>
            <MotionTimedList className="mx-auto inline-flex flex-wrap justify-center gap-2 sm:gap-3" amount={0.2}>
              {locations.map((loc) => (
                <MotionTimedItem key={loc.id}>
                  <button
                    type="button"
                    className={`pricing-three-location-btn flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-wide transition ${loc.id === resolvedLocation
                      ? "border-[var(--hv-brand)] bg-[var(--hv-brand-soft)] text-[var(--hv-brand)] shadow-[0_8px_22px_rgba(33,72,245,0.26)]"
                      : "hvx-landing-card-strong border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    onClick={() => setActiveLoc(loc.id)}
                  >
                    <img src={loc.flag} alt={loc.label} width="34" className="rounded-md border border-slate-200" />
                    <span className="pricing-three-location-label">{loc.label}</span>
                  </button>
                </MotionTimedItem>
              ))}
            </MotionTimedList>
          </div>
        ) : null}

        <AnimatePresence mode="wait">
          <>
            <motion.div
              key={`${activeTab}-${resolvedLocation}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="mt-5 md:hidden"
            >
              <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                spaceBetween={16}
                loop={visiblePlans.length > 1}
                autoplay={
                  visiblePlans.length > 1
                    ? { delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }
                    : false
                }
                className="pricing-three-mobile-swiper"
              >
                {visiblePlans.map((plan, index) => {
                  const isVpsTab = activeTab === "vps";
                  const isDark = isVpsTab
                    ? index === 1
                    : plan.theme === "dark" || (!plan.theme && plan.featured);
                  return (
                    <SwiperSlide key={`${plan.name}-mobile-${index}`}>
                      <article
                        className={`pricing-three-card relative flex h-full flex-col overflow-hidden rounded-3xl border p-5 shadow-[0_18px_48px_rgba(2,6,23,0.12)] sm:p-6 ${isDark
                          ? "border-[var(--hv-brand-border)] bg-[var(--hv-brand-700)] text-white"
                          : "hvx-landing-card-strong border-slate-200/90 text-slate-900"
                          }`}
                      >
                        {plan.featured ? (
                          <span
                            className={`mb-4 inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${isDark ? "bg-white/15 text-white" : "hvx-brand-bg"
                              }`}
                          >
                            Featured
                          </span>
                        ) : null}
                        <h3 className={`text-2xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                          {plan.name}
                        </h3>
                        <p className={`mt-3 text-4xl font-black ${isDark ? "text-white" : "text-[var(--hv-brand)]"}`}>
                          {plan.price}
                        </p>
                        {plan.yearly ? (
                          <p className={`mt-1 text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-500"}`}>
                            {plan.yearly}
                          </p>
                        ) : null}
                        {plan.ctaUrl ? (
                          <Link
                            className={`pricing-three-cta mt-5 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-bold transition ${isDark
                              ? "bg-white text-[var(--hv-brand)] hover:bg-[var(--hv-brand-100)]"
                              : "bg-[var(--hv-brand)] text-white hover:bg-[var(--hv-brand-600)]"
                              }`}
                            href={plan.ctaUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {plan.ctaLabel || "Get Started"}
                          </Link>
                        ) : null}
                        <hr className={`pricing-three-divider my-5 border-dashed ${isDark ? "border-white/30" : "border-slate-200"}`} />
                        <ul className="mb-5 space-y-2.5">
                          {plan.features.map((feature) => (
                            <li key={feature.label} className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-2.5">
                                <i
                                  className={resolveFeatureIcon(feature)}
                                  style={{ color: isDark ? "#ffffff" : "var(--hv-brand)" }}
                                  aria-hidden="true"
                                />
                                <span className={`text-sm leading-6 ${isDark ? "text-slate-100" : "text-slate-700"}`}>
                                  {feature.label}
                                </span>
                              </div>
                              {feature.info ? (
                                <span
                                  className={`inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full text-[12px] ${isDark ? "text-white" : "text-[var(--hv-brand)]"
                                    }`}
                                  title={feature.info}
                                  aria-label={feature.info}
                                >
                                  <i className="fa fa-info-circle" aria-hidden="true" />
                                </span>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                        {plan.viewUrl ? (
                          <Link
                            className={`mt-auto inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition ${isDark
                              ? "bg-white text-[var(--hv-brand)] hover:bg-[var(--hv-brand-100)]"
                              : "bg-[var(--hv-brand)] text-white hover:bg-[var(--hv-brand-600)]"
                              }`}
                            href={plan.viewUrl}
                          >
                            {plan.viewLabel || "View Plan"}
                          </Link>
                        ) : null}
                      </article>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </motion.div>

            <motion.div
              key={`${activeTab}-${resolvedLocation}-desktop`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="pricing-three-row mt-5 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-4"
            >
              {visiblePlans.map((plan, index) => {
                const isVpsTab = activeTab === "vps";
                const isDark = isVpsTab
                  ? index === 1
                  : plan.theme === "dark" || (!plan.theme && plan.featured);
                return (
                  <MotionTimedItem key={`${plan.name}-${index}`}>
                    <article
                      key={`${plan.name}-${index}`}
                      className={`pricing-three-card relative flex h-full flex-col overflow-hidden rounded-3xl border p-5 shadow-[0_18px_48px_rgba(2,6,23,0.12)] sm:p-6 ${isDark
                        ? "border-[var(--hv-brand-border)] bg-[var(--hv-brand-700)] text-white"
                        : "hvx-landing-card-strong border-slate-200/90 text-slate-900"
                        }`}
                    >
                      {plan.featured ? (
                        <span
                          className={`mb-4 inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${isDark ? "bg-white/15 text-white" : "hvx-brand-bg"
                            }`}
                        >
                          Featured
                        </span>
                      ) : null}

                      <h3 className={`text-2xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                        {plan.name}
                      </h3>

                      <p className={`mt-3 text-4xl font-black ${isDark ? "text-white" : "text-[var(--hv-brand)]"}`}>
                        {plan.price}
                      </p>

                      {plan.yearly ? (
                        <p className={`mt-1 text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-500"}`}>
                          {plan.yearly}
                        </p>
                      ) : null}

                      {plan.ctaUrl ? (
                        <Link
                          className={`pricing-three-cta mt-5 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-bold transition ${isDark
                            ? "bg-white text-[var(--hv-brand)] hover:bg-[var(--hv-brand-100)]"
                            : "bg-[var(--hv-brand)] text-white hover:bg-[var(--hv-brand-600)]"
                            }`}
                          href={plan.ctaUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {plan.ctaLabel || "Get Started"}
                        </Link>
                      ) : null}

                      <hr className={`pricing-three-divider my-5 border-dashed ${isDark ? "border-white/30" : "border-slate-200"}`} />

                      <ul className="mb-5 space-y-2.5">
                        {plan.features.map((feature) => (
                          <li key={feature.label} className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-2.5">
                              <i
                                className={resolveFeatureIcon(feature)}
                                style={{ color: isDark ? "#ffffff" : "var(--hv-brand)" }}
                                aria-hidden="true"
                              />
                              <span className={`text-sm leading-6 ${isDark ? "text-slate-100" : "text-slate-700"}`}>
                                {feature.label}
                              </span>
                            </div>
                            {feature.info ? (
                              <span
                                className={`inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full text-[12px] ${isDark ? "text-white" : "text-[var(--hv-brand)]"
                                  }`}
                                title={feature.info}
                                aria-label={feature.info}
                              >
                                <i className="fa fa-info-circle" aria-hidden="true" />
                              </span>
                            ) : null}
                          </li>
                        ))}
                      </ul>

                      {plan.viewUrl ? (
                        <Link
                          className={`mt-auto inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition ${isDark
                            ? "bg-white text-[var(--hv-brand)] hover:bg-[var(--hv-brand-100)]"
                            : "bg-[var(--hv-brand)] text-white hover:bg-[var(--hv-brand-600)]"
                            }`}
                          href={plan.viewUrl}
                        >
                          {plan.viewLabel || "View Plan"}
                        </Link>
                      ) : null}
                    </article>
                  </MotionTimedItem>
                );
              })}
            </motion.div>
          </>
        </AnimatePresence>

        {visiblePlans.length === 0 ? (
          <div className="hvx-landing-card-strong mt-6 rounded-2xl border p-6 text-center text-sm font-medium text-[var(--hv-landing-muted)]">
            No plans available for this selection.
          </div>
        ) : null}

        {showCompareSection && visiblePlans.length > 0 ? (
          <section
            id="compare-table"
            data-anim="fade-up"
            className="mt-14 rounded-3xl border border-[var(--hv-landing-border)] bg-[var(--hv-landing-surface)] p-4 sm:p-6 lg:mt-16 lg:p-8"
          >
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="hvx-landing-heading text-balance text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
                Compare our plans
              </h3>
              <p className="hvx-landing-muted mt-3 text-base sm:text-lg">
                See at a glance what each plan costs and what you get for your money.
              </p>
            </div>

            <div className="mt-8 w-full pb-2 md:hidden">
              {visiblePlans[mobileComparePlanIndex] ? (
                <article className="w-full rounded-2xl bg-white">
                  <div className="relative">
                    <div className="sticky top-0 z-20 bg-white px-3 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {visiblePlans.map((plan, planIndex) => (
                          <button
                            key={`mobile-compare-tab-${plan.name}-${planIndex}`}
                            type="button"
                            onClick={() => setMobileComparePlanIndex(planIndex)}
                            className={`inline-flex min-h-10 items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                              mobileComparePlanIndex === planIndex
                                ? "bg-[var(--hv-brand-soft)] text-[var(--hv-brand)]"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {plan.name}
                          </button>
                        ))}
                      </div>

                      <div className="mt-3 flex flex-col gap-2">
                        {visiblePlans[mobileComparePlanIndex].featured ? (
                          <span className="inline-flex w-fit rounded-md bg-[var(--hv-brand-soft)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--hv-brand)]">
                            Popular
                          </span>
                        ) : null}
                        <p className="hvx-landing-heading text-xl font-bold leading-tight">{visiblePlans[mobileComparePlanIndex].name}</p>
                        <p className="text-xl font-semibold text-[var(--hv-landing-text)]">{visiblePlans[mobileComparePlanIndex].price}</p>
                        <Link
                          href={visiblePlans[mobileComparePlanIndex].ctaUrl || "#"}
                          className="mt-1 inline-flex h-10 w-full items-center justify-center rounded-xl bg-[var(--hv-brand)] px-4 text-sm font-bold text-white transition hover:bg-[var(--hv-brand-600)]"
                        >
                          {visiblePlans[mobileComparePlanIndex].ctaLabel || "Get started"}
                        </Link>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <i className="fa fa-rocket text-[var(--hv-brand)]" aria-hidden />
                        <span className="hvx-landing-heading text-sm font-semibold text-[var(--hv-brand)]">Top features</span>
                      </div>
                      <ul>
                        {compareRows.map((row) => {
                          const cell = row.cells[mobileComparePlanIndex];
                          return (
                            <li
                              key={`mobile-row-${visiblePlans[mobileComparePlanIndex].name}-${row.key}`}
                              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3"
                            >
                              <p className="text-[15px] font-medium text-[var(--hv-landing-text)]">{row.label}</p>
                              <div className="flex items-center gap-2 text-[15px] font-medium text-[var(--hv-landing-text)] text-right">
                                <span>{cell ? cell.value : "—"}</span>
                                {cell?.info ? (
                                  <span
                                    className="inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full text-[12px] text-[var(--hv-brand)]"
                                    title={cell.info}
                                    aria-label={cell.info}
                                  >
                                    <i className="fa fa-info-circle" aria-hidden />
                                  </span>
                                ) : null}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </article>
              ) : null}
            </div>

            <div className="mt-8 hidden w-full pb-2 md:block">
              <div className="min-w-[760px]">
                <div
                  className="sticky z-20 bg-[var(--hv-landing-surface)] transition-[top] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ top: isHeaderHidden ? "0px" : "80px" }}
                >
                  <div className="grid gap-3" style={{ gridTemplateColumns: compareColumnTemplate }}>
                    <div />
                    {visiblePlans.map((plan, index) => (
                      <div key={`compare-plan-${plan.name}-${index}`} className="flex flex-col gap-2 rounded-2xl p-1">
                        <span className="h-7">
                          {plan.featured ? (
                            <span className="inline-flex rounded-md bg-[var(--hv-brand-soft)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--hv-brand)]">
                              Popular
                            </span>
                          ) : null}
                        </span>
                        <p className="hvx-landing-heading text-[17px] font-bold leading-tight sm:text-[18px]">{plan.name}</p>
                        <p className="text-[18px] font-semibold text-[var(--hv-landing-text)] sm:text-[19px]">{plan.price}</p>
                        <Link
                          href={plan.ctaUrl || "#"}
                          className="mt-1 inline-flex h-8 items-center justify-center rounded-xl bg-[var(--hv-brand)] px-4 text-sm font-bold text-white transition hover:bg-[var(--hv-brand-600)]"
                        >
                          {plan.ctaLabel || "Get started"}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 border-y border-[var(--hv-landing-border)]">
                  <button
                    type="button"
                    className="group flex w-full items-center justify-between gap-3 py-3 text-left"
                    onClick={() => setIsCompareOpen((prev) => !prev)}
                    aria-expanded={isCompareOpen}
                  >
                    <div className="flex items-center gap-3">
                      <i className="fa fa-rocket text-[var(--hv-brand)]" aria-hidden />
                      <span className="hvx-landing-heading text-base font-semibold text-[var(--hv-brand)] sm:text-lg">Top features</span>
                    </div>
                    <span className="justify-self-end text-3xl leading-none text-[var(--hv-brand)] transition group-hover:text-[var(--hv-brand-600)]">
                      {isCompareOpen ? "−" : "+"}
                    </span>
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {isCompareOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24 }}
                      className="overflow-hidden"
                    >
                      {compareRows.map((row) => (
                        <MotionTimedItem key={row.key}>
                          <div
                            className="grid items-center border-b border-[var(--hv-landing-border)] py-4"
                            style={{ gridTemplateColumns: compareColumnTemplate }}
                          >
                            <p className="text-[16px] font-medium leading-6 tracking-[0] text-[var(--hv-landing-text)]">{row.label}</p>
                            {row.cells.map((cell, index) => (
                              <div key={`${row.key}-${index}`} className="flex items-center gap-2 text-[16px] font-medium leading-6 tracking-[0] text-[var(--hv-landing-text)]">
                                <span className="font-medium leading-6 tracking-[0]">{cell ? cell.value : "—"}</span>
                                {cell?.info ? (
                                  <span
                                    className="inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full text-[12px] text-[var(--hv-brand)]"
                                    title={cell.info}
                                    aria-label={cell.info}
                                  >
                                    <i className="fa fa-info-circle" aria-hidden />
                                  </span>
                                ) : null}
                              </div>
                            ))}
                          </div>
                        </MotionTimedItem>
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}
