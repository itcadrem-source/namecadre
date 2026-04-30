export type HomepageSupportFrameworkData = {
  sectionId?: string;
  title?: string;
  description?: string;
  icons?: string[];
};

const fallback = {
  sectionId: "supportFramework",
  title: "NameCadre Support This Frontend Framework",
  description: "NameCadre works with all frontend frameworks...",
  icons: [],
};

export default function SupportFrameworkSection({ data }: { data?: HomepageSupportFrameworkData }) {
  const section = { ...fallback, ...data, icons: data?.icons ?? fallback.icons };

  return (
    <section id={section.sectionId} className="section section-py-140">
      <div className="container">
        <div className="text-center mb-4 mb-md-5">
          <h1 className="display-5 fw-bold mb-3">{section.title}</h1>
          <p className="lead text-muted">{section.description}</p>
        </div>

        {section.icons.length > 0 ? (
          <div className="mt-4 mt-md-5">
            <ul className="list-unstyled row row-cols-2 row-cols-md-3 row-cols-lg-6 g-4 justify-content-center align-items-center">
              {section.icons.map((icon, idx) => (
                <li className="col d-flex justify-content-center" key={`${icon}-${idx}`}>
                  <img alt="icon" src={icon} className="img-fluid support-framework-icon" loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
