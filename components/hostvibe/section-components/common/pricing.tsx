export interface PricingItem {
  relid?: string | number;
  is_featured?: string | number;
  name?: string;
  shortDescription?: string;
  prefix?: string;
  monthly?: string | number;
  annually?: string | number;
  description?: string;
  orderUrl?: string;
}

export interface PricingProps {
  sectionId?: string;
  title?: string;
  description?: string;
  items?: PricingItem[];
  monthlyLabel?: string;
  yearlyLabel?: string;
  orderNowLabel?: string;
}

export default function Pricing({
  sectionId = "plans",
  title,
  description,
  items = [],
  monthlyLabel = "Monthly",
  yearlyLabel = "Annually (save 30%)",
  orderNowLabel = "Order Now",
}: PricingProps) {
  const hasContent = Boolean(title || description || items.length);
  if (!hasContent) return null;

  return (
    <section className="pricing__area section-py-140" id={sectionId}>
      <div className="container">
        {(title || description) && (
          <div className="row">
            <div className="col-lg-12">
              <div className="section__title text-center mb-40">
                {title ? <h2 className="title">{title}</h2> : null}
                {description ? <p>{description}</p> : null}
              </div>
            </div>
          </div>
        )}

        {items.length ? (
          <>
            <div className="pricing-tab">
              <span className="tab-btn monthly_tab_title">{monthlyLabel}</span>
              <span className="pricing-tab-switcher" />
              <span className="tab-btn annual_tab_title">{yearlyLabel}</span>
            </div>

            <div className="pricing__item-wrap">
              <div className="row justify-content-center">
                {items.map((item, index) => {
                  const monthly = item.monthly ?? "0.00";
                  const yearly = item.annually || monthly;
                  return (
                    <div className="col-lg-4 col-md-6" key={`${item.name ?? "plan"}-${index}`}>
                      <div className={`pricing__box${String(item.is_featured) === "1" ? " pricing__box--featured" : ""}`}>
                        <div className="pricing__plan">
                          <h4 className="title">{item.name || "Plan"}</h4>
                          <p>{item.shortDescription || "Everything you need for your website"}</p>
                        </div>

                        <div className="pricing__price">
                          <h2 className="price monthly_price">
                            {item.prefix}
                            {monthly}
                            <span>/month</span>
                          </h2>
                          <h2 className="price annual_price">
                            {item.prefix}
                            {yearly}
                            <span>/year</span>
                          </h2>
                        </div>

                        <div className="pricing__btn">
                          <a href={item.orderUrl || `?a=add&pid=${item.relid ?? ""}`} className="tg-btn tg-border-btn">
                            <i className="fas fa-arrow-right" />
                            {orderNowLabel}
                          </a>
                        </div>

                        <div className="pricing__list" dangerouslySetInnerHTML={{ __html: item.description || "" }} />
                        <div className="pricing__select">
                          <span className="more-item">More Features</span>
                          <span className="less-item">Less Features</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
