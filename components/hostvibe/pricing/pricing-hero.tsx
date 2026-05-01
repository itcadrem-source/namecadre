import HostvibePricingServiceSelector from "./pricing-service-selector";
import { MotionTimedItem, MotionTimedList } from "./motion-scroll-reveal";

export type PricingHeroTab = {
  id: string;
  label: string;
};

export type PricingHeroBadge = {
  icon: string;
  label: string;
};

export type PricingHeroProps = {
  tabs: PricingHeroTab[];
  title?: string;
  description?: string;
  badges?: PricingHeroBadge[];
  className?: string;
};

const defaultBadges: PricingHeroBadge[] = [
  { icon: "fa fa-arrows-rotate", label: "30-day money-back guarantee" },
  { icon: "fa fa-headset", label: "24/7 support" },
  { icon: "fa fa-ban", label: "Cancel anytime" },
];

export default function PricingHero({
  tabs,
  title = "Choose a service and get online today",
  description = "Explore hosting plans built for speed, security, and scale.",
  badges = defaultBadges,
  className = "",
}: PricingHeroProps) {
  return (
    <section
      id="plan-selector"
      data-pricing-section="hero"
      className={`relative overflow-hidden bg-slate-900 pb-12 pt-14 sm:pb-16 sm:pt-20 ${className}`.trim()}
    >
      <div
        data-anim="parallax-soft"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(96,165,250,0.28),transparent_40%),radial-gradient(circle_at_84%_2%,rgba(34,211,238,0.2),transparent_34%)]"
      />
      <div className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 data-anim="hero-enter" className="text-balance text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p data-anim="hero-enter" className="mt-4 text-base leading-7 text-slate-200 sm:text-lg">{description}</p>
        </div>

        <div data-anim="hero-enter">
          <HostvibePricingServiceSelector tabs={tabs} />
        </div>

        <MotionTimedList className="mt-6 flex flex-wrap justify-center gap-3" amount={0.28}>
          {badges.map((badge) => (
            <MotionTimedItem key={badge.label}>
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-100 backdrop-blur-sm">
                <i className={`${badge.icon} mr-2 text-cyan-300`} aria-hidden /> {badge.label}
              </span>
            </MotionTimedItem>
          ))}
        </MotionTimedList>
      </div>
    </section>
  );
}
