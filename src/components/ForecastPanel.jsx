import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

const ForecastPanel = () => {

  // Mock forecast data (we’ll replace later)
  const forecast = useMemo(() => {
  const now = new Date();

  return Array.from({ length: 20 }, (_, i) => {
    const time = new Date(now.getTime() + i * 3600 * 1000);

    return {
      time,
      speed: 10 - Math.random() * 4,
      direction: 120 - Math.random() * 90,
      temp: 10 + Math.random() * 10,
      humidity: 20 + Math.random() * 40
    };
  });
}, []);

  const option = useMemo(() => {

    return {
      title: {
        text: '',
        left: 'center'
      },

      tooltip: {
  trigger: 'axis',
  formatter: function (params) {
    const i = params[0].dataIndex;
    const f = forecast[i];

    return `
      ${f.time.toLocaleString()}<br/>
      🌬️ Wind: ${f.speed.toFixed(1)} m/s (${f.direction.toFixed(0)}°)<br/>
      🌡️ Temp: ${f.temp.toFixed(1)} °C<br/>
      💧 RH: ${f.humidity.toFixed(0)} %
    `;
  }
},

      legend: {
  	data: ['Temperature', 'Humidity'],
  	bottom: 0
      },

      xAxis: {
        type: 'category',
        data: forecast.map(f =>
          f.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        )
      },

      yAxis: [
  	{
    	  type: 'value',
    	  name: 'Wind Speed (m/s)'
  	},
  	{
    	  type: 'value',
    	  name: 'Temp / RH',
    	  position: 'right'
  	}
	],

      series: [

  // 🌬️ WIND ARROWS (unchanged logic)
  {
    type: 'custom',

    renderItem: function (params, api) {
      const x = api.coord([api.value(0), api.value(1)]);
      const speed = api.value(1);
      const direction = api.value(2);

      const length = 20 + speed * 2;

      const angle = (direction - 90) * Math.PI / 180;

      const x2 = x[0] + length * Math.cos(angle);
      const y2 = x[1] + length * Math.sin(angle);

      const arrowSize = 6;

      const angle1 = angle + Math.PI * 0.85;
      const angle2 = angle - Math.PI * 0.85;

      const arrow1 = [
        x2 + arrowSize * Math.cos(angle1),
        y2 + arrowSize * Math.sin(angle1)
      ];

      const arrow2 = [
        x2 + arrowSize * Math.cos(angle2),
        y2 + arrowSize * Math.sin(angle2)
      ];

      return {
        type: 'group',
        children: [
          {
            type: 'line',
            shape: { x1: x[0], y1: x[1], x2, y2 },
            style: { stroke: '#04b0b3', lineWidth: 2 }
          },
          {
            type: 'line',
            shape: { x1: x2, y1: y2, x2: arrow1[0], y2: arrow1[1] },
            style: { stroke: '#04b0b3', lineWidth: 2 }
          },
          {
            type: 'line',
            shape: { x1: x2, y1: y2, x2: arrow2[0], y2: arrow2[1] },
            style: { stroke: '#04b0b3', lineWidth: 2 }
          }
        ]
      };
    },

    data: forecast.map((f, i) => [i, f.speed, f.direction])
  },

  // 🌡️ TEMPERATURE
  {
    name: 'Temperature',
    type: 'line',
    yAxisIndex: 1,
    data: forecast.map(f => f.temp),
    smooth: true
  },

  // 💧 HUMIDITY
  {
    name: 'Humidity',
    type: 'line',
    yAxisIndex: 1,
    data: forecast.map(f => f.humidity),
    smooth: true
  }

]
    };

  }, [forecast]);

  return (
    <div className="card-frame full-width-card" style={{ height: '400px' }}>
      <div className="card-header">Forecast: Wind Field</div>
      <div style={{ height: '100%' }}>
        <ReactECharts option={option} style={{ height: '100%' }} />
      </div>
    </div>
  );
};

export default ForecastPanel;
