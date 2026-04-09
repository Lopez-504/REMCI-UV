import DatePicker from 'react-datepicker';
import { VAR_LABELS } from '../constants/variables';
import { STATIONS } from '../constants/stations';

const AvailabilityControls = ({
  selectedStation,
  setSelectedStation,
  selectedVar,
  setSelectedVar,
  chartType,
  setChartType,
  startDate,
  endDate,
  setStartDate,
  setEndDate
}) => {

  return (
    <div className="availability-controls">

      {/*<h4>Controls</h4>*/}

      {/* Station */}
      <label>Station</label>
      <select
        value={selectedStation.id}
        onChange={(e) =>
          setSelectedStation(STATIONS.find(s => s.id === Number(e.target.value)))
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

      {/* Date range */}
      <label>Date Range</label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <DatePicker selected={startDate} onChange={setStartDate} />
        <DatePicker selected={endDate} onChange={setEndDate} />
      </div>

      {/* Chart type */}
      <label>Chart Type</label>
      <div className="chart-type-buttons">
        {['line', 'bar', 'pie'].map(type => (
          <button
            key={type}
            className={chartType === type ? 'active-btn' : ''}
            onClick={() => setChartType(type)}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

    </div>
  );
};

export default AvailabilityControls;
