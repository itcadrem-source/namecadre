import type { FormEvent } from "react";

export type HomepageBannerData = {
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  searchButtonLabel?: string;
  domainSearchUrl?: string;
  whoisUrl?: string;
  transferUrl?: string;
  tlds?: Array<{ tld: string; price: string; url?: string }>;
};

const defaultData: Required<Pick<HomepageBannerData, "title" | "description" | "searchPlaceholder" | "searchButtonLabel" | "domainSearchUrl" | "whoisUrl" | "transferUrl">> & { tlds: Array<{ tld: string; price: string; url?: string }> } = {
  title: "Fast and Secure Hosting for Businesses",
  description: "Buy reliable web hosting to bring your website ideas to life.",
  searchPlaceholder: "eg. example.com",
  searchButtonLabel: "Search",
  domainSearchUrl: "/cart.php?a=add&domain=register",
  whoisUrl: "/whois",
  transferUrl: "/cart.php?a=add&domain=transfer",
  tlds: [
    { tld: ".com", price: "$10.99/yr", url: "/cart.php?a=add&domain=register" },
    { tld: ".net", price: "$12.99/yr", url: "/cart.php?a=add&domain=register" },
    { tld: ".org", price: "$11.99/yr", url: "/cart.php?a=add&domain=register" },
    { tld: ".io", price: "$35.99/yr", url: "/cart.php?a=add&domain=register" },
    { tld: ".co", price: "$28.99/yr", url: "/cart.php?a=add&domain=register" },
  ],
};

export default function HomepageBanner({ data }: { data?: HomepageBannerData }) {
  const section = { ...defaultData, ...data, tlds: data?.tlds ?? defaultData.tlds };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.querySelector<HTMLInputElement>('input[name="domain"]');
    const value = input?.value.trim();
    if (!value) return;
    const url = new URL(section.domainSearchUrl, "https://example.com");
    url.searchParams.set("query", value);
    window.location.href = `${url.pathname}${url.search}`;
  };

  return (
    <section className="banner__area hvx-home-hero-area">
      <div className="container">
        <div className="hvx-home-hero-shell">
          <div className="hvx-home-hero-inner">
            <h1 className="hvx-home-hero-title">{section.title}</h1>
            <p className="hvx-home-hero-subtitle">{section.description}</p>

            <div className="hvx-home-hero-search">
              <div className="domain__search-wrap">
                <form className="domain__search-form" onSubmit={onSubmit}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M14.1667 14.1667L17.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <input type="text" name="domain" placeholder={section.searchPlaceholder} autoComplete="off" />
                  <div className="domain__search-action">
                    <button type="submit" className="domain-submit-btn">
                      {section.searchButtonLabel}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="hvx-home-hero-meta">
              <a className="hvx-home-hero-meta-link" href={section.whoisUrl}>
                <i className="fas fa-search" aria-hidden /> Whois Lookup
              </a>
              <a className="hvx-home-hero-meta-link" href={section.transferUrl}>
                <i className="fas fa-exchange-alt" aria-hidden /> Transfer Domain
              </a>
            </div>

            <div className="hvx-home-hero-tlds">
              {section.tlds.map((item) => (
                <a key={`${item.tld}-${item.price}`} className="hvx-home-hero-tld-card" href={item.url || section.domainSearchUrl}>
                  <span className="hvx-home-hero-tld">{item.tld}</span>
                  <span className="hvx-home-hero-price">{item.price}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
