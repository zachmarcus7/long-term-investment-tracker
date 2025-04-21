import { aggregateToMonthly, calculateMonthlyROI, calculateAverageMonthlyROI } from '@/app/lib/polygon-utils';
import BarChart from '@/app/ui/bar-chart';
import { DailyData } from '@/app/lib/definitions';

export default async function MonthlyAggregateChart({
  data,
  selectedTicker
}: {
  data: DailyData[];
  selectedTicker: string;
}) {
  const monthlyData = aggregateToMonthly(data);
  const roiData = calculateMonthlyROI(monthlyData);
  const avgData = calculateAverageMonthlyROI(roiData);

  return (
    <div className="flex flex-col justify-between h-full">

      <div>
        <p className="text-xs text-zinc-400 pb-8 lg:text-sm 3xl:pr-4">
          This shows the monthly return on investment compared to the previous month. For
          <span className="pl-1 font-extrabold text-emerald-500">{selectedTicker}</span> 
          , the monthly average for the past 2 years was
          <span className={`pl-1 font-extrabold ${avgData >= 0 ? 'text-emerald-500': ''}`}>{avgData}%</span>.
        </p>
      </div>

      <div className="lg:pb-1 2xl:h-[320px]">
        <BarChart chartData={roiData} />
      </div>

    </div>
  );
}