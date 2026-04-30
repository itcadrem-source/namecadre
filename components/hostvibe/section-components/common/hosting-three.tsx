export interface HostingThreeItem {
  iconClass?: string;
  title?: string;
  description?: string;
  columnClass?: string;
}

export interface HostingThreeProps {
  title?: string;
  description?: string;
  items?: HostingThreeItem[];
}

export default function HostingThree({ title, description, items = [] }: HostingThreeProps) {
  const visibleItems = items.filter((item) => item.title || item.description);
  const hasContent = Boolean(title || description || visibleItems.length);
  if (!hasContent) return null;

  return (
    <section className="hosting__area-three section-pb-140">
      <div className="container">
        <div className="hosting__inner-wrap">
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
          <div className="row">
            {visibleItems.map((item, index) => (
              <div className={item.columnClass || "col-lg-4 col-sm-6"} key={`${item.title ?? "hosting"}-${index}`}>
                <div className="hosting__item-three">
                  <div className="hosting__icon-three">
                    <i className={item.iconClass} />
                  </div>
                  <div className="hosting__content-three">
                    {item.title ? <h4 className="title">{item.title}</h4> : null}
                    {item.description ? <p>{item.description}</p> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
