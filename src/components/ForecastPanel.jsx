import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import MeteogramOpenMeteo from './MeteogramOpenMeteo';

import './forecastPanel.css'
import Meteogram2 from './Meteogram2';


const ForecastPanel = () => {
  return (
      <div>
        <div className="card-header">Forecast: Meteogram 3 locations</div>
        <Meteogram2/>
        <div className="card-header">Forecast: Meteogram single</div>
        <MeteogramOpenMeteo/>
      </div>
  )    
};

export default ForecastPanel;


//<ReactECharts option={option} style={{ height: '100%' }} />