
import { Suspense } from 'react';
import { Panel } from '@/app/ui/panel';
import { getDailyAggregates } from '@/app/lib/polygon-service';
import { getBasicFinancials } from '@/app/lib/finn-hub-service';
import DailyAggregateChart from '@/app/ui/daily-aggregate-chart';
import MonthlyAggregateChart from '@/app/ui/monthly-aggregate-chart';
import FinancialOverviewList from '@/app/ui/financial-overview-list';

export default async function Page() {
  const polygonData = await getDailyAggregates();
  const finnhubData = await getBasicFinancials();

  return (
    <main className="2xl:px-4 3xl:px-20 4xl:px-54">

      <h1 className={`mb-4 font-extrabold text-xl md:text-2xl`}>Long Term Overview</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 xl:grid-cols-9">

        <div className="col-span-1 md:col-span-3 xl:col-span-6">
          <Panel 
            title="Stock Price (Past 2 Years)" 
            heightFull={true}
          >
            <DailyAggregateChart data={polygonData} />
          </Panel>
        </div>

        <div className="col-span-1 xl:col-span-3">
          <Panel 
            title="Return On Investment" 
            heightFull={true}
          >
            <MonthlyAggregateChart data={polygonData} />
          </Panel>
        </div>

      </div>

      <h1 className={`mt-10 mb-4 font-extrabold text-xl md:text-2xl`}>Company Financials</h1>

      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        <Panel title="Financial Overview">
          <FinancialOverviewList data={finnhubData} />
        </Panel>

        <Panel title="Dividends">
          test
        </Panel>

        <Panel title="Total Invoices">
          test
        </Panel>

        <Panel title="Total Customers">
          test
        </Panel>
      </div>

    </main>
  );
}