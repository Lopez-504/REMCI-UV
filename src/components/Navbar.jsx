import logo from "/remci_logo.png"

import './navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img src={logo} alt="Logo" style={{ width: '70px', height: '70px', objectFit: 'contain' }}/>
        <h1> METEO-HUB PRO   ⛅ </h1>
      </div>

      <div style={{ display: 'flex', gap: '10px' ,alignItems: 'center'}}>
        <span>Stations Online: </span>
        <div className="status-dot"> ‎ 3 ‎ </div>
        <span> | ☁️ <strong>User</strong>: Jorge</span>
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