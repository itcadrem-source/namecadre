import Link from "next/link";

type FeaturesItem = { title?: string; description?: string; image?: string };

type FeaturesButton = { label?: string; url?: string };

export type HomepageFeaturesData = {
  title?: string;
  description?: string;
  itemOne?: FeaturesItem;
  itemTwo?: FeaturesItem & { shape?: string; button?: FeaturesButton; buttonLabel?: string; buttonUrl?: string };
  itemThree?: FeaturesItem & {
    shape1?: string;
    shape2?: string;
    list?: Array<string | { title?: string; description?: string }>;
    button?: FeaturesButton;
    buttonLabel?: string;
    buttonUrl?: string;
  };
};

const fallback: Required<Pick<HomepageFeaturesData, "title" | "description">> = {
  title: "Launch Your Website with Confidence",
  description: "Build, launch, and grow your digital presence with fast, secure, and reliable hosting solutions.",
};

function listRow(item: string | { title?: string; description?: string }) {
  if (typeof item === "string") {
    return { title: item, description: "" };
  }

  return { title: item.title || "", description: item.description || "" };
}

export default function FeaturesSection({ data }: { data?: HomepageFeaturesData }) {
  const section = { ...fallback, ...data };
  const itemOne = section.itemOne || {
    title: "Find & Pick Your Ideal Domain",
    description: "Choose from thousands of available domains to kickstart your brand's digital journey.",
    image: "/hostvibe/images/finddomain.png",
  };
  const itemTwo = section.itemTwo || {
    title: "Pick a <span>Hosting Plan</span> That Works for You",
    description: "Powerful, flexible, and reliable hosting designed to support your business growth.",
    image: "/hostvibe/images/hosting-plan.png",
    shape: "/hostvibe/images/plan-shape.png",
    button: { label: "View Hosting Plan", url: "/index.php#plans" },
  };
  const itemThree = section.itemThree || {
    title: "Blazing-Fast Loading Website, Speeds Worldwide.",
    description: "Deliver a seamless browsing experience with ultra-fast page loading and performance optimized globally.",
    image: "/hostvibe/images/blazing-fast.png",
    shape1: "/hostvibe/images/hero-shape-01.svg",
    shape2: "/hostvibe/images/hero-shape-03.svg",
    list: ["Optimized Server Performance", "Advanced Caching Technology", "Lightning-Fast Response Times"],
    button: { label: "View Hosting Plan", url: "/index.php#plans" },
  };

  const itemTwoButton = itemTwo.button || { label: itemTwo.buttonLabel || "View Hosting Plan", url: itemTwo.buttonUrl || "/index.php#plans" };
  const itemThreeButton = itemThree.button || { label: itemThree.buttonLabel || "View Hosting Plan", url: itemThree.buttonUrl || "/index.php#plans" };

  return (
    <section className="features__area-four section-pb-140 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section__title text-center mb-60">
              <h2 className="title">{section.title}</h2>
              <p>{section.description}</p>
            </div>
          </div>
        </div>

        <div className="row gutter-y-24">
          <div className="col-xl-4 col-lg-5">
            <div className="features__item features__item-eight">
              <div className="features__thumb">
                <img src={itemOne.image} alt="img" />
              </div>
              <div className="features__content">
                <h3 className="title">{itemOne.title}</h3>
                <p>{itemOne.description}</p>
              </div>
            </div>
          </div>

          <div className="col-xl-8 col-lg-7">
            <div className="features__item-two features__item-nine">
              <div className="features__content-two">
                <h2 className="title" dangerouslySetInnerHTML={{ __html: itemTwo.title || "" }} />
                <p>{itemTwo.description}</p>
                <Link href={itemTwoButton.url || "#"} className="tg-link-btn">
                  <span className="link-effect">
                    <span className="effect-1">{itemTwoButton.label}</span>
                    <span className="effect-1">{itemTwoButton.label}</span>
                  </span>
                </Link>
              </div>
              <div className="features__thumb-two">
                <img src={itemTwo.image} alt="img" data-aos="fade-left" data-aos-delay={200} />
              </div>
              {itemTwo.shape ? (
                <div className="features__shape">
                  <img src={itemTwo.shape} alt="shape" />
                </div>
              ) : null}
            </div>
          </div>

          <div className="col-lg-12">
            <div className="features__item-three features__item-ten">
              <div className="features__content-three">
                <h2 className="title">{itemThree.title}</h2>
                <p>{itemThree.description}</p>
                <ul className="list-wrap features__list">
                  {(itemThree.list || []).map((entry, idx) => {
                    const row = listRow(entry);
                    return (
                      <li key={`${row.title}-${idx}`}>
                        <p>
                          <span>{row.title}</span>
                          {row.description ? ` ${row.description}` : ""}
                        </p>
                      </li>
                    );
                  })}
                </ul>
                <Link href={itemThreeButton.url || "#"} className="tg-link-btn">
                  <span className="link-effect">
                    <span className="effect-1">{itemThreeButton.label}</span>
                    <span className="effect-1">{itemThreeButton.label}</span>
                  </span>
                </Link>
              </div>
              <div className="features__thumb-three">
                <img src={itemThree.image} alt="img" className="main-img" data-aos="fade-left" data-aos-delay={200} />
                {itemThree.shape1 ? <img src={itemThree.shape1} alt="shape" /> : null}
                {itemThree.shape2 ? <img src={itemThree.shape2} alt="shape" /> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
