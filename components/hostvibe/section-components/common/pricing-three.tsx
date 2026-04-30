export interface PricingThreeFeature {
  label: string;
  value?: string;
  available?: boolean;
  info?: string;
}

export interface PricingThreePlan {
  name: string;
  monthly: string;
  yearly: string;
  ctaLabel: string;
  ctaUrl: string;
  viewUrl: string;
  dark?: boolean;
  features?: PricingThreeFeature[];
  location?: string;
  tab?: string;
}

export interface PricingThreeTab {
  id: string;
  label: string;
}

export interface PricingThreeLocation {
  id: string;
  label: string;
  flag?: string;
  tab?: string;
}

export interface PricingThreeProps {
  title?: string;
  description?: string;
  locationTitle?: string;
  tabs?: PricingThreeTab[];
  activeTab?: string;
  locations?: PricingThreeLocation[];
  activeLocation?: string;
  plans?: PricingThreePlan[];
}

export default function PricingThree({
  title = "Host Package",
  description,
  locationTitle = "Select Server Location",
  tabs = [],
  activeTab,
  locations = [],
  activeLocation,
  plans = [],
}: PricingThreeProps) {
  return (
    <section className="section" id="pricing-three">
      <div className="container section-py-140">
        <div className="text-center">
          <h1 className="fw-bold mb-2">{title}</h1>
          {description ? <p className="text-muted mb-0 pricing-three-lead">{description}</p> : null}
        </div>

        {tabs.length ? (
          <div className="d-flex justify-content-center mt-40 mb-40">
            <div className="btn-group flex-wrap rounded-4" role="group" aria-label="Plan type">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`btn btn-sm ${tab.id === activeTab ? "tg-btn-primary" : "btn-outline-secondary"} pt-2 pb-2 pl-3 pr-3 pricing-three-tab-btn`}
                  data-tab-btn={tab.id}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {locations.length ? (
          <div className="text-center mb-4" data-locations={activeTab}>
            <h6 className="fw-bold mb-3">{locationTitle}</h6>
            <div className="d-inline-flex flex-wrap gap-2 justify-content-center mt-2">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  type="button"
                  className={`btn ${loc.id === activeLocation ? "tg-btn-primary" : "btn-outline-secondary"} d-flex align-items-center gap-2 rounded-3 pt-2 pb-2 pl-3 pr-3 pricing-three-location-btn`}
                  data-location={loc.id}
                  data-tab-loc={loc.tab}
                >
                  {loc.flag ? <img src={loc.flag} alt={loc.label} width={40} className="rounded-2" /> : null}
                  <span className="text-uppercase fw-bold pricing-three-location-label">{loc.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="row g-4 justify-content-center mt-5 pricing-three-row">
          {plans.map((plan, index) => {
            const iconClass = plan.dark ? "fa fa-check-circle" : "fa fa-check-circle";
            return (
              <div
                className="col-12 col-md-6 col-lg-3"
                data-plan-tab={plan.tab}
                data-plan-location={plan.location}
                key={`${plan.name}-${index}`}
              >
                <div className={`card h-100 rounded-4 shadow-md border-0 pricing-three-card ${plan.dark ? "bg-primary text-white" : "bg-white"}`}>
                  <div className="card-body d-flex flex-column p-4">
                    <h4 className="mb-3 fw-bold">{plan.name}</h4>
                    <div className="h2 mb-1 fw-bold">{plan.monthly}</div>
                    <div className={`small fw-semibold ${plan.dark ? "text-white" : "text-muted"} mb-3`}>{plan.yearly}</div>

                    <a className={`btn ${plan.dark ? "btn-light text-primary" : "tg-btn-primary"} d-inline-flex align-items-center gap-2 pt-2 pb-2 pl-3 pr-3 rounded-3 pricing-three-cta`} href={plan.ctaUrl}>
                      {plan.ctaLabel}
                      <i className="fa fa-arrow-right" />
                    </a>

                    <hr className="pricing-three-divider" />

                    <ul className="list-unstyled mb-3">
                      {(plan.features || []).map((feat, featureIndex) => (
                        <li className="d-flex justify-content-between align-items-center mb-2" key={`${feat.label}-${featureIndex}`}>
                          <div className="d-flex align-items-center gap-2">
                            <i className={feat.available === false ? "fa fa-times-circle" : iconClass} />
                            <span>{feat.label}</span>
                          </div>
                          {feat.value ? <span>{feat.value}</span> : null}
                          {feat.info ? <i className="fa fa-info-circle" title={feat.info} /> : null}
                        </li>
                      ))}
                    </ul>

                    <a className="btn view-plan mt-auto rounded-3 fs-bold" href={plan.viewUrl}>
                      View Plan
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
