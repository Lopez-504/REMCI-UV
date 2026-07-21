import {React, useState} from 'react';
import "./landing.css";

import { SECTIONS } from '../constants/sectionsLanding'

export default function Landing({ activeSection, setActiveSection }) {

  return (
    <div className="landing-page">

      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>REMCI-UV</h1>
          <h2>Red de Estaciones Meteorológicas Universidad de Valparaíso</h2>
          <p>
            Real-time meteorological observations, weather forecasts,
            historical records and environmental monitoring from the
            REMCI-UV automatic weather station network.
          </p>
          <button
            className="hero-button"
            onClick={() => setActiveSection("stations-currentConditions")}
          >
            Explore Dashboard!
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
                <h2>{section.title}</h2>
                <div
                  className="landing-icon"
                  style={{ color: section.color }}
                >
                  <Icon />
                </div>
              </div>

              <p>{section.description}</p>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

                <button
                onClick={() => setActiveSection(section.key)}
                >
                Open →
                </button>
            </div>
          )  
        })}
      </section>

      {/* ABOUT */}
      <section className="about">
        <h2>About REMCI-UV</h2>
        <p>
          The <strong>REMCI-UV Dashboard</strong> is a web platform developed to visualize
          observations collected by the <strong>Red de Estaciones Meteorológicas de la Universidad de Valparaíso</strong>. The system provides real-time meteorological
          monitoring, weather forecasts, historical data visualization,
          and data export capabilities for research, education and
          operational decision-making.
        </p>
        <p>
          Its purpose is to provide researchers, students, decision makers, and the general public with intuitive access to high-quality meteorological observations through interactive visualizations and data export tools.
        </p>
      </section>
    </div>
  );
}