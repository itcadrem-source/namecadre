export interface JoinCommunityCard {
  icon?: string;
  label?: string;
  href?: string;
}

export interface JoinCommunityProps {
  sectionId?: string;
  title?: string;
  description?: string;
  dotImage?: string;
  cards?: JoinCommunityCard[];
}

export default function JoinCommunity({
  sectionId = "join-community",
  title = "Join our support community",
  description = "Connect with our team and community channels.",
  dotImage = "templates/hostvibe/images/dot-shape.svg",
  cards = [],
}: JoinCommunityProps) {
  return (
    <section id={sectionId} className="py-5">
      <div className="container">
        <div className="bg-custom-dark p-4 p-md-5 text-center text-white">
          <img src={dotImage} className="dot-img-overlay" alt="dots" />
          <h1 className="sage-font display-6 fw-bold mb-4 px-lg-5 mx-auto text-white join-community-title">{title}</h1>
          <p className="mb-5 mx-auto text-white join-community-description">{description}</p>

          {cards.length ? (
            <div className="row g-3 justify-content-center">
              {cards.map((card, index) => (
                <div className="col-6 col-md-4 col-lg-2 join-community-card-col" key={`${card.label ?? "card"}-${index}`}>
                  <a
                    href={card.href || "#"}
                    className="support-card bg-white rounded-3 p-3 d-flex align-items-center justify-content-center h-100 gap-2"
                  >
                    {card.icon ? <i className={card.icon} /> : null}
                    <span className="small fw-bold">{card.label || "Support"}</span>
                  </a>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
