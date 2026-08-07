import React, { useEffect, useMemo, useState } from "react";

//COMPONENTS
import HelpTooltip from "./HelpTooltip"

//Translations
import { useTranslation } from "react-i18next";

//CSS
import './meteogram.css'

//STATIC
import { STATIONS } from "../constants/stations";

// Self-contained SVG meteogram for React.
// It fetches hourly Open-Meteo data and draws:
// 1) Temperature / dew point / fog bars
// 2) Wind speed / wind direction arrows / precipitation
// 3) Pressure / relative humidity

const COLORS = {
  temp: "#ff6b3a",
  dew: "#7d2cff",
  wind: "#ff1010ee",
  wind2: "#ff1010cd",
  arrow:"#c80505",
  precip: "#151be1",
  pressure: "#001effd0",
  humidity: "#008000cf",
  fog: "rgba(54, 80, 96, 0.72)",
  night: "rgba(11, 148, 233, 0.42)",
  grid: "rgba(150, 150, 150, 0.46)",
  axis: "#131212",
};

const FONTS = {
  unit_label: '22',
  var_label: '22',
  ticks: '18',
  date_label: '24',
  hours: '19',
};

function niceFloor(x, step) {
  return Math.floor(x / step) * step;
}

function niceCeil(x, step) {
  return Math.ceil(x / step) * step;
}

function clamp(x, a, b) {
  return Math.max(a, Math.min(b, x));
}

function formatDateLabel(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${d}-${m}-${y}`;            
}

function formatHour(date) {
  return String(date.getHours()).padStart(2, "0");
}

function parseLocalTime(s) {
  // Open-Meteo with timezone=America/Santiago returns local time strings without Z.
  // Constructing Date(y,m,d,h) keeps them as local browser-time values for plotting.
  const [datePart, timePart] = s.split("T");
  const [y, m, d] = datePart.split("-").map(Number);
  const [hh, mm = 0] = timePart.split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm, 0);
}

function toFixedIfNeeded(x, digits = 1) {
  if (x == null || Number.isNaN(x)) return "--";
  return Number.isInteger(x) ? String(x) : x.toFixed(digits);
}

function makeFallbackData() {
  // Synthetic fallback only for preview environments where external fetch may be blocked.
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - 1);

  const hourly = [];
  for (let i = 0; i < 24 * 5; i++) {
    const t = new Date(start.getTime() + i * 3600_000);
    const hour = t.getHours();
    const dayWave = Math.sin(((hour - 7) / 24) * 2 * Math.PI);
    const synoptic = Math.sin((i / 36) * 2 * Math.PI);
    const temp = 15 + 4.2 * dayWave + 2.2 * synoptic + (Math.random() - 0.5) * 0.6;
    const rh = clamp(76 - 26 * dayWave + 18 * Math.sin(i / 11) + Math.random() * 8, 25, 100);
    const dew = temp - (100 - rh) / 5.2;
    const wind = clamp(5 + 6 * Math.max(0, dayWave) + 2.5 * Math.sin(i / 5) + Math.random() * 3, 0, 28);
    const dir = (230 + 35 * Math.sin(i / 6) + Math.random() * 55) % 360;
    const precip = Math.random() > 0.91 ? Math.random() * 2.5 : 0;
    const pressure = 1012 + 2.5 * Math.sin(i / 17) + 1.6 * Math.sin(i / 7);
    const visibility = rh > 94 && hour < 10 ? 350 : 12000;
    hourly.push({ time: t, temp, dew, rh, wind, dir, precip, pressure, visibility });
  }
  return hourly;
}

function transformOpenMeteo(json) {
  const h = json.hourly;
  return h.time.map((time, i) => ({
    time: parseLocalTime(time),
    temp: h.temperature_2m?.[i],
    dew: h.dew_point_2m?.[i],
    rh: h.relative_humidity_2m?.[i],
    wind: h.wind_speed_10m?.[i],
    dir: h.wind_direction_10m?.[i],
    precip: h.precipitation?.[i],
    pressure: h.surface_pressure?.[i],
    visibility: h.visibility?.[i],
  }));
}

function getSegmentsByDay(data) {
  const byDay = new Map();
  data.forEach((d) => {
    const key = formatDateLabel(d.time);
    if (!byDay.has(key)) byDay.set(key, []);
    byDay.get(key).push(d);
  });
  return [...byDay.entries()].map(([date, rows]) => ({ date, rows }));
}

// Actual Component
function Meteogram({ refreshMinutes = 2 }) {
  const { t,i18n } = useTranslation("common");

  const [selectedLocationId, setSelectedLocationId] = useState(STATIONS[0].id);

  const selectedLocation = useMemo(
    () => STATIONS.find((loc) => loc.id === selectedLocationId) ?? STATIONS[0],
    [selectedLocationId]
  );

  const { lat, lng, timezone, loc } = selectedLocation;
  const [rows, setRows] = useState([]);
  const [lastAttempt, setLastAttempt] = useState(null);
  const [lastSuccess, setLastSuccess] = useState(null);
  const [status, setStatus] = useState("loading");

  async function fetchMeteogram() {
    setLastAttempt(new Date());
    setStatus("loading");

    const params = new URLSearchParams({
      latitude: String(lat),
      longitude: String(lng),
      timezone,
      past_days: "1",
      forecast_days: "5",
      wind_speed_unit: "kmh",
      precipitation_unit: "mm",           //Testing, this might be causing the precipitation error 
      hourly:
        "temperature_2m,dew_point_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,wind_direction_10m,precipitation,visibility",
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setRows(transformOpenMeteo(json));
      setLastSuccess(new Date());
      setStatus("ok");
    } catch (err) {
      console.warn("Using synthetic fallback data because fetch failed:", err);
      setRows(makeFallbackData());
      setStatus("fallback");
    }
  }

  useEffect(() => {
    fetchMeteogram();
    const id = setInterval(fetchMeteogram, refreshMinutes * 60_000);
    return () => clearInterval(id);
  }, [lat, lng, timezone, loc, refreshMinutes]);

  const plot = useMemo(() => {
    if (!rows.length) return null;

    const width = 1400;
    const height = 750;
    const margin = { left: 72, right: 104, top: 40, bottom: 0 };
    const gap = 64;
    const rowH = 152;
    const row1Y = margin.top;
    const row2Y = row1Y + rowH + gap;
    const row3Y = row2Y + rowH + gap;
    const innerW = width - margin.left - margin.right;

    const t0 = rows[0].time.getTime();
    const t1 = rows[rows.length - 1].time.getTime();
    const x = (date) => margin.left + ((date.getTime() - t0) / (t1 - t0)) * innerW;

    const vals = (key) => rows.map((d) => d[key]).filter((v) => v != null && !Number.isNaN(v));

    const tempMin = Math.min(...vals("temp"), ...vals("dew"), 0);
    const tempMax = Math.max(...vals("temp"), ...vals("dew"));
    const yTempMin = Math.min(-10, niceFloor(tempMin, 5));
    const yTempMax = Math.max(25, niceCeil(tempMax, 5));

    const windMax = Math.max(50, niceCeil(Math.max(...vals("wind")), 10));
    const precipMax = Math.max(20, niceCeil(Math.max(...vals("precip")), 2));

    const pMin = niceFloor(Math.min(...vals("pressure")) - 2, 5);
    const pMax = niceCeil(Math.max(...vals("pressure")) + 2, 5);

    const y = (value, min, max, top, h = rowH) => top + h - ((value - min) / (max - min)) * h;

    const linePath = (key, min, max, top) =>
      rows
        .map((d, i) => `${i === 0 ? "M" : "L"} ${x(d.time).toFixed(2)} ${y(d[key], min, max, top).toFixed(2)}`)
        .join(" ");

    // Bars for precipitation
    const barPlot = (key, min, max, top, color, scale = 0.77) => {
      const dx = innerW / Math.max(1, rows.length - 1);
      const barW = dx * scale;

      return rows.map((d, i) => {
        const value = d[key];
        if (value == null || Number.isNaN(value) || value <= 0) return null;

        const yTop = y(value, min, max, top);
        const yBottom = y(0, min, max, top);

        return (
          <rect
            key={`${key}-${i}`}
            x={x(d.time) - barW / 2}
            y={Math.min(yTop, yBottom)}
            width={barW}
            height={Math.abs(yBottom - yTop)}
            rx='2'
            ry='2'
            fill={color}
          />
        );
      });
    };

    const yTicks = (min, max, step) => {
      const out = [];
      for (let v = niceCeil(min, step); v <= max + 1e-9; v += step) out.push(v);
      return out;
    };

    const daySegments = getSegmentsByDay(rows);
    const sixHourTicks = rows.filter((d) => d.time.getHours() % 6 === 0);
    const zeroY = y(0, yTempMin, yTempMax, row1Y);

    //const dateLabels = daySegments.map(({ date, rows: ds }) => {
    //  const mid = ds[Math.floor(ds.length / 2)]?.time ?? ds[0].time;
    //  return { date, x: x(mid) };
    //});

    //TEST
    const dateLabels = daySegments.map(({ date, rows: ds }) => {
      const mid = ds[Math.floor(ds.length / 2)]?.time ?? ds[0].time;
      return {
        date,
        time: mid,
        x: x(mid),
      };
    });

    function Grid({ top, leftTicks, rightTicks, leftMin, leftMax, rightMin, rightMax }) {
      return (
        <g>
          <rect x={margin.left} y={top} width={innerW} height={rowH} fill="white" stroke={COLORS.axis} strokeWidth="1.2" />

          {daySegments.map(({ date, rows: ds }, idx) => {
            const x0 = x(ds[0].time);
            const x1 = x(ds[ds.length - 1].time) + innerW / Math.max(1, rows.length - 1);
            // Simple visual approximation: shade alternating nighttime blocks as full-day blocks,
            // matching the original matplotlib meteogram's blue background intervals.
            return idx % 2 === 0 ? (
              <rect key={date} x={x0} y={top} width={x1 - x0} height={rowH} fill={COLORS.night} />
            ) : null;
          })}

          {sixHourTicks.map((d, i) => (
            <line key={`v-${top}-${i}`} x1={x(d.time)} x2={x(d.time)} y1={top} y2={top + rowH} stroke={COLORS.grid} />
          ))}

          {leftTicks.map((v) => (
            <g key={`lh-${top}-${v}`}>
              <line x1={margin.left} x2={margin.left + innerW} y1={y(v, leftMin, leftMax, top)} y2={y(v, leftMin, leftMax, top)} stroke={COLORS.grid} />
            </g>
          ))}

          {leftTicks.map((v) => (
            <text key={`ly-${top}-${v}`} x={margin.left - 10} y={y(v, leftMin, leftMax, top) + 5} textAnchor="end" fontSize={FONTS.ticks} fill={COLORS.axis}>
              {v}
            </text>
          ))}

          {rightTicks?.map((v) => (
            <text key={`ry-${top}-${v}`} x={margin.left + innerW + 10} y={y(v, rightMin, rightMax, top) + 5} textAnchor="start" fontSize={FONTS.ticks} fill={COLORS.axis}>
              {v}
            </text>
          ))}
        </g>
      );
    }

    function AxisHours({ top }) {
      return (
        <g>
          {sixHourTicks.map((d, i) => (
            <text key={`hour-${top}-${i}`} x={x(d.time)} y={top + rowH + 22} textAnchor="middle" fontSize={FONTS.hours} fill="#111">
              {formatHour(d.time)}
            </text>
          ))}
        </g>
      );
    }

    // downward arrow -> North wind ; upward arrow -> south wind  (adding the Math.PI) 
    function WindArrow({ cx, cy, dir }) {
      const len = 16;
      const angle = Math.PI + ((dir - 90) * Math.PI) / 180;      // Meteo angles != math angles
      const x2 = cx + len * Math.cos(angle);
      const y2 = cy + len * Math.sin(angle);
      const head = len * 3/7;
      const a1 = angle + Math.PI * 0.82;          
      const a2 = angle - Math.PI * 0.82;
      return (
        <g stroke={COLORS.arrow} fill="none" strokeWidth="2">
          <line x1={cx} y1={cy} x2={x2} y2={y2} />
          <line x1={x2} y1={y2} x2={x2 + head * Math.cos(a1)} y2={y2 + head * Math.sin(a1)} />
          <line x1={x2} y1={y2} x2={x2 + head * Math.cos(a2)} y2={y2 + head * Math.sin(a2)} />
        </g>
      );
    }

    return {
      width,
      height,
      margin,
      innerW,
      rowH,
      row1Y,
      row2Y,
      row3Y,
      yTempMin,
      yTempMax,
      windMax,
      precipMax,
      pMin,
      pMax,
      x,
      y,
      linePath,
      barPlot,
      yTicks,
      zeroY,
      sixHourTicks,
      dateLabels,
      Grid,
      AxisHours,
      WindArrow,
    };
  }, [rows]);

  if (!plot) {
    return <div className="meteogram-card">{t("loadingMeteogram")}...</div>;
  }

  const {
    width,
    height,
    margin,
    innerW,
    rowH,
    row1Y,
    row2Y,
    row3Y,
    yTempMin,
    yTempMax,
    windMax,
    precipMax,
    pMin,
    pMax,
    x,
    y,
    linePath,
    barPlot,
    yTicks,
    zeroY,
    dateLabels,
    Grid,
    AxisHours,
    WindArrow,
  } = plot;

  const fmtTime = (d) =>
    d
      ? new Intl.DateTimeFormat("en-GB", {
          timeZone: "Etc/GMT+4",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(d)
      : "--:--:--";

  /* Actual return */
  return (
    <div className="meteogram-card">
      <div className="meteogram-header">
        <div>
          <h2>
            {t("meteogram")}
            <span>
              <HelpTooltip helpKey={t("helpMeteogram")} placement='right'/>
            </span>
          </h2>
          <p>
            {t("openMeteoData")} · {selectedLocation.name} - {loc} · lat {lat}, lon {lng}
          </p>
        </div>

        <label className="station-selector">
          <span>{t("station")}</span>
          <select
            value={selectedLocationId}
            onChange={(event) => setSelectedLocationId(event.target.value)}   //this is always a STRING
          >
            {STATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </label>
        <div className="meteogram-status">
          <span className={status === "ok" ? "status-ok" : "status-fallback"}>{status === "ok" ? "live" : "fallback"}</span>
          <span>Attempt: {fmtTime(lastAttempt)} GMT-4</span>
          <span>Success: {fmtTime(lastSuccess)} GMT-4</span>
        </div>
      </div>

      <div className="meteogram-scroll">
        <svg viewBox={`0 0 ${width} ${height}`} className="meteogram-svg" role="img" aria-label="Meteorological meteogram">
          {/* Row 1: Temperature, dew point, fog */}
          <Grid top={row1Y} leftTicks={yTicks(yTempMin, yTempMax, 5)} rightTicks={yTicks(yTempMin, yTempMax, 5)} leftMin={yTempMin} leftMax={yTempMax} rightMin={yTempMin} rightMax={yTempMax} />
          <line x1={margin.left} x2={margin.left + innerW} y1={zeroY} y2={zeroY} stroke="#001eff" strokeWidth="1.3" />
          {rows.map((d, i) => {
            const barW = innerW / Math.max(1, rows.length - 1) * 0.78;
            const isFog = d.visibility != null && d.visibility < 1000;
            if (!isFog) return null;
            return <rect key={`fog-${i}`} x={x(d.time) - barW / 2} y={zeroY} width={barW} height={row1Y + rowH - zeroY} fill={COLORS.fog} />;
          })}
          <path d={linePath("temp", yTempMin, yTempMax, row1Y)} fill="none" stroke={COLORS.temp} strokeWidth="2.4" />
          <path d={linePath("dew", yTempMin, yTempMax, row1Y)} fill="none" stroke={COLORS.dew} strokeWidth="2.4" />
          <AxisHours top={row1Y} />

          <text x={margin.left + 10} y={row1Y - 14} fill={COLORS.temp} fontSize={FONTS.var_label}>{t("variables2.temp")}</text>
          <text x={margin.left + innerW - 150} y={row1Y - 14} fill={COLORS.dew} fontSize={FONTS.var_label}>{t("variables2.dew")}</text>
          <text x={margin.left - 95} y={row1Y + rowH / 2} transform={`rotate(-90 ${margin.left - 56} ${row1Y + rowH / 2})`} fontSize={FONTS.unit_label}>°Celsius</text>
          <text x={margin.left + innerW + 60} y={row1Y + rowH - 10} transform={`rotate(-90 ${margin.left + innerW + 60} ${row1Y + rowH - 10})`} fill="gray" fontSize={FONTS.var_label-3}>{t("variables2.fog")}*</text>

          {/* Row 2: Wind, arrows, precipitation */}
          <Grid top={row2Y} leftTicks={yTicks(0, windMax, 10)} rightTicks={yTicks(0, precipMax, 4)} leftMin={0} leftMax={windMax} rightMin={0} rightMax={precipMax} />
          {barPlot("precip", 0, precipMax, row2Y, COLORS.precip)}
          <path d={linePath("wind", 0, windMax, row2Y)} fill='none' stroke={COLORS.wind2} strokeWidth="2.8" />
          {rows.map((d, i) => {
            if (i % 3 !== 0) return null;
            return <WindArrow key={`arrow-${i}`} cx={x(d.time)} cy={row2Y + 30} dir={d.dir ?? 0} />;
          })}
          <AxisHours top={row2Y} />
          <text x={margin.left + 10} y={row2Y - 10} fill={COLORS.wind} fontSize={FONTS.var_label}>{t("variables2.wind")}</text>
          <text x={margin.left + innerW - 140} y={row2Y - 10} fill={COLORS.precip} fontSize={FONTS.var_label}>{t("variables2.cumulativeRainfall")}</text>
          <text x={margin.left - 56} y={row2Y + rowH / 2} transform={`rotate(-90 ${margin.left - 56} ${row2Y + rowH / 2})`} fill={COLORS.wind} fontSize={FONTS.unit_label}>km/h</text>
          <text x={margin.left + innerW + 54} y={row2Y + rowH / 2} transform={`rotate(-90 ${margin.left + innerW + 54} ${row2Y + rowH / 2})`} fill={COLORS.precip} fontSize={FONTS.unit_label}>mm</text>

          {/* Row 3: Pressure and humidity */}
          <Grid top={row3Y} leftTicks={yTicks(pMin, pMax, 5)} rightTicks={yTicks(0, 100, 20)} leftMin={pMin} leftMax={pMax} rightMin={0} rightMax={100} />
          <path d={linePath("pressure", pMin, pMax, row3Y)} fill="none" stroke={COLORS.pressure} strokeWidth="2.6" />
          <path d={linePath("rh", 0, 100, row3Y)} fill="none" stroke={COLORS.humidity} strokeWidth="2.6" />
          <AxisHours top={row3Y + 0} />
          <text x={margin.left + 10} y={row3Y - 10} fill={COLORS.pressure} fontSize={FONTS.var_label}>{t("variables2.pressure")}</text>
          <text x={margin.left + innerW - 190} y={row3Y - 10} fill={COLORS.humidity} fontSize={FONTS.var_label}>{t("variables2.humidity")}</text>
          <text x={margin.left - 56} y={row3Y + rowH / 2} transform={`rotate(-90 ${margin.left - 56} ${row3Y + rowH / 2})`} fill={COLORS.pressure} fontSize={FONTS.unit_label}>hPa</text>
          <text x={margin.left + innerW + 54} y={row3Y + rowH / 2} transform={`rotate(-90 ${margin.left + innerW + 54} ${row3Y + rowH / 2})`} fill={COLORS.humidity} fontSize={FONTS.unit_label}>%</text>

          {/* Bottom date labels */}
          {dateLabels.map((d) => (
            <g key={d.date}>
              <text
                x={d.x}
                y={height - 65}
                textAnchor="middle"
                fontSize={FONTS.date_label}
                fontWeight="700"
                fill="#111"
              >
                {d.date}
              </text>

              <text
                x={d.x}
                y={height - 45}
                textAnchor="middle"
                fontSize={FONTS.date_label - 4}
                fill="#666"
              >
                {d.time.toLocaleDateString(i18n.language, {weekday: "short",})}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <p><strong>↑</strong>: Viento Norte.</p>
      <p> ➜: Viento Oeste.</p>
      <p>* Desde Open-Meteo se obtiene la variable <strong>visibilidad</strong>. Ver <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">OpenMeteo-Doc</a> para más información</p>
      <p>Gráfica inspirada en <a href="https://ifa.uv.cl/pronostico/valpo/es/costa/valparaiso" target="_blank" rel="noopener noreferrer">PronosticoIFA</a></p>
    </div>
  );
}

export default function Meteogram2() {
  return <Meteogram refreshMinutes={2} />;
}


//TASK: add a marking shadow for winds associated with precipitation (e.g., north wind for Villa Alemana ) 
//TASK: add instruction on how to use the website

/*
NOTE: The SVG <text> element has seven basic attributes to position and rotate the text
*/


/*
const LOCATIONS = [
  {
    id: "station-1",
    name: "Ciencias UV — Valparaíso",
    latitude: -33.02705,
    longitude: -71.63875,    
    timezone: "America/Santiago",
  },
  {
    id: "station-2",
    name: "La Reserva — Villa Alemana",
    latitude: -33.04374,
    longitude: -71.33947,
    timezone: "America/Santiago",
  },
  {
    id: "station-3",
    name: "Pocuro UV — Los Andes",
    latitude: -32.86967,
    longitude: -70.61523,
    timezone: "America/Santiago",
  },
];            TESTING importing form stations.js instead
*/    