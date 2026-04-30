export interface FeaturesTwoItem {
  iconClass?: string;
  title?: string;
  description?: string;
}

export interface FeaturesTwoProps {
  title?: string;
  description?: string;
  items?: FeaturesTwoItem[];
  buttonLabel?: string;
  buttonUrl?: string;
}

export default function FeaturesTwo({
  title,
  description,
  items = [],
  buttonLabel,
  buttonUrl,
}: FeaturesTwoProps) {
  const visibleItems = items.filter((item) => item.title || item.description);
  const hasContent = Boolean(title || description || visibleItems.length || buttonLabel);
  if (!hasContent) return null;

  return (
    <section className="features__area-two section-py-140 mb-100">
      <div className="container">
        {(title || description) && (
          <div className="row">
            <div className="col-lg-12">
              <div className="section__title white-title text-center mb-60">
                {title ? <h2 className="title">{title}</h2> : null}
                {description ? <p>{description}</p> : null}
              </div>
            </div>
          </div>
        )}

        <div className="row">
          {visibleItems.map((item, index) => (
            <div className="col-lg-4 col-sm-6" key={`${item.title ?? "feature"}-${index}`}>
              <div className="features__item-four">
                <div className="features__icon">
                  <i className={item.iconClass || "fas fa-shield-alt"} />
                </div>
                <div className="features__content-four">
                  {item.title ? <h2 className="title">{item.title}</h2> : null}
                  {item.description ? <p>{item.description}</p> : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        {buttonLabel ? (
          <div className="get-started-btn text-center mt-20">
            <a href={buttonUrl || "#plans"} className="tg-btn">
              {buttonLabel}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
