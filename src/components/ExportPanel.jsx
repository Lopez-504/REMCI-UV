import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//COMPONENTS
import HelpTooltip from "./HelpTooltip"

// Static data
import { VAR_LABELS } from '../constants/variables';

//CSS
import './exportPanel.css'
import DateRangePicker from './DateRangePicker';

//Translations
import { useTranslation } from "react-i18next";

const ExportPanel = ({
  isOpen,
  setIsOpen,
  exportVars,
  handleCheckboxChange,
  dateRange,
  setDateRange,
  handleDownload,
  stationName
}) => {

  const { t } = useTranslation("common");

  return (
    <section style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>

      {/* HEADER */}
      <h2>{t("exportSettings")}</h2>
  
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
              {t('variables.' + key)}
            </label>
          ))}

          {/* DATE PICKERS */}
          <div>
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
            />      
          </div>

          {/* DOWNLOAD BUTTON */}
          <button
            className="download-btn"
            onClick={() => handleDownload(stationName)}
            disabled={!Object.values(exportVars).some(v => v)}
          >
            📥 {t("download")} CSV
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