export type HomepageHostingItem = {
  class?: string;
  icon?: string;
  title?: string;
  description?: string;
  link?: string;
  url?: string;
  tag?: string;
  button?: { label?: string; url?: string };
  buttonLabel?: string;
  buttonUrl?: string;
};

export type HomepageHostingData = {
  title?: string;
  items?: HomepageHostingItem[];
};

export default function HostingSection({ data }: { data?: HomepageHostingData }) {
  const section = {
    title: data?.title || "",
    items: data?.items || [],
  };

  return (
    <section className="hosting__area section-py-140" id="hosting">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-lg-12">
            <div className="section__title mb-40">
              <h2 className="title text-center">{section.title}</h2>
            </div>
          </div>
        </div>

        <div className="hosting__item-wrap">
          <div className="swiper-container hosting-active fix">
            <div className="swiper-wrapper">
              {section.items.map((item, idx) => {
                const href = item.button?.url || item.buttonUrl || item.link || item.url || "#";
                const label = item.button?.label || item.buttonLabel || "See More";

                return (
                  <div className="swiper-slide" key={`${item.title || "hosting"}-${idx}`}>
                    <div className={`hosting__item${item.class ? ` ${item.class}` : ""}`}>
                      <div className="hosting__icon">
                        <i className={item.icon || "fas fa-server"} aria-hidden />
                      </div>

                      <div className="hosting__content">
                        <h3 className="title">
                          <a href={item.link || item.url || "#"}>{item.title || "Hosting"}</a>
                        </h3>
                        <p>{item.description || ""}</p>

                        <div className="hosting__btn text-center">
                          <a href={href} className="tg-btn tg-btn-three border border border-primary hosting-home-cta">
                            {label}
                            <i className="fas fa-arrow-right" aria-hidden />
                          </a>
                        </div>
                      </div>

                      {item.tag ? <span className="hosting__tag">{item.tag}</span> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="hosting-pagination mt-3 text-center" />
        </div>
      </div>
    </section>
  );
}
