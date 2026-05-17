import React from 'react';

//CSS
import './maintenance.css'

const checklist = [
  'Inspect solar panel and battery voltage',
  'Clean radiation shield and temperature sensor',
  'Verify rain gauge is free of debris',
  'Check anemometer rotation and wind vane alignment',
  'Inspect cables and connectors for corrosion',
  'Confirm data logger communication',
  'Validate timestamp synchronization',
  'Check station leveling and mounting stability',
  'Take maintenance photographs',
  'Document observations and replacements',
];

import stationDiagram from '/images/estacionUV.png';

function Maintenance () {
  return (
        <section className="maintenance-container">
      
      <div className="maintenance-header">
        <h1>AWS Maintenance</h1>
        <p>
          Routine preventive maintenance for REMCI-UV automatic weather stations.
          Regular inspections help ensure reliable meteorological observations,
          sensor longevity, and uninterrupted telemetry.
        </p>
      </div>

      <div className="maintenance-grid">

        {/* Left Panel */}
        <div className="maintenance-card diagram-card">
          <h2>Station Overview</h2>

          <div className="diagram-wrapper">
            <img
              src={stationDiagram}
              alt="Automatic Weather Station Diagram"
              className="station-diagram"
            />
          </div>

          <div className="station-info">
            <div>
              <span className="label">Station Type</span>
              <span className="value">Automatic Weather Station</span>
            </div>

            <div>
              <span className="label">Power System</span>
              <span className="value">Solar + Battery Backup</span>
            </div>

            <div>
              <span className="label">Telemetry</span>
              <span className="value">4G / Wi-Fi / LoRa</span>
            </div>

            <div>
              <span className="label">Maintenance Interval</span>
              <span className="value">Every 30 days</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="maintenance-card checklist-card">
          <h2>Maintenance Checklist</h2>

          <div className="checklist">
            {checklist.map((item, index) => (
              <label key={index} className="check-item">
                <input type="checkbox" />
                <span>{item}</span>
              </label>
            ))}
          </div>

          <button className="maintenance-btn">
            Save Maintenance Report
          </button>
        </div>

      </div>
    </section>
  )
}

export default Maintenance