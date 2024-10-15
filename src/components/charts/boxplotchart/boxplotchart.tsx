'use client';

import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import Loading from '@/components/loading/loading';

export default function BoxplotChart() {
  const [chartData, setChartData] = useState<any>({
    series: [],
    categories: ['Temperatura', 'Umidade'],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/charts/boxplotchart?startDate=2024-09-20&endDate=2024-09-30');
        const result = await response.json();

        if (result.status === 200) {
          const { temperature, humidity } = result.data;

          setChartData({
            series: [
              {
                name: 'Boxplot',
                type: 'boxPlot',
                data: [
                  {
                    x: 'Temperatura (°C)',
                    y: [temperature.min, temperature.q1, temperature.median, temperature.q3, temperature.max],
                  },
                  {
                    x: 'Umidade (%)',
                    y: [humidity.min, humidity.q1, humidity.median, humidity.q3, humidity.max],
                  },
                ],
              },
            ],
          });
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: 'boxPlot',
      height: 350,
    },
    plotOptions: {
      boxPlot: {
        colors: {
          upper: '#5C4742',
          lower: '#A5978B',
        },
      },
    },
    xaxis: {
      categories: chartData.categories,
    },
    title: {
      text: 'Distribuição de Temperatura e Umidade',
      align: 'center',
    },
  };

  if (chartData.series.length === 0) {
    return <Loading />;
  }

  return <Chart options={options} series={chartData.series} type='boxPlot' height={350} />;
}
