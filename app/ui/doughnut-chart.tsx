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
          'rgba(0, 188, 125, 0.5)', 
          'rgba(0, 188, 125, 0.3)',
          'rgb(229, 232, 240)',
          'rgba(239, 94, 99, 0.3)',
          'rgba(239, 94, 99, 0.8)'
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
    <div className="w-full flex justify-center items-center max-h-[175px] max-md:mt-6 md:ml-[6rem] md:absolute md:top-[1.5rem] lg:top-[3rem] 2xl:top-[2rem] 2xl:max-h-[215px]">
      <Doughnut data={data} options={options} />
    </div>
  );
};