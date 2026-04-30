export type HostingTopListItem = { label?: string } | string;

export interface HostingTopProps {
  subtitle?: string;
  title?: string;
  description?: string;
  list?: HostingTopListItem[];
  buttonLabel?: string;
  buttonUrl?: string;
  image?: string;
  shape?: string;
}

export default function HostingTop({
  subtitle,
  title,
  description,
  list = [],
  buttonLabel,
  buttonUrl,
  image,
  shape,
}: HostingTopProps) {
  const hasImageOrShape = Boolean(image || shape);
  const hasContent = Boolean(subtitle || title || description || list.length || buttonLabel || hasImageOrShape);
  if (!hasContent) return null;

  return (
    <section className="hosting__top-area">
      <div className="container">
        <div className="row align-items-end justify-content-center">
          <div className={hasImageOrShape ? "col-lg-6" : "col-lg-12"}>
            <div className="hosting__top-content">
              {subtitle ? <h6 className="sub-title">{subtitle}</h6> : null}
              {title ? <h2 className="title">{title}</h2> : null}
              {description ? <p>{description}</p> : null}

              {list.length ? (
                <ul className="list-wrap">
                  {list.map((item, index) => (
                    <li key={`${index}-${typeof item === "string" ? item : item.label ?? "item"}`}>
                      <i className="fas fa-check-circle" />
                      {typeof item === "string" ? item : item.label}
                    </li>
                  ))}
                </ul>
              ) : null}

              {buttonLabel ? (
                <a href={buttonUrl || "#plans"} className="tg-btn">
                  <i className="fas fa-arrow-right" />
                  {buttonLabel}
                </a>
              ) : null}
            </div>
          </div>

          {hasImageOrShape ? (
            <div className="col-lg-6 col-md-9">
              <div className="hosting__top-images hosting__top-images-two">
                {image ? <img src={image} alt="img" /> : null}
                {shape ? (
                  <div className="shape">
                    <img src={shape} alt="shape" />
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
