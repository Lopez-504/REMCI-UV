import ExportPanel from './ExportPanel';

//CSS
import './analyticsPanel.css'

const AnalyticsPanel = ({
  selectedStation,
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
    <div className="card-frame">
      <div className="card-header">
        Station Analytics: {selectedStation.name}
      </div>
      
      <p>(Click map to change stations!)</p>

      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>

        {/* METADATA  */}
        <section className="info-grid">
          <div className="info-item">
            <span>ID</span>
            <div className='pill'>AWS-{selectedStation.id.toString().padStart(3, '0')}</div>
          </div>

          <div className="info-item">
            <span>Coords</span>
            <div className='pill'>{selectedStation.lat.toFixed(3)}, {selectedStation.lng.toFixed(3)}</div>
          </div>

          <div className="info-item">
            <span>Status</span>
            <div className='pill' 
                 style={{ color: selectedStation.status==='ACTIVE' ? '#1aff00' : '#d80e0e', 
                          fontWeight: 'bold', 
                          textTransform: 'uppercase' 
                          }}>
              {selectedStation.status}
            </div>
          </div>

          <div className="info-item">
            <span>Brand/Model</span>
            <div className='pill'>{selectedStation.brand}</div>
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
      </div>
    </div>
  );
};

export default AnalyticsPanel;