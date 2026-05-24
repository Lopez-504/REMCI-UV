import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import Meteogram from './Meteogram';

//CSS
import './forecastPanel.css'

const ForecastPanel = () => {
  return (
    <>  
      <div className="card-header">Forecast: Meteogram 3 locations</div>
      <Meteogram/>
    </>
  )    
};

export default ForecastPanel;


//<ReactECharts option={option} style={{ height: '100%' }} />

//<div className="card-header">Forecast: Meteogram single</div>
//      <MeteogramOpenMeteo/>