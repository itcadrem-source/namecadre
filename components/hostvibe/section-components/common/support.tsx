export interface SupportItem {
  icon?: string;
  title?: string;
  description?: string;
}

export interface SupportProps {
  title?: string;
  titleClass?: string;
  description?: string;
  image?: string;
  items?: SupportItem[];
  buttonUrl?: string;
  buttonLabel?: string;
}

export default function Support({
  title,
  titleClass,
  description,
  image,
  items = [],
  buttonUrl = "/contact.php",
  buttonLabel,
}: SupportProps) {
  const visibleItems = items.filter((item) => item.title || item.description || item.icon);
  const hasContent = Boolean(title || description || image || visibleItems.length || buttonLabel);
  if (!hasContent) return null;

  return (
    <section className="support__area support__area-two">
      <div className="container">
        <div className="support__inner-wrap-two has-animation">
          <div className="row align-items-center">
            {(title || description) && (
              <div className="section__title mb-40">
                {title ? <h2 className={`title${titleClass ? ` ${titleClass}` : ""}`}>{title}</h2> : null}
                {description ? <p>{description}</p> : null}
              </div>
            )}

            {image ? (
              <div className="col-lg-5 order-0 order-lg-2">
                <div className="support__thumb support__thumb-two">
                  <img src={image} alt="img" />
                </div>
              </div>
            ) : null}

            <div className={image ? "col-lg-7" : "col-lg-12"}>
              <div className="support__content support__content-two">
                {visibleItems.length ? (
                  <div className="support__list-wrap">
                    {visibleItems.map((item, index) => (
                      <div className="support__list-item support__list-item-two" key={`${item.title ?? "support"}-${index}`}>
                        <div className="icon">
                          <i className={item.icon || "fa-regular fa-circle-question"} />
                        </div>
                        <div className="content">
                          {item.title ? <h5 className="title">{item.title}</h5> : null}
                          {item.description ? <p>{item.description}</p> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {buttonLabel ? (
                  <a href={buttonUrl} className="tg-link-btn">
                    <span className="link-effect">
                      <span className="effect-1">{buttonLabel}</span>
                      <span className="effect-1">{buttonLabel}</span>
                    </span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
