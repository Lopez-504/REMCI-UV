//COMPONENTS
import HelpTooltip from "./HelpTooltip"
import ExportPanel from './ExportPanel';

//Translations
import { useTranslation } from "react-i18next";

//CSS
import './analyticsPanel.css'

const AnalyticsPanel = ({
  selectedStation,
  isExportOpen,
  setIsExportOpen,
  exportVars,
  handleCheckboxChange,
  dateRange,
  setDateRange,
  handleDownload
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="analytics-card-frame">
      <div className="card-header">
        <span>
          <HelpTooltip helpKey={t("helpSelectStation")}/>
        </span>
        {t("stationAnalytics")}: {selectedStation.name}
      </div>
      <div style={{ padding: '4px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'hidden' }}>

        {/* METADATA  */}
        <h2>{t("stationSpecs")}</h2>
        <section className="info-grid">
          <div className="info-item">
            <span>{t("elevation")}</span>
            <div className='pill'>{selectedStation.elev} {t("masl")}</div>
          </div>

          <div className="info-item">
            <span>{t("coords")}</span>
            <div className='pill'>{selectedStation.lat.toFixed(3)}, {selectedStation.lng.toFixed(3)}</div>
          </div>

          <div className="info-item">
            <span>{t("status")}</span>
            <div className='pill' 
                 style={{ color: selectedStation.status==='online' ? '#1aff00' : selectedStation.status==='offline' ? '#d80e0e' : '#8a6d00', 
                          fontWeight: 'bold', 
                          textTransform: 'uppercase',
                          fontSize: '1rem' 
                          }}>
              {t(selectedStation.status)}
            </div>
          </div>

          <div className="info-item">
            <span>{t('brandModel')}</span>
            <div className='pill'>{selectedStation.brand}</div>
          </div>
        </section>

        {/* EXPORT PANEL */}
        <ExportPanel
          isOpen={isExportOpen}
          setIsOpen={setIsExportOpen}
          exportVars={exportVars}
          handleCheckboxChange={handleCheckboxChange}
          dateRange={dateRange}                                   //new date system
          setDateRange={setDateRange}                             //new date system
          handleDownload={handleDownload}
          stationName={selectedStation.name}
        />
      </div>
    </div>
  );
};

export default AnalyticsPanel;