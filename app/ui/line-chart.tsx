'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { StockDataPoint } from '@/app/lib/definitions';

ChartJS.register(Filler);
ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function LineChart({
  data,
  positive
}: {
  data: StockDataPoint[];
  positive: boolean
}) {
  const chartData = {
    labels: data.map(point => new Date(point.t)),
    datasets: [
      {
        label: 'Price',
        data: data.map(point => point.c),
        borderColor: 'oklch(69.6% 0.17 162.48)',
        borderWidth: 1.5,
        fill: true,
        fillColor: "red",
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: (ctx: { chart: ChartJS }) => {
          const chart = ctx.chart;
          const { chartArea, ctx: canvasCtx } = chart;
        
          // Make sure chartArea is available
          if (!chartArea) {
            return 'rgba(75, 192, 192, 0.2)';
          }
        
          const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'oklch(76.5% 0.177 163.223 / 0.3)');
          gradient.addColorStop(1, 'oklch(76.5% 0.177 163.223 / 0)');
        
          return gradient;
        }
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'month' as const,
          displayFormats: {
            month: 'MMM',
          },
          tooltipFormat: 'MMM d, yyyy',
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
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Line data={chartData} options={options} />;
}