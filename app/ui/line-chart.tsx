'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { DailyData } from '@/app/lib/definitions';

ChartJS.register(Filler);
ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function LineChart({
  data,
  positive
}: {
  data?: DailyData[];
  positive: boolean
}) {
  const chartData = {
    labels: data?.map(point => new Date(point.t)),
    datasets: [
      {
        label: 'Price',
        data: data?.map(point => point.c),
        borderColor: positive ? 'rgba(0, 188, 125, 1)' : 'rgba(239, 94, 99, 1)',
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
            return 'rgb(229, 232, 240)';
          }
        
          const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);

          if (positive) {
            gradient.addColorStop(1, 'rgba(0, 188, 125, 0.08)');
            gradient.addColorStop(0, 'rgba(0, 188, 125, 0.5)');
          } else {
            gradient.addColorStop(1, 'rgba(239, 94, 99, 0.1)');
            gradient.addColorStop(0, 'rgba(239, 94, 99, 0.5)');
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
          color: 'rgb(176, 185, 208)',
          maxTicksLimit: 12
        },
        grid: { display: false }
      },
      y: {
        title: { display: false },
        ticks: { color: 'rgb(176, 185, 208)' },
        grid: { 
          color: 'rgba(229, 232, 240, 0.5)'
        },
        border: {
          dash: [6, 6]
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return <Line data={chartData} options={options} />;
}