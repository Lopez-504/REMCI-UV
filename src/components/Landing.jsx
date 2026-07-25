import {React, useState} from 'react';
import "./landing.css";

//STATIC
import { SECTIONS } from '../constants/sectionsLanding'

//Translations
import { useTranslation } from "react-i18next";

export default function Landing({ activeSection, setActiveSection }) {

   const { t } = useTranslation("landing");

  return (
    <div className="landing-page">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>REMCI-UV</h1>
          <h2>Red de Estaciones Meteorológicas Universidad de Valparaíso</h2>
          <p>
            { t ("landingDescription")}
          </p>
          <button
            className="hero-button"
            onClick={() => setActiveSection("stations-currentConditions")}
          >
            {t("explore")}
          </button>
        </div>
      </section>


      {/* SECTION GRID */}
      <section className="landing-grid">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <div
              key={section.title}
              className="landing-card"
            >
              <div className='titleAndIcon'>  
                <h2>{t(`cards.${section.id}.title`)}</h2>
                <div
                  className="landing-icon"
                  style={{ color: section.color }}
                >
                  <Icon />
                </div>
              </div>

              <p>{t(`cards.${section.id}.description`)}</p>
              <ul>
                {[0,1,2,3].map((item) => (
                  <li key={item}>{t(`cards.${section.id}.items.${item}`)}</li>
                ))}
              </ul>

                <button
                onClick={() => setActiveSection(section.key)}
                >
                {t('open')} →
                </button>
            </div>
          )  
        })}
      </section>

      {/* ABOUT */}
      <section className="about">
        <h2>{t("about0")} REMCI-UV</h2>
        <p>
          { t ("about1")}
        </p>
        <p>
          { t ("about2")}
        </p>
      </section>
    </div>
  );
}