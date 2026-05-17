import React from 'react';

// --   Links   -- //
const ciencias_ln = "https://www.licor.cloud/dashboards/public/edb4ddea-8f4d-4401-8479-1535407cc17a/false?filters={%22davra-timeselector%22:{%22type%22:%22relative%22,%22unit%22:%22minutes%22,%22value%22:30,%22live%22:false}}"
const lareserva_ln = "https://www.weatherlink.com/embeddablePage/show/745c3c317c794f5a81f5a777bde785b5/summary"
const pocuro_ln = "https://www.licor.cloud/dashboards/public/f2e63989-d622-4d4a-95c3-6708d4ef080b/true?filters={%22davra-timeselector%22:{%22type%22:%22relative%22,%22unit%22:%22minutes%22,%22value%22:30,%22live%22:true}}"

// Pictures
import earth from "/images/stations_google_earth.png"

//css
import './about.css'

function About() {
  return (
    <div className="card-frame about-card">
            <div className="card-header">About REMCI-UV</div>
              <div className="about-content">
                <p>
                  <strong>REMCI-UV</strong> (Red de Estaciones Meteorológicas Ciencias UV), realiza monitoreo para la 
                  comprensión de los impactos del cambio climático en la Región de Valparaíso.
                  Integrada por las estaciones:
                  <ol>
                    <li>
                      <a href={ciencias_ln} target="_blank" rel="noreferrer">
                  Ciencias UV </a> (Facultad de Ciencias, Playa Ancha, Valparaíso)
                    </li>  
                    <li>
                      <a href={pocuro_ln} target="_blank" rel="noreferrer">
                  Pocuro UV </a> (Calle Larga, sector Pocuro)
                    </li>
                    <li>
                      <a href={lareserva_ln} target="_blank" rel="noreferrer">
                  La Reserva UV </a> (Villa Alemana).
                    </li>
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