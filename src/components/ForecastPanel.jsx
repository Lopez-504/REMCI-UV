import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import Meteogram from './Meteogram';

//Translations
import { useTranslation } from "react-i18next";

//CSS
import './forecastPanel.css'

const ForecastPanel = () => {
  const { t } = useTranslation("common");
  
  return (
    <>  
      <div className="card-header">{t("forecast")}</div>
      <Meteogram/>
    </>
  )    
};

export default ForecastPanel;


//<ReactECharts option={option} style={{ height: '100%' }} />

//<div className="card-header">Forecast: Meteogram single</div>
//      <MeteogramOpenMeteo/>