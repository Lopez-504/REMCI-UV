import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Static data
import { VAR_LABELS } from '../constants/variables';

//CSS
import './exportPanel.css'
import MyDateRangePicker from './DateRangePicker';


const ExportPanel = ({
  isOpen,
  setIsOpen,
  exportVars,
  handleCheckboxChange,
  handleDownload,
  stationName
}) => {

  return (
    <section style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>

      {/* HEADER */}
      <div>
        <h2>Export Settings</h2>
      </div>

      {/* took out expand button*/}

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
          <div>
            <MyDateRangePicker/>      
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




/* Old date picker

<div style={{ display: 'flex', gap: '10px' }}>
  <DatePicker selected={startDate} onChange={setStartDate} className="date-input" />
  <DatePicker selected={endDate} onChange={setEndDate} className="date-input" />
</div>


startDate,
  endDate,
  setStartDate,
  setEndDate,

*/

/*

<div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <span>{isOpen ? '▲' : '▼'}</span>   
      </div>
*/