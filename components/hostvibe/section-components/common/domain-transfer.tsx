export interface DomainTransferProps {
  title?: string;
  description?: string;
  image?: string;
  buttonLabel?: string;
  buttonUrl?: string;
}

export default function DomainTransfer({
  title,
  description,
  image,
  buttonLabel,
  buttonUrl,
}: DomainTransferProps) {
  const hasContent = Boolean(title || description || image || buttonLabel);
  if (!hasContent) return null;

  return (
    <section className="domain__transfer-area section-py-140">
      <div className="container">
        <div className="domain__transfer-inner">
          <div className="row align-items-center justify-content-center">
            {image ? (
              <div className="col-lg-5 order-0 order-lg-2">
                <div className="domain__transfer-img">
                  <img src={image} alt="img" />
                </div>
              </div>
            ) : null}
            <div className={image ? "col-lg-7" : "col-lg-12"}>
              <div className="domain__transfer-content support__content-three">
                {title ? (
                  <div className="section__title mb-15">
                    <h2 className="title">{title}</h2>
                    {description ? <p>{description}</p> : null}
                  </div>
                ) : null}

                {buttonLabel ? (
                  <a href={buttonUrl || "#"} className="tg-link-btn">
                    <span className="link-effect">
                      <span className="effect-1">{buttonLabel}</span>
                      <span className="effect-1">{buttonLabel}</span>
                    </span>
                    <i className="fas fa-arrow-right" />
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
