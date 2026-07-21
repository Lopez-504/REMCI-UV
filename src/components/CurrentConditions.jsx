import React, { useEffect, useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  ReferenceLine,
  Legend,
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
  { label: 'Last 1 day', value: 1 },
  { label: 'Last 3 days', value: 3 },
  { label: 'Last 7 days', value: 7 },
  { label: 'Last 14 days', value: 14 },
  { label: 'Last 30 days', value: 30 },
]

const FORECAST_RANGES = [
  {label: 'No forecast', value: 0},
  {label: '+1 day', value: 2},
  {label: '+2 days', value: 3},
  {label: '+3 days', value: 4},
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
  const [days, setDays] = useState(3)
  const [forecastDays, setForecastDays] = useState(2)

  const [loading, setLoading] = useState(false)
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true)

      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${selectedStation.lat}&longitude=${selectedStation.lng}&hourly=temperature_2m,relative_humidity_2m,surface_pressure,wind_gusts_10m,wind_speed_10m,precipitation,shortwave_radiation&daily=precipitation_sum&timezone=America%2FNew_York&past_days=${days}&forecast_days=${forecastDays}`

        const response = await fetch(url)
        const data = await response.json()
        
        //daily test
        const dailyRainMap = Object.fromEntries(
          data.daily.time.map((date, index) => [
            date,
            data.daily.precipitation_sum[index],
          ])
        ); 

        const formatted = data.hourly.time.map((time, index) => {
        const isMidnight = time.endsWith("00:00");

          return {
            time,
            temperature: data.hourly.temperature_2m[index],
            humidity: data.hourly.relative_humidity_2m[index],
            pressure: data.hourly.surface_pressure[index],
            wind: data.hourly.wind_speed_10m[index],
            gust: data.hourly.wind_gusts_10m[index],
            hourlyRain: data.hourly.precipitation[index],
            radiation: data.hourly.shortwave_radiation[index],

            dailyRain: isMidnight
              ? dailyRainMap[time.slice(0, 10)]
              : null,
          };
        });

        setWeatherData(formatted)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [selectedStation, days, forecastDays])         //dependencies

  const stats = useMemo(() => {
    if (!weatherData.length) return null

    const tempValues = weatherData.map((d) => d.temperature)
    const humidityValues = weatherData.map((d) => d.humidity)
    const pressureValues = weatherData.map((d) => d.pressure)
    const windValues = weatherData.map((d) => d.wind)
    const gustValues = weatherData.map((d) => d.gust) 
    const radiationValues = weatherData.map((d) => d.radiation)

    const totalRain = weatherData.reduce((acc, d) => acc + d.hourlyRain, 0)

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
      avgWind: (
        windValues.reduce((a, b) => a + b, 0) /
        windValues.length
      ).toFixed(1),
      maxGust: Math.max(...gustValues).toFixed(1),
      totalRain: totalRain.toFixed(1),
      maxRadiation: Math.max(...radiationValues).toFixed(0),
    }
  }, [weatherData])

  if (loading) {
    return <div className="loading">Loading weather data...</div>
  }

  {/* Get current datetime */}
  const now = new Date();

  const closestTime =
  weatherData.length > 0                            // only use reduce if there's data
    ? weatherData.reduce((closest, d) =>
        Math.abs(new Date(d.time) - now) <
        Math.abs(new Date(closest.time) - now)
          ? d
          : closest
      ).time
    : null;

  

  {/* Visuals */}
  return (
    <div className="dashboard-wrapper">
      {/* GRID */}
      <div className="dashboard-grid">

        {/* Controls Card */}
        <StatCard title='Settings'>
          <div className="dashboard-controls">
            <div className="select-wrapper">            
              <select
                value={selectedStation.id}
                onChange={(e) => {
                  const station = STATIONS.find(
                    (s) => s.id === e.target.value         // removed Number(), using string now      
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
            <div className="select-wrapper">  
              <select value={forecastDays} onChange={(e) => setForecastDays(Number(e.target.value))}>
              <option value="" disabled>Include Forecast</option>
              {FORECAST_RANGES.map((range) => (
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

          <ResponsiveContainer width="100%" height={290}>
            <AreaChart data={weatherData}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0.3" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff5f5f" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff5f5f" stopOpacity={0.05} />
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
                tickFormatter={(v) => v.slice(5, 10)}
                tick={false}
                //tickCount={20}      //for continuous numerical axis 
                interval={23}
                angle={-16}
                axisLine={false}
                label={String(days) + ' Past days ' + `${forecastDays===0 ? '' : '+ Today + ' + String(forecastDays -1) + ' Forecast days'}`}
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
                stroke="#fd0d0d"
                strokeWidth={1.4}
                fillOpacity={1}
                fill="url(#tempGradient)"
              />
              <ReferenceLine 
                x={closestTime} 
                stroke="#4a494936" 
                strokeDasharray="6 0" 
                strokeWidth={4.0} 
                label={{ value: 'Now', 
                         angle:0, 
                         position: 'centerTop',
                         dx:-24, 
                         dy: -110,
                         fontWeight:'bold',
                         fontSize: 17 
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </StatCard>

        {/* WIND */}
        <StatCard title="Wind Speed">
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className="big-number">
              {stats?.maxWind} km/h
              <span>max</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={290}>
            <AreaChart data={weatherData}>
              <defs>
                <linearGradient id="windGradient" x1="0" y1="0.3" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1cac1cf2" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#23aa01" stopOpacity={0.05} />
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
                label={`${forecastDays===0 ? days : String(days+1) + ' + ' + String(forecastDays -1)}` + ' days'}
              />
              <YAxis  
                label={{ value: 'Wind Speed [km/h]', 
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
                dataKey="wind"
                stroke="#24b600"
                strokeWidth={1.4}
                fillOpacity={1}
                fill="url(#windGradient)"
              />
              {closestTime && (
                <ReferenceLine 
                x={closestTime} 
                stroke="#4a494936" 
                strokeDasharray="6 0" 
                strokeWidth={4.0} 
                label={{ value: '', 
                         angle:0, 
                         position: 'centerTop',
                         dx:-20, 
                         dy: -110
                }}
              />
              )}
            </AreaChart>
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
              label="Avg Humidity"
              value={stats?.avgHumidity}
              unit="%"
            />

            <SummaryItem
              icon={<Wind size={20} />}
              label="Max Wind"
              value={stats?.maxWind}
              unit="km/h"
            />

            {/*<SummaryItem
              icon={<Gauge size={20} />}
              label="Avg Pressure"
              value={stats?.avgPressure}
              unit="hPa"
            />*/}

            <SummaryItem
              icon={<Wind size={20} />}
              label="Max Wind Gust"
              value={stats?.maxGust}
              unit="km/h"
            />

            <SummaryItem
              icon={<Sun size={20} />}
              label="Max Radiation"
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

        {/* SOLAR RADIATION */}
        <StatCard title="Solar Radiation">
          <div className="big-number">
            {stats?.maxRadiation} W/m²
            <span>max</span>
          </div>

          <ResponsiveContainer width="100%" height={290}>
            <AreaChart data={weatherData}>
              <CartesianGrid strokeDasharray="3 3" opacity={1} vertical={false} />

              <XAxis
                dataKey="time"
                tickFormatter={(v) => v.slice(5, 10)}
                tick={false}
                //tickCount={20}      //for continuous numerical axis 
                interval={23}
                angle={-16}
                axisLine={false}
                label={`${forecastDays===0 ? days : String(days+1) + ' + ' + String(forecastDays -1)}` + ' days'}
              />

              <YAxis
                label={{ value: 'Solar radiation [W/m²]', 
                         angle:-90, 
                         position: 'centerTop',
                         dx:-28, 
                         dy: -10
                }}
                //unit='[W/m²]'
              />

              <Tooltip 
                position={{ y: 180 }}
              />

              <Area
                type="monotone"
                dataKey="radiation"
                stroke="#fcb000"
                strokeWidth={1.4}
                fill="#f9b20855"
              />
              {closestTime && (
                <ReferenceLine 
                x={closestTime} 
                stroke="#4a494936" 
                strokeDasharray="6 0" 
                strokeWidth={4.0} 
                label={{ value: '', 
                         angle:0, 
                         position: 'centerTop',
                         dx:-20, 
                         dy: -110
                }}
              />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </StatCard>          

        {/* Test double precipitation */}
        <StatCard title="Hourly & Daily Accumulated Rain">
          <div className="big-number">
            {stats?.totalRain} mm
            <span>total</span>
          </div>
          <ResponsiveContainer width="100%" height={310}>
            <ComposedChart data={weatherData}>
            {/*<BarChart data={weatherData}>*/}
              <CartesianGrid                        
                  yAxisId='hourly'
                  strokeDasharray="15 12" 
                  opacity={1} 
                  vertical={false}
                  stroke='#00000022'
              />  

              <XAxis
                dataKey="time"
                xAxisId='hourly'
                tickFormatter={(v) => v.slice(5, 10)}
                tick={false}
                interval={23}
                angle={-16}
                axisLine={false}
                label={`${forecastDays===0 ? days : String(days+1) + ' + ' + String(forecastDays -1)}` + ' days'}
                orientation="bottom" 
              />

              <XAxis
                xAxisId={'daily'} 
                dataKey='time'
                tick={false}
                axisLine={false}
                orientation="top"       //invisible. Test daily acc. on this xAxis
                height={10}
              />

              {/* Left axis: hourly precipitation */}
              <YAxis
                yAxisId="hourly"
                label={{
                  value: "Hourly rain [mm]",
                  angle: -90,
                  position: "centerTop",
                  dx: -20,
                  dy: -10,
                }}
              />

              {/* Right axis: daily accumulated precipitation */}
              <YAxis
                yAxisId="daily"
                orientation="right"
                label={{
                  value: "Daily rain [mm]",
                  angle: 90,
                  position: "centerTop",
                  dx: 22,
                  dy: -10,
                }}
                niceTicks="snap125"         //same as default I think
              />

              <Tooltip 
                position={{ y: 134 }} 
                axisId="hourly" 
              />  

              {/* Daily accumulation */}
                <Line
                  type="monotone"
                  yAxisId='daily'
                  xAxisId='daily'
                  dataKey="dailyRain"
                  stroke="#7304a6"
                  strokeWidth={1.4}
                  fill="#65038b8b"
                  activeDot={{ r: 6 }}
                  label={{position:'right', fontSize:16}}
                  //iconType={'square'}           //not working
                />

                {/* Hourly rain */}
                <Bar 
                  yAxisId="hourly"
                  dataKey="hourlyRain" 
                  fill="#4da6ff" 
                  radius={[4, 4, 0, 0]} 
                  barSize={6}
                />
                
                <ReferenceLine 
                  x={closestTime} 
                  yAxisId='hourly'
                  xAxisId='hourly'
                  stroke="#4a494936" 
                  strokeDasharray="6 0" 
                  strokeWidth={4.0} 
                  label={{ value: '', 
                          angle:0, 
                          position: 'centerTop',
                          dx:-20, 
                          dy: -110
                  }}
                />  
                <Legend
                  iconSize={8}
                  iconType='circle'
                  //position={'middle'}          //insideTop not working
                  //layout='horizontal'
                  verticalAlign='top'
                  offset={'10'}
                  wrapperStyle={{
                    border: '0px solid black',
                    borderRadius: 10,
                    backgroundColor: '#b4b5992f',
                  }}
                />
              </ComposedChart>           
              {/*</BarChart>*/}
          </ResponsiveContainer>      
        </StatCard>  

        {/* PRECIPITATION 
        <StatCard title="Accumulated Rain">
          <div className="big-number">
            {stats?.totalRain} mm
            <span>total</span>
          </div>

          <ResponsiveContainer width="100%" height={290}>
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
                tickFormatter={(v) => v.slice(5, 10)}
                tick={false}
                //tickCount={20}      //for continuous numerical axis 
                interval={23}
                angle={-16}
                axisLine={false}
                label={String(days+1)+ `${forecastDays===0 ? '' : ' + ' + String(forecastDays -1)}` + ' days'}
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

              <Bar 
                dataKey="hourlyRain" 
                fill="#4da6ff" 
                barSize={3}               //1-4
                radius={[4, 4, 0, 0]}
              />
              <ReferenceLine 
                x={closestTime} 
                stroke="#4a494936" 
                strokeDasharray="6 0" 
                strokeWidth={4.0}         
                label={{ value: '', 
                         angle:0, 
                         position: 'centerTop',
                         dx:-20, 
                         dy: -110
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </StatCard>*/}

        {/* WIND GUST*/}
        <StatCard title="Wind Gust">
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div className="big-number">
              {stats?.maxGust} km/h
              <span>max</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={290}>
            <AreaChart data={weatherData}>
              <defs>
                <linearGradient id="gustGradient" x1="0" y1="0.3" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f40c7" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0f40c7" stopOpacity={0.05} />
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
                tickFormatter={(v) => v.slice(5, 10)}
                tick={false}
                //tickCount={20}      //for continuous numerical axis 
                interval={23}
                angle={-16}
                axisLine={false}
                label={`${forecastDays===0 ? days : String(days+1) + ' + ' + String(forecastDays -1)}` + ' days'}
              />
              <YAxis  
                label={{ value: 'Wind Speed [km/h]', 
                         angle:-90, 
                         position: 'centerTop',
                         dx:-20, 
                         dy: -10
                }}
                domain={[
                  stats?.maxGust ? 0 : 'dataMin', 
                  stats?.maxGust ? Math.ceil(Number(stats.maxGust)) : 'dataMax'
                ]}
              />
              <Tooltip
                position={{ y: 140 }}
              />
              <Area
                type="monotone"
                dataKey="gust"
                stroke="#0838ba"
                strokeWidth={1.4}
                fillOpacity={1}
                fill="url(#gustGradient)"
              />
              <ReferenceLine 
                x={closestTime} 
                stroke="#4a494936" 
                strokeDasharray="6 0" 
                strokeWidth={4.0} 
                label={{ value: '', 
                         angle:0, 
                         position: 'centerTop',
                         dx:-20, 
                         dy: -110
                }}
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

          <ResponsiveContainer width="100%" height={290}>
            <AreaChart data={weatherData}>
              <defs>
                <linearGradient id="pressureGradient" x1="0" y1="0.3" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9c5fff55" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#9c5fff55" stopOpacity={0.05} />
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
                tickFormatter={(v) => v.slice(5, 10)}
                tick={false}
                //tickCount={20}      //for continuous numerical axis 
                //interval={23}
                //angle={-16}
                axisLine={false}
                label={String(days+1)+ `${forecastDays===0 ? '' : ' + ' + String(forecastDays -1)}` + ' days'}
              />

              <YAxis 
                label={{ value: 'Pressure [hPa]', 
                         angle:-90, 
                         position: 'centerTop',
                         dx:-29, 
                         dy: -10,
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
                strokeWidth={1.4}
                fill="url(#pressureGradient)" 
              />
              <ReferenceLine 
                x={closestTime} 
                stroke="#4a494936" 
                strokeDasharray="6 0" 
                strokeWidth={4.0} 
                label={{ value: '', 
                         angle:0, 
                         position: 'centerTop',
                         dx:-20, 
                         dy: -110
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </StatCard>

        {/* HUMIDITY (out for now)*/}

      </div>
    </div>
  )
}


//Note: open-meteo only has day-resolution, so no hours. 
//Note: took the humidity card out (left it at the bottom of this code)

//NOTE: kmh is the default unit for wind speed
//Note: Wind speed refers to the average velocity of the wind over a sustained period (typically 1 to 10 minutes), while a wind gust is a sudden, brief surge in wind speed that lasts for only a few seconds and exceeds the average speed by at least 10 knots (11.5 mph)

// TASK: add a vline at the current time

//NOTE: strokeDasharray="5 3"  -> 5px dashes 3px gaps 
//NOTE: strokeDasharray="0"  -> solid line

// NOTE: seems like open-meteo request does not go more than 20 days back 
// TASK: refactor this, quite repetitive

/* recchart examples: https://recharts.github.io/en-US/examples/PopulationPyramid/ */
/* https://recharts.github.io/en-US/examples/ComposedChartWithAxisLabels/*/
/* https://recharts.github.io/en-US/examples/BarChartWithMultiXAxis/ */
/* https://recharts.github.io/en-US/api/Tooltip/ */

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


/* 
Humidity card
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
*/
