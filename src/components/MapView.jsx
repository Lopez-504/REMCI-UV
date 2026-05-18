import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';

//STATIC
import { STATIONS } from '../constants/stations';
import earth from '/images/stations_google_earth.png'

//CSS
import './mapView.css'

const SATELLITE_OVERVIEW = earth;

//debugging leaflet markers
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


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
          center={[-32.9, -70.97]}
          zoom={9.2}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />

          {STATIONS.map((station) => (
            <Marker
              key={station.id}
              position={[station.lat, station.lng]}
              eventHandlers={{ click: () => setSelectedStation(station) }}
            >
              <Popup>
                <strong>{station.name}</strong>
                <br />
                {station.brand}
                <br />
                Status: {station.status}
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