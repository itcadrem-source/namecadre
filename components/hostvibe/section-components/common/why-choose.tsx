import { MotionTimedItem, MotionTimedList } from "@/components/hostvibe/pricing/motion-scroll-reveal";

export type WhyChooseItem = {
  title: string;
  description: string;
  icon: string;
};

export type WhyChooseProps = {
  title?: string;
  lead?: string;
  items?: WhyChooseItem[];
  className?: string;
};

const defaultItems: WhyChooseItem[] = [
  {
    title: "Domains portfolio",
    description:
      "Take control of your domains with one-click DNS edits, privacy by default, and powerful portfolio tools that scale as you grow.",
    icon: "fa-solid fa-globe",
  },
  {
    title: "Unbox™",
    description:
      "Launch faster with Unbox™, a guided flow that instantly links your domain to hosting, email, SSL, and more, then lets you add, upgrade, or swap products any time.",
    icon: "fa-solid fa-cubes",
  },
  {
    title: "Built-in security",
    description:
      "Stay protected from day one with free SSL, firewall, and malware monitoring, DNSSEC, and two-factor login, keeping every site and account safe.",
    icon: "fa-solid fa-shield-halved",
  },
];

function WhyChooseIcon({ icon }: { icon: WhyChooseItem["icon"] }) {
  const iconClass = icon?.trim() ? icon : "fa-solid fa-globe";
  return (
    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-slate-300 to-slate-100 text-3xl text-slate-700">
      <i className={iconClass} aria-hidden />
    </div>
  );
}

export default function WhyChooseSection({
  title = "Why choose namecadre?",
  lead = "It’s the simplest way to launch, secure, and grow your projects.",
  items = defaultItems,
  className = "",
}: WhyChooseProps) {
  return (
    <section data-pricing-section="why-choose" className={`hvx-landing-section bg-slate-100 py-16 sm:py-20 ${className}`.trim()}>
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <h2 data-anim="fade-up" className="hvx-landing-heading text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p data-anim="fade-up" className="hvx-landing-muted max-w-[560px] text-base leading-7 sm:text-lg md:justify-self-end">
            {lead}
          </p>
        </div>

        <MotionTimedList className="mt-12 grid gap-10 md:grid-cols-3" amount={0.22}>
          {items.map((item) => (
            <MotionTimedItem key={item.title}>
              <article className="max-w-[360px]">
              <WhyChooseIcon icon={item.icon} />
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">{item.title}</h3>
              <p className="hvx-landing-muted mt-3 text-base leading-7 sm:text-lg">{item.description}</p>
              </article>
            </MotionTimedItem>
          ))}
        </MotionTimedList>
      </div>
    </section>
  );
}
