export interface DomainTransferTwoItem {
  title?: string;
  description?: string;
}

export interface DomainTransferTwoProps {
  title?: string;
  description?: string;
  image?: string;
  items?: DomainTransferTwoItem[];
}

export default function DomainTransferTwo({
  title,
  description,
  image,
  items = [],
}: DomainTransferTwoProps) {
  const validItems = items.filter((item) => item.title || item.description);
  const hasContent = Boolean(title || description || image || validItems.length);
  if (!hasContent) return null;

  return (
    <section className="domain__transfer-area-two section-py-120">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          {image ? (
            <div className="col-lg-5 order-0 order-lg-2">
              <div className="domain__transfer-img-two">
                <img src={image} alt="img" />
              </div>
            </div>
          ) : null}

          <div className={image ? "col-lg-7" : "col-lg-12"}>
            <div className="domain__transfer-content-two support__content-three">
              {(title || description) && (
                <div className="section__title mb-30">
                  {title ? <h2 className="title">{title}</h2> : null}
                  {description ? <p>{description}</p> : null}
                </div>
              )}

              {validItems.length ? (
                <div className="domain__transfer-list">
                  {validItems.map((item, index) => (
                    <div className="domain__transfer-list-item" key={`${item.title ?? "item"}-${index}`}>
                      {item.title ? <h4 className="title">{item.title}</h4> : null}
                      {item.description ? <p>{item.description}</p> : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
