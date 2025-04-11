
import { Card } from '@/app/ui/cards';
import RevenueChart from '@/app/ui/revenue-chart';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <main>

      <h1 className={`mb-4 text-xl md:text-2xl`}>
        Long Term Overview
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">

        <div className="col-span-1 md:col-span-3 lg:col-span-3">
          <RevenueChart />
        </div>

        <div className="col-span-1">
          <RevenueChart />
        </div>

      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={5} type="collected" />
        <Card title="Pending" value={4} type="pending" />
        <Card title="Total Invoices" value={3} type="invoices" />
        <Card
          title="Total Customers"
          value={2}
          type="customers"
        />
      </div>

    </main>
  );
}