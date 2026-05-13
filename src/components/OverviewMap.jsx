import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './overviewMap.css';

import { STATIONS } from '../constants/stations'

const OverviewMap = () => {
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
          <h3>Station Network</h3>
          <span>Click a marker to update the gallery</span>
        </div>

        <div className="omg-map-body">
          <MapContainer
            center={[-33.0, -71.1]}
            zoom={9}
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
                Status: {station.status}
                </Popup>

              <Tooltip direction="top" offset={[0, -8]} permanent>
                  {station.name}
              </Tooltip>
              <Circle center={[station.lat, station.lng]} 
                      pathOptions={{ color: station.color ,fillColor: station.color }} 
                      radius={8000} />
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="omg-gallery-card">
        <div className="omg-card-header">
          <h3>{selectedStation.name}</h3>
          <span>Station imagery</span>
        </div>

        <div className="omg-gallery-body">
          <div className="omg-image-frame">
            {images.length > 0 ? (
            <img
                src={images[imageIndex]}
                alt={`${selectedStation.name} ${imageIndex + 1}`}
            />
            ) : (
            <div className="omg-no-image">No images available</div>
            )}
          </div>

          <div className="omg-gallery-controls">
            <button onClick={prevImage} disabled={images.length === 0}>←</button>
            <span>{images.length > 0 ? `${imageIndex + 1} / ${images.length}` : '0 / 0'}</span>
            <button onClick={nextImage} disabled={images.length === 0}>→</button>
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