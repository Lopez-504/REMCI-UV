import { useState } from 'react';
import { RAW_WEATHER_DATA } from '../data/weatherData';

// --   Components  --  //
import Navbar from '../components/Navbar';
import MapView from '../components/MapView';
import AnalyticsPanel from '../components/AnalyticsPanel';
import AvailabilityDashboard from '../components/AvailabilityDashboard';
import ForecastPanel from '../components/ForecastPanel';
import WindRosePanel from '../components/WindRosePanel';
import StationGallery from '../components/StationGallery';
import SectionTabs from '../components/SectionTabs';
import Footer from '../components/Footer';
import LightPollution from "../components/LightPollution";


// --   Constants  --  //
import { STATIONS } from '../constants/stations';


// --   Links   -- //
const ciencias_ln = "https://www.licor.cloud/dashboards/public/edb4ddea-8f4d-4401-8479-1535407cc17a/false?filters={%22davra-timeselector%22:{%22type%22:%22relative%22,%22unit%22:%22minutes%22,%22value%22:30,%22live%22:false}}"
const lareserva_ln = "https://www.weatherlink.com/embeddablePage/show/745c3c317c794f5a81f5a777bde785b5/summary"
const pocuro_ln = "https://www.licor.cloud/dashboards/public/f2e63989-d622-4d4a-95c3-6708d4ef080b/true?filters={%22davra-timeselector%22:{%22type%22:%22relative%22,%22unit%22:%22minutes%22,%22value%22:30,%22live%22:true}}"


// --  Pictures  -- //
import earth from "/images/stations_google_earth.png"


// --  Page  -- //
const AWSDashboard = () => {

  //- States
  const [plotData] = useState(RAW_WEATHER_DATA);

  //-- Section Tab
  const [activeSection, setActiveSection] = useState('overview-main');   //starts at overview
  const [selectedStation, setSelectedStation] = useState(STATIONS[0]);

  //- Exports
  const [isExportOpen, setIsExportOpen] = useState(true);     // starts opened
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

  //-- Filter variables
  const selectedKeys = Object.keys(exportVars).filter(k => exportVars[k]);

  if (selectedKeys.length === 0) {
    alert("Select at least one variable!");
    return;
  }

  //-- Build filtered data
  const filteredData = plotData.map(entry => {
    const obj = { time: entry.time };

    selectedKeys.forEach(key => {
      if (entry[key] !== undefined) {
        obj[key] = entry[key];
      }
    });

    return obj;
  });

  //-- Convert to CSV
  const headers = ["time", ...selectedKeys];

  const csvRows = [
    headers.join(","), // header row
    ...filteredData.map(row =>
      headers.map(h => row[h] ?? "").join(",")
    )
  ];

  const csvString = csvRows.join("\n");

  //-- Trigger download
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${stationName}_data.csv`;
  a.click();

  URL.revokeObjectURL(url);
};


//   ---  Return  ---   //

  return (
    <div className="dashboard-container">
     
     {/* Navbar */}
      <Navbar />
      <SectionTabs
        activeSection={activeSection}
        setActiveSection={setActiveSection}/>

      {/* Main content */}
      <main className="main-content">

{/* Overview -> main */}

        {activeSection === 'overview-main' && (
          <>
            <div className="top-section">
              <div className="card-frame map-side">    
                <div className="card-header">Network Geospatial View</div>
                  <MapView setSelectedStation={setSelectedStation} />
              </div>
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
                handleDownload={handleDownload}/>
            </div>
          </>
        )}

{/* Overview -> map */}

        {activeSection === 'overview-map' && (
          <>
          <div>
            <h2>Site under construction: {activeSection}</h2>
            <p>Lorem, ipsum dolor sit amet consectetur 
              adipisicing elit. Voluptatibus doloremque ratione adipisci incidunt dicta! 
              Eveniet excepturi eius at fuga asperiores!</p>
          </div>
          </>
        )}

{/* Stations -> gallery section */}

        {activeSection === 'stations-gallery' && (
          <>
            <div className="dual-section">
              <StationGallery selectedStation={selectedStation} setSelectedStation={setSelectedStation}/>
            </div>
          </>
        )}

{/* Stations -> current conditions */}

        {activeSection === 'stations-currentCond' && (
          <>
            <div className="dual-section">
              <h2>Note:</h2>
              <p>After refactor, replace this section with: Current conditions (see components)</p>
              <WindRosePanel
                selectedStation={selectedStation}
                setSelectedStation={setSelectedStation}/>
            </div>
          </>
        )}

{/* Data -> availability */}

        {activeSection === 'data-availability' && (
          <>
            <div className="full-section">
              <h2>Data Availability</h2>
              <p>Below u can check the data that has been collected by each station. 
                Note: consider migrating to Plotly</p>
              <ul> U can:
                <li>Add/remove variable from the plot</li>
                <li>Select a color/kind for each variable</li>
                <li>Pick date range</li>
                <li>Select the time resolution</li>
              </ul>
          
              <AvailabilityDashboard
                selectedStation={selectedStation}
                exportVars={exportVars}/>
            </div>
          </>
        )}

{/* Data -> download */}

        {activeSection === 'data-download' && (
          <>
            <div className="top-section">
              <div className="card-frame map-side">    
                <div className="card-header">Network Geospatial View</div>
                  <MapView setSelectedStation={setSelectedStation} />
              </div>
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
                handleDownload={handleDownload}/>
            </div>
          </>
        )}

{/* Data -> Light Pollution */}

        {activeSection === "data-lightPoll" && <LightPollution />}

{/* Data -> forecast */}

        {activeSection === 'data-forecast' && (
          <>
            <div>
              <h2>Site under construction: {activeSection}</h2>
              <p>Lorem, ipsum dolor sit amet consectetur 
              adipisicing elit. Voluptatibus doloremque ratione adipisci incidunt dicta! 
              Eveniet excepturi eius at fuga asperiores!</p>
              <button>btn</button>
            </div>
            <div className="full-section">
             <ForecastPanel />
            </div>
          </>
        )}

{/* Data -> Forest Fires */}

        {activeSection === 'data-forestFires' && (
          <>
          <div>
            <h2>Site under construction: {activeSection}</h2>
            <p>Lorem, ipsum dolor sit amet consectetur 
              adipisicing elit. Voluptatibus doloremque ratione adipisci incidunt dicta! 
              Eveniet excepturi eius at fuga asperiores!</p>
            <button>btn</button>
          </div>
          </>
        )}

{/* About -> project */}

        {activeSection === 'about-project' && (
          <div className="card-frame about-card">
            <div className="card-header">About REMCI-UV</div>
              <div className="about-content">
                <h2>REMCI-UV</h2>
                <p>
                  Red de Estaciones Meteorológicas Ciencias UV, realiza monitoreo para la 
                  comprensión de los impactos del cambio climático en la Región de Valparaíso.
                  Integrada por las estaciones <a href={ciencias_ln} target="_blank" rel="noreferrer">
                  Ciencias UV </a> (Facultad de Ciencias, Playa Ancha, Valparaíso), 
                  <a href={pocuro_ln} target="_blank" rel="noreferrer">
                  Pocuro UV </a> (Calle Larga, sector Pocuro) y <a href={lareserva_ln} target="_blank" rel="noreferrer">
                  La Reserva UV </a> (Villa Alemana).
                </p>
                <p>
                  More features coming soon...
                  </p>
              </div>
            <div className="mapview-bottom">
              <img
                src={earth}
                alt="Satellite view of the three weather stations"
                className="mapview-image"/>
            </div>
          </div>
    
        )}

{/* About -> team */}

        {activeSection === 'about-team' && (
          <>
          <div>
            <h2>Site under construction: {activeSection}</h2>
            <p>Lorem, ipsum dolor sit amet consectetur 
              adipisicing elit. Voluptatibus doloremque ratione adipisci incidunt dicta! 
              Eveniet excepturi eius at fuga asperiores!</p>
            <button>btn</button>
            <img></img>
          </div>
          </>
        )}

{/* About -> links */}

        {activeSection === 'about-links' && (
          <>
          <div>
            <h2>Site under construction: {activeSection}</h2>
            <p>Lorem, ipsum dolor sit amet consectetur 
              adipisicing elit. Voluptatibus doloremque ratione adipisci incidunt dicta! 
              Eveniet excepturi eius at fuga asperiores!</p>
            <button>btn</button>
          </div>
          </>
        )}        

{/* Close main and Footer */}

        </main>
      <Footer/>
    </div> 
  );
};

export default AWSDashboard;

