import { useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import DatePicker from 'react-datepicker';
import { STATIONS } from '../constants/stations';

const WindRosePanel = ({ selectedStation, setSelectedStation }) => {

  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d;
  });

  const [endDate, setEndDate] = useState(new Date());

  // MOCK wind data
  const windData = useMemo(() => {
    const directions = ['N','NE','E','SE','S','SW','W','NW'];

    return directions.map(dir => ({
      direction: dir,
      value: Math.random() * 10
    }));
  }, [startDate, endDate, selectedStation]);

  const option = useMemo(() => ({
  title: {
    text: 'Wind Rose',
    left: 'center',
    textStyle: { fontSize: 14 }
  },

  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} m/s'
  },

  angleAxis: {
    type: 'category',
    data: windData.map(d => d.direction),
    axisLine: { lineStyle: { color: '#aaa' } },
    axisLabel: { fontSize: 11 }
  },

  radiusAxis: {
    axisLine: { show: false },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        opacity: 0.4
      }
    }
  },

  polar: {},

  series: [
    {
      type: 'bar',
      data: windData.map(d => d.value),
      coordinateSystem: 'polar',
      roundCap: true,
      itemStyle: {
        color: '#3498db'
      }
    }
  ]
}), [windData]);

  return (
    <div className="card-frame windrose-card">

  <div className="card-header">Wind Analysis</div>

  <div className="windrose-container">

    {/* CHART */}
    <div className="windrose-chart">
      <ReactECharts option={option} style={{ height: '100%' }} />
    </div>

    {/* CONTROLS */}
    <div className="windrose-controls">

      <label>Station</label>
      <select
        value={selectedStation.id}
        onChange={(e) =>
          setSelectedStation(
            STATIONS.find(s => s.id === Number(e.target.value))
          )
        }
      >
        {STATIONS.map(st => (
          <option key={st.id} value={st.id}>{st.name}</option>
        ))}
      </select>

      <label>Date Range</label>
      <DatePicker selected={startDate} onChange={setStartDate} />
      <DatePicker selected={endDate} onChange={setEndDate} />

    </div>

  </div>
</div>
  );
};

export default WindRosePanel;
