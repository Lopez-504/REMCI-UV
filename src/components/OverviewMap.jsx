import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Circle } from 'react-leaflet';
import L from 'leaflet'

//COMPONENTS
import HelpTooltip from "./HelpTooltip"

//CSS
import 'leaflet/dist/leaflet.css';
import './overviewMap.css';

//Translations
import { useTranslation } from "react-i18next";

//import { STATIONS } from '../constants/stations'
import { STATIONS } from '../constants/stations-ghp'

//Custom AWS icon
const customSvgIcon = L.divIcon({className: 'custom-weather-station-marker',
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="36" height="36" style="filter: drop-shadow(0px 3px 4px rgba(0,0,0,0.25));">
      <defs>
        <linearGradient id="anemometerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </linearGradient>
      </defs>
      <path d="M16 2C10.48 2 6 6.48 6 12c0 7.5 10 18 10 18s10-10.5 10-18c0-5.52-4.48-10-10-10z" fill="url(#anemometerGrad)" stroke="#ffffff" stroke-width="1.5"/>
      <g fill="#ffffff">
        <circle cx="16" cy="13" r="1.5" />
        <rect x="9.5" y="12.25" width="13" height="1.5" rx="0.75" />
        <path d="M9.5 9.5a3 3 0 0 0 0 7z" />
        <path d="M22.5 16.5a3 3 0 0 0 0 -7z" />
        <rect x="15.25" y="14.5" width="1.5" height="5.5" rx="0.75" />
      </g>
    </svg>
  `,
  iconSize: [66, 66],
  iconAnchor: [18, 36], // Anchors the bottom tip of the pin to the station's coordinates
  popupAnchor: [0, -34]
});



const OverviewMap = () => {
  const { t } = useTranslation("common");

  const [selectedStation, setSelectedStation] = useState(STATIONS[0]);
  const [imageIndex, setImageIndex] = useState(0);

  const selectStation = (station) => {
    setSelectedStation(station);
    setImageIndex(0);
  };

  const images = selectedStation?.images || [];

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="overview-map-gallery">
      <div className="omg-map-card">
        <div className="omg-card-header">
          <h3>
            {t("WSN")} 
            <span>
              <HelpTooltip helpKey={t("helpMapElev")} placement='right'/>
            </span>
          </h3>
          <span>{t("clickMarker")}</span>
        </div>

        <div className="omg-map-body">
          <MapContainer
            center={[-33.0, -71.1]}
            zoom={10}
            scrollWheelZoom={false}
            className="omg-leaflet-map"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />

            {STATIONS.map((station) => (
              <Marker
                key={station.id}
                position={[station.lat, station.lng]}
                icon={customSvgIcon}
                color={station.color}
                eventHandlers={{
                  click: () => selectStation(station)
                }}
              >
              <Popup>
                <strong>{station.name}</strong>
                <br />
                {station.brand}
                <br />
                {t("status")}: {t(station.status)}
                </Popup>

              <Tooltip direction="top" offset={[0, -8]} >
                  {station.name}
              </Tooltip>
              <Circle center={[station.lat, station.lng]} 
                      pathOptions={{ color: station.color ,fillColor: station.color }} 
                      radius={6500} />
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="omg-gallery-card">
        <div className="omg-card-header">
          <h3>{selectedStation.name}</h3>
          <span>{t("stationImg")}</span>
        </div>

        <div className="omg-gallery-body">
          <div className="omg-image-frame">
            {images.length > 0 ? (
            <img
                src={images[imageIndex]}
                alt={`${selectedStation.name} ${imageIndex + 1}`}
            />
            ) : (
            <div className="omg-no-image">{t("noImgAvail")}</div>
            )}
          </div>

          <div className="omg-gallery-controls">
            <button onClick={prevImage} disabled={images.length === 0}>‹</button>
            <span>{images.length > 0 ? `${imageIndex + 1} / ${images.length}` : '0 / 0'}</span>
            <button onClick={nextImage} disabled={images.length === 0}>›</button>
          </div>

          <div className="omg-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={i === imageIndex ? 'omg-dot active' : 'omg-dot'}
                onClick={() => setImageIndex(i)}
                aria-label={`Show image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default OverviewMap;


// Note: Leaflet maps render invisibly when the container has no explicit height

// Maybe in the future we can consider using little stations as icons
// see: https://leafletjs.com/examples/custom-icons/