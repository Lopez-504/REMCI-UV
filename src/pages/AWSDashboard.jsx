import { useState, useEffect } from 'react';

// --   Components  --  //
import Navbar from '../components/Navbar';
import SectionTabs from '../components/SectionTabs';
import OverviewMap from '../components/OverviewMap';
import MapView from '../components/MapView';
import AnalyticsPanel from '../components/AnalyticsPanel';
import AvailabilityDashboard from '../components/AvailabilityDashboard';
import AvailabilityPrologue from '../components/AvailabilityPrologue';
import ForecastPanel from '../components/ForecastPanel';
import StationGallery from '../components/StationGallery';
import Maintenance from '../components/Maintenance'
import CurrentConditions from '../components/CurrentConditions';
import Footer from '../components/Footer';
import LightPollution from "../components/LightPollution";
import About from '../components/About';
import LanguageToggle from '../components/LanguageToggle';
import HelpTooltip from '../components/HelpTooltip';

// --   Constants  --  //
import { RAW_WEATHER_DATA } from '../data/weatherData';
import { STATIONS } from '../constants/stations';
import team from '../../public/images/construction.jpg'
import cluodgif from '../../public/images/weatherconditions.gif'

// --  CSS  -- //
import './awsDashboard.css'
import HistoricData from '../components/HistoricData';
import Landing from '../components/Landing';

//Translations
import { useTranslation } from "react-i18next";
import GoesSatellite from '../components/GoesSatellite';

// --  Actual Component  -- //
const AWSDashboard = () => {
  const { t } = useTranslation("common");

  //States
  const [exportData] = useState(RAW_WEATHER_DATA);

  //Section Tab
  const getInitialSection = () => {
    return window.location.hash.replace('#', '') || 'landing-page'   //overview-main
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

  // Smooth scrollbar
  useEffect(() => {
      window.scrollTo({
          top: 0,
          behavior: "smooth",
      });
  }, [activeSection]);

  //const [activeSection, setActiveSection] = useState('overview-main');   //starts at overview-main
  const [selectedStation, setSelectedStation] = useState(STATIONS[0]);

  //- Exports
  const [isExportOpen, setIsExportOpen] = useState(true);     // starts opened
  const [exportVars, setExportVars] = useState({
    temp: true,
    humidity: true,
    windSpeed: false,
    windDir: false,
    pressure: false,
    windGust: false,
    solarRad: false,
    cumulativeRainfall: false
    });

  //Export dates   
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  //**for debug***
  useEffect(() => {
    if (!startDate || !endDate) return;
    
    //console.log(startDate instanceof Date);            // useful debug line

    const startStr = startDate;               //no additional formatting needed
    const endStr = endDate;

    console.log(startStr,'to',endStr);
  }, [dateRange]);


  const handleCheckboxChange = (varName) => {
    setExportVars(prev => ({
      ...prev,
      [varName]: !prev[varName]
    }));
  };

  //Donwload
  const handleDownload = (stationName) => {
    
    // 1st: warning for date and number of variables 
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

    // 2nd: Build filtered data
    const filteredData = exportData.map(entry => {
      const obj = { time: entry.time };

      selectedKeys.forEach(key => {
        if (entry[key] !== undefined) {
          obj[key] = entry[key];
        }
      });

      return obj;
    });

    // 3rd Convert to CSV
    const headers = ["time", ...selectedKeys];

    const csvRows = [
      headers.join(","), // header row
      ...filteredData.map(row =>
        headers.map(h => row[h] ?? "").join(",")
      )
    ];

    const csvString = csvRows.join("\n");

    // 4th Trigger download
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
      <Navbar 
        setActiveSection={setActiveSection}
      />        
      <SectionTabs
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main content */}
      <main id='main' className="main-content">

{/* Overview -> Landing page */}

        {activeSection === 'landing-page' && (
          <>
            <Landing setActiveSection={setActiveSection}/>
          </>
        )}

{/* Overview -> map */}

        {activeSection === 'overview-map' && (
          <>
          <OverviewMap />
          </>
        )}

{/* Stations -> gallery section */}

        {activeSection === 'stations-gallery' && (
          <>
            <div id='gallery'>
              <StationGallery />
            </div>
          </>
        )}

{/* Stations -> current conditions */}
        {activeSection === 'stations-currentConditions' && (
          <CurrentConditions/>
        )}

{/* Stations -> Maintenance */}
        {activeSection === 'stations-maintenance' && (
          <Maintenance/>
        )}

{/* Data -> availability */}

        {activeSection === 'data-availability' && (
          <>
            {/*<AvailabilityPrologue/>*/}
            <AvailabilityDashboard
                selectedStation={selectedStation}
                exportVars={exportVars}
            />
          </>
        )}

{/* Data -> download */}

        {activeSection === 'data-download' && (
          <>
            <div id='downloads' className="top-section">
              <div className="card-frame map-side">    
                <div className="card-header">
                  {t("geoView")}
                  <span>
                    <HelpTooltip helpKey={t("helpMapElev")} placement='right'/>
                  </span>
                </div>
                <MapView setSelectedStation={setSelectedStation} />
              </div>
              <AnalyticsPanel
                selectedStation={selectedStation}
                exportData={exportData}
                isExportOpen={isExportOpen}
                setIsExportOpen={setIsExportOpen}
                exportVars={exportVars}
                handleCheckboxChange={handleCheckboxChange}
                dateRange={dateRange}                                   //new date system
                setDateRange={setDateRange}                             //new date system
                handleDownload={handleDownload}/>
            </div>
          </>
        )}

{/* Data -> Light Pollution */}

        {activeSection === "data-lightPoll" && (
          <> 
            <LightPollution />
          </>
        )}    

{/* Data -> forecast */}

        {activeSection === 'data-forecast' && (
          <>
             <ForecastPanel />
          </>
        )}

{/* Data -> historic */}

        {activeSection === 'data-historic' && (
          <>
             <HistoricData />
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
          </div>
          </>
        )}

{/* Data -> GOES */}

{activeSection === 'data-satellite' && (
          <>
             <GoesSatellite/>
          </>
        )}

{/* About -> project */}

        {activeSection === 'about-project' && (
          <>
            <About/>
          </>
        )}

{/* About -> team */}

        {activeSection === 'about-team' && (
          <>
          <div className='under-construction'>
            <h2>Site under construction: {activeSection}</h2>
            <p>Lorem, ipsum dolor sit amet consectetur 
              adipisicing elit. Voluptatibus doloremque ratione adipisci incidunt dicta! 
              Eveniet excepturi eius at fuga asperiores!</p>
            <img src={team} alt="construction" width={'400px'}/>
          </div>
          </>
        )}

{/* About -> links */}

        {activeSection === 'about-links' && (
          <>
          <div className='under-construction'>
            <h2>Site under construction: {activeSection}</h2>
            <p>Lorem, ipsum dolor sit amet consectetur 
              adipisicing elit. Voluptatibus doloremque ratione adipisci incidunt dicta! 
              Eveniet excepturi eius at fuga asperiores!</p>
            <img src={team} alt="construction" width={'400px'}/>
          </div>
          </>
        )}        

{/* Close main and Footer */}

        </main>
      <Footer
        setActiveSection={setActiveSection}
      />
    </div> 
  );
};

export default AWSDashboard;



/*

Old date system:

const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(new Date());

//analytics panel props
startDate={startDate}
endDate={endDate}
setStartDate={setStartDate}
setEndDate={setEndDate}

---

Current condition (OLD) section:

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