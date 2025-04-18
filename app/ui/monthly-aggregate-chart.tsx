import { getMonthlyAggregates } from '@/app/lib/polygon-service';
import { calculateMonthlyROI } from '@/app/lib/polygon-utils';
import BarChart from '@/app/ui/bar-chart';

export default async function MonthlyAggregateChart() {
  const data = await getMonthlyAggregates('AAPL');
  const roiData = calculateMonthlyROI(data);

  return (
    <>
      <p className="text-xs lg:text-sm text-zinc-400">This shows the monthly return on investment compared to the previous month</p>
      <BarChart chartData={roiData} />
    </>
  );
}