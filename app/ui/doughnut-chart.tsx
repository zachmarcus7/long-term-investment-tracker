'use client';

import { Doughnut } from 'react-chartjs-2';
import { RecommendationData } from '@/app/lib/definitions';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({
  recommendations
}: {
  recommendations: RecommendationData
}) {
  const data = {
    labels: ['Strong Buy', 'Buy', 'Hold', 'Sell', 'Strong Sell'],
    datasets: [
      {
        data: [
          recommendations.strongBuy, 
          recommendations.buy, 
          recommendations.hold, 
          recommendations.sell, 
          recommendations.strongSell
        ],
        backgroundColor: [
          'oklch(84.5% 0.143 164.978 / 1)', 
          'oklch(84.5% 0.143 164.978 / 0.5)',
          'oklch(0.76 0.04 269.54 / 0.3)',
          'oklch(0.73 0.16 19.95 / 0.5)',
          'oklch(0.73 0.16 19.95 / 1)'
        ],
        borderColor: [],
        borderWidth: 0,
        hoverOffset: 10
      }
    ]
  };

  const options = {
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    cutout: '60%'
  }

  return (
    <div className="max-h-[215px] ml-[6rem] lg:absolute lg:top-[2rem] w-full flex justify-center items-center">
      <Doughnut data={data} options={options} />
    </div>
  );
};