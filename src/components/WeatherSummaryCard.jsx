import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { STATIONS } from "../constants/stations-ghp";
import "./weatherSummaryCard.css";

function parseLocalDate(s) {
  const [datePart, timePart = "00:00"] = s.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm = 0] = timePart.split(":").map(Number);
  return new Date(y, m - 1, d - 1, hh, mm, 0);            // why the m -1 ??
}

function formatDateKey(d) {
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

//ACTUAL COMPONENT
export default function WeatherSummaryCard({
  stationId,
  onStationChange,
}) {
  const { t, i18n } = useTranslation("common");

  // Fallback to internal state if not controlled from parent
  const [internalStationId, setInternalStationId] = useState(STATIONS[0].id);
  const activeStationId = stationId ?? internalStationId;
  const setStationId = onStationChange ?? setInternalStationId;

  const station = useMemo(
    () => STATIONS.find((s) => s.id === activeStationId) ?? STATIONS[0],
    [activeStationId]
  );

  const [dailyData, setDailyData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    async function fetchData() {
      setLoading(true);
      const params = new URLSearchParams({
        latitude: String(station.lat),
        longitude: String(station.lng),
        timezone: station.timezone || "America/Santiago",
        forecast_days: "6",
        daily: "temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum",
        hourly: "cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,precipitation_probability",
      });

      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
        if (!res.ok) throw new Error("Fetch failed");
        const json = await res.json();

        if (isCancelled) return;

        // Process daily metrics
        const days = json.daily.time.map((timeStr, i) => ({
          date: parseLocalDate(timeStr),
          tempMax: Math.round(json.daily.temperature_2m_max[i]),
          tempMin: Math.round(json.daily.temperature_2m_min[i]),
          precipProb: json.daily.precipitation_probability_max?.[i] ?? 0,
          precipSum: json.daily.precipitation_sum?.[i] ?? 0,
        }));

        // Process hourly cross-section
        const hours = json.hourly.time.map((timeStr, i) => ({
          time: parseLocalDate(timeStr),
          high: json.hourly.cloud_cover_high?.[i] ?? 0,
          mid: json.hourly.cloud_cover_mid?.[i] ?? 0,
          low: json.hourly.cloud_cover_low?.[i] ?? 0,
          total: json.hourly.cloud_cover?.[i] ?? 0,
          prob: json.hourly.precipitation_probability?.[i] ?? 0,
        }));

        setDailyData(days);
        setHourlyData(hours);
      } catch (err) {
        console.error("Error loading weather summary:", err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isCancelled = true;
    };
  }, [station]);

  // Cloud cross-section SVG calculations
  const cloudPlot = useMemo(() => {
    if (!hourlyData.length) return null;

    const width = 1000;
    const height = 240;
    const margin = { top: 25, right: 55, bottom: 35, left: 55 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const n = hourlyData.length;
    const colW = innerW / Math.max(1, n);

    // Altitude bands: Low (0 - 3km) = 30%, Mid (3 - 8km) = 40%, High (> 8km) = 30%
    const layers = [
      { key: "high", label: "8+ km", y0: margin.top, h: innerH * 0.35 },
      { key: "mid", label: "3–8 km", y0: margin.top + innerH * 0.35, h: innerH * 0.35 },
      { key: "low", label: "0–3 km", y0: margin.top + innerH * 0.70, h: innerH * 0.30 },
    ];

    // Precipitation probability line (0 - 100%)
    const probPoints = hourlyData
      .map((d, i) => {
        const x = margin.left + (i + 0.5) * colW;
        const y = margin.top + innerH - (d.prob / 100) * innerH;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");

    // Day dividers & labels
    const dayMarkers = [];
    hourlyData.forEach((d, i) => {
      if (d.time.getHours() === 0) {
        dayMarkers.push({
          x: margin.left + i * colW,
          date: d.time,
        });
      }
    });

    return {
      width,
      height,
      margin,
      innerW,
      innerH,
      colW,
      layers,
      probPoints,
      dayMarkers,
    };
  }, [hourlyData]);

  if (loading && !dailyData.length) {
    return <div className="summary-card-container loading">{t("loadingMeteogram")}...</div>;
  }

  return (
    <div className="summary-card-container">
      {/* Top Header with Station Selector */}
      <div className="summary-header">
        <div>
          <h2 className="summary-title">{t("forecastSummary", "Quick Overview")}</h2>
          <p className="summary-subtitle">
            {station.name} — {station.loc}
          </p>
        </div>

        <label className="summary-station-select">
          <span>{t("station")}</span>
          <select
            value={activeStationId}
            onChange={(e) => setStationId(e.target.value)}
          >
            {STATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Multi-day mini metric tiles */}
      <div className="daily-grid">
        {dailyData.map((d, idx) => (
          <div key={idx} className="daily-tile">
            <span className="tile-day">
              {d.date.toLocaleDateString(i18n.language, { weekday: "short" })}
            </span>
            <span className="tile-date">{formatDateKey(d.date)}</span>

            <div className="tile-temps">
              <span className="temp-min">{d.tempMin}°</span>
              <span className="temp-max">{d.tempMax}°</span>
            </div>

            <div className="tile-precip">
              <span className="precip-icon">💧</span>
              <span className="precip-val">{d.precipProb}%</span>
            </div>
            {d.precipSum > 0 && <span className="precip-sum">{d.precipSum.toFixed(1)} mm</span>}
          </div>
        ))}
      </div>

      {/* Cloud Altitude Cross-Section */}
      {cloudPlot && (
        <div className="cloud-section">
          <div className="cloud-header">
            <h3>{t("cloudsAndPrecip", "Cloud Cover by Altitude & Rain Probability")}</h3>
            <div className="cloud-legend">
              <span className="legend-label">Cloud Density:</span>
              <span className="legend-chip cover-25">25%</span>
              <span className="legend-chip cover-50">50%</span>
              <span className="legend-chip cover-80">80%+</span>
              <span className="legend-item rain-prob-item">
                <span className="legend-line"></span> Prob. Rain (%)
              </span>
            </div>
          </div>

          <div className="cloud-svg-wrapper">
            <svg
              viewBox={`0 0 ${cloudPlot.width} ${cloudPlot.height}`}
              className="cloud-svg"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background */}
              <rect
                x={cloudPlot.margin.left}
                y={cloudPlot.margin.top}
                width={cloudPlot.innerW}
                height={cloudPlot.innerH}
                fill="#f8fafc"
                stroke="#cbd5e1"
              />

              {/* Cloud Layer Shading (High, Mid, Low) */}
              {hourlyData.map((d, i) => {
                const x = cloudPlot.margin.left + i * cloudPlot.colW;
                return cloudPlot.layers.map((l) => {
                  const val = d[l.key];
                  if (!val || val < 5) return null;
                  // Color interpolation from soft gray (10%) to dark slate (100%)
                  const alpha = Math.min(0.9, Math.max(0.12, val / 100));
                  return (
                    <rect
                      key={`${l.key}-${i}`}
                      x={x}
                      y={l.y0}
                      width={cloudPlot.colW + 0.5}
                      height={l.h}
                      fill={`rgba(51, 65, 85, ${alpha})`}
                    />
                  );
                });
              })}

              {/* Horizontal altitude band lines */}
              {cloudPlot.layers.map((l, i) => (
                <line
                  key={`sep-${i}`}
                  x1={cloudPlot.margin.left}
                  x2={cloudPlot.margin.left + cloudPlot.innerW}
                  y1={l.y0}
                  y2={l.y0}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
              ))}

              {/* Precipitation Probability Path (Purple) */}
              <path
                d={cloudPlot.probPoints}
                fill="none"
                stroke="#9333ea"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              {/* Day dividing lines */}
              {cloudPlot.dayMarkers.map((dm, i) => (
                <g key={`dm-${i}`}>
                  <line
                    x1={dm.x}
                    x2={dm.x}
                    y1={cloudPlot.margin.top}
                    y2={cloudPlot.margin.top + cloudPlot.innerH}
                    stroke="#343f4fe5"
                    strokeDasharray="6 6"
                  />
                  <text
                    x={dm.x + 6}
                    y={cloudPlot.margin.top - 4}
                    fontSize="11"
                    fontWeight="600"
                    fill="#2a323ec8"
                  >
                    {dm.date.toLocaleDateString(i18n.language, { weekday: "short" })}
                  </text>
                </g>
              ))}  

              {/* Left Axis: Altitudes */}
              {cloudPlot.layers.map((l, i) => (
                <text
                  key={`alt-${i}`}
                  x={cloudPlot.margin.left - 8}
                  y={l.y0 + l.h / 2 + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#475569"
                  fontWeight="600"
                >
                  {l.label}
                </text>
              ))}

              {/* Right Axis: Rain Probability */}
              {[0, 50, 100].map((prob) => {
                const y =
                  cloudPlot.margin.top +
                  cloudPlot.innerH -
                  (prob / 100) * cloudPlot.innerH;
                return (
                  <g key={`prob-tick-${prob}`}>
                    <text
                      x={cloudPlot.margin.left + cloudPlot.innerW + 8}
                      y={y + 4}
                      textAnchor="start"
                      fontSize="11"
                      fill="#9333ea"
                      fontWeight="600"
                    >
                      {prob}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}