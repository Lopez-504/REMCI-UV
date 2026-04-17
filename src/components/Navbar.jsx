import logo from "/remci_logo.png"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img src={logo} alt="Logo" style={{ width: '70px', height: '70px', objectFit: 'contain' }}/>
        <h2> METEO-HUB PRO ⛅ </h2>
      </div>

      <div style={{ display: 'flex', gap: '10px' ,alignItems: 'center'}}>
        <span>Stations Online: </span>
        <div className="status-dot"> 3 </div>
        <span> | ☁️ User: Jorge</span>
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