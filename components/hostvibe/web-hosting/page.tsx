"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";

type Plan = {
  name: string;
  price: string;
  billing: string;
  cta: string;
  href: string;
  featured?: boolean;
  specs: string[];
};

type IconItem = {
  title: string;
  body: string;
  icon: string;
};

const plans: Plan[] = [
  {
    name: "Starter Cloud",
    price: "$2.99/mo",
    billing: "Renews at $4.99/mo",
    cta: "Launch Starter",
    href: "/cart.php?a=add&pid=1",
    specs: ["1 Website", "25 GB NVMe SSD", "Unlimited Bandwidth", "Free SSL + CDN", "Daily Backups"],
  },
  {
    name: "Business Pro",
    price: "$5.49/mo",
    billing: "Renews at $8.99/mo",
    cta: "Start Business Pro",
    href: "/cart.php?a=add&pid=2",
    featured: true,
    specs: ["25 Websites", "100 GB NVMe SSD", "LiteSpeed + Cache", "Staging + Git", "Priority Support"],
  },
  {
    name: "Scale Max",
    price: "$9.99/mo",
    billing: "Renews at $14.99/mo",
    cta: "Scale With Max",
    href: "/cart.php?a=add&pid=3",
    specs: ["Unlimited Websites", "200 GB NVMe SSD", "Dedicated Resources", "Advanced WAF", "24/7 Senior Support"],
  },
];

const managedBenefits: IconItem[] = [
  {
    title: "Free Domain + Migration",
    body: "Move your existing website with no downtime and no transfer fee.",
    icon: "fa fa-right-left",
  },
  {
    title: "Managed WordPress",
    body: "Auto-updates, caching, and performance tuning handled for you.",
    icon: "fa fa-wordpress",
  },
  {
    title: "Always-On Security",
    body: "Free SSL, malware scanning, and firewall protection out of the box.",
    icon: "fa fa-shield-halved",
  },
  {
    title: "24/7 Support Team",
    body: "Technical help available whenever your site needs attention.",
    icon: "fa fa-headset",
  },
];

const migrationSteps = [
  {
    title: "Share Current Access",
    body: "Send your old hosting panel details securely from dashboard.",
  },
  {
    title: "Clone + Validate",
    body: "We migrate your files, DB, emails, and verify staging health.",
  },
  {
    title: "DNS Cutover",
    body: "Switch traffic in a controlled window with rollback-ready setup.",
  },
];

const aiBlocks: IconItem[] = [
  {
    title: "AI-Integrated Theme",
    body: "Launch a production-ready site with optimized layout, content blocks, and structure.",
    icon: "fa fa-wand-magic-sparkles",
  },
  {
    title: "SEO Content Assistant",
    body: "Create unique, SEO-friendly copy and metadata from your dashboard workflow.",
    icon: "fa fa-robot",
  },
  {
    title: "AI Image Selection",
    body: "Fill pages faster with relevant visuals picked to match your content goals.",
    icon: "fa fa-image",
  },
];

const securityItems = [
  "Free SSL certificates auto-installed on every website.",
  "Proactive malware scanning and cleanup support.",
  "Privacy-first controls for account and site ownership.",
  "IP and country blocking tools for better traffic control.",
];

const performanceItems = [
  "NVMe storage for fast data access and lower latency.",
  "In-house CDN, object cache, and LiteSpeed acceleration.",
  "Unlimited bandwidth for traffic spikes and campaigns.",
  "Global datacenter coverage for regional speed delivery.",
];

const scaleItems = [
  "Upgrade resources smoothly as your traffic increases.",
  "Use temporary plan boosts during launch or promotions.",
  "Run multiple projects from one managed hosting account.",
  "Keep growth predictable with transparent hosting tiers.",
];

const reviewCards = [
  { source: "Google", rating: "4.8/5", reviews: "1,200+ reviews" },
  { source: "HostAdvice", rating: "4.6/5", reviews: "2,400+ reviews" },
  { source: "WpBeginner", rating: "4.7/5", reviews: "870+ reviews" },
];

const testimonials = [
  {
    quote:
      "Migration was done overnight and our ecommerce load time dropped massively without changing our stack.",
    name: "Arafat Rahman",
    role: "Founder, UrbanGadgets",
  },
  {
    quote:
      "Support replies are technical and fast. We scaled to traffic spikes during campaigns with zero downtime.",
    name: "Nabila Islam",
    role: "Head of Marketing, EduFlow",
  },
  {
    quote:
      "We replaced three tools with one panel. Backups, SSL, caching, and deployments are now straightforward.",
    name: "Rafi Khan",
    role: "CTO, FitCommerce",
  },
];

const faqs = [
  {
    q: "What is web hosting and why do I need it?",
    a: "Web hosting stores your website files and makes your site accessible online. Without hosting, your domain cannot serve pages to visitors.",
  },
  {
    q: "Can I buy hosting with a domain together?",
    a: "Yes. Annual plans include a free domain for the first year, and you can manage both from one dashboard.",
  },
  {
    q: "Can I migrate an existing website for free?",
    a: "Yes. Migration is included, and our team can handle automated transfer with minimal disruption.",
  },
  {
    q: "Do I need technical knowledge to manage hosting?",
    a: "No. Managed hosting and guided support are designed for beginners while still offering advanced controls for developers.",
  },
];

function SectionShell({
  id,
  title,
  lead,
  tone = "default",
  children,
}: {
  id?: string;
  title: string;
  lead?: string;
  tone?: "default" | "soft" | "accent";
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "soft"
      ? "bg-white"
      : tone === "accent"
        ? "bg-[linear-gradient(180deg,rgba(3,105,161,0.06),rgba(248,250,252,0))]"
        : "bg-transparent";

  return (
    <section id={id} className={`hvx-landing-section relative py-20 sm:py-24 ${toneClass}`}>
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <h2 className="hvx-landing-heading text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {lead ? <p className="hvx-landing-muted mt-4 text-pretty text-base leading-7 sm:text-lg">{lead}</p> : null}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function InfoCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-slate-200/90 bg-white p-5 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.32)] sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function IconFeatureCard({ item }: { item: IconItem }) {
  return (
    <InfoCard>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
        <i className={item.icon} aria-hidden />
      </span>
      <h3 className="hvx-landing-heading mt-4 text-xl font-semibold">{item.title}</h3>
      <p className="hvx-landing-muted mt-2 text-sm leading-7">{item.body}</p>
    </InfoCard>
  );
}

function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-center">
      <p className="text-2xl font-black tracking-tight text-sky-700">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">{label}</p>
    </div>
  );
}

export default function WebHostingPage() {
  const [activeFaq, setActiveFaq] = useState(0);
  const badges = useMemo(() => ["NVMe Turbo", "99.99% Uptime", "24/7 Expert Support", "Free Migration"], []);

  return (
    <main className="bg-slate-50 pt-20">
      <section className="hvx-landing-section relative overflow-hidden pb-16 pt-20 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_8%,rgba(2,132,199,0.18),transparent_38%),radial-gradient(circle_at_85%_2%,rgba(14,116,144,0.12),transparent_35%)]" />
        <div className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-sky-800">
                Web Hosting
              </span>
              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Launch Fast, Secure, and Reliable Websites
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                High-performance managed hosting with clear pricing, security-first defaults, and migration support
                designed to reduce operational friction.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="#plans"
                  className="inline-flex items-center rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-sky-800"
                >
                  View Hosting Plans
                </Link>
                <Link
                  href="#migration"
                  className="inline-flex items-center rounded-full border border-sky-300 bg-white px-6 py-3 text-sm font-semibold text-sky-700 transition-colors duration-200 hover:bg-sky-50"
                >
                  Free Migration
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <span key={badge} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <InfoCard>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <StatChip value="99.99%" label="Uptime Target" />
                  <StatChip value="8x" label="Faster TTFB" />
                  <StatChip value="<50ms" label="Edge Latency" />
                  <StatChip value="24/7" label="Expert Support" />
                </div>
                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-lg font-semibold text-slate-900">Realtime Hosting Health</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Monitor SSL, backups, response times, and performance incidents from one control panel.
                  </p>
                </div>
              </InfoCard>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionShell
        id="plans"
        tone="soft"
        title="Pick the plan that checks your boxes"
        lead="Transparent tiers with clear specs and smooth upgrade paths."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`rounded-3xl border p-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] ${
                plan.featured
                  ? "border-sky-300 bg-sky-800 text-white"
                  : "border-slate-200 bg-white"
              }`}
            >
              {plan.featured ? (
                <span className="mb-4 inline-flex w-fit rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]">
                  Most Popular
                </span>
              ) : null}
              <h3 className={`text-2xl font-bold ${plan.featured ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
              <p className={`mt-3 text-4xl font-black ${plan.featured ? "text-white" : "text-sky-700"}`}>{plan.price}</p>
              <p className={`mt-1 text-sm ${plan.featured ? "text-sky-100" : "text-slate-600"}`}>{plan.billing}</p>
              <ul className="my-6 space-y-2.5">
                {plan.specs.map((spec) => (
                  <li key={spec} className="flex items-start gap-2.5 text-sm">
                    <i className="fa fa-check-circle mt-0.5" aria-hidden />
                    <span className={plan.featured ? "text-sky-50" : "text-slate-700"}>{spec}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                  plan.featured
                    ? "bg-white text-sky-800 hover:bg-sky-50"
                    : "bg-sky-700 text-white hover:bg-sky-800"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="managed" title="Unlock the power of managed web hosting" lead="Core benefits delivered in one coherent platform.">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {managedBenefits.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <IconFeatureCard item={item} />
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="stories" tone="soft" title="Trusted stories from real website owners" lead="Social proof and customer outcomes before technical deep-dives.">
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <InfoCard>
                <div className="mb-3 flex gap-1 text-sky-700">
                  <i className="fa fa-star" aria-hidden />
                  <i className="fa fa-star" aria-hidden />
                  <i className="fa fa-star" aria-hidden />
                  <i className="fa fa-star" aria-hidden />
                  <i className="fa fa-star" aria-hidden />
                </div>
                <p className="text-sm leading-7 text-slate-700">“{item.quote}”</p>
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-600">{item.role}</p>
                </div>
              </InfoCard>
            </motion.article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="ai-launch"
        title="Launching a website is easier with AI"
        lead="AI-assisted production flow from structure to content."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {aiBlocks.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <IconFeatureCard item={item} />
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="security"
        tone="soft"
        title="Security is our top priority"
        lead="Protection defaults built into every hosting plan."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {securityItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <InfoCard>
                <p className="text-sm leading-7 text-slate-700">{item}</p>
              </InfoCard>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="performance"
        title="Unmatched website performance"
        lead="Fast delivery stack for low latency and traffic resilience."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {performanceItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <InfoCard>
                <p className="text-sm leading-7 text-slate-700">{item}</p>
              </InfoCard>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="scale"
        tone="soft"
        title="Scale your business, we got your back"
        lead="Upgrade confidently as traffic and complexity grow."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {scaleItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <InfoCard>
                <p className="text-sm leading-7 text-slate-700">{item}</p>
              </InfoCard>
            </motion.div>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="migration"
        title="Migrate to NameCadre effortlessly"
        lead="Structured migration workflow with minimal risk."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {migrationSteps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <InfoCard className="h-full">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-sky-700">Step {index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p>
              </InfoCard>
            </motion.article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="ratings"
        tone="soft"
        title="Join thousands of happy website owners"
        lead="Independent rating signals from trusted review platforms."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {reviewCards.map((item, index) => (
            <motion.article
              key={item.source}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <InfoCard className="text-center">
                <p className="text-lg font-bold text-slate-900">{item.source}</p>
                <div className="my-3 flex justify-center gap-1 text-sky-700">
                  <i className="fa fa-star" aria-hidden />
                  <i className="fa fa-star" aria-hidden />
                  <i className="fa fa-star" aria-hidden />
                  <i className="fa fa-star" aria-hidden />
                  <i className="fa fa-star" aria-hidden />
                </div>
                <p className="text-3xl font-black text-sky-700">{item.rating}</p>
                <p className="mt-2 text-sm text-slate-600">{item.reviews}</p>
              </InfoCard>
            </motion.article>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id="faq"
        title="Frequently Asked Questions"
        lead="Answers to common hosting and migration questions."
      >
        <div className="mx-auto max-w-[980px] space-y-3">
          {faqs.map((item, index) => {
            const open = index === activeFaq;
            return (
              <motion.article
                key={item.q}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                viewport={{ once: true, amount: 0.2 }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_30px_-24px_rgba(15,23,42,0.35)]"
              >
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left"
                  onClick={() => setActiveFaq(open ? -1 : index)}
                  aria-expanded={open}
                >
                  <span className="text-base font-semibold text-slate-900">{item.q}</span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-base text-sky-700">
                    {open ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden border-t border-slate-200 px-5 pb-4 pt-3"
                    >
                      <p className="text-sm leading-7 text-slate-700">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </SectionShell>

      <section className="hvx-landing-section relative pb-20 pt-8 sm:pb-24">
        <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-3xl border border-sky-200 bg-[linear-gradient(160deg,rgba(3,105,161,0.14),rgba(255,255,255,0.98))] p-8 text-center shadow-[0_22px_44px_-30px_rgba(15,23,42,0.38)] sm:p-10"
          >
            <h3 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Ready To Move Your Website?</h3>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              Choose your plan, request migration, and launch with a stack built for speed and reliability.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#plans"
                className="inline-flex rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-sky-800"
              >
                Get Started
              </Link>
              <Link
                href="/submitticket.php"
                className="inline-flex rounded-full border border-sky-300 bg-white px-6 py-3 text-sm font-semibold text-sky-700 transition-colors duration-200 hover:bg-sky-50"
              >
                Talk To Expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
