import { useEffect, useMemo, useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import HelpTooltip from '../components/HelpTooltip';
import FormattedText from "./FormattedText";

import {
  MultiSelect,
  Select,
  Button,
  Group,
  Loader,
  Alert,
  Card,
  Text,
} from '@mantine/core';

import { DatePickerInput } from '@mantine/dates';

//CSS
import '@mantine/dates/styles.css';
import './historicData.css';

//STATIC
import { STATIONS } from '../constants/stations';
import { VARIABLE_OPTIONS } from '../constants/variables-options'

//Translations
import { useTranslation } from "react-i18next";

//METEOGRAM color for a clear background (not used here)
const COLORS = {
  temp: "#ff6b3a",
  dew: "#7d2cff",
  wind: "#ff1010",
  precip: "#1e63ff",
  pressure: "#001eff",
  humidity: "#008000",
  fog: "rgba(54, 80, 96, 0.72)",
  night: "rgba(92, 155, 194, 0.42)",
  grid: "rgba(150,150,150,0.45)",
  axis: "#222",
};

//Actual component
const HistoricData = () => {
  const { t } = useTranslation("common");

  // STATES
  const [selectedStation, setSelectedStation] = useState(STATIONS[1]);
  const [selectedVariables, setSelectedVariables] = useState([
    'temperature_2m',
    'relative_humidity_2m',
    'shortwave_radiation',
    'precipitation',
  ]);

  // TRANSLATE BEFORE RENDERING MULTISELECT
  const TRANSLATED_VARIABLE_OPTIONS = VARIABLE_OPTIONS.map(option => ({
    value: option.value,
    label: t('variables.'+option.labelKey),
}));

  const [dateRange, setDateRange] = useState([
    (new Date(new Date().setDate(new Date().getDate() - 7))).toISOString().split('T')[0],
    (new Date(new Date().setDate(new Date().getDate() - 2))).toISOString().split('T')[0],
  ]);

  const [weatherData, setWeatherData] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  // FORMAT DATE
  function formatDate(date) {
    //return date.toISOString().split('T')[0];   //not necessary for mantine-dates
    console.log(date)
    return date;
  }

  // FETCH FUNCTION
  async function fetchHistoricData() {

    if (!dateRange[0] || !dateRange[1]) return;

    setStatus('loading');
    setError(null);

    try {

      const params = new URLSearchParams({
        latitude: String(selectedStation.lat),
        longitude: String(selectedStation.lng),
        timezone: String(selectedStation.timezone),     /*TESTING*/
        start_date: formatDate(dateRange[0]),
        end_date: formatDate(dateRange[1]),
        wind_speed_unit: 'kmh',               
        precipitation_unit: 'mm',
        hourly: selectedVariables.join(','),
      });

      const url = `https://archive-api.open-meteo.com/v1/archive?${params.toString()}`;
      console.log(url);

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json = await res.json();

      if (!json.hourly || !json.hourly.time) {
        throw new Error('Invalid Open-Meteo response');
      }

      const rows = json.hourly.time.map((time, i) => {
        const row = {
          time,
        };
        selectedVariables.forEach((variable) => {
          row[variable] = json.hourly[variable]?.[i];
        });
        return row;
      });

      setWeatherData(rows);
      setStatus('ok');

    } catch (err) {
      console.error(err);
      setError(err.message);
      setStatus('error');

    }
  }

  // AUTO FETCH
  useEffect(() => {
    fetchHistoricData();
  }, [selectedStation]);

  // Custom export for better quality
  const chartRef = useRef(null);

  function exportHighRes() {
    const echartsInstance = chartRef.current.getEchartsInstance();
    const url = echartsInstance.getDataURL({
      type: 'png',
      pixelRatio: 5,                  //quality
      excludeComponents: ['toolbox'],
      backgroundColor: '#100132',
    });
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meteo-chart.png';
    link.click();
  }

  // ECHART OPTIONS
  const options = useMemo(() => {

    return {
      backgroundColor: '#100132',
      tooltip: {
        trigger: 'axis',            //try to increase font-size of the axis ticks when this is triggered
        axisPointer: {
          type: 'cross',
        },
        backgroundColor: '#e1deedf4',
        textStyle: {
          fontSize: 19,        
          color: '#4e4949',    
          fontFamily: 'Arial'  
        }
      },
      legend: {
        top: 10,
        textStyle: {
          color: '#ffffff',
          fontSize: 20,
        },
        padding: [12, 0,0,0],
        itemGap: 30,
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
          restore: {},
          saveAsImage: {},
          magicType: {
            type: ['line', 'bar'],
          },
        },
      },
      dataZoom: [
        {
          type: 'inside',
          cursorGrab: 'grab',                       //not working
          cursorGrabbing: 'grabbing',
          zoomOnMouseWheel: 'ctrl',
          start: 0,
          end: 100,
        },
        {
          start: 0,
          end: 100,
        },
      ],
      title: {
        label: ''         //Work on this
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '12%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: weatherData.map((row) =>
          new Date(row.time).toLocaleString(undefined, {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            year: '2-digit',        //or numeric
          })
        ),
        axisLabel: {
          color: '#ffffff',
          fontSize: 15,
        },
        axisLine: {
          lineStyle: {
            color: '#ffffff4c',
            width: 2,
          },
        },
      },

      // MULTI Y-AXES
      yAxis: selectedVariables.map((variable, index) => {

        const metadata = VARIABLE_OPTIONS.find(
          (item) => item.value === variable
        );

        // CUSTOM LIMITS
        let min = null;
        let max = null;

        switch (variable) {
          case 'temperature_2m':
            min = -10;
            max = 36;
            break;
          case 'dew_point_2m':      //same for both temperature
            min = -10;
            max = 36;
            break;  
          case 'relative_humidity_2m':
            min = 0;
            max = 100;
            break;
          case 'surface_pressure':
            min = 950;
            max = 1050;
            break;
          case 'wind_speed_10m':
            min = 0;
            max = 50;
            break;
          case 'wind_gusts_10m':
            min = 'dataMin'
            max = 'dataMax'
            break;  
          case 'precipitation':
            min = 'dataMin'          //0;     
            max = 'dataMax'          //20;
            break;
          case 'shortwave_radiation':
            min = 0;  
            max = 1400;             //a high max pushed this line down, which is good for visuals
            break;
          default:
            min = 'dataMin';
            max = 'dataMax';
        }
        return {
          type: 'value',
          name: `${t('variables.'+metadata?.labelKey)}`,
          nameTextStyle: {
            fontSize: 18,
            padding: [34, 0, 12, 0],
          },
          nameLocation: 'center', 
          min,
          max,
          position: index % 2 === 0 ? 'left' : 'right',    //sweet sintax
          offset: Math.floor(index / 2) * 70,
          axisLine: {
            show: true,
            lineStyle: {
              color: metadata?.color,
            },
          },
          axisLabel: {
            color: metadata?.color,
            fontSize: 18,
          },
          splitLine: {
            show: index === 0,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.21)',
            },
          },
        };
      }),

      // SERIES
      series: selectedVariables.map((variable, index) => {
        const metadata = VARIABLE_OPTIONS.find(
          (item) => item.value === variable
        );

        return {
          name: `${t('variables.'+metadata?.labelKey)}`,
          type: metadata?.type || 'line',
          yAxisIndex: index,
          data: weatherData.map((row) => row[variable]),
          smooth: true,
          showSymbol: false,
          itemStyle: {
            color: metadata?.color,
          },
          lineStyle: {
            color: metadata?.color,
            width: 2.4,
          },
        };
      }),
    };

  }, [weatherData, selectedVariables]);

  // COMPONENT
  return (
    <div className="historic-dashboard-container">
      <Card
        shadow="xl"
        radius="xl"
        padding="lg"
        className="historic-dashboard-card"
      >
        {/* HEADER */}
        <div className="dashboard-header">
          <Text 
            size="xl" 
            fw={700} 
            variant="gradient"
            gradient={{ from: '#1b3f02', to: '#d50505', deg: 45 }}   
          >
            {t("historic.title")}
          </Text>
          <span>
            <HelpTooltip helpKey={t("historic.help")} placement='right'/>
          </span>
        </div>
        <Text size="sm" c="dimmed">
          {t("historic.subtitle")}
        </Text>

        {/* CONTROLS */}
        <div className="historic-dashboard-controls">
          <Select
            label={t("station")}
            placeholder="Select station"
            data={STATIONS.map((station) => ({
              value: String(station.id),
              label: station.name,
            }))}
            value={String(selectedStation.id)}
            onChange={(value) => {
              const station = STATIONS.find(
                (s) => s.id === value             //string
              );
              setSelectedStation(station);
            }}
          />
          <MultiSelect
            label="Variables"
            placeholder={t("selectVar")+'s'}
            data={TRANSLATED_VARIABLE_OPTIONS}
            value={selectedVariables}
            onChange={setSelectedVariables}
            searchable
            clearable
          />
          <DatePickerInput
            type="range"
            label={t("dateRange")}
            placeholder="Pick dates"
            value={dateRange}
            onChange={setDateRange}
            maxDate={new Date()}
          />
          <Group justify="flex-end">
            <Button
              radius="md"
              onClick={fetchHistoricData}
              disabled={!selectedVariables.length}
              icon={<ion-icon name="rainy-outline"></ion-icon>}
            >
              {t("plotData")}
            </Button>
            <Button onClick={exportHighRes} color="#0ba51a">
              {t("exportChart")}
            </Button>
          </Group>
        </div>

        {/* LOADING */}
        {status === 'loading' && (
          <div className="loading-container">
            <Loader 
              size="lg"
              icon={<ion-icon name="rainy-outline"></ion-icon>} 
            />
          </div>
        )}
        {/* ERROR */}
        {status === 'error' && (
          <Alert
            icon={<ion-icon name="alert-circle-outline"></ion-icon>}
            title="Error"
            color="red"
            radius="md"
          >
            {error}
          </Alert>
        )}

        {/* CHART */}
        {status === 'ok' && (
          <div className="chart-container">
            <ReactECharts
              ref={chartRef}
              option={options}
              style={{
                height: '600px',
                width: '100%',
              }}
              notMerge={false}        //IDK what this does
              lazyUpdate={true}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default HistoricData;


/*
TASK: add a dynamic y_lim to the precipitation axis
TASK: select different quality for the save plot option:
https://echarts.apache.org/en/api.html#echartsInstance.getDataURL
See: https://chatgpt.com/share/6a12c0d8-a750-83e9-bc41-458a7e4fd4b8

TASK: add title to chart to indicate station and location
TASK: evaluate if it's better to automatically update chart (just add dependencies: [selectedStation, selectedVariables, dateRange])

// TASK: add a highlight feature to the chart, kinda like the one in Open-Meteo website.
they're using highcharts, which look so aesthetic
// TASK: add button to select all variables at once

*/

