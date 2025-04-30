'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  ScriptableContext,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

export default function BarChart({ 
  chartData,
}: { 
  chartData: { label: string; roi: number }[];
}) {
  const data = {
    labels: chartData.map(d => d.label),
    datasets: [
      {
        data: chartData.map(d => d.roi),
        backgroundColor: (ctx: ScriptableContext<'bar'>) => {
          const chart = ctx.chart;
          const { chartArea, ctx: canvasCtx } = chart;
        
          if (!chartArea) {
            return 'rgba(75, 192, 192, 0.2)';
          }
        
          const roi = chartData[ctx.dataIndex]?.roi ?? 0;
          const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        
          if (roi >= 0) {
            gradient.addColorStop(0, 'oklch(84.5% 0.143 164.978 / 0.7)');
            gradient.addColorStop(1, 'oklch(84.5% 0.143 164.978 / 0.1)');
          } else {
            gradient.addColorStop(0, 'oklch(0.73 0.16 19.95 / 0.1)');
            gradient.addColorStop(1, 'oklch(0.73 0.16 19.95 / 0.7)');
          }
        
          return gradient;
        },
        borderRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.parsed.y.toFixed(2)}%`
        }
      },
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      y: {
        ticks: {
          callback: function (val: any) {
            return `${val}%`;
          },
          color: 'oklch(0.76 0.04 269.54)'
        },
        grid: { 
          color: 'oklch(96.7% 0.001 286.375)',
        },
        border: {
          dash: [6, 6]
        }
      },
      x: {
        ticks: { 
          color: 'oklch(0.76 0.04 269.54)',
          maxTicksLimit: 6,
          callback: function(value: any) {
            return chartData[value].label.split(" ")[0];
          }
        },
        grid: { display: false }
      }
    }
  };

  return <Bar data={data} options={options} />;
}