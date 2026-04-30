export type BannerTwoListItem = { label?: string } | string;

export interface BannerTwoProps {
  title?: string;
  description?: string;
  image?: string;
  list?: BannerTwoListItem[];
  buttonLabel?: string;
  buttonUrl?: string;
  priceText?: string;
}

export default function BannerTwo({
  title,
  description,
  image,
  list = [],
  buttonLabel,
  buttonUrl,
  priceText,
}: BannerTwoProps) {
  const hasContent = Boolean(title || description || image || list.length || buttonLabel || priceText);
  if (!hasContent) return null;

  return (
    <section className="banner__area-two">
      <div className="container">
        <div className="row align-items-center">
          {image ? (
            <div className="col-xl-7 col-lg-6 order-0 order-lg-2">
              <div className="banner__img-wrap-two">
                <img src={image} alt="img" />
              </div>
            </div>
          ) : null}
          <div className={image ? "col-xl-5 col-lg-6" : "col-12"}>
            <div className="banner__content-two">
              {title ? <h2 className="title">{title}</h2> : null}
              {description ? <p>{description}</p> : null}

              {list.length ? (
                <ul className="list-wrap">
                  {list.map((item, index) => (
                    <li key={`${index}-${typeof item === "string" ? item : item.label ?? "item"}`}>
                      <i className="fas fa-check" />
                      {typeof item === "string" ? item : item.label}
                    </li>
                  ))}
                </ul>
              ) : null}

              {buttonLabel || priceText ? (
                <div className="banner__btn">
                  {buttonLabel ? (
                    <a href={buttonUrl || "#"} className="tg-btn">
                      <i className="fas fa-arrow-right" />
                      {buttonLabel}
                    </a>
                  ) : null}
                  {priceText ? <span className="price">{priceText}</span> : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
