export interface FeaturesThreeItem {
  title?: string;
  description?: string;
  className?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  shape?: string;
}

export interface FeaturesThreeProps {
  title?: string;
  description?: string;
  background?: string;
  items?: FeaturesThreeItem[];
}

export default function FeaturesThree({ title, description, background, items = [] }: FeaturesThreeProps) {
  const visibleItems = items.filter((item) => item.title || item.description);
  const hasContent = Boolean(title || description || visibleItems.length);
  if (!hasContent) return null;

  return (
    <section className="features__area-three section-pb-140">
      <div className="container">
        <div
          className="features__inner-wrap-two"
          data-background={background || "templates/hostvibe/images/features-bg.jpg"}
        >
          {(title || description) && (
            <div className="row">
              <div className="col-lg-12">
                <div className="section__title text-center mb-50">
                  {title ? <h2 className="title">{title}</h2> : null}
                  {description ? <p>{description}</p> : null}
                </div>
              </div>
            </div>
          )}

          <div className="row gutter-y-24">
            {visibleItems.map((item, index) => (
              <div className="col-md-6" key={`${item.title ?? "feature"}-${index}`}>
                <div className={`features__item-five${item.className ? ` ${item.className}` : ""}`}>
                  <div className="features__content-five">
                    {item.title ? <h3 className="title">{item.title}</h3> : null}
                    {item.description ? <p>{item.description}</p> : null}
                    {item.buttonLabel ? (
                      <a href={item.buttonUrl || "#"} className="tg-btn">
                        {item.buttonLabel}
                        <i className="fas fa-arrow-right" />
                      </a>
                    ) : null}
                  </div>
                  {item.shape ? (
                    <div className="features__shape-three">
                      <img src={item.shape} alt="shape" />
                    </div>
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
