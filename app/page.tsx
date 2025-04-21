import { Panel } from '@/app/ui/panel';
import { getDailyAggregates } from '@/app/lib/polygon-service';
import { getBasicFinancials, getCompanyProfile } from '@/app/lib/finn-hub-service';
import DailyAggregateChart from '@/app/ui/daily-aggregate-chart';
import MonthlyAggregateChart from '@/app/ui/monthly-aggregate-chart';
import FinancialOverviewPanel from '@/app/ui/financial-overview-panel';
import RiskGrowthPanel from '@/app/ui/risk-growth-panel';
import DividendsEarningsChart from '@/app/ui/dividends-earnings-chart';

export default async function Page() {
  const polygonData = await getDailyAggregates();
  const companyMetrics = await getBasicFinancials();
  const companyProfile = await getCompanyProfile();

  return (
    <main className="2xl:px-4 3xl:px-20 4xl:px-54">

      <h1 className="mb-4 font-extrabold text-xl md:text-2xl">Long Term Overview</h1>

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
            <MonthlyAggregateChart 
              data={polygonData}
              selectedTicker={'AAPL'}
            />
          </Panel>
        </div>

      </div>

      <h1 className={`mt-10 mb-4 font-extrabold text-xl md:text-2xl`}>Company Financials</h1>

      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        <FinancialOverviewPanel data={companyMetrics} />

        <RiskGrowthPanel data={companyMetrics} />

        <Panel title="Dividends Test">
          <DividendsEarningsChart 
            data={companyMetrics}
            shareOutstanding={companyProfile.shareOutstanding}
          />
        </Panel>

        <Panel title="Total Customers">
          test
        </Panel>
      </div>

    </main>
  );
}