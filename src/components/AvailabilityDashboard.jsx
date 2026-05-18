import { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import DatePicker from 'react-datepicker';

//STATIC
import { STATIONS } from '../constants/stations';
import { VAR_LABELS } from '../constants/variables';

//CSS
import './availabilityDashboard.css'


// Actual Component 
const AvailabilityDashboard = ({ selectedStation: initialStation }) => {

  const [selectedStation, setSelectedStation] = useState(initialStation || STATIONS[0]);
  const [selectedVars, setSelectedVars] = useState([
  { var: 'temp', color: '#3498db', type: 'line' }]);
  const [chartType, setChartType] = useState('line');

  // Add (+) function
  const addVariable = () => {
  setSelectedVars(prev => [
    ...prev,
    { var: 'humidity', color: '#e74c3c', type: 'bar' }]);};
    
  // Remove (-) function
  const removeVariable = (index) => {
  setSelectedVars(prev => prev.filter((_, i) => i !== index));};  

  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 14);
    return d;
  });
  
  //STATES
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
    return bins.map(() => 100 - Math.random() * 80);
  }, [bins]);

  const options = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: '#ede9dce7',   
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

      yAxis: { 
        type: 'value', 
        max: 100,
        name: 'Percentage',
        axisLabel: {                // ticks
          show: true,           
          color: '#3f453f',        
          fontSize: 18,         
          rotate: 0,          
          margin: 10           // Distance between the label and the axis line
        },
      },

      series: selectedVars.map((item, i) => ({
        show: true,
        name: VAR_LABELS[item.var],     
        type: item.type,
        data: data, 
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
          saveAsImage: {},
          magicType: {type: ['bar'] },    //'line' not working properly; type conflict
          brush: {
            type: ['lineX', 'clear']
          } 
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
      brush: {
        xAxisIndex: 'all',
        brushLink: 'all',
        outOfBrush: {
          colorAlpha: 0.1
        }
      },
      
    };

  }, [chartType, selectedVars, data, bins]);

  // Actual component
  return (
    <div className="card-frame availability-section">
      <div className="card-header">
        Data Availability: <span class="highlight">{selectedStation.name}</span>
      </div>

      <div className="availability-content">
        {/* LEFT: CHART */}
        <div className="availability-chart">
          <ReactECharts option={options} style={{ height: '90%' }} />
        </div>

        {/* RIGHT: CONTROLS */}
        <div className="availability-controls">
          <h4>Controls</h4>
          <label>Station</label>
          <select
            value={selectedStation.id}
            onChange={(e) => setSelectedStation(
              STATIONS.find(s => s.id === Number(e.target.value))
            )}
          >
          {STATIONS.map(st => (
            <option key={st.id} value={st.id}>{st.name}</option>
          ))}
          </select>

          {/* Variable */}
          <label>Variables</label>
          {selectedVars.map((item, i) => (
            <div key={i} className="var-row">
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

              {/* REMOVE var*/}
              <button className='remove-btn' onClick={() => removeVariable(i)}>✖</button>
            </div>
          ))}

          {/* ADD var */}
          <button className='add-btn' onClick={addVariable}>+ Add Variable</button>

          {/* Dates  Note: onChangeRaw disables typing*/}
          <label>Date Range</label>
          <DatePicker selected={startDate} onChange={setStartDate} onChangeRaw={(e) => e.preventDefault()} /> 
          <DatePicker selected={endDate} onChange={setEndDate} onChangeRaw={(e) => e.preventDefault()}/>

          {/* Resolution */}
          <label>Resolution</label>
          <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="1h">1 Hour</option>
            <option value="6h">6 Hours</option>
            <option value="12h">12 Hours</option>
            <option value="1d">1 Day</option>
            <option value="1w">1 Week</option>
            <option value="1m">1 Month</option>
            <option value="1y">1 Year</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityDashboard;


/* TASK: debug this 'add/remove variables and restore plot' behavior */
/* I suspect the height of the plot might be depending on the number of variables
   maybe add a clamp or minmax */
/* TASK: when a new variable is added, give it a random color */
/* TASK: when a new variable is added, give it a new variable */

//NEAT EXAMPLE: https://echarts.apache.org/examples/en/editor.html?c=doc-example%2Fcandlestick-axisPointer&edit=1&reset=1

// the remove function is only working on the buttons, 
// it's not actually removing anything from the plot, u need to restore manually with a button

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

/*
pie chart if

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