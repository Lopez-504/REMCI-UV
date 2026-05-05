import { WiThermometer, WiHumidity, WiStrongWind, WiWindDeg, WiDaySunny } from "react-icons/wi";

/* try ion-icons */

const StationPopup = ({ station }) => {
  return (
    <div>
      <strong>{station.name}</strong>
      <p><WiThermometer /> {station.temp}°C</p>
    </div>
  );
};

export default StationPopup;


