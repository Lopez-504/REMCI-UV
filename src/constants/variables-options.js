export const VARIABLE_OPTIONS = [
  {
    labelKey: 'temp',
    value: 'temperature_2m',
    label: 'Temp °C',                    //'Temperature (°C)'
    color: '#ed4242e6',
    type: 'line',
  },
  {
    labelKey: 'humidity',
    value: 'relative_humidity_2m',
    label: 'Rel. Humidity %',   //'Relative HumlabelKeyity (%)'
    color: '#3498dbeb',
    type: 'line',
  },
  {
    labelKey: 'dew',
    value: 'dew_point_2m',
    label: 'Dew Point °C',   //'Dew Point (°C)'
    color: '#d1afdeec',
    type: 'line',
  },
  {
    labelKey: 'pressure',
    value: 'surface_pressure',
    label: 'Surf. Pressure hPa',   //'Surface Pressure (hPa)'
    color: '#2ecc70e6',
    type: 'line',
  },
  {
    labelKey: 'windSpeed',
    value: 'wind_speed_10m',
    label: 'Wind Speed km/h',    //'Wind Speed (km/h)'
    color: '#ffffffe1',
    type: 'line',
  },
  {
    labelKey: 'windDir',
    value: 'wind_direction_10m',
    label: 'Wind Dir °',  //'Wind Direction (°)'
    color: '#1abc9c',
    type: 'line',
  },
  {
    labelKey: 'windGust',
    value: 'wind_gusts_10m',
    label: 'Wind Gust km/h',  //'Wind Gust (km/h)'
    color: '#7f25d8',
    type: 'line',
  },
  {
    labelKey: 'cumulativeRainfall',
    value: 'precipitation',
    label: 'Prec mm',  //'Precipitation (mm)'
    color: '#00cecbd0',
    type: 'bar',
  },
  {
    labelKey:'solarRad',
    value: 'shortwave_radiation',
    label: 'SolarRad W/m²',  //'Solar Radiation (W/m²)'
    color: '#f1c40fe0',
    type: 'line',
  },
  {
    labelKey: 'cloudCover',
    value: 'cloud_cover',
    label: 'CloudCover %',   //'Cloud Cover (%)'
    color: '#95a5a6d1',
    type: 'line',
  },
];
