import "./simulations.css"

export default function Simulations() {
  return (
    <>
      <div>
        <iframe
            src="../src/constants/ideal-gas-simulator.html"
            title="Ideal Gas simulation"
            className="simulation-frame"
        />
        <iframe
            src="../src/constants/atmospheric_cloud_simulator.html"
            title="Cloud Formation simulation"
            className="simulation-frame"
        />
         <iframe
            src="../src/constants/light_pollution_atmospheric_simulator.html"
            title="Light Pollution simulation"
            className="simulation-frame"
        />
      </div>
    </>
  );
};