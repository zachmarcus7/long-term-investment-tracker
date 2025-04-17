import { getMonthlyAggregates } from '@/app/lib/polygonService';
import { calculateMonthlyROI } from '@/app/lib/utils';
import BarChart from '@/app/ui/bar-chart';

export default async function RoiChart() {
  const data = await getMonthlyAggregates('AAPL');
  const roiData = calculateMonthlyROI(data);

  return (
    <BarChart chartData={roiData} />
  );
}