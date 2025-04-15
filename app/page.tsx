
import { Panel } from '@/app/ui/panel';
import RevenueChart from '@/app/ui/revenue-chart';
import { Suspense } from 'react';
import AggregateChart from '@/app/ui/aggregate-chart';

export default async function Page() {
  return (
    <main>

      <h1 className={`mb-4 font-extrabold text-xl md:text-2xl`}>Long Term Overview</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">

        <div className="col-span-1 md:col-span-3 lg:col-span-3">
          <Panel title="Collected" icon="collected">
            <AggregateChart />
          </Panel>
        </div>

        <div className="col-span-1">
          <Panel title="Collected" icon="collected">
            <RevenueChart />
          </Panel>
        </div>

      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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