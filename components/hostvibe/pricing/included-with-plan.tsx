import { MotionTimedItem, MotionTimedList } from "./motion-scroll-reveal";
export type IncludedWithPlanIcon = "chat" | "security" | "uptime" | "dashboard" | "support";

export type IncludedWithPlanFeature = {
  title: string;
  description: string;
  icon: IncludedWithPlanIcon;
};

export type IncludedWithPlanProps = {
  title?: string;
  features?: IncludedWithPlanFeature[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
};

export const defaultIncludedWithPlanFeatures: IncludedWithPlanFeature[] = [
  {
    title: "Website Builder",
    description: "Build your website in 3 simple steps, with AI tools. You’ll be going live in minutes.",
    icon: "chat",
  },
  {
    title: "Total security",
    description: "Relax, your websites and visitors are protected by the latest security software.",
    icon: "security",
  },
  {
    title: "99.9% uptime. Guaranteed",
    description: "Our 99.9% uptime guarantee means your website is always available.",
    icon: "uptime",
  },
  {
    title: "A single, simple dashboard",
    description: "Designed to be easy-to-use for beginners and professionals alike, you can see at a glance how your site is performing.",
    icon: "dashboard",
  },
  {
    title: "24/7 customer support",
    description: "Access expert support whenever you need it. We typically respond in under 2 minutes and our team speak 8+ languages.",
    icon: "support",
  },
];

function IncludedPlanIcon({ kind }: { kind: IncludedWithPlanIcon }) {
  if (kind === "security") {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <rect x="2.5" y="5" width="14" height="14" rx="2.5" />
        <path d="M6.5 9.5h6M6.5 13.5h4" />
        <path d="M16 8.5l3-1.5 3 1.5v4.8c0 2.5-2.2 4.4-3 4.9-.8-.5-3-2.4-3-4.9V8.5z" />
        <path d="m18.3 11.2 1.1 1.1 2-2.1" />
      </svg>
    );
  }
  if (kind === "uptime") {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <path d="M3.5 14a8.5 8.5 0 1 1 17 0" />
        <path d="M12 5v2M6.7 7l1.4 1.4M17.3 7l-1.4 1.4M4.5 11h2M17.5 11h2" />
        <circle cx="12" cy="14" r="3.8" />
        <path d="m12 14 3-4" />
      </svg>
    );
  }
  if (kind === "dashboard") {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <rect x="3" y="3" width="6.5" height="4.8" rx="1.2" />
        <rect x="11.5" y="3" width="9.5" height="4.8" rx="1.2" />
        <rect x="3" y="9.5" width="6.5" height="11.5" rx="1.2" />
        <rect x="11.5" y="9.5" width="9.5" height="4.8" rx="1.2" />
        <rect x="11.5" y="16.2" width="9.5" height="4.8" rx="1.2" />
        <path d="M6.2 14.8v3.5M4.5 16.6H8" />
      </svg>
    );
  }
  if (kind === "support") {
    return (
      <svg viewBox="0 0 24 24" className="h-9 w-9 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
        <rect x="2.5" y="4" width="10.5" height="8.8" rx="2.2" />
        <path d="M7 12.8v2.8l3-2.8" />
        <rect x="10.5" y="8.5" width="11" height="10" rx="2.2" />
        <path d="M15 14h2M18.5 14h.1M15 17h.1M18.5 17h.1" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-9 w-9 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="2.5" y="4" width="10.5" height="8.8" rx="2.2" />
      <path d="M7 12.8v2.8l3-2.8" />
      <rect x="10.5" y="8.5" width="11" height="10" rx="2.2" />
      <path d="M15 14h2M18.5 14h.1M15 17h.1M18.5 17h.1" />
    </svg>
  );
}

export default function IncludedWithPlan({
  title = "Included with every plan",
  features = defaultIncludedWithPlanFeatures,
  ctaLabel = "Get started",
  ctaHref = "#pricing-three",
  className = "",
}: IncludedWithPlanProps) {
  const topRow = features.slice(0, 3);
  const bottomRow = features.slice(3, 5);

  return (
    <section data-pricing-section="included" className={`hvx-landing-section bg-slate-50 py-16 sm:py-20 ${className}`.trim()}>
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <h2 data-anim="fade-up" className="hvx-landing-heading text-center text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h2>

        <div className="mx-auto mt-12 max-w-[1120px] space-y-12">
          <MotionTimedList className="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-3" amount={0.24}>
            {topRow.map((item) => (
              <MotionTimedItem
                key={item.title}
                className="hvx-included-item text-center transition-transform duration-300 ease-out will-change-transform hover:-translate-y-2 hover:scale-[1.02] hover:drop-shadow-[0_20px_28px_rgba(15,23,42,0.18)] focus-within:-translate-y-2 focus-within:scale-[1.02] focus-within:drop-shadow-[0_20px_28px_rgba(15,23,42,0.18)]"
              >
                <div className="mx-auto inline-flex h-[88px] w-[88px] items-center justify-center rounded-2xl bg-[#e9eaf2]">
                  <IncludedPlanIcon kind={item.icon} />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="hvx-landing-muted mx-auto mt-3 max-w-[330px] text-base leading-7 sm:text-lg">
                  {item.description}
                </p>
              </MotionTimedItem>
            ))}
          </MotionTimedList>

          <MotionTimedList className="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2 md:px-[14%]" amount={0.24}>
            {bottomRow.map((item) => (
              <MotionTimedItem
                key={item.title}
                className="hvx-included-item text-center transition-transform duration-300 ease-out will-change-transform hover:-translate-y-2 hover:scale-[1.02] hover:drop-shadow-[0_20px_28px_rgba(15,23,42,0.18)] focus-within:-translate-y-2 focus-within:scale-[1.02] focus-within:drop-shadow-[0_20px_28px_rgba(15,23,42,0.18)]"
              >
                <div className="mx-auto inline-flex h-[88px] w-[88px] items-center justify-center rounded-2xl bg-[#e9eaf2]">
                  <IncludedPlanIcon kind={item.icon} />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="hvx-landing-muted mx-auto mt-3 max-w-[330px] text-base leading-7 sm:text-lg">
                  {item.description}
                </p>
              </MotionTimedItem>
            ))}
          </MotionTimedList>
        </div>

        <div data-anim="fade-up" className="mt-14 text-center">
          <a
            href={ctaHref}
            className="inline-flex min-w-[185px] items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 sm:text-base"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
