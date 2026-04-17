import React from 'react';
import ReactECharts from 'echarts-for-react';

const MeteogramDashboard = () => {
  // Insert the mockWeatherData from above here
  const mockWeatherData = [
  // Generating 24 hours of data (00:00 to 23:30)
  ...Array.from({ length: 48 }).map((_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    const time = `2026-04-15 ${hour.toString().padStart(2, '0')}:${minute}`;
    
    // Simulate realistic diurnal cycles
    return {
      time,
      temp: (15 + 5 * Math.sin((i - 20) / 10)).toFixed(1), // Peaks mid-afternoon
      dew: (10 + 2 * Math.sin((i - 15) / 15)).toFixed(1),
      windSpd: (Math.random() * 15 + 5).toFixed(1),
      precip: i > 16 && i < 22 ? (Math.random() * 2).toFixed(1) : 0, // Morning rain
      press: (1013 - i * 0.1 + Math.random() * 0.5).toFixed(1), // Slight drop
      hum: (70 - 10 * Math.sin((i - 20) / 10)).toFixed(1)
    };
  })
];
  
  const data = mockWeatherData; 

  const option = {
    backgroundColor: '#fff',
    title: { text: 'Vista Detallada - REMCI-UV', left: 'center', top: 10 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      axisPointer: { type: 'cross', link: { xAxisIndex: 'all' } }
    },
    // This connects the tooltips and zoom across all 3 charts
    axisPointer: { link: { xAxisIndex: 'all' } },
    grid: [
      { left: 60, right: 60, top: '10%', height: '22%' },
      { left: 60, right: 60, top: '40%', height: '22%' },
      { left: 60, right: 60, top: '70%', height: '22%' }
    ],
    xAxis: [
      { gridIndex: 0, type: 'category', data: data.map(d => d.time), axisLabel: { show: false } },
      { gridIndex: 1, type: 'category', data: data.map(d => d.time), axisLabel: { show: false } },
      { gridIndex: 2, type: 'category', data: data.map(d => d.time), axisLabel: { rotate: 45, fontSize: 10 } }
    ],
    yAxis: [
      { gridIndex: 0, name: '°C', type: 'value', scale: true },
      { gridIndex: 1, name: 'km/h', type: 'value' },
      { gridIndex: 1, name: 'mm', type: 'value', position: 'right' },
      { gridIndex: 2, name: 'hPa', type: 'value', min: 1000, max: 1025 },
      { gridIndex: 2, name: '%', type: 'value', position: 'right', max: 100 }
    ],
    series: [
      {
        name: 'Temp',
        type: 'line',
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: data.map(d => d.temp),
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 3, color: '#ff7043' }
      },
      {
        name: 'Viento',
        type: 'line',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data.map(d => d.windSpd),
        areaStyle: { color: 'rgba(244, 67, 54, 0.1)' },
        itemStyle: { color: '#f44336' }
      },
      {
        name: 'Lluvia',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 2,
        data: data.map(d => d.precip),
        itemStyle: { color: '#42a5f5' }
      },
      {
        name: 'Presión',
        type: 'line',
        xAxisIndex: 2,
        yAxisIndex: 3,
        data: data.map(d => d.press),
        itemStyle: { color: '#1e88e5' }
      },
      {
        name: 'Humedad',
        type: 'line',
        xAxisIndex: 2,
        yAxisIndex: 4,
        data: data.map(d => d.hum),
        itemStyle: { color: '#43a047' }
      }
    ],
    // DataZoom allows you to scrub through the time-series
    dataZoom: [
      { type: 'inside', xAxisIndex: [0, 1, 2], start: 0, end: 100 },
      { type: 'slider', xAxisIndex: [0, 1, 2], top: '95%', start: 0, end: 100 }
    ]
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '12px' }}>
      <ReactECharts option={option} style={{ height: '700px', width: '100%' }} />
    </div>
  );
};

export default MeteogramDashboard;
