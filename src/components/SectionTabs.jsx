import { useState } from 'react';
import { useTranslation } from "react-i18next";

//CSS
import './sectionTabs.css'

//STATIC
import { NAV_ITEMS } from '../constants/sectionTabs'

//COMPONENT
import LanguageToggle from './LanguageToggle';

const SectionTabs = ({ activeSection, setActiveSection }) => {
  const { t } = useTranslation("sections");

  const [openMenu, setOpenMenu] = useState(null);

  return (
    <>
    <div className="section-tabs" onMouseLeave={() => setOpenMenu(null)}>
      {NAV_ITEMS.map((section) => (
        <div className="tab-dropdown" key={section.labelKey}>
          <button
            className={
              section.options.some(
                option => option.key === activeSection
              )
                ? 'tab-btn active'
                : 'tab-btn'
            }
            onMouseEnter={() =>
              setOpenMenu(openMenu === section.key ? null : section.key)
            }
          >{/* took out onMouseOut, onClick and onMouseLeave */}
            {t(section.labelKey)} ⌄
          </button>


          {openMenu === section.key && (
            <div className="dropdown-menu">
              {section.options.map((option) => (
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
                  {t(option.labelKey)}
                </button>
              ))}
            </div>
          )}

        </div>
      ))}
      <span>{t("language")}: </span> <LanguageToggle/>
    </div>
    </>
  );
};

export default SectionTabs;

/*
onClick={() =>
              setOpenMenu(openMenu === item.label ? null : item.label)
            }
*/