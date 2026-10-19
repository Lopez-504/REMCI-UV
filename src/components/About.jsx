import { useTranslation } from "react-i18next";

// CSS
import './about.css';

// STATIC
import { STATIONS } from '../constants/stations';
import { sponsors } from '../constants/sponsors-ghp';

function About() {
  const { t } = useTranslation("common");

  return (
    <div className="about-container">
      <div className="about-hero">
        
        {/* Sponsors Section at the Top */}
        {sponsors && sponsors.length > 0 && (
          <div className="sponsors-banner">
            <span className="sponsors-label">{t("FundedBy")}</span>
            <div className="sponsors-list">
              {sponsors.map((sponsor) => (
                <a 
                  key={sponsor.key} 
                  href={sponsor.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="sponsor-item"
                >
                  {sponsor.logo ? (
                    <img src={sponsor.logo} alt={sponsor.name} className="sponsor-logo" />
                  ) : (
                    <span className="sponsor-name">{sponsor.name}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Box */}
        <div className="about-card-content">
          <h1>REMCI-UV</h1>
          <p className="about-lead">
            <strong>Red de Estaciones Meteorológicas Ciencias UV</strong>, realiza monitoreo permanente para la 
            comprensión de los impactos del cambio climático, evaluación y mejoramiento local de pronóstico WRF, y recolección de datos observacionales de alta calidad en la Región de Valparaíso.
          </p>

          <div className="stations-section">
            <h3>{t("stations") || "Estaciones"}</h3>
            <ul className="stations-list">
              {STATIONS.map((station) => (
                <li key={station.id} className="station-row">
                  <a href={station.link} target="_blank" rel="noreferrer" className="station-link">
                    {station.name} <span className="station-loc">({station.loc})</span>
                  </a> 
                  <span className={`station-status status-${station.status}`}>
                    {t(station.status)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;