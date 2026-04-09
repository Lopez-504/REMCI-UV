import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { VAR_LABELS } from '../constants/variables';

const ExportPanel = ({
  isOpen,
  setIsOpen,
  exportVars,
  handleCheckboxChange,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleDownload,
  stationName
}) => {

  return (
    <section style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>

      {/* HEADER */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <h4 className="section-title">Export Settings</h4>
        <span>{isOpen ? '▲ Close' : '▼ Expand'}</span>
      </div>

      {/* CONTENT */}
      {isOpen && (
        <div className="retractable-panel">

          {Object.keys(exportVars).map(key => (
            <label key={key} className="checkbox-row">
              <input
                type="checkbox"
                checked={exportVars[key]}
                onChange={() => handleCheckboxChange(key)}
              />
              {VAR_LABELS[key]}
            </label>
          ))}

          {/* DATE PICKERS */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <DatePicker selected={startDate} onChange={setStartDate} className="date-input" />
            <DatePicker selected={endDate} onChange={setEndDate} className="date-input" />
          </div>

          {/* DOWNLOAD BUTTON */}
          <button
            className="download-btn"
            onClick={() => handleDownload(stationName)}
            disabled={!Object.values(exportVars).some(v => v)}
          >
            📥 Download CSV
          </button>

        </div>
      )}

    </section>
  );
};

export default ExportPanel;
