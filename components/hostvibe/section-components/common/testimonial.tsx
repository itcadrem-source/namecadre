export interface TestimonialItem {
  ratingImage?: string;
  quote?: string;
  image?: string;
  name?: string;
  role?: string;
}

export interface TestimonialProps {
  title?: string;
  description?: string;
  items?: TestimonialItem[];
  trustImage?: string;
  trustText?: string;
}

export default function Testimonial({
  title,
  description,
  items = [],
  trustImage = "/templates/hostvibe/images/trustpilot.png",
  trustText = "4.6 out of 5 stars based on 120,456 reviews",
}: TestimonialProps) {
  const hasContent = Boolean(title || description || items.length);
  if (!hasContent) return null;

  return (
    <section className="testimonial__area-three section-pb-140">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-md-8">
            {(title || description) && (
              <div className="section__title mb-50">
                {title ? <h2 className="title">{title}</h2> : null}
                {description ? <p>{description}</p> : null}
              </div>
            )}
          </div>

          <div className={items.length ? "col-md-4" : "d-none"}>
            <div className="testimonial__nav-two mb-50">
              {items.length ? (
                <>
                  <button className="testimonial-button-prev" aria-label="Previous">
                    <i className="fas fa-arrow-left" />
                  </button>
                  <button className="testimonial-button-next" aria-label="Next">
                    <i className="fas fa-arrow-right" />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>

        {items.length ? (
          <div className="swiper fix testimonial-active-two">
            <div className="swiper-wrapper">
              {items.map((item, index) => (
                <div className="swiper-slide" key={`${item.name ?? "testimonial"}-${index}`}>
                  <div className="testimonial__item testimonial__item-three">
                    <div className="rating">
                      {item.ratingImage ? (
                        <img src={item.ratingImage} alt="rating" />
                      ) : (
                        <>
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star-half-alt" />
                        </>
                      )}
                    </div>

                    <p>{item.quote}</p>

                    <div className="testimonial__bottom">
                      <div className="thumb">
                        {item.image ? <img src={item.image} alt="author" /> : <i className="far fa-user-circle" />}
                      </div>
                      <div className="content">
                        <h4 className="title">{item.name}</h4>
                        <span>{item.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {items.length ? (
          <div className="testimonial__bottom-content">
            <img src={trustImage} alt="Trustpilot" />
            <p>{trustText}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
