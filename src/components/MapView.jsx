import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import StationPopup from './StationPopup';
import { STATIONS } from '../constants/stations';

import earth from '/images/stations_google_earth.png'

// put your image in public/images/
const SATELLITE_OVERVIEW = earth;

const MapView = ({ setSelectedStation }) => {
  return (
    <div className="mapview-split">

      <div className="mapview-top">
        <img
          src={SATELLITE_OVERVIEW}
          alt="Satellite view of the three weather stations"
          className="mapview-image"
        />
      </div>

      <div className="mapview-bottom">
        <MapContainer
          center={[-33, -71.48]}
          zoom={9.1}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {STATIONS.map((station) => (
            <Marker
              key={station.id}
              position={[station.lat, station.lng]}
              eventHandlers={{ click: () => setSelectedStation(station) }}
            >
              <Popup>
                <StationPopup station={station} />
              </Popup>

              <Tooltip permanent direction="top">
                {station.name}
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>

    </div>
  );
};

export default MapView;