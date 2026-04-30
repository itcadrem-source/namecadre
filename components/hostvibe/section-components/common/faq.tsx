export interface FaqItem {
  question?: string;
  answer?: string;
}

export interface FaqProps {
  title?: string;
  description?: string;
  items?: FaqItem[];
  bottomText?: string;
  bottomLinkLabel?: string;
  bottomLinkUrl?: string;
}

export default function Faq({
  title,
  description,
  items = [],
  bottomText,
  bottomLinkLabel = "Contact our support team",
  bottomLinkUrl = "/submitticket.php",
}: FaqProps) {
  const visibleItems = items.filter((item) => item.question || item.answer);
  const hasContent = Boolean(title || description || visibleItems.length || bottomText || bottomLinkLabel);
  if (!hasContent) return null;

  return (
    <section className="faq__area-two section-py-140">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="faq__inner-wrap-two">
              {(title || description) && (
                <div className="section__title text-center mb-60">
                  {title ? <h2 className="title">{title}</h2> : null}
                  {description ? <p>{description}</p> : null}
                </div>
              )}

              {visibleItems.length ? (
                <div className="faq__wrap faq__wrap-two">
                  <div className="accordion" id="accordionExample">
                    {visibleItems.map((item, index) => {
                      const collapseId = `faq-collapse-${index}`;
                      return (
                        <div className={`accordion-item${index === 0 ? " active" : ""}`} key={collapseId}>
                          <h2 className="accordion-header">
                            <button
                              className={`accordion-button${index !== 0 ? " collapsed" : ""}`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#${collapseId}`}
                            >
                              {item.question}
                            </button>
                          </h2>
                          <div
                            id={collapseId}
                            className={`accordion-collapse collapse${index === 0 ? " show" : ""}`}
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">{item.answer}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>

            {(bottomText || bottomLinkLabel) && (
              <div className="faq__bottom-content">
                {bottomText ? <p>{bottomText}</p> : null}
                <a href={bottomLinkUrl} className="tg-link-btn">
                  <span className="link-effect">
                    <span className="effect-1">{bottomLinkLabel}</span>
                    <span className="effect-1">{bottomLinkLabel}</span>
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
