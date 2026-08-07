import { useTranslation } from "react-i18next";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { RadioTower } from "lucide-react";
import clickSound from '../../public/chords-0236.wav'; 

//COMPONENTS
import LanguageToggle from "./LanguageToggle";

//STATIC
import { NAV_ITEMS } from '../constants/sectionTabs'
import { STATIONS } from '../constants/stations'
import logo from "/remci_logo.png"

//CSS
import './navbar.css'

const playSound = () => {
  const audio = new Audio(clickSound);
  audio.play();
};

const Navbar = ({ setActiveSection }) => {
  const { t } = useTranslation("landing");      //namespace

  const onlineStations = STATIONS.reduce(
  (count, station) => count + (station.status === "online" ? 1 : 0),
  0
  );

  const statusIcon = {
    online: "🟢",
    maintenance: "🟠",
    offline: "🔴",
  };

  const stationStatusTooltip = (
    <>
      {STATIONS.map((station) => (
        <div key={station.id}>
          {statusIcon[station.status]} <strong>{station.name}</strong>: {t(station.status)}
        </div>
      ))}
    </>
  );

  return (
    <nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img 
          src={logo} alt="Logo" 
          onClick={() => {
                    setActiveSection('landing-page');
                    playSound(); 
          }}
          style={{ width: '70px', height: '64px', objectFit: 'contain' }}/>
        <h1> REMCI-UV ⛅ </h1>
      </div>

      <div style={{ display: 'flex', gap: '10px' ,alignItems: 'center'}}>
        <span>{t("stationsOnline")}: </span>
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip id="stations-tooltip" className="dash-tooltip">
              {stationStatusTooltip}
            </Tooltip>
          }
        >
          <div className="status-dot-tooltip">
            {onlineStations}
            <span>{"\u00A0"}<RadioTower strokeWidth={1.6}/></span>
          </div>
        </OverlayTrigger>
      </div>
    </nav>
  );
};

export default Navbar;


/* No longer need a live camera
<button onClick={() => window.open('/gallery', '_blank')}>
          📷 View Live Camera
        </button>
*/

/*<span>  ☁️ <strong>User</strong>: Alvy Singer</span> */