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
  recommendations?: RecommendationData
}) {
  const dataArr = recommendations ? recommendations : {
    strongBuy: 0,
    buy: 0,
    hold: 1,
    sell: 0,
    strongSell: 0
  };

  const data = {
    labels: ['Strong Buy', 'Buy', recommendations === undefined ? 'No Data Available' : 'Hold', 'Sell', 'Strong Sell'],
    datasets: [
      {
        data: [
          dataArr.strongBuy, 
          dataArr.buy, 
          dataArr.hold, 
          dataArr.sell, 
          dataArr.strongSell
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