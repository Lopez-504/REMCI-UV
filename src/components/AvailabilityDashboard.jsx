import { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import DatePicker from 'react-datepicker';
import { STATIONS } from '../constants/stations';
import { VAR_LABELS } from '../constants/variables';

const AvailabilityDashboard = ({ selectedStation: initialStation }) => {

  const [selectedStation, setSelectedStation] = useState(initialStation || STATIONS[0]);
  const [selectedVars, setSelectedVars] = useState([
  { var: 'temp', color: '#3498db', type: 'line' }]);
  const [chartType, setChartType] = useState('line');

  // Add function
  const addVariable = () => {
  setSelectedVars(prev => [
    ...prev,
    { var: 'humidity', color: '#e74c3c', type: 'line' }]);};
    
  // Remove function
  const removeVariable = (index) => {
  setSelectedVars(prev => prev.filter((_, i) => i !== index));};  

    // the remove function is only working on the buttons, 
    //it's not actually removing anything from the plot

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
      data: bins.map(b => b.label),
      name: "Time",
    },
    yAxis: { type: 'value', max: 100 ,
      axisLabel: {
      show: true,           
      color: '#3f453f',        // Text color
      fontSize: 18,         
      rotate: 0,          
      margin: 10           // Distance between the label and the axis line
      },
    },
    series: selectedVars.map((item, i) => ({
      show: true,
      name: VAR_LABELS[item.var],     //not showing
      type: item.type,
      data: data, // later we'll replace with real data per var
      smooth: item.type === 'line',
      itemStyle: { color: item.color },
      lineStyle: {
        color: item.color,
        type: 'solid'
      },
   })),

    toolbox: {
        feature: {
        dataZoom: {
        yAxisIndex: 'none'
        },
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 20
    },
    {
      start: 0,
      end: 20
    }
  ],
  
  };

}, [chartType, selectedVars, data, bins]);

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
          <label>Variables</label>

{selectedVars.map((item, i) => (

  <div key={i} className="var-row">

    {/* VARIABLE SELECT */}
    <select
      value={item.var}
      onChange={(e) => {
        const newVars = [...selectedVars];
        newVars[i].var = e.target.value;
        setSelectedVars(newVars);
      }}
    >
      {Object.keys(VAR_LABELS).map(v => (
        <option key={v} value={v}>{VAR_LABELS[v]}</option>
      ))}
    </select>

    {/* COLOR */}
    <input
      type="color"
      value={item.color}
      onChange={(e) => {
        const newVars = [...selectedVars];
        newVars[i].color = e.target.value;
        setSelectedVars(newVars);
      }}
    />

    {/* TYPE */}
    <select
      value={item.type}
      onChange={(e) => {
        const newVars = [...selectedVars];
        newVars[i].type = e.target.value;
        setSelectedVars(newVars);
      }}
    >
      <option value="line">Line</option>
      <option value="bar">Bar</option>
    </select>

    {/* REMOVE */}
    <button onClick={() => removeVariable(i)}>✖</button>

  </div>

))}

<button onClick={addVariable}>+ Add Variable</button>

          {/* Dates  Note: onChangeRaw disables typing*/}
          <label>Date Range</label>
          <DatePicker selected={startDate} onChange={setStartDate} onChangeRaw={(e) => e.preventDefault()} /> 
          <DatePicker selected={endDate} onChange={setEndDate} onChangeRaw={(e) => e.preventDefault()}/>

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

        </div>
      </div>
    </div>
  );
};

export default AvailabilityDashboard;

/* redundant

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

*/


/* xaxis ticklabel 
axisLabel: {
      show: true,           
      color: '#313731',        // Text color
      fontSize: 14,         
      rotate: 0,          
      margin: 8           // Distance between the label and the axis line
      },
*/