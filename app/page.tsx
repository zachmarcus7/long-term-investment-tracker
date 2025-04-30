import { Panel } from '@/app/ui/panel';
import { getDailyAggregates } from '@/app/lib/polygon-service';
import { getBasicFinancials, getRecommendations } from '@/app/lib/finn-hub-service';
import DailyAggregateChart from '@/app/ui/daily-aggregate-chart';
import MonthlyAggregateChart from '@/app/ui/monthly-aggregate-chart';
import FinancialOverviewPanel from '@/app/ui/financial-overview-panel';
import RiskGrowthPanel from '@/app/ui/risk-growth-panel';
import RecommendationsChart from '@/app/ui/recommendations-chart';

export default async function Page() {
  const polygonData = await getDailyAggregates();
  const companyMetrics = await getBasicFinancials();
  const recommendations = await getRecommendations();

  return (
    <main className="2xl:px-4 3xl:px-20 4xl:px-54">

      <h1 className="mb-4 font-extrabold text-2xl md:text-3xl">Dashboard</h1>
      <h6 className="text-greyish-300 mb-4">Welcome to Long Term Track! <span className="pl-1 font-extrabold text-emerald-500">AAPL</span> is the current selected ticker.</h6>

      {/* Top Row */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 xl:grid-cols-9">
        <div className="col-span-1 md:col-span-3 xl:col-span-6">
          <Panel title="Stock Price (Past 2 Years)">
            <DailyAggregateChart data={polygonData} />
          </Panel>
        </div>

        <div className="col-span-1 xl:col-span-3">
          <Panel title="Return On Investment">
            <MonthlyAggregateChart data={polygonData} selectedTicker={'AAPL'} />
          </Panel>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        <FinancialOverviewPanel data={companyMetrics} />

        <RiskGrowthPanel data={companyMetrics} />

        <div className="lg:col-span-2 h-full">
          <Panel title="Current Recommendations">
            <RecommendationsChart recommendations={recommendations[0]} />
          </Panel>
        </div>

      </div>

    </main>
  );
}