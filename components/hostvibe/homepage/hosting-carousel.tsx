"use client";

import Link from "next/link";
import { motion, useAnimationControls, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getHostvibeHomepageData } from "@/lib/hostvibe/data";

type HostingData = {
  title: string;
  items: Array<{
    title: string;
    description: string;
    link: string;
    class?: string;
    tag?: string;
    icon?: string;
    button?: {
      label: string;
      url: string;
    };
  }>;
};

const AUTO_SLIDE_MS = 4200;
type HostingItem = HostingData["items"][number];

function HostingCard({ item }: { item: HostingItem }) {
  return (
    <article className="hvx-landing-card group relative h-full overflow-hidden rounded-2xl border p-5 shadow-[0_10px_30px_rgba(14,116,144,0.1)]">
      {item.tag ? (
        <span className="absolute right-4 top-4 rounded-full border border-[var(--hv-brand-border)] bg-[var(--hv-brand-soft)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--hv-brand)]">
          {item.tag}
        </span>
      ) : null}

      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--hv-brand-border)] bg-[var(--hv-brand-soft)] text-lg text-[var(--hv-brand)] shadow-sm">
        <i className={item.icon || "fas fa-server"} aria-hidden="true" />
      </div>

      <h3 className="hvx-landing-heading mt-4 text-xl font-semibold">
        <Link href={item.link} className="hover:text-[var(--hv-brand)]">
          {item.title}
        </Link>
      </h3>
      <p className="hvx-landing-muted mt-2 min-h-20 text-sm leading-relaxed">{item.description}</p>

      <Link
        href={item.button?.url || item.link}
        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-semibold transition hover:border-[var(--hv-brand)] hover:bg-[var(--hv-brand-soft)] hover:text-[var(--hv-brand)]"
      >
        {item.button?.label || "See More"}
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

export default function HostvibeHostingCarousel() {
  const homepage = getHostvibeHomepageData() as unknown as { hosting?: HostingData };
  const section = homepage.hosting;
  const [orderedIndexes, setOrderedIndexes] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasMountedRef = useRef(false);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const cardRef = useRef<HTMLLIElement | null>(null);
  const isAnimatingRef = useRef(false);
  const orderedIndexesRef = useRef<number[]>([]);
  const controls = useAnimationControls();
  const reduceMotion = useReducedMotion();

  if (!section || !section.items?.length) {
    return null;
  }

  const totalItems = section.items.length;
  const visibleCount = Math.min(3, totalItems);

  useEffect(() => {
    setOrderedIndexes(section.items.map((_, index) => index));
    orderedIndexesRef.current = section.items.map((_, index) => index);
  }, [section.items]);

  useEffect(() => {
    hasMountedRef.current = true;
    return () => {
      hasMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  useEffect(() => {
    orderedIndexesRef.current = orderedIndexes;
  }, [orderedIndexes]);

  const getSlideStep = () => {
    if (!cardRef.current || !trackRef.current) {
      return 0;
    }
    const trackStyles = window.getComputedStyle(trackRef.current);
    const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap || "0") || 0;
    return cardRef.current.getBoundingClientRect().width + gap;
  };

  const slideNext = async () => {
    if (isAnimatingRef.current || totalItems <= 1) {
      return;
    }
    const currentOrder = orderedIndexesRef.current;
    const step = getSlideStep();
    if (!step || !hasMountedRef.current || !trackRef.current) {
      return;
    }
    setIsAnimating(true);
    await controls.start({
      x: -step,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.48, ease: [0.22, 0.61, 0.36, 1] },
    });
    setOrderedIndexes((current) => current.slice(1).concat(current[0]));
    if (hasMountedRef.current) {
      controls.set({ x: 0 });
    }
    setIsAnimating(false);
  };

  const slidePrev = async () => {
    if (isAnimatingRef.current || totalItems <= 1) {
      return;
    }
    const currentOrder = orderedIndexesRef.current;
    const step = getSlideStep();
    if (!step || !hasMountedRef.current || !trackRef.current) {
      return;
    }
    setIsAnimating(true);
    setOrderedIndexes((current) => [current[current.length - 1], ...current.slice(0, -1)]);
    if (hasMountedRef.current) {
      controls.set({ x: -step });
    }
    await new Promise((resolve) => window.requestAnimationFrame(resolve));
    await controls.start({
      x: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.48, ease: [0.22, 0.61, 0.36, 1] },
    });
    setIsAnimating(false);
  };

  useEffect(() => {
    if (totalItems <= 1) {
      return;
    }
    const timer = window.setInterval(() => {
      void slideNext();
    }, AUTO_SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [totalItems, visibleCount]);

  const renderIndexes = orderedIndexes.length
    ? [...orderedIndexes, ...orderedIndexes.slice(0, visibleCount)]
    : [];

  return (
    <section id="hosting" className="hvx-landing-section hvx-hosting-section relative py-16 sm:py-20">
      <div className="absolute inset-0 -z-10 bg-[var(--hv-brand-soft)] opacity-45" />

      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="hvx-landing-heading text-3xl font-semibold sm:text-4xl">{section.title}</h2>
          <p className="hvx-landing-muted mt-3 text-sm sm:text-base">
            Pick the right hosting stack for your project, then scale when your traffic grows.
          </p>
        </div>

        <div className="hvx-landing-card mt-10 overflow-hidden rounded-3xl border p-4 shadow-[0_18px_45px_rgba(2,6,23,0.08)] backdrop-blur sm:p-6">
          <div className="overflow-hidden">
            <motion.ul
              ref={trackRef}
              animate={controls}
              initial={false}
              drag={totalItems > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                if (isAnimatingRef.current) {
                  return;
                }
                if (info.offset.x <= -60) {
                  void slideNext();
                  return;
                }
                if (info.offset.x >= 60) {
                  void slidePrev();
                }
              }}
              whileDrag={{ cursor: "grabbing" }}
              className="flex gap-4 touch-pan-y cursor-grab active:cursor-grabbing"
            >
              {renderIndexes.map((itemIndex, visiblePosition) => {
                const item = section.items[itemIndex];
                const stackOrder = visiblePosition < visibleCount ? visibleCount - visiblePosition : 0;
                return (
                  <motion.li
                    key={visiblePosition}
                    ref={visiblePosition === 0 ? cardRef : null}
                    style={{ zIndex: stackOrder }}
                    className="w-full shrink-0 md:w-[calc((100%-0.5rem)/2)] xl:w-[calc((100%-2rem)/3)]"
                    initial={false}
                  >
                    <HostingCard item={item} />
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => void slidePrev()}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700"
          >
            Prev
          </button>

          {section.items.map((_, index) => {
            const activeIndex = orderedIndexes[0] ?? 0;
            return (
            <button
              key={`dot-${index}`}
              type="button"
              onClick={() => {
                if (isAnimating || orderedIndexes[0] === index) {
                  return;
                }
                const pivot = orderedIndexes.indexOf(index);
                if (pivot < 0) {
                  return;
                }
                setOrderedIndexes((current) => [...current.slice(pivot), ...current.slice(0, pivot)]);
                if (hasMountedRef.current) {
                  controls.set({ x: 0 });
                }
              }}
              aria-label={`Go to hosting slide ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === activeIndex ? "bg-[var(--hv-brand)]" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          );
          })}

          <button
            type="button"
            onClick={() => void slideNext()}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
