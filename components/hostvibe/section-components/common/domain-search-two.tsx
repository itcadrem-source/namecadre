export interface DomainSearchTld {
  value: string;
  label: string;
}

export type DomainSearchListItem = { label?: string; price?: string } | string;

export interface DomainSearchTwoProps {
  sectionId?: string;
  background?: string;
  title?: string;
  description?: string;
  wrapClass?: string;
  formAction?: string;
  placeholder?: string;
  buttonLabel?: string;
  tlds?: DomainSearchTld[];
  list?: DomainSearchListItem[];
  bottomText?: string;
  bottomLabel?: string;
  bottomUrl?: string;
  shape?: string;
}

export default function DomainSearchTwo({
  sectionId,
  background,
  title,
  description,
  wrapClass,
  formAction = "domainchecker.php",
  placeholder = "eg. example.com",
  buttonLabel = "Search Domain",
  tlds = [],
  list = [],
  bottomText,
  bottomLabel,
  bottomUrl,
  shape,
}: DomainSearchTwoProps) {
  const hasContent = Boolean(title || description || tlds.length || list.length || bottomLabel || bottomText);
  if (!hasContent) return null;

  return (
    <section
      id={sectionId}
      className="domain__search-area-two has-animation domain__search-bg"
      data-background={background || undefined}
    >
      <div className="container">
        <div className="domain__inner-wrap-two">
          {(title || description) && (
            <div className="section__title text-center mb-40">
              {title ? <h2 className="title">{title}</h2> : null}
              {description ? <p>{description}</p> : null}
            </div>
          )}

          <div className={`domain__search-wrap domain__search-wrap-two${wrapClass ? ` ${wrapClass}` : ""}`}>
            <form className="domain__search-form domain__search-form-two" method="post" action={formAction}>
              <i className="far fa-search domain-search-two-icon" />
              <input type="text" name="sld" id="domainsearch" placeholder={placeholder} />
              <div className="domain__search-action">
                <select className="select" name="tld">
                  {tlds.map((tld) => (
                    <option key={`${tld.value}-${tld.label}`} value={tld.value}>
                      {tld.label}
                    </option>
                  ))}
                </select>
                <button type="submit" className="tg-btn">
                  {buttonLabel}
                </button>
              </div>
            </form>
          </div>

          {list.length ? (
            <div className="domain__list">
              <ul className="list-wrap">
                {list.map((item, index) => {
                  const label = typeof item === "string" ? item : item.label;
                  const price = typeof item === "string" ? "" : item.price;
                  return (
                    <li key={`${label ?? "item"}-${index}`}>
                      <span>{label}</span>
                      {price ? <span>{price}</span> : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}

          {(bottomText || bottomLabel) && (
            <div className="domain__bottom-content">
              {bottomText ? <p>{bottomText}</p> : null}
              {bottomLabel ? (
                <a href={bottomUrl || "#"} className="tg-link-btn">
                  <span className="link-effect">
                    <span className="effect-1">{bottomLabel}</span>
                    <span className="effect-1">{bottomLabel}</span>
                  </span>
                </a>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {shape ? (
        <div className="domain__shape domain__shape-two">
          <img src={shape} alt="shape" />
        </div>
      ) : null}
    </section>
  );
}
