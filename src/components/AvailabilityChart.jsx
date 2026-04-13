import ReactECharts from 'echarts-for-react';

const AvailabilityChart = ({
  data,
  chartType,
  selectedVar
}) => {

  const getOptions = () => {

    if (chartType === 'bar') {
      return {
        title: { text: `${selectedVar} Availability`, left: 'center' },
        tooltip: { trigger: 'item' },
        series: [{
          type: 'bar',
          radius: '60%',
          data: data.map((d, i) => ({
            value: d.value,
            name: `Bin ${i+1}`
          }))
        }]
      };
    }

    return {
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: data.map((_, i) => `Bin ${i+1}`)
      },
      toolbox: {
        feature: {
        dataZoom: {
        yAxisIndex: 'none'
        },
          restore: {},
          saveAsImage: {}
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
      yAxis: { type: 'value', max: 100 },
      series: [{
        name: selectedVar,
        type: chartType,
        data: data.map(d => d.value),
        smooth: chartType === 'line'
      }]
    };
  };

  return (
    <ReactECharts option={getOptions()} style={{ height: '100%' }} />
  );
};

export default AvailabilityChart;
