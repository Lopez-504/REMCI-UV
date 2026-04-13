import { WiThermometer, WiHumidity, WiStrongWind, WiWindDeg, WiDaySunny } from "react-icons/wi";

const StationPopup = ({ station }) => {
  return (
    <div>
      <strong>{station.name}</strong>
      <p><WiThermometer /> {station.temp}°C</p>
    </div>
  );
};

export default StationPopup;


/* 
For now I need smaller popups

<p><WiHumidity /> {station.humidity}%</p>
      <p><WiStrongWind /> {station.windSpeed} m/s</p>
      <p><WiWindDeg /> {station.windDir}°</p>
      <p><WiDaySunny /> {station.solarRad} W/m²</p>
*/
