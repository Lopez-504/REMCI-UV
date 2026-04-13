import { useState } from 'react';
import { RAW_WEATHER_DATA } from '../data/weatherData';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MapView from '../components/MapView';
import AnalyticsPanel from '../components/AnalyticsPanel';
import AvailabilityDashboard from '../components/AvailabilityDashboard';
import ForecastPanel from '../components/ForecastPanel';
import WindRosePanel from '../components/WindRosePanel';
import StationGallery from '../components/StationGallery';
//import WeatherStation from '../components/StationModel'; 

import { STATIONS } from '../constants/stations';

const AWSDashboard = () => {

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // States
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const [plotData] = useState(RAW_WEATHER_DATA);
  const [selectedStation, setSelectedStation] = useState(STATIONS[0]);

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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleCheckboxChange = (varName) => {
    setExportVars(prev => ({
      ...prev,
      [varName]: !prev[varName]
    }));
  };


  const handleDownload = (stationName) => {

  if (endDate < startDate) {
    alert("End date cannot be before start date!");
    return;
  }

  // Filter variables
  const selectedKeys = Object.keys(exportVars).filter(k => exportVars[k]);

  if (selectedKeys.length === 0) {
    alert("Select at least one variable!");
    return;
  }

  // Build filtered data
  const filteredData = plotData.map(entry => {
    const obj = { time: entry.time };

    selectedKeys.forEach(key => {
      if (entry[key] !== undefined) {
        obj[key] = entry[key];
      }
    });

    return obj;
  });

  // Convert to CSV
  const headers = ["time", ...selectedKeys];

  const csvRows = [
    headers.join(","), // header row
    ...filteredData.map(row =>
      headers.map(h => row[h] ?? "").join(",")
    )
  ];

  const csvString = csvRows.join("\n");

  // Trigger download
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${stationName}_data.csv`;
  a.click();

  URL.revokeObjectURL(url);
};

  return (
  <div className={darkMode ? 'app dark' : 'app'}>

    <div className="dashboard-container">

      <Navbar />

      <main className="main-content">

        <div className="top-section">
       
          {/* MAP */}
          <div className="card-frame map-side">
            <div className="card-header">Network Geospatial View</div>
            <MapView setSelectedStation={setSelectedStation} />
          </div>

          {/* ANALYTICS PANEL */}
          <AnalyticsPanel
            selectedStation={selectedStation}
            plotData={plotData}
            isExportOpen={isExportOpen}
            setIsExportOpen={setIsExportOpen}
            exportVars={exportVars}
            handleCheckboxChange={handleCheckboxChange}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            handleDownload={handleDownload}
          />

        </div>

        {/* BOTTOM SECTION */}
        <div className="bottom-section">
          <AvailabilityDashboard
            selectedStation={selectedStation}
            exportVars={exportVars}
          />
        </div>
	<div className="bottom-section">
       	  <ForecastPanel />
        </div>
        <div className="dual-section">

          <WindRosePanel
            selectedStation={selectedStation}
            setSelectedStation={setSelectedStation}
          />
  	  <StationGallery selectedStation={selectedStation} />
        </div>
        
      </main>
    </div>
  </div>  
  );
};

export default AWSDashboard;


/* Causing some serious bugs

<Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        language={language}
        setLanguage={setLanguage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

*/