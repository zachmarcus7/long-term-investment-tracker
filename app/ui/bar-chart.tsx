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
  TooltipItem,
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
            return 'rgb(229, 232, 240)';
          }
        
          const roi = chartData[ctx.dataIndex]?.roi ?? 0;
          const gradient = canvasCtx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        
          if (roi >= 0) {
            gradient.addColorStop(0, 'rgba(0, 188, 125, 0.5)');
            gradient.addColorStop(1, 'rgba(0, 188, 125, 0.1)');
          } else {
            gradient.addColorStop(0, 'rgba(239, 94, 99, 0.1)');
            gradient.addColorStop(1, 'rgba(239, 94, 99, 0.8)');
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
        callbacks: { label: (ctx: TooltipItem<'bar'>) => `${ctx.parsed.y.toFixed(2)}%` }
      },
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      y: {
        ticks: {
          callback: function (val: string | number) { return `${val}%` },
          color: 'rgb(176, 185, 208)'
        },
        grid: { 
          color: 'rgba(229, 232, 240, 0.5)',
        },
        border: {
          dash: [6, 6]
        }
      },
      x: {
        ticks: { 
          color: 'rgb(176, 185, 208)',
          maxTicksLimit: 6,
          callback: function(value: number | string) { return chartData[Number(value)].label.split(" ")[0] }
        },
        grid: { display: false }
      }
    }
  };

  return <Bar data={data} options={options} />;
}