import React, { useEffect, useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
} from 'recharts'

import {
  Thermometer,
  CloudRain,
  Wind,
  Gauge,
  Sun,
  Droplets,
  Cloud,
} from 'lucide-react'

//CSS
import './currentConditions.css'

//STATIC
import { STATIONS } from '../constants/stations.js'
import cloudgif from '../../public/images/weatherconditions2.gif'

const TIME_RANGES = [
  { label: 'Last 24 Hours', value: 1 },
  { label: 'Last 3 Days', value: 3 },
  { label: 'Last 7 Days', value: 7 },
  { label: 'Last 14 Days', value: 14 },
  { label: 'Last 30 Days', value: 30 },
]

//Card
const StatCard = ({ title, children }) => {
  return (
    <div className="weather-card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  )
}

const SummaryItem = ({ icon, label, value, unit }) => {
  return (
    <div className="summary-item">
      <div className="summary-left">
        {icon}
        <span>{label}</span>
      </div>

      <strong>
        {value} {unit}
      </strong>
    </div>
  )
}

export default function CurrentConditions() {
  const [selectedStation, setSelectedStation] = useState(STATIONS[0])
  const [days, setDays] = useState(7)

  const [loading, setLoading] = useState(false)
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)

      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${selectedStation.lat}&longitude=${selectedStation.lng}&hourly=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,precipitation,shortwave_radiation&timezone=auto&past_days=${days}&forecast_days=1`

        const response = await fetch(url)
        const data = await response.json()

        const formatted = data.hourly.time.map((time, index) => ({
          time,
          temperature: data.hourly.temperature_2m[index],
          humidity: data.hourly.relative_humidity_2m[index],
          pressure: data.hourly.surface_pressure[index],
          wind: data.hourly.wind_speed_10m[index],
          rain: data.hourly.precipitation[index],
          radiation: data.hourly.shortwave_radiation[index],
        }))

        setWeatherData(formatted)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [selectedStation, days])

  const stats = useMemo(() => {
    if (!weatherData.length) return null

    const tempValues = weatherData.map((d) => d.temperature)
    const humidityValues = weatherData.map((d) => d.humidity)
    const pressureValues = weatherData.map((d) => d.pressure)
    const windValues = weatherData.map((d) => d.wind)
    const radiationValues = weatherData.map((d) => d.radiation)

    const totalRain = weatherData.reduce((acc, d) => acc + d.rain, 0)

    return {
      maxTemp: Math.max(...tempValues).toFixed(1),                  //stats
      minTemp: Math.min(...tempValues).toFixed(1),
      minHumidity: Math.min(...humidityValues).toFixed(1),
      maxHumidity: Math.max(...humidityValues).toFixed(1),
      avgHumidity: (
        humidityValues.reduce((a, b) => a + b, 0) /
        humidityValues.length
      ).toFixed(1),
      avgPressure: (
        pressureValues.reduce((a, b) => a + b, 0) /
        pressureValues.length
      ).toFixed(1),
      minWind: Math.min(...windValues).toFixed(1),
      maxWind: Math.max(...windValues).toFixed(1),
      totalRain: totalRain.toFixed(1),
      maxRadiation: Math.max(...radiationValues).toFixed(0),
    }
  }, [weatherData])

  if (loading) {
    return <div className="loading">Loading weather data...</div>
  }

  return (
    <div className="dashboard-wrapper">
      {/* GRID */}
      <div className="dashboard-grid">

        {/* Testing controls StatCard */}
        <StatCard title='Controls'>
          <div className="dashboard-controls">
            <div className="select-wrapper">            {/*testing*/}
            <select
              value={selectedStation.id}
              onChange={(e) => {
                const station = STATIONS.find(
                  (s) => s.id === Number(e.target.value)      
                )
                setSelectedStation(station)
              }}
            >
            <option value="" disabled>Select station</option>
            {STATIONS.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
            </select> 
            </div>

            <div className="select-wrapper">  
            <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
            <option value="" disabled>Date range</option>
            {TIME_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
            </select>
            </div>
          </div>
        </StatCard>

        {/* TEMPERATURE */}                  
        <StatCard title="Temperature">
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className="big-number">
              {stats?.minTemp} °C
              <span>min</span>
            </div>
            <div className="big-number">
              {stats?.maxTemp} °C
              <span>max</span>
            </div>
          </div> 

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weatherData}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0.3" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff5f5f" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff5f5f" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid 
                strokeDasharray="15 12" 
                opacity={1} 
                vertical={false}
                stroke='#0000001c'
                strokeWidth={1} 
              />

              <XAxis
                dataKey="time"
                tickFormatter={(v) => v.slice(5, 16)}
                tick={false}
                axisLine={false}
                label={days + ' days'}
              />
{/*dx dy for further adjustment */}
              <YAxis  
                label={{ value: 'Temperature [°C]', 
                         angle:-90, 
                         position: 'centerTop',
                         dx:-20, 
                         dy: -10
                }}
              />
              <Tooltip
                position={{ y: 140 }}
              />
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#fd4848"
                fillOpacity={1}
                fill="url(#tempGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </StatCard>

        {/* HUMIDITY */}
        <StatCard title="Humidity">
          <div className="gauge-container">
            <ResponsiveContainer width="100%" height={250}>
              <RadialBarChart
                innerRadius="60%"
                outerRadius="100%"
                data={[
                  {
                    name: 'Humidity',
                    value: Number(stats?.avgHumidity || 0),
                  },
                ]}
                startAngle={180}      
                endAngle={0}               
              >
                <RadialBar
                  dataKey="value"
                  cornerRadius={18}
                  fill="#1d7cff"
                />
              </RadialBarChart>
            </ResponsiveContainer>

            <div className="gauge-value">
              {stats?.avgHumidity} %
              <span>Avg</span>
            </div>                               
          </div>
        </StatCard>

        {/* WIND */}
        <StatCard title="Wind Speed">
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className="big-number">
              {stats?.maxWind} m/s
              <span>max</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weatherData}>
              <CartesianGrid 
                strokeDasharray="15 12" 
                opacity={1} 
                vertical={false}
                stroke='#00000016'
                strokeWidth={1} 
              />

              <XAxis 
                dataKey="time"
                tick={false}
                axisLine={false}
                label={{
                  value: days + ' days',
                  dy: 10
                }}
                
              />

              <YAxis 
                label={{ value: 'Wind speed [m/s]', 
                         angle:-90, 
                         position: 'centerTop',
                         dx:-20, 
                         dy: -10
                }}
              />

              <Tooltip
                position={{ y: 180 }}
              />

              <Line
                type="monotone"
                dataKey="wind"
                stroke="#41ca76"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </StatCard>

        {/* SOLAR RADIATION */}
        <StatCard title="Solar Radiation">
          <div className="big-number">
            {stats?.maxRadiation} W/m²
            <span>max</span>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={weatherData}>
              <CartesianGrid strokeDasharray="3 3" opacity={1} vertical={false} />

              <XAxis 
                dataKey="time"
                tick={false}
                axisLine={false}
                label={days + ' days'}
              />

              <YAxis
                label={{ value: 'Solar radiation [W/m²]', 
                         angle:-90, 
                         position: 'centerTop',
                         dx:-28, 
                         dy: -10
                }}
              />

              <Tooltip 
                position={{ y: 180 }}
              />

              <Area
                type="monotone"
                dataKey="radiation"
                stroke="#fcb000"
                fill="#f9b20855"
              />
            </AreaChart>
          </ResponsiveContainer>
        </StatCard>  

        {/* PRESSURE */}
        <StatCard title="Pressure">
          <div className="big-number">
            {stats?.avgPressure} hPa
            <span>Avg</span>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weatherData}>
              <defs>
                <linearGradient id="pressureGradient" x1="0" y1="0.3" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9c5fff55" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#9c5fff55" stopOpacity={0} />
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="15 12" 
                opacity={1} 
                vertical={false}
                stroke='#00000025'
                strokeWidth={1} 
              />

              <XAxis
                dataKey="time"
                tick={false}
                axisLine={false}
                label={days + ' days'}
              />

              <YAxis 
                label={{ value: 'Pressure [hPa]', 
                         angle:-90, 
                         position: 'centerTop',
                         dx:-29, 
                         dy: -10
                }}
                //tickCount={3}
                domain={[
  stats?.avgPressure ? Number(stats.avgPressure) - 25 : 'dataMin', 
  stats?.avgPressure ? Number(stats.avgPressure) + 25 : 'dataMax'
]}
              />

              <Tooltip
                position={{ y: 60 }}
              />

              <Area
                type="monotone"
                dataKey="pressure"
                stroke="#9c5fff"
                fill="url(#pressureGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </StatCard>

        {/* PRECIPITATION */}
        <StatCard title="Accumulated Rain">
          <div className="big-number">
            {stats?.totalRain} mm
            <span>total</span>
          </div>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weatherData}>
              <CartesianGrid 
                strokeDasharray="15 12" 
                opacity={1} 
                vertical={false}
                stroke='#00000022'
                strokeWidth={1} 
              />    

              <XAxis 
                dataKey="time"
                tick={false}
                axisLine={true}
                label={days + ' days'}
              />

              <YAxis 
                label={{ value: 'Accumulated rain [mm]', 
                         angle:-90, 
                         position: 'centerTop',
                         dx:-29, 
                         dy: -10
                }}
              />

              <Tooltip 
                position={{ y: 134 }}
              />

              <Bar dataKey="rain" fill="#4da6ff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </StatCard>

        {/* SUMMARY */}
        <StatCard title="Summary">
          <div className="summary-list">
            <SummaryItem
              icon={<Thermometer size={20} />}
              label="Max Temperature"
              value={stats?.maxTemp}
              unit="°C"
            />

            <SummaryItem
              icon={<Droplets size={20} />}
              label="Humidity"
              value={stats?.avgHumidity}
              unit="%"
            />

            <SummaryItem
              icon={<Wind size={20} />}
              label="Max Wind"
              value={stats?.maxWind}
              unit="m/s"
            />

            <SummaryItem
              icon={<Gauge size={20} />}
              label="Pressure"
              value={stats?.avgPressure}
              unit="hPa"
            />

            <SummaryItem
              icon={<Sun size={20} />}
              label="Radiation"
              value={stats?.maxRadiation}
              unit="W/m²"
            />

            <SummaryItem
              icon={<CloudRain size={20} />}
              label="Accumulated Rain"
              value={stats?.totalRain}
              unit="mm"
            />
          </div>
        </StatCard>
      </div>
    </div>
  )
}



/* recchart examples: https://recharts.github.io/en-US/examples/PopulationPyramid/ */
/* https://recharts.github.io/en-US/examples/ComposedChartWithAxisLabels/*/
/* https://recharts.github.io/en-US/examples/BarChartWithMultiXAxis/ */
/* https://recharts.github.io/en-US/api/Tooltip/ */

//NOTE: strokeDasharray="5 3"  -> 5px dashes 3px gaps 
//NOTE: strokeDasharray="0"  -> solid line

/* TASK: refactor this, quite repetitive */

/* TASK: format dates: import { format } from 'date-fns';

const formatXAxis = (tickItem) => {
  // Multiply by 1000 if your timestamps are in seconds
  return format(new Date(tickItem * 1000), 'MMM dd'); 
}; */

/* pressure fill: "#9c5fff55" */


{/* TOP CONTROLS */}
      {/*
      <div className="dashboard-controls">
        <select
          value={selectedStation.id}
          onChange={(e) => {
            const station = STATIONS.find(
              (s) => s.id === Number(e.target.value)      TESTING!!
            )
            setSelectedStation(station)
          }}
        >
          {STATIONS.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select> */}

{/* Time range */}
{/*        <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
          {TIME_RANGES.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
        <img src={cloudgif} alt="cloud"  />
      </div>
*/}

