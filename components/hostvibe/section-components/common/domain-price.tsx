export interface DomainPriceItem {
  name?: string;
  introLabel?: string;
  price?: string;
  badge?: string;
  buttonLabel?: string;
  buttonUrl?: string;
}

export interface DomainPriceProps {
  title?: string;
  description?: string;
  items?: DomainPriceItem[];
}

export default function DomainPrice({ title, description, items = [] }: DomainPriceProps) {
  const visibleItems = items.filter((item) => item.name || item.price);
  const hasContent = Boolean(title || description || visibleItems.length);
  if (!hasContent) return null;

  return (
    <section className="domain__price-area section-pb-140">
      <div className="container">
        {(title || description) && (
          <div className="row">
            <div className="col-lg-12">
              <div className="section__title text-center mb-60">
                {title ? <h2 className="title">{title}</h2> : null}
                {description ? <p>{description}</p> : null}
              </div>
            </div>
          </div>
        )}

        {visibleItems.length ? (
          <div className="domain__price-item-wrap">
            <div className="row gutter-30">
              {visibleItems.map((item, index) => (
                <div className="col-xl-3 col-lg-4 col-6" key={`${item.name ?? "plan"}-${index}`}>
                  <div className="domain__price-item">
                    {item.name ? <h3 className="name">{item.name}</h3> : null}
                    {item.introLabel ? <span className="intro-price">{item.introLabel}</span> : null}
                    {item.price ? (
                      <h2 className="price">
                        {item.price}
                        {item.badge ? <span> {item.badge}</span> : null}
                      </h2>
                    ) : null}
                    {item.buttonLabel ? (
                      <div className="domain__price-btn">
                        <a href={item.buttonUrl || "#"} className="tg-btn">
                          {item.buttonLabel}
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
