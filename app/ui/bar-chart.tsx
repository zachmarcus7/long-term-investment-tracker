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
        borderWidth: 1,
        borderColor: chartData.map(d => d.roi >= 0 ? 'oklch(84.5% 0.143 164.978)' : 'oklch(58.6% 0.253 17.585)'),
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
            gradient.addColorStop(0, 'oklch(58.6% 0.253 17.585 / 0.1)');
            gradient.addColorStop(1, 'oklch(58.6% 0.253 17.585 / 0.7)');
          }
        
          return gradient;
        },
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
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
          }
        },
        grid: {
          display: false
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
}