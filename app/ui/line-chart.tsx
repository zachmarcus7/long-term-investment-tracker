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
    maintainAspectRatio: false,
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
        title: { display: false },
        ticks: { 
          color: 'oklch(70.5% 0.015 286.067)',
          maxTicksLimit: 12
        },
        grid: { display: false }
      },
      y: {
        title: { display: false },
        ticks: { color: 'oklch(70.5% 0.015 286.067)' },
        grid: { 
          color: 'oklch(96.7% 0.001 286.375)'
        },
        border: {
          dash: [6, 6]
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  };

  return <Line data={chartData} options={options} />;
}