
import { Suspense } from 'react';
import { Panel } from '@/app/ui/panel';
import AggregateChart from '@/app/ui/aggregate-chart';
import RoiChart from './ui/roi-chart';
import DailyAggregateChart from './ui/daily-aggregate-chart';

export default async function Page() {
  return (
    <main>

      <h1 className={`mb-4 font-extrabold text-xl md:text-2xl`}>Long Term Overview</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 xl:grid-cols-9">

        <div className="col-span-1 md:col-span-3 xl:col-span-6">
          <Panel title="Stock Price (Past Year)" icon="trendingUp">
            <DailyAggregateChart />
          </Panel>
        </div>

        <div className="col-span-1 xl:col-span-3">
          <Panel title="Return On Investment" icon="collected">
            <RoiChart />
          </Panel>
        </div>

      </div>

      <h1 className={`mt-10 mb-4 font-extrabold text-xl md:text-2xl`}>Company Financials</h1>

      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Panel title="Collected" icon="collected">test</Panel>
        <Panel title="Pending" icon="pending">test</Panel>
        <Panel title="Total Invoices" icon="invoices">test</Panel>
        <Panel
          title="Total Customers"
          icon="customers"
        >
          test
        </Panel>
      </div>

    </main>
  );
}