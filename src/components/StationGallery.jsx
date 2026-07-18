import { useState } from 'react';
import { Card } from '@mantine/core';

//CSS
import './stationGallery.css'

//STATIC
import { STATIONS } from '../constants/stations';

import pocuro1 from "/images/pocuro1.jpg"        // manual imports work
import pocuro2 from "/images/pocuro2.gif"         // using / as public is not working
import pocuro3 from "/images/pocuro3.jpg"

//import ciencias4 from "/images/2025-07-28-10-19-19.jpg"
import ciencias2 from "/images/2025-07-28-10-49-19.jpg"
import ciencias3 from "/images/2025-07-28-07-49-19.jpg"
import ciencias1 from "/images/cameraciencias.gif"
import ciencias4 from "/src/images/estacionUV.png"

import reserva1 from "/images/reserva1.jpg"
import reserva2 from "/images/presentation.jpeg"
import reserva3 from "/images/instalacion.jpeg"
import reserva4 from "/images/davis2.1.png"

import home1 from "/images/reserva1.jpg"

const IMAGE_DB = {
  "Pocuro UV": [
    pocuro1,
    pocuro2,
    pocuro3
  ],
  "Ciencias UV": [
    ciencias4,
    ciencias1,
    ciencias2,
    ciencias3
  ],
  "La Reserva": [
    reserva1,
    reserva2,
    reserva3,
    reserva4,
  ],
  "Home": [
    home1,
  ]
};

const StationGallery = () => {

  const [selectedStation, setSelectedStation] = useState(STATIONS[0]);
  
  const selectStation = (station) => {
    setSelectedStation(station);
    setIndex(0);
  };

  const images = IMAGE_DB[selectedStation?.name] || [];

  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false); 

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  if (images.length === 0) return <div>No images</div>;

  return (
    <div className="station-gallery">
      <div className="gallery-card">
      {/*<div className="card-header">Station Gallery</div>*/}

        <div className="splited-gallery">     
          <div className='title-select'>
            <h3>Select weather station: </h3>
            <select
              value={selectedStation.id}
              onChange={(e) =>
                selectStation(
                  STATIONS.find(s => s.id === e.target.value)         /*always a string*/
                )
              }
            >
              {STATIONS.map(st => (
                <option key={st.id} value={st.id}>{st.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Gallery Container */}
        <div className="gallery-container">

          {/* ZOOM MODAL */}
          {isZoomed && (
            <div className="zoom-modal" onClick={() => setIsZoomed(false)}>
              <img src={images[index]} alt="zoomed" />
            </div>
          )}

          {/* IMAGE */}
          <div className="image-wrapper">
            <img src={images[index]} alt="image" />
            <button
              className="zoom-btn"
              onClick={() => setIsZoomed(true)}
            >
              🔍
            </button>
          </div>

          {/* CONTROLS */}
          <div className="gallery-controls">
            <button onClick={prev}>←</button>
            <span>{index + 1} / {images.length}</span>
            <button onClick={next}>→</button>
          </div>

          {/* DOTS */}
          <div className="gallery-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={i === index ? 'dot active' : 'dot'}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div> 
      </div>


      {/* Station Characteristics */}
      <div className="gallery-card">
        <h2>Station Characteristics</h2>
        <Card title="Station Characteristics">
          <div className="station-info">

            <div className="info-group">
              <span className="label">Station</span>
              <span className="value">{selectedStation.name}</span>
            </div>

            <div className="info-group">
              <span className="label">Status</span>
              <span className={`status ${selectedStation.status.toLowerCase()}`}>
                {selectedStation.status}
              </span>
            </div>

            <div className="info-group">
              <span className="label">Station Model</span>
              <span className="value">{selectedStation.brand}</span>
            </div>

            <div className="info-group">
              <span className="label">Measured Variables</span>

              <div className="variables-list">
                {selectedStation.variables.map(variable => (
                  <span className="variable-pill" key={variable}>
                    {variable}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-group">
              <span className="label">Coordinates</span>
              <span className="value">
                {selectedStation.lat.toFixed(5)}°, {selectedStation.lng.toFixed(5)}°    ({selectedStation.loc})
              </span>
            </div>

            <div className="info-group">
              <span className="label">Elevation</span>
              <span className="value">
                {selectedStation.elev ?? "Not available"}
              </span>
            </div>

            <div className="info-group">
              <span className="label">Installation date</span>
              <span className="value">
                {selectedStation.instdate ?? "Not available"} 
              </span>
            </div>

          </div>
        </Card>

      </div>
    </div>
  );
};

export default StationGallery;


/* TASK: when we change the station, make the image index go back to number 1
         this is done in overview-map, see that component and copy logic here (keep the zoom feature)
*/