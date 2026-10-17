import "./simulations.css"
import { simLinks } from "../constants/simulationsLinks";

export default function Simulations() {
  return (
    <>
      <div className="simulations-links">
        <h1>Simulators (by Gemini 4 Argon)</h1>
        {simLinks.map(sim => (
          <a key={sim.key} href={sim.link} target="_blank" rel="noopener noreferrer">
            <div className="sim-link">
              <h3>{sim.name} {sim.icon}</h3>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};