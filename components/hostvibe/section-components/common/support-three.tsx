export interface SupportThreeItem {
  iconClass?: string;
  title?: string;
  description?: string;
}

export interface SupportThreeProps {
  title?: string;
  description?: string;
  image?: string;
  items?: SupportThreeItem[];
}

export default function SupportThree({
  title,
  description,
  image = "/templates/hostvibe/images/kvm-deploy.png",
  items = [],
}: SupportThreeProps) {
  const visibleItems = items.filter((item) => item.title || item.description || item.iconClass);
  const hasContent = Boolean(title || description || image || visibleItems.length);
  if (!hasContent) return null;

  return (
    <section className="support__area-three section-py-140 mb-100">
      <div className="container">
        <div className="support__inner-wrap-three">
          <div className="row align-items-center">
            <div className="col-lg-5 order-0 order-lg-2">
              <div className="support__thumb support__thumb-three">
                <img src={image} alt="img" data-aos="fade-left" data-aos-delay={200} />
              </div>
            </div>

            <div className="col-lg-7">
              <div className="support__content support__content-three">
                {(title || description) && (
                  <div className="section__title mb-30">
                    {title ? <h2 className="title">{title}</h2> : null}
                    {description ? <p>{description}</p> : null}
                  </div>
                )}

                {visibleItems.length ? (
                  <div className="support__list-wrap">
                    {visibleItems.map((item, index) => (
                      <div className="support__list-item support__list-item-three" key={`${item.title ?? "support"}-${index}`}>
                        <div className="icon">
                          <i className={item.iconClass || "fa-solid fa-circle-check"} />
                        </div>
                        <div className="content">
                          {item.title ? <h5 className="title">{item.title}</h5> : null}
                          {item.description ? <p>{item.description}</p> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
