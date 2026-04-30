export type BannerThreeListItem = { label?: string } | string;

export interface BannerThreeProps {
  image?: string;
  subtitle?: string;
  title?: string;
  description?: string;
  list?: BannerThreeListItem[];
  buttonLabel?: string;
  buttonUrl?: string;
  shapes?: string[];
}

const defaultList: string[] = [
  "High-speed Upgradable SSD Storage",
  "Instant Provisioning",
  "Full Root Access",
];

const defaultShapes = [
  "templates/hostvibe/images/bg-shape.png",
  "templates/hostvibe/images/bg-shape-01.svg",
  "templates/hostvibe/images/bg-shape-02.svg",
  "templates/hostvibe/images/bg-shape-03.svg",
];

export default function BannerThree({
  image = "templates/hostvibe/images/vps-banner.svg",
  subtitle = "Affordable Hosting",
  title = "Linux KVM VPS Hosting",
  description = "High-performance Servers for Faster Websites & Applications",
  list = defaultList,
  buttonLabel = "View Hosting Plan",
  buttonUrl = "#plans",
  shapes = defaultShapes,
}: BannerThreeProps) {
  return (
    <section className="banner__area-three fix">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 col-md-10 order-0 order-lg-2">
            <div className="banner__img-wrap-three">
              <img src={image} alt="img" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="banner__content-three">
              <span className="sub-title">{subtitle}</span>
              <h2 className="title">{title}</h2>
              <p>{description}</p>

              <ul className="list-wrap">
                {list.map((item, index) => (
                  <li key={`${index}-${typeof item === "string" ? item : item.label ?? "item"}`}>
                    <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 6.5L6 11.5L16 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {typeof item === "string" ? item : item.label}
                  </li>
                ))}
              </ul>

              <a href={buttonUrl || "#"} className="tg-btn mt-30">
                {buttonLabel || "View Hosting Plan"}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="banner__shape-wrap">
        {shapes.filter(Boolean).map((shape, index) => (
          <img key={`${shape}-${index}`} src={shape} alt="shape" />
        ))}
      </div>
    </section>
  );
}
