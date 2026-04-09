import { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import DatePicker from 'react-datepicker';
import { STATIONS } from '../constants/stations';
import { VAR_LABELS } from '../constants/variables';

const AvailabilityDashboard = ({ selectedStation: initialStation }) => {

  const [selectedStation, setSelectedStation] = useState(initialStation || STATIONS[0]);
  const [selectedVar, setSelectedVar] = useState(['temp']);
  const [chartType, setChartType] = useState('line');

  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 14);
    return d;
  });
  
  const [endDate, setEndDate] = useState(new Date());

  const [frequency, setFrequency] = useState('1d');

  const FREQUENCY_MS = {
    '1h': 1000 * 60 * 60,
    '6h': 1000 * 60 * 60 * 6,
    '12h': 1000 * 60 * 60 * 12,
    '1d': 1000 * 60 * 60 * 24,
    '1w': 1000 * 60 * 60 * 24 * 7,
    '1m': 1000 * 60 * 60 * 24 * 30,
    '1y': 1000 * 60 * 60 * 24 * 365
  };

  // Compute bin labels
  const bins = useMemo(() => {

  const totalMs = endDate - startDate;
  if (totalMs <= 0) return [];

  const step = FREQUENCY_MS[frequency];
  const result = [];

  let current = new Date(startDate);

  while (current < endDate) {
    const start = new Date(current);
    const end = new Date(current.getTime() + step);

    const mid = new Date((start.getTime() + end.getTime()) / 2);

    result.push({
      label: mid.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short'
      }),
      start,
      end
    });

    current = end;
  }

  return result;

}, [startDate, endDate, frequency]);


  // SAFE MOCK DATA
  const data = useMemo(() => {
  return bins.map(() => 100 - Math.random() * 20);}, [bins]);

  const options = useMemo(() => {

  if (chartType === 'pie') {
    return {
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: '60%',
        data: data.map((d, i) => ({
          value: d,
          name: `Bin ${i+1}`
        }))
      }]
    };
  }

  return {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const i = params[0].dataIndex;
        const bin = bins[i];

        const formatFull = (d) => d.toLocaleString();

        let text = `${formatFull(bin.start)} → ${formatFull(bin.end)}<br/>`;

        params.forEach(p => {
        text += `${p.marker} ${p.seriesName}: ${p.value.toFixed(1)}%<br/>`;
      });

      return text;
    }
  },
    xAxis: {
      type: 'category',
      data: bins.map(b => b.label)
    },
    yAxis: { type: 'value', max: 100 },
    series: [{
      name: selectedVar,
      type: chartType,
      data: data,
      smooth: chartType === 'line'
    }]
  };

}, [chartType, selectedVar, data, bins]);

  return (
    <div className="card-frame availability-section">

      <div className="card-header">
        Data Availability: <span class="highlight">{selectedStation.name}</span>
      </div>

      <div className="availability-content">

        {/* LEFT: CHART */}
        <div className="availability-chart">
          <ReactECharts option={options} style={{ height: '100%' }} />
        </div>

        {/* RIGHT: CONTROLS */}
        <div className="availability-controls">

          {/*<h4>Controls</h4>*/}

          {/* Station */}
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

          {/* Variable */}
          <label>Variable</label>
          <select
            value={selectedVar}
            onChange={(e) => setSelectedVar(e.target.value)}
          >
            {Object.keys(VAR_LABELS).map(v => (
              <option key={v} value={v}>{VAR_LABELS[v]}</option>
            ))}
          </select>

          {/* Dates */}
          <label>Date Range</label>
          <DatePicker selected={startDate} onChange={setStartDate} />
          <DatePicker selected={endDate} onChange={setEndDate} />

          {/* Resolution */}
          <label>Resolution</label>
	  <select
    	  value={frequency}
          onChange={(e) => setFrequency(e.target.value)}>
  		<option value="1h">1 Hour</option>
  		<option value="6h">6 Hours</option>
  		<option value="12h">12 Hours</option>
  		<option value="1d">1 Day</option>
  		<option value="1w">1 Week</option>
  		<option value="1m">1 Month</option>
  		<option value="1y">1 Year</option>
	  </select>

          {/* Chart Type */}
          <label>Chart Type</label>
          <div className="chart-type-buttons">
            {['line', 'bar', 'pie'].map(type => (
              <button
                key={type}
                className={chartType === type ? 'active-btn' : ''}
                onClick={() => setChartType(type)}
              >
                {type}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AvailabilityDashboard;
