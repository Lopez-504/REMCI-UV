import { useState } from 'react';
import { Card } from '@mantine/core';
import { useTranslation } from "react-i18next";

//CSS
import './stationGallery.css'

//STATIC
//import { STATIONS } from '../constants/stations';
import { STATIONS } from '../constants/stations-ghp';

//Test
const StationOverviewCard = ({ station }) => { const [index, setIndex] = useState(0); const images = station.images || []; const next = () => { setIndex((index + 1) % images.length); }; const prev = () => { setIndex((index - 1 + images.length) % images.length); }; return ( <div className="station-overview-card"> {/* IMAGE */} <div className="station-overview-image"> {images.length > 0 ? ( <img src={images[index]} alt={station.name} /> ) : ( <div className="station-no-image"> No image available </div> )} {/* ARROWS */} {images.length > 1 && ( <> <button className="station-overview-arrow left" onClick={prev} aria-label="Previous image" > ‹ </button> <button className="station-overview-arrow right" onClick={next} aria-label="Next image" > › </button> </> )} {/* DOTS */} {images.length > 1 && ( <div className="station-overview-dots"> {images.map((_, i) => ( <button key={i} className={i === index ? "overview-dot active" : "overview-dot"} onClick={() => setIndex(i)} aria-label={`Image ${i + 1}`} /> ))} </div> )} </div> {/* STATION NAME */} <div className="station-overview-info"> <h3>{station.name}</h3> {station.loc && ( <span>{station.loc}</span> )} </div> </div> ); };


const StationGallery = () => {
  const { t } = useTranslation(["gallery","common"]);

  const [selectedStation, setSelectedStation] = useState(STATIONS[0]);
  
  const selectStation = (station) => {
    setSelectedStation(station);
    setIndex(0);
  };

  const images = selectedStation?.images || [];

  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false); 

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  if (images.length === 0) return <div>No images</div>;

  return (
    <>
    <section className="station-overview"> 
      
      <div className="station-overview-header"> 
        <h2>
          {t("stationsOverview", { defaultValue: "Our Weather Stations" })}
        </h2> 
        <p> 
          {t("stationsOverviewDescription", { defaultValue: "Explore the REMCI-UV stations" })} 
        </p> 
        </div>
        <div className="station-overview-grid"> 
          {STATIONS.map((station) => ( <StationOverviewCard key={station.id} station={station} /> ))} 
        </div> 
      </section> 
    <div className="station-gallery">
      <div className="gallery-card">      
          <div className='title-select'>
            <h3>{t('selectStation')}: </h3>
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
        <h2>{t("characteristics")}</h2>
        <Card title="Station Characteristics">
          <div className="station-info">

            <div className="info-group">
              <span className="label">{t("station")}</span>
              <span className="value">{selectedStation.name}</span>
            </div>

            <div className="info-group">
              <span className="label">{t("status")}</span>
              <span className={`status ${selectedStation.status.toLowerCase()}`}>
                {t(selectedStation.status)}
              </span>
            </div>

            <div className="info-group">
              <span className="label">{t("variables")}</span>

              <div className="variables-list">
                {selectedStation.variables.map(variable => (
                  <span className="variable-pill" key={variable}>
                    {t(variable)}
                  </span>
                ))}
              </div>
            </div>

            <div className="info-group">
              <span className="label">{t('coords')}</span>
              <span className="value">
                lat: {selectedStation.lat.toFixed(5)}°, lon: {selectedStation.lng.toFixed(5)}°    ({selectedStation.loc})
              </span>
            </div>

            <div className="info-group">
              <span className="label">{t("elevation")}</span>
              <span className="value">
                {selectedStation.elev ?? "Not available"} {t(selectedStation.elevUnit, {ns: 'common'})}
              </span>
            </div>

            <div className="info-group">
              <span className="label">{t("model")}</span>
              <span className="value">{selectedStation.brand}</span>
            </div>      

            <div className="info-group">
              <span className="label">{t("installation")}</span>
              <span className="value">
                {selectedStation.instdate ?? "Not available"} 
              </span>
            </div>

            <div className="info-group">
              <span className="label">{"Link*"}</span>
              <span className="value">
                {<a href={selectedStation.link} target="_blank" rel="noreferrer">
                {selectedStation.name} </a> ?? "Not available"} 
              </span>
            </div>      

          </div>
        </Card>

      </div>
    </div>
    </>
  );
};

export default StationGallery;


/* TASK: when we change the station, make the image index go back to number 1
         this is done in overview-map, see that component and copy logic here (keep the zoom feature)
*/