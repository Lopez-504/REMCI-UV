import React, { useState } from 'react';

//DATA
import { RAW_WEATHER_DATA } from './data/weatherData';

//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup, Tooltip as MapTooltip} from 'react-leaflet';

// ICONS
import { WiThermometer, WiHumidity, WiStrongWind, WiWindDeg, WiDaySunny } from "react-icons/wi";

// Apache Echarts
import ReactECharts from 'echarts-for-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'leaflet/dist/leaflet.css';

const STATIONS = [
  { id: 1, name: "Pocuro-AWS", lat: -32.86967, lng: -70.61523, temp: 18.5, humidity: 45 , windSpeed: 0.5, windDir: 216, solarRad: 1}, 
  { id: 2, name: "CienciasUV-AWS", lat: -33.02705, lng: -71.63875, temp: 16.2, humidity: 62, windSpeed: 0.5, windDir: 216, solarRad: 1 },
  { id: 3, name: "LaReserva-AWS", lat: -33.04374, lng: -71.33947, temp: 17.8, humidity: 55, windSpeed: 0.5, windDir: 216, solarRad: 1 }
];

const AWSDashboard = () => {
  const [plotData, setPlotData] = useState(RAW_WEATHER_DATA);
  const [selectedStation, setSelectedStation] = useState(STATIONS[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportVars, setExportVars] = useState({
    temp: true,
    humidity: false,
    windSpeed: false,
    windDir: false,
    pressure: false,
    windGust: false,
    solarRad: false,
    cumulativeRainfall: false
  });

  // A helper mapping for "Pretty Names"
  const VAR_LABELS = {
    temp: "Temperature (°C)",
    humidity: "Humidity (%)",
    windSpeed: "Wind Speed (m/s)",
    windDir: "Wind Direction (°)",
    pressure: "Atmospheric Pressure hPa",
    windGust: "Wind Gust (m/s)",
    solarRad: "Solar Radiation (W/m²)",
    cumulativeRainfall: "Cumulative Rainfall (mm)"
  };

  // Helper to toggle checkboxes
  const handleCheckboxChange = (variable) => {
    setExportVars(prev => ({
      ...prev,
      [variable]: !prev[variable]
    }));
  };

  // --- ECHARTS CONFIGURATION ---
  const getChartOptions = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      textStyle: {
      fontSize: 16,
      fontWeight: 'normal',
      },
      
      legend: { data: ['Temperature', 'Humidity', 'WindSpeed'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
      // This adds the "Smooth Exploration" slider you wanted
      dataZoom: [
        { type: 'slider', start: 0, end: 100, bottom: 30 },
        { type: 'inside' } // Allows mouse-wheel zoom
      ],
      
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: plotData.map(d => d.time),
        
        axisLabel: { rotate: 45, fontSize: 15 },      // px
        
        axisTick: {
          show: true,
          length: 4,        // Increase length of the tick
      	  lineStyle: {
            width: 2,        // Increase thickness
            color: '#333'
          }
        }
      },
      
      yAxis: [
        { type: 'value', name: 'Temp (°C)', position: 'left' },
        { type: 'value', name: 'RH (%)', position: 'right', max: 100 },
      ],
      series: [
        {
          name: 'Temperature',
          type: 'bar',
          smooth: true,
          data: plotData.map(d => d.temp),
          lineStyle: { width: 3, color: '#3498db' },
          symbol: 'pin'
        },
        {
          name: 'Humidity',
          type: 'line',
          yAxisIndex: 1, // Connects to the right Y-Axis
          smooth: true,
          data: plotData.map(d => d.humidity),
          lineStyle: { width: 3, color: '#2ecc71' },
          symbol: 'circle'
        }
      ]
    };
  };

  // Variable to download
  const [selectedVariable, setSelectedVariable] = useState('all');

  const handleDownload = (stationName) => {
    if (endDate < startDate) {
      alert("End date cannot be before start date!");
      return;
    }
    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];
    
    // Filter PLOT_DATA based on which checkboxes are ticked
    const filteredData = PLOT_DATA.map(entry => {
      const filteredEntry = { time: entry.time };
      if (exportVars.temp) filteredEntry.temp = entry.temp;
      if (exportVars.humidity) filteredEntry.humidity = entry.humidity;
      if (exportVars.windSpeed) filteredEntry.windSpeed = entry.windSpeed;
      if (exportVars.windDir) filteredEntry.windDir = entry.windDir;
      if (exportVars.pressure) filteredEntry.pressure = entry.pressure;
      if (exportVars.windGust) filteredEntry.windGust = entry.windGust;
      if (exportVars.solarRad) filteredEntry.solarRad = entry.solarRad;
      if (exportVars.cumulativeRainfall) filteredEntry.cumulativeRainfall = entry.cumulativeRainfall;
      return filteredEntry;
    });
    
    const downloadData = {
      station: stationName,
      variables_exported: Object.keys(exportVars).filter(key => exportVars[key]),
      period: { start: startDate.toISOString().split('T')[0], end: endDate.toISOString().split('T')[0] },
      data: filteredData
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(downloadData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${stationName}_export.csv`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };





  return (
    <div className="dashboard-container">
      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ width: '30px', height: '30px', backgroundColor: '#3498db', borderRadius: '6px' }}></div>
          <h2 style={{ margin: 0, fontSize: '1.2rem', letterSpacing: '1px' }}>METEO-HUB PRO</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: '#2ecc71', borderRadius: '50%', boxShadow: '0 0 8px #2ecc71' }}></div>
          <span>3 Stations Online</span>
          
          <button 
     	    onClick={() => window.open('/gallery', '_blank')}
            className="gallery-link-btn">
  	    📷 View Live Camera
          </button>
          
          <span style={{ marginLeft: '20px', opacity: 0.7 }}>| User: Jorge</span>
        </div>
      </nav>

      <main className="main-content">
      
        {/* --- TOP SECTION (Map & Plot) --- */}       
        <div className="top-section">
          {/* LEFT: MAP  NOTE: zoom only has 0.1 precission*/}
          <div className="card-frame map-side">
            <div className="card-header">Network Geospatial View</div>   
            <MapContainer center={[-33, -71.13]} zoom={9.5} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {STATIONS.map(station => (
                <Marker key={station.id} position={[station.lat, station.lng]} eventHandlers={{ click: () => setSelectedStation(station) }}>
                  <Popup>
                    <div style={{ textAlign: 'left', fontSize:'0.8rem'}}>
                      <strong>{station.name}</strong>
                      <div>
		        <p><WiThermometer size="2.1em"/> {station.temp}°C</p>
		        <p><WiHumidity size="2.1em"/> {station.humidity}%</p>
		        <p><WiStrongWind size="2.1em"/> {station.windSpeed}m/s</p>
		        <p><WiWindDeg size="2.1em"/> {station.windDir}°</p>
		        <p><WiDaySunny size="2.1em"/> {station.solarRad} W/m²</p>
                      </div>
                    </div>
                  </Popup>
                  <MapTooltip permanent direction="top" offset={[0, -10]}><b>{station.name}</b></MapTooltip>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* RIGHT: ANALYTICS */}
          <div className="card-frame plot-side">
            <div className="card-header">Station Analytics: {selectedStation.name}</div>
            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
              <section className="info-grid">
                <div className="info-item"><span>ID</span><div>AWS-{selectedStation.id.toString().padStart(3, '0')}</div></div>
                <div className="info-item"><span>Coords</span><div>{selectedStation.lat.toFixed(3)}, {selectedStation.lng.toFixed(3)}</div></div>
                <div className="info-item"><span>Status</span><div style={{color:'#27ae60', fontWeight: 'bold'}}>Active</div></div>
                <div className="info-item"><span>Brand - Model</span><div>DAVIS - Vantage PRO2 plus</div></div>
              </section>

	      {/* SECTION 2: EXPORT CONFIG WITH TICK BOXES */}
              <section style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
      {/* HEADER / TOGGLE BUTTON */}
      <div 
        onClick={() => setIsExportOpen(!isExportOpen)}
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          cursor: 'pointer',
          padding: '10px 0'
        }}
      >
        <h4 className="section-title" style={{ margin: 0 }}>Export Settings</h4>
        <span style={{ fontSize: '17px', color: '#343640', fontWeight: 'bold', cursor: 'pointer'}}>
          {isExportOpen ? '▲ Close' : '▼ Expand'}
        </span>
      </div>

      {/* RETRACTABLE CONTENT */}
      {isExportOpen && (
        <div className="retractable-panel" >
    {Object.keys(exportVars).map((varKey) => (
      <label key={varKey} className="checkbox-row">
        <input 
          type="checkbox" 
          checked={exportVars[varKey]} 
          onChange={() => handleCheckboxChange(varKey)} 
        />
        {VAR_LABELS[varKey]}
      </label>
    ))}
          
 	  {/* Date Picker */}
          <div style={{ display: 'flex', gap: '25px', marginBottom: '15px' }}>
            <DatePicker selected={startDate} onChange={setStartDate} className="date-input" />
            <DatePicker selected={endDate} onChange={setEndDate} className="date-input" />
          </div>

          <button 
            onClick={() => handleDownload(selectedStation.name)} 
            className="download-btn"
            disabled={!exportVars.temp && !exportVars.humidity}		// ??
          >
            📥 Download CSV
          </button>
        </div>
      )}
    </section>    
              
              {/*Plot section*/}
              <section style={{ flexGrow: 1, minHeight: '300px' }}>
                
                <ReactECharts 
                  option={getChartOptions()} 
                  style={{ height: '100%', width: '100%' }} 
                />
              </section>
              
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION: Availability --- */}
        <div className="card-frame plot-side">
          <div className="card-header">Data Availability: {selectedStation.name}</div>
          <section style={{ flexGrow: 1, minHeight: '300px' }}>
                
                <ReactECharts 
                  option={getChartOptions()} 
                  style={{ height: '100%', width: '100%' }} 
                />
          </section>
        </div>  
      </main>
    </div>
  );
};

const smallBtnStyle = {
    background: 'none',
    border: 'none',
    color: '#3498db',
    fontSize: '10px',
    cursor: 'pointer',
    textDecoration: 'underline',
    padding: 0
};

export default AWSDashboard;
