import { getDailyAggregates } from '@/app/lib/polygon-service';
import DashboardTopPanelsClient from './dashboard-top-panels-client';

export default async function DashboardTopPanels({ stockSymbol }: { stockSymbol: string }) {
  const polygonData = await getDailyAggregates(stockSymbol);

  return (
    <DashboardTopPanelsClient polygonData={polygonData} stockSymbol={stockSymbol} />
  );
}