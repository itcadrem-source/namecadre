import HostvibeHeader from "@/components/hostvibe/header";
import { HostvibePricingSection, PricingServiceSelector } from "@/components/hostvibe/pricing";
import { HostvibeFooter } from "@/components/hostvibe/shared";
import HostingThreeSection from "@/components/hostvibe/section-components/common/hosting-three";
import SupportSection from "@/components/hostvibe/section-components/common/support";
import JoinCommunitySection from "@/components/hostvibe/section-components/common/join-community";
import FaqSection from "@/components/hostvibe/section-components/common/faq";
import { getHostvibeHomepageData } from "@/lib/hostvibe/data";

type PricingTab = {
  id: string;
  label: string;
};

const noExtraCost = [
  "Unlimited SSL security certificates",
  "Free domain (with annual plans)",
  "Professionally designed templates",
  "Automatic backups and updates",
  "Business email inboxes",
  "Unlimited web traffic",
];

const compareRows = [
  { feature: "Websites", premium: "25", business: "50", cloud: "100" },
  { feature: "Storage", premium: "25 GB SSD", business: "50 GB NVMe", cloud: "100 GB NVMe" },
  { feature: "RAM", premium: "2 GB", business: "3 GB", cloud: "4 GB" },
  { feature: "CPU cores", premium: "1", business: "2", cloud: "4" },
  { feature: "Daily backups", premium: "No", business: "Yes", cloud: "Yes" },
  { feature: "Free CDN", premium: "No", business: "Yes", cloud: "Yes" },
  { feature: "Free domain", premium: "Yes", business: "Yes", cloud: "Yes" },
  { feature: "Managed WordPress", premium: "Yes", business: "Yes", cloud: "Yes" },
  { feature: "Free migration", premium: "Yes", business: "Yes", cloud: "Yes" },
];

function Section({
  id,
  title,
  lead,
  children,
}: {
  id?: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="hvx-landing-section py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="hvx-landing-heading text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
          {lead ? <p className="hvx-landing-muted mt-4 text-base leading-7 sm:text-lg">{lead}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

export default function PricingPage() {
  const homepage = getHostvibeHomepageData() as unknown as { pricingThree?: { tabs?: PricingTab[] } };
  const tabs = homepage.pricingThree?.tabs || [];

  return (
    <>
      <HostvibeHeader />
      <main className="hvx-landing-section bg-[var(--hv-landing-bg)] pt-20">
        <section className="relative overflow-hidden pb-12 pt-14 sm:pb-16 sm:pt-20" id="plan-selector">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(37,99,235,0.18),transparent_40%),radial-gradient(circle_at_84%_2%,rgba(14,116,144,0.12),transparent_34%)]" />
          <div className="relative mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="hvx-landing-heading text-balance text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Choose a service and get online today
              </h1>
              <p className="hvx-landing-muted mt-4 text-base leading-7 sm:text-lg">
                Explore hosting plans built for speed, security, and scale.
              </p>
            </div>

            <PricingServiceSelector tabs={tabs} />

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="hvx-landing-card-strong inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold text-[var(--hv-landing-text)]">
                <i className="fa fa-arrows-rotate mr-2 text-[var(--hv-brand)]" aria-hidden /> 30-day money-back guarantee
              </span>
              <span className="hvx-landing-card-strong inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold text-[var(--hv-landing-text)]">
                <i className="fa fa-headset mr-2 text-[var(--hv-brand)]" aria-hidden /> 24/7 support
              </span>
              <span className="hvx-landing-card-strong inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold text-[var(--hv-landing-text)]">
                <i className="fa fa-ban mr-2 text-[var(--hv-brand)]" aria-hidden /> Cancel anytime
              </span>
            </div>
          </div>
        </section>

        <HostvibePricingSection />

        <Section title="Enjoy all this. At no extra cost." lead="Value-added essentials included with every hosting purchase.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {noExtraCost.map((item) => (
              <div key={item} className="hvx-landing-card-strong flex items-center gap-3 rounded-2xl border px-4 py-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--hv-brand-soft)] text-[var(--hv-brand)]">
                  <i className="fa fa-check" aria-hidden />
                </span>
                <p className="text-sm font-medium text-[var(--hv-landing-text)]">{item}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="compare-table" title="Compare our plans" lead="See key plan differences at a glance.">
          <div className="hvx-landing-card-strong overflow-x-auto rounded-3xl border shadow-[0_18px_36px_-28px_rgba(15,23,42,0.32)]">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[var(--hv-brand-a08)]">
                  <th className="px-5 py-4 text-left text-sm font-bold text-[var(--hv-landing-heading)]">Features</th>
                  <th className="px-5 py-4 text-left text-sm font-bold text-[var(--hv-landing-heading)]">Premium</th>
                  <th className="px-5 py-4 text-left text-sm font-bold text-[var(--hv-brand)]">Business</th>
                  <th className="px-5 py-4 text-left text-sm font-bold text-[var(--hv-landing-heading)]">Cloud Startup</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? "bg-[var(--hv-landing-surface-strong)]" : "bg-[var(--hv-brand-a08)]"}>
                    <td className="whitespace-nowrap px-5 py-3.5 text-sm font-semibold text-[var(--hv-landing-heading)]">{row.feature}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-sm text-[var(--hv-landing-text)]">{row.premium}</td>
                    <td className="whitespace-nowrap bg-[var(--hv-brand-a12)] px-5 py-3.5 text-sm font-semibold text-[var(--hv-brand)]">{row.business}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-sm text-[var(--hv-landing-text)]">{row.cloud}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <HostingThreeSection />
        <SupportSection />
        <JoinCommunitySection />
        <FaqSection />
      </main>
      <HostvibeFooter />
    </>
  );
}
