'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
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
        backgroundColor: chartData.map(d => d.roi >= 0 ? '#FFD700' : '#333'),
        borderRadius: 8,
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
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
}