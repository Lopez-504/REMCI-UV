import { useState } from 'react';

import './sectionTabs.css'

import { NAV_ITEMS } from '../constants/sectionTabs'

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
            onMouseOver={() =>
              setOpenMenu(openMenu === item.label ? null : item.label)
            }
          >{/* took out onMouseOut */}
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