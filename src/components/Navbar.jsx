const Navbar = () => {
  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ width: '30px', height: '30px', backgroundColor: '#3498db', borderRadius: '6px' }}></div>
        <h2>METEO-HUB PRO</h2>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <div className="status-dot"></div>
        <span>3 Stations Online</span>

        <button onClick={() => window.open('/gallery', '_blank')}>
          📷 View Live Camera
        </button>

        <span>| User: Jorge</span>
      </div>
    </nav>
  );
};

export default Navbar;
