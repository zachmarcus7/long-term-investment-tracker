import { getDailyAggregates } from '@/app/lib/polygon-service';
//import DailyAggregateChart from '@/app/ui/daily-aggregate-chart';
import MonthlyAggregateChart from '@/app/ui/monthly-aggregate-chart';
import { Panel } from '@/app/ui/panel';

export default async function DashboardTopPanels({ stockSymbol }: { stockSymbol: string }) {
  const polygonData = await getDailyAggregates(stockSymbol);

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-9">
      <div className="col-span-1 xl:col-span-6">
        {/* <Panel title="Stock Price (Past 2 Years)">
          <DailyAggregateChart data={polygonData} />
        </Panel> */}
      </div>

      <div className="col-span-1 xl:col-span-3">
        <Panel title="Return On Investment">
          <MonthlyAggregateChart data={polygonData} selectedTicker={stockSymbol} />
        </Panel> 
      </div>
    </div>
  );
}