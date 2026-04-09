import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import StationPopup from './StationPopup';
import { STATIONS } from '../constants/stations';

const MapView = ({ setSelectedStation }) => {
  return (
    <MapContainer center={[-33, -71.13]} zoom={9.5} style={{ height: '100%' , width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {STATIONS.map(station => (
        <Marker key={station.id}
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
  );
};

export default MapView;
