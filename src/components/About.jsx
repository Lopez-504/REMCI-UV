import React from 'react';

//Translations
import { useTranslation } from "react-i18next";

// CSS
import './about.css'

// STATIC
import { STATIONS } from '../constants/stations';
import earth from "/images/stations_google_earth.png"

function About() {
    const { t } = useTranslation("common");

  return (
    <div className="card-frame about-card">
      <div className="card-header">{t("about")} REMCI-UV</div>
        <div className="about-content">
          <p>
            <strong>REMCI-UV</strong> (Red de Estaciones Meteorológicas Ciencias UV), realiza monitoreo para la 
            comprensión de los impactos del cambio climático en la Región de Valparaíso.
            Integrada por las estaciones:
            <ol>
              {STATIONS.map((station) => (
                <li key={station.id}>
                  <a href={station.link} target="_blank" rel="noreferrer">
                {station.name} </a> ({station.loc}) [<strong>{t(station.status)}</strong>]
                </li>
              ))}
            </ol>
          </p>
        </div>
        <div className="mapview-bottom">
          <img
            src={earth}
            alt="Satellite view of the three weather stations"
            className="mapview-image"/>
        </div>
    </div>
  )
}

export default About