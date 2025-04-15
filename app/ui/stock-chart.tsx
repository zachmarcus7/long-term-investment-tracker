// components/StockChart.tsx
'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

interface StockDataPoint {
  t: number;
  c: number;
}

interface StockChartProps {
  data: StockDataPoint[];
}

export default function StockChart({ data }: StockChartProps) {
  const chartData = {
    labels: data.map(point => new Date(point.t)),
    datasets: [
      {
        label: 'Closing Price',
        data: data.map(point => point.c),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
        tension: 0.2,
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'month' as const,
        },
        title: {
          display: true,
          text: 'Date',
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
}
