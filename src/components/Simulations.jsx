import "./simulations.css";
import { simLinks } from "../constants/simulationsLinks";

export default function Simulations() {
  return (
    <section className="simulations-container">
      <div className="simulations-header">
        <h1>Physics Simulators</h1>
        <p className="subtitle">Interactive physical and atmospheric models</p>
      </div>

      <div className="simulations-grid">
        {simLinks.map((sim) => (
          <div key={sim.key} className="sim-card">
            <div className="sim-card-content">
              {/*<span className="sim-icon">{sim.icon}</span>*/}
              <h3>{sim.name} {sim.icon}</h3>
              <p>{sim.description}</p>
            </div>
            <div className="sim-card-footer">
              <a 
                href={sim.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="sim-btn"
              >
                Launch Simulator
                <svg className="arrow-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}