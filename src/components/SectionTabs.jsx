import { useState } from 'react';

const NAV_ITEMS = [
  {
    label: 'Overview',
    options: [
      { key: 'overview-main', label: 'Main Overview' },
      { key: 'overview-map', label: 'Map View' }
    ]
  },
  {
    label: 'Stations',
    options: [
      { key: 'stations-gallery', label: 'Gallery' },
      { key: 'stations-windrose', label: 'Wind Rose' }
    ]
  },
  {
    label: 'Data',
    options: [
      { key: 'data-availability', label: 'Availability' },
      { key: 'data-forecast', label: 'Forecast' },
      { key: 'data-downloads', label: 'Downloads' },
      { key: 'data-lightPoll', label: 'Light Pollution' }
    ]
  },
  {
    label: 'About REMCI-UV',
    options: [
      { key: 'about-project', label: 'Project' },
      { key: 'about-team', label: 'Team' },
      { key: 'about-links', label: 'Links' }
    ]
  }
];

const SectionTabs = ({ activeSection, setActiveSection }) => {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="section-tabs">
      {NAV_ITEMS.map((item) => (
        <div className="tab-dropdown" key={item.label}>

          <button
            className="tab-btn"
            onClick={() =>
              setOpenMenu(openMenu === item.label ? null : item.label)
            }
          >
            {item.label} ▾
          </button>

          {openMenu === item.label && (
            <div className="dropdown-menu">
              {item.options.map((option) => (
                <button
                  key={option.key}
                  className={
                    activeSection === option.key
                      ? 'dropdown-item active'
                      : 'dropdown-item'
                  }
                  onClick={() => {
                    setActiveSection(option.key);
                    setOpenMenu(null);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default SectionTabs;