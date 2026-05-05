import seasonalSet from "/images/seasonalSet.png"
import winter from "/images/winter.png"
import summer from "/images/summer.png"
import autumn from "/images/autumn.png"
import spring from "/images/spring.png"

//import "./lightPollution.css";

// Note: there's too much left padding

// Links
const simulations = "https://lopez-504.github.io/simulations/"

const impactSections = [
  {
    title: "Astronomy",
    highlight: "sky glow",
    text: "Artificial light scattered in the atmosphere increases the brightness of the night sky, reducing the visibility of faint stars and astronomical objects.",
    stat: "10%",
    statText: "increase in sky brightness can strongly reduce telescope efficiency.",
    image: "https://cieloschile.cl/wp-content/uploads/2024/10/observatory.jpg",
  },
  {
    title: "Human health",
    highlight: "circadian rhythm",
    text: "Excessive night lighting, especially blue-rich light, can disturb melatonin production and alter the natural sleep cycle.",
    stat: "24 h",
    statText: "biological cycles are regulated by light and darkness.",
    image: "https://cieloschile.cl/wp-content/uploads/2024/10/dark-night.jpg",
  },
  {
    title: "Biodiversity",
    highlight: "ecosystems",
    text: "Many animals depend on natural darkness for migration, feeding, reproduction, and protection from predators.",
    stat: "Night",
    statText: "is an ecological resource that should be protected.",
    image: "https://cieloschile.cl/wp-content/uploads/2024/10/flying-birds.jpg",
  },
];

const responsibleLighting = [
  "Direct light only where needed",
  "Use lower intensities",
  "Prefer warm colors",
  "Turn lights off when unnecessary",
  "Avoid upward illumination",
  "Protect dark skies",
];

export default function LightPollution() {
  return (
    <section className="light-page">
      <section className="light-hero">
        <div className="light-hero-overlay" />

        <div className="light-hero-content">
          <p className="light-kicker">(Section under construction...)</p>
          <h1>Light pollution</h1>
          <p>
            Artificial lighting helps human activity, but when it is excessive,
            poorly directed, or unnecessarily bright, it alters the night sky,
            ecosystems, human health, and astronomical observation.
          </p>
        </div>
      </section>

      <section className="light-intro">
        <div>
          <h2>
            What is <mark>light pollution?</mark>
          </h2>
        </div>

        <div className="light-intro-text">
          <p>
            Light pollution is the alteration of natural darkness caused by
            artificial light. It appears as sky glow, glare, light trespass, and
            over-illumination.
          </p>

          <p>
            For a meteorological and environmental monitoring network like
            REMCI-UV, documenting this phenomenon helps connect atmospheric
            conditions, visibility, radiation, cloudiness, and urban development.
          </p>
        </div>
      </section>

      <section className="light-intro">
        <div>
          <h2>
            Simualting <mark>Sky brightness</mark> with Illumina
          </h2>
        </div>

        <div className="light-intro-text">
          <p>
            Check Illumina simulations in more detail <a href={simulations} target="_blank" rel="noreferrer">here</a>
          </p>
        </div>
        <img
            src={seasonalSet}
            classname="light-feature-img"
            height={"820px"}
            width={"1230px"}/>
            .                           {/*Fix this*/}
        <div style={{ whiteSpace: 'nowrap' }}>
          <img src={summer} style={{ display: 'inline-block', width: '50%' }} />
          <img src={autumn} style={{ display: 'inline-block', width: '50%' }} />
        </div>
        <br></br>
        <div style={{ whiteSpace: 'nowrap' }}>
          <img src={winter} style={{ display: 'inline-block', width: '50%' }} />
          <img src={spring} style={{ display: 'inline-block', width: '50%' }} />
          <figcaption></figcaption>
        </div>     
      </section>

      <section className="light-plot-section">
        <div className="light-plot-text">
          <h2>
            A simple way to <mark>visualize the problem</mark>
          </h2>
          <p>
            The plot below is schematic: as artificial brightness increases,
            the visibility of faint stars decreases. This kind of visual block
            works well in documentation because it explains the idea without
            overwhelming the reader.
          </p>
        </div>

        <div className="light-chart-card">
          <h3>Night-sky degradation</h3>

          <div className="light-bars">
            <div className="bar-row">
              <span>Natural sky</span>
              <div className="bar-track">
                <div className="bar-fill w95" />
              </div>
              <strong>95%</strong>
            </div>

            <div className="bar-row">
              <span>Suburban sky</span>
              <div className="bar-track">
                <div className="bar-fill w55" />
              </div>
              <strong>55%</strong>
            </div>

            <div className="bar-row">
              <span>Urban sky</span>
              <div className="bar-track">
                <div className="bar-fill w20" />
              </div>
              <strong>20%</strong>
            </div>
          </div>

          <p className="chart-note">
            Relative visibility of faint stars under different sky conditions.
          </p>
        </div>
      </section>

      {impactSections.map((section, index) => (
        <section
          className={`light-feature ${index % 2 === 1 ? "reverse" : ""}`}
          key={section.title}
        >
          <div className="light-feature-text">
            <h2>
              {section.title} <mark>{section.highlight}</mark>
            </h2>
            <p>{section.text}</p>

            <div className="light-stat">
              <strong>{section.stat}</strong>
              <span>{section.statText}</span>
            </div>
          </div>

          <img
            src={section.image}
            alt={section.title}
            loading="lazy"
            className="light-feature-img"
          />
        </section>
      ))}

      <section className="light-principles">
        <div className="light-principles-header">
          <h2>
            How to light <mark>responsibly?</mark>
          </h2>
          <p>
            Protecting the night does not mean turning cities dark. It means
            using light carefully, efficiently, and only when it is useful.
          </p>
        </div>

        <div className="principle-grid">
          {responsibleLighting.map((item, index) => (
            <article className="principle-card" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>
      
    </section>
  );
}


/* Use <img
  src="/images/station-night.jpg"
  alt="REMCI-UV station at night"
  loading="lazy"
/> for a smooth experiences */

/*<img
            src={seasonalSet}
            classname="light-feature-img"
            height={"480px"}
            width={"720px"}/>*/
