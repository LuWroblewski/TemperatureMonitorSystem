'use client';

import Loading from '@/components/loading/loading';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

interface DataItem {
  interval_time: string;
  avg_temperature: string;
  avg_humidity: string;
}

interface ChartData {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

export default function LineWithConfortLine() {
  const [chartData, setChartData] = useState<ChartData>({ series: [], categories: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/charts/lineWithConfortLine?startDate=2024-09-20&endDate=2024-09-30');
        const result = await response.json();

        if (result.status === 200) {
          const temperatures = result.data.map((item: DataItem) => parseFloat(item.avg_temperature));
          const humidities = result.data.map((item: DataItem) => parseFloat(item.avg_humidity));
          const timestamps = result.data.map((item: DataItem) => {
            const date = new Date(item.interval_time);
            return date.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });
          });

          setChartData({
            series: [
              { name: 'Temperatura (°C)', data: temperatures },
              { name: 'Umidade (%)', data: humidities },
            ],
            categories: timestamps,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: { id: 'comfort-chart' },
    xaxis: {
      categories: chartData.categories,
    },
    annotations: {
      yaxis: [
        {
          y: 22,
          y2: 25,
          borderColor: '#F60',
          fillColor: '#F60',
          opacity: 0.2,
          label: { text: 'Faixa Ideal de Temperatura' },
        },
        {
          y: 60,
          y2: 80,
          borderColor: '#FF4560',
          fillColor: '#FF4560',
          opacity: 0.2,
          label: { text: 'Faixa Ideal de Umidade' },
        },
      ],
    },
  };

  if (chartData.series.length === 0) {
    return <Loading />;
  }

  return <Chart options={options} series={chartData.series} type='line' height={350} />;
}
