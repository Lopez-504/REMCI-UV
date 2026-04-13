import { useState } from 'react';
import { TEXT } from '../constants/text';

const Sidebar = ({
  darkMode,
  setDarkMode,
  language,
  setLanguage,
  sidebarOpen,
  setSidebarOpen
}) => {

  const t = TEXT[language];

  return (
    <div className={sidebarOpen ? "sidebar open" : "sidebar collapsed"}>

      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? '⬅' : '➡'}
      </button>

      {sidebarOpen && (
  <>
    <h3>Settings</h3>

    <div className="sidebar-section">
      <label>Theme</label>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>

    <div className="sidebar-section">
      <label>Language</label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  </>
)}

    </div>
  );
};

export default Sidebar;