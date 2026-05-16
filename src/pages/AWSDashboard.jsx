import { useState, useEffect } from 'react';
import { RAW_WEATHER_DATA } from '../data/weatherData';

// --   Components  --  //
import Navbar from '../components/Navbar';
import OverviewMap from '../components/OverviewMap';
import MapView from '../components/MapView';
import AnalyticsPanel from '../components/AnalyticsPanel';
import AvailabilityDashboard from '../components/AvailabilityDashboard';
import ForecastPanel from '../components/ForecastPanel';
import WindRosePanel from '../components/WindRosePanel';
import StationGallery from '../components/StationGallery';
import CurrentConditions from '../components/CurrentConditions';
import SectionTabs from '../components/SectionTabs';
import Footer from '../components/Footer';
import LightPollution from "../components/LightPollution";
import About from '../components/About';

// --   Constants  --  //
import { STATIONS } from '../constants/stations';

// --  CSS  -- //
import './awsDashboard.css'

// -- links -- //
const ciencias_ln = "https://www.licor.cloud/dashboards/public/edb4ddea-8f4d-4401-8479-1535407cc17a/false?filters={%22davra-timeselector%22:{%22type%22:%22relative%22,%22unit%22:%22minutes%22,%22value%22:30,%22live%22:false}}"
const lareserva_ln = "https://www.weatherlink.com/embeddablePage/show/745c3c317c794f5a81f5a777bde785b5/summary"
const pocuro_ln = "https://www.licor.cloud/dashboards/public/f2e63989-d622-4d4a-95c3-6708d4ef080b/true?filters={%22davra-timeselector%22:{%22type%22:%22relative%22,%22unit%22:%22minutes%22,%22value%22:30,%22live%22:true}}"


// --  Component  -- //
const AWSDashboard = () => {

  //States
  const [plotData] = useState(RAW_WEATHER_DATA);

  //Section Tab
  const getInitialSection = () => {
    return window.location.hash.replace('#', '') || 'overview-main'
  }

  // hash fragments + active sections
  const [activeSection, setActiveSection] = useState(getInitialSection)   
  
  // Sync URL with active-section changes
  useEffect(() => {
     window.location.hash = activeSection
  }, [activeSection])

  // Browser back and forth buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')

      if (hash) {
        setActiveSection(hash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
     }
  }, [])

  // ** hash fragment above **  ///

  //const [activeSection, setActiveSection] = useState('overview-main');   //starts at overview-main
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
    <div id='#' className="dashboard-container">
     
     {/* Navbar */}
      <Navbar />
      <SectionTabs
        activeSection={activeSection}
        setActiveSection={setActiveSection}/>

      {/* Main content */}
      <main id='main' className="main-content">

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
          <OverviewMap setSelectedStation={setSelectedStation} />
          </>
        )}

{/* Stations -> gallery section */}

        {activeSection === 'stations-gallery' && (
          <>
            <div id='gallery'>
              <StationGallery selectedStation={selectedStation} setSelectedStation={setSelectedStation}/>
            </div>
          </>
        )}

{/* Stations -> current conditions */}
{/*After refactor, replace this section with: Current conditions (see components)*/}
        {activeSection === 'stations-currentCond' && (
          <CurrentConditions/>
        )}

{/* Data -> availability */}

        {activeSection === 'data-availability' && (
          <>
            <div id='availability' className="full-section">
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
            <div id='downloads' className="top-section">
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
             <ForecastPanel />
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

        {activeSection === 'about-project' && <About/>}

{/* About -> team */}

        {activeSection === 'about-team' && (
          <>
          <div className='under-construction'>
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



/*

Current condition section:

<>
            <div className="dual-section">
              <h2>Site under construction...</h2>
              <ul>
                <li>
                  <a href={ciencias_ln} target="_blank" rel="noreferrer">
                  Ciencias UV </a> (Facultad de Ciencias, Playa Ancha, Valparaíso) 
                   
                </li>
                <li>
                  <a href={pocuro_ln} target="_blank" rel="noreferrer">
                  Pocuro UV </a> (Calle Larga, sector Pocuro)
                </li>
                <li>
                  <a href={lareserva_ln} target="_blank" rel="noreferrer">
                  La Reserva UV </a> (Villa Alemana)
                </li>
              </ul>
              <WindRosePanel
                selectedStation={selectedStation}
                setSelectedStation={setSelectedStation}/>
            </div>
          </>

*/