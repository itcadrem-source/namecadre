export interface FeaturesItem {
  iconClass?: string;
  title?: string;
  description?: string;
  columnClass?: string;
}

export interface FeaturesProps {
  title?: string;
  description?: string;
  items?: FeaturesItem[];
  shape?: string;
}

export default function Features({ title, description, items = [], shape }: FeaturesProps) {
  const visibleItems = items.filter((item) => item.title || item.description);
  const hasContent = Boolean(title || description || visibleItems.length);
  if (!hasContent) return null;

  return (
    <section className="features__area-seven">
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

        <div className="features__inner-wrap-three">
          <div className="row">
            {visibleItems.map((item, index) => (
              <div className={item.columnClass || "col-lg-4 col-sm-6"} key={`${item.title ?? "feature"}-${index}`}>
                <div className="features__item-thirteen">
                  <div className="features__icon-three">
                    <i className={item.iconClass || "fas fa-circle-check"} />
                  </div>
                  <div className="features__content-nine">
                    {item.title ? <h4 className="title">{item.title}</h4> : null}
                    {item.description ? <p>{item.description}</p> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {shape ? (
          <div className="shape">
            <img src={shape} alt="shape" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
