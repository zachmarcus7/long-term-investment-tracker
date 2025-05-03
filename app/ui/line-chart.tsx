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
        borderColor: positive ? 'oklch(69.6% 0.17 162.48)' : 'oklch(0.67 0.18 21.29)',
        borderWidth: 1.5,
        fill: true,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
        backgroundColor: (ctx: { chart: ChartJS }) => {
          const chart = ctx.chart;
          const { chartArea, ctx: canvasCtx } = chart;
        
          // Make sure chartArea is available
          if (!chartArea) {
            return 'oklch(0.76 0.04 269.54 / 0.3)';
          }
        
          const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

          if (positive) {
            gradient.addColorStop(0, 'oklch(76.5% 0.177 163.223 / 0.3)');
            gradient.addColorStop(1, 'oklch(76.5% 0.177 163.223 / 0)');
          } else {
            gradient.addColorStop(1, 'oklch(0.73 0.16 19.95 / 0.1)');
            gradient.addColorStop(0, 'oklch(0.73 0.16 19.95 / 0.7)');
          }
        
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
          color: 'oklch(0.76 0.04 269.54)',
          maxTicksLimit: 12
        },
        grid: { display: false }
      },
      y: {
        title: { display: false },
        ticks: { color: 'oklch(0.76 0.04 269.54)' },
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