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
} from 'lucide-react'

import './currentConditions.css'

import { STATIONS } from '../constants/stations.js'

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
      maxTemp: Math.max(...tempValues).toFixed(1),
      minTemp: Math.min(...tempValues).toFixed(1),
      avgHumidity: (
        humidityValues.reduce((a, b) => a + b, 0) /
        humidityValues.length
      ).toFixed(1),
      avgPressure: (
        pressureValues.reduce((a, b) => a + b, 0) /
        pressureValues.length
      ).toFixed(1),
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
      {/* TOP CONTROLS */}
      <div className="dashboard-controls">
        <select
          value={selectedStation.id}
          onChange={(e) => {
            const station = STATIONS.find(
              (s) => s.id === Number(e.target.value)
            )
            setSelectedStation(station)
          }}
        >
          {STATIONS.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>

        <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
          {TIME_RANGES.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* GRID */}
      <div className="dashboard-grid">
        {/* TEMPERATURE */}
        <StatCard title="Temperature">
          <div className="big-number">
            {stats?.maxTemp} °C
            <span>MAX</span>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weatherData}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff5f5f" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff5f5f" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

              <XAxis
                dataKey="time"
                tickFormatter={(v) => v.slice(5, 16)}
                hide
              />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#ff5f5f"
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
                innerRadius="70%"
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
                  cornerRadius={10}
                  fill="#1d7cff"
                />
              </RadialBarChart>
            </ResponsiveContainer>

            <div className="gauge-value">
              {stats?.avgHumidity} %
            </div>
          </div>
        </StatCard>

        {/* WIND */}
        <StatCard title="Wind Speed">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weatherData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

              <XAxis hide dataKey="time" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="wind"
                stroke="#82ca9d"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </StatCard>

        {/* PRESSURE */}
        <StatCard title="Pressure">
          <div className="big-number">
            {stats?.avgPressure}
            <span>mbar</span>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weatherData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

              <XAxis hide dataKey="time" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="pressure"
                stroke="#9c5fff"
                fill="#9c5fff55"
              />
            </AreaChart>
          </ResponsiveContainer>
        </StatCard>

        {/* SOLAR RADIATION */}
        <StatCard title="Solar Radiation">
          <div className="big-number">
            {stats?.maxRadiation}
            <span>W/m²</span>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weatherData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

              <XAxis hide dataKey="time" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="radiation"
                stroke="#f9b208"
                fill="#f9b20855"
              />
            </AreaChart>
          </ResponsiveContainer>
        </StatCard>

        {/* PRECIPITATION */}
        <StatCard title="Accumulated Rain">
          <div className="big-number">
            {stats?.totalRain}
            <span>mm</span>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weatherData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

              <XAxis hide dataKey="time" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="rain" fill="#4da6ff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </StatCard>

        {/* SUMMARY */}
        <StatCard title="Summary">
          <div className="summary-list">
            <SummaryItem
              icon={<Thermometer size={18} />}
              label="Max Temperature"
              value={stats?.maxTemp}
              unit="°C"
            />

            <SummaryItem
              icon={<Droplets size={18} />}
              label="Humidity"
              value={stats?.avgHumidity}
              unit="%"
            />

            <SummaryItem
              icon={<Wind size={18} />}
              label="Max Wind"
              value={stats?.maxWind}
              unit="m/s"
            />

            <SummaryItem
              icon={<Gauge size={18} />}
              label="Pressure"
              value={stats?.avgPressure}
              unit="mbar"
            />

            <SummaryItem
              icon={<Sun size={18} />}
              label="Radiation"
              value={stats?.maxRadiation}
              unit="W/m²"
            />

            <SummaryItem
              icon={<CloudRain size={18} />}
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