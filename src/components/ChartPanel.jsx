import ReactECharts from 'echarts-for-react';

const ChartPanel = ({ plotData }) => {

  const getOptions = () => ({
    tooltip: { trigger: 'axis' },
    legend: { data: ['Temperature', 'Humidity'] },
    xAxis: { type: 'category', data: plotData.map(d => d.time) },
    yAxis: [{ type: 'value' }, { type: 'value', max: 100 }],
    series: [
      {
        name: 'Temperature',
        type: 'bar',
        data: plotData.map(d => d.temp)
      },
      {
        name: 'Humidity',
        type: 'line',
        yAxisIndex: 1,
        data: plotData.map(d => d.humidity)
      }
    ]
  });

  return <ReactECharts option={getOptions()} style={{ height: '100%' }} />;
};

export default ChartPanel;
