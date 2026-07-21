import logo from "/remci_logo.png"

//STATIC
import { NAV_ITEMS } from '../constants/sectionTabs'

//CSS
import './navbar.css'

const Navbar = ({ setActiveSection }) => {
  return (
    <nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img 
          src={logo} alt="Logo" 
          onClick={() => {
                    setActiveSection('landing-page');
          }}
          style={{ width: '70px', height: '64px', objectFit: 'contain' }}/>
        <h1> REMCI-UV ⛅ </h1>
      </div>

      <div style={{ display: 'flex', gap: '10px' ,alignItems: 'center'}}>
        <span>Stations Online: </span>
        <div className="status-dot"> ‎ 2 ‎ </div>
        <span> | ☁️ <strong>User</strong>: Alvy Singer</span>
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