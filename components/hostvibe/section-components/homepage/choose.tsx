export type HomepageChooseData = {
  image?: string;
  title?: string;
  description?: string;
  list?: Array<string | { label?: string }>;
  counters?: Array<{ icon?: string; color?: string; number?: string; suffix?: string; label?: string }>;
};

const fallback = {
  image: "/hostvibe/images/why-choose.png",
  title: "Why You Should Choose Us",
  description: "Experience unmatched performance, reliability, and support designed to elevate your online presence.",
  list: [
    "Reliable & Secure Hosting",
    "24/7 Expert Support",
    "Fast Performance",
    "Free SSL Certificate",
    "Affordable Pricing",
    "Free Migration",
  ],
};

export default function ChooseSection({ data }: { data?: HomepageChooseData }) {
  const section = { ...fallback, ...data };
  const counters = data?.counters ?? [
    { icon: "fas fa-smile", number: "96", suffix: "%", label: "Happiness Score" },
    { icon: "fas fa-users", number: "1.8", suffix: "Million+", label: "Hosting Clients" },
    { icon: "fas fa-server", number: "99.9", suffix: "%", label: "Server Uptime" },
  ];

  return (
    <section className="choose__area-two has-animation section-pb-120">
      <div className="container">
        <div className="choose__inner-wrap">
          <div className="row align-items-center">
            <div className="col-lg-6 order-0 order-lg-2">
              <div className="choose__img-two">
                <img src={section.image} alt="img" />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="choose__content choose__content-two">
                <div className="section__title mb-20">
                  <h2 className="title">{section.title}</h2>
                </div>
                <p>{section.description}</p>
                <div className="choose__list">
                  <ul className="list-wrap">
                    {(section.list || []).map((listItem, idx) => (
                      <li key={idx}>
                        <i className="far fa-check-circle" aria-hidden />
                        {typeof listItem === "string" ? listItem : listItem.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="counter__wrap-two">
                {counters.map((counter, idx) => (
                  <div className="counter__item-two" key={idx}>
                    <div className="icon">
                      <i className={counter.icon || "fas fa-server"} style={counter.color ? { color: counter.color } : undefined} />
                    </div>
                    <div className="content">
                      <h2 className="count">
                        <span className="counter-number">{counter.number || "0"}</span>
                        {counter.suffix || ""}
                      </h2>
                      <p>{counter.label || ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
