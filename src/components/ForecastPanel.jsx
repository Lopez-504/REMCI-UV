import Meteogram from './Meteogram';
import WeatherSummaryCard from './WeatherSummaryCard';

//Translations
import { useTranslation } from "react-i18next";

//CSS
import './forecastPanel.css'

const ForecastPanel = ({ stationId, setStationId }) => {
  const { t } = useTranslation("common");
  
  return (
    <>  
      <div className="card-header">
        {t("forecast")}
      </div>
      <WeatherSummaryCard 
        stationId={stationId} 
        onStationChange={setStationId}
      />
      <Meteogram/>
    </>
  )    
};

export default ForecastPanel;


//<ReactECharts option={option} style={{ height: '100%' }} />

//<div className="card-header">Forecast: Meteogram single</div>
//      <MeteogramOpenMeteo/>