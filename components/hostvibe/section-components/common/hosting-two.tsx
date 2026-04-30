export interface HostingTwoItem {
  icon?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  badge?: string;
  badgeClass?: string;
}

export interface HostingTwoProps {
  subtitle?: string;
  title?: string;
  description?: string;
  items?: HostingTwoItem[];
}

export default function HostingTwo({ subtitle, title, description, items = [] }: HostingTwoProps) {
  const visibleItems = items.filter((item) => item.title || item.description || item.icon);
  const hasContent = Boolean(subtitle || title || description || visibleItems.length);
  if (!hasContent) return null;

  return (
    <section className="hosting__area-two section-py-140">
      <div className="container">
        <div className="hosting__item-wrap-two">
          <div className="row gutter-y-24">
            {(subtitle || title || description) && (
              <div className="col-xl-6 col-lg-8">
                <div className="hosting__content-wrap">
                  <div className="section__title mb-15">
                    {subtitle ? <span className="sub-title">{subtitle}</span> : null}
                    {title ? <h2 className="title">{title}</h2> : null}
                    {description ? <p>{description}</p> : null}
                  </div>
                </div>
              </div>
            )}

            {visibleItems.map((item, index) => (
              <div className="col-xl-3 col-lg-4 col-sm-6" key={`${item.title ?? "hosting"}-${index}`}>
                <div className="hosting__item-two">
                  <div className="hosting__item-top">
                    <div className="hosting__icon hosting__icon-two">{item.icon ? <i className={item.icon} /> : null}</div>
                    <div className="hosting__content-top">
                      {item.title ? <h4 className="title">{item.title}</h4> : null}
                      {item.subtitle ? <span>{item.subtitle}</span> : null}
                    </div>
                  </div>

                  <div className="hosting__content-two">
                    {item.description ? <p>{item.description}</p> : null}
                    {item.buttonLabel ? (
                      <div className="hosting__btn">
                        <a href={item.buttonUrl || "#"} className="tg-btn tg-btn-three">
                          {item.buttonLabel}
                          <i className="fas fa-arrow-right" />
                        </a>
                      </div>
                    ) : null}
                  </div>

                  {item.badge ? (
                    <span className={`hosting__badge${item.badgeClass ? ` ${item.badgeClass}` : ""}`}>{item.badge}</span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
