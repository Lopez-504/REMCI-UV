import ChartPanel from './ChartPanel';
import ExportPanel from './ExportPanel';

const AnalyticsPanel = ({
  selectedStation,
  plotData,
  isExportOpen,
  setIsExportOpen,
  exportVars,
  handleCheckboxChange,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleDownload
}) => {

  return (
    <div className="card-frame plot-side">

      <div className="card-header">
        Station Analytics: {selectedStation.name}
      </div>

      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>

        {/* METADATA  */}
        <section className="info-grid">
          <div className="info-item">
            <span>ID</span>
            <div>AWS-{selectedStation.id.toString().padStart(3, '0')}</div>
          </div>

          <div className="info-item">
            <span>Coords</span>
            <div>{selectedStation.lat.toFixed(3)}, {selectedStation.lng.toFixed(3)}</div>
          </div>

          <div className="info-item">
            <span>Status</span>
            <div style={{ color: '#27ae60', fontWeight: 'bold' }}>Active</div>
          </div>

          <div className="info-item">
            <span>Model</span>
            <div>DAVIS - Vantage PRO2</div>
          </div>
        </section>

        {/* EXPORT PANEL */}
        <ExportPanel
          isOpen={isExportOpen}
          setIsOpen={setIsExportOpen}
          exportVars={exportVars}
          handleCheckboxChange={handleCheckboxChange}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleDownload={handleDownload}
          stationName={selectedStation.name}
        />

        {/* CHART */}
        

      </div>
    </div>
  );
};

export default AnalyticsPanel;


/*
No longer need this chart

<section style={{ flexGrow: 1, minHeight: '300px' }}>
          <ChartPanel plotData={plotData} />
        </section>
*/
