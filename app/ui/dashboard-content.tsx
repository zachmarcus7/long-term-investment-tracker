'use client';

import { Panel } from '@/app/ui/panel';
import DailyAggregateChart from '@/app/ui/daily-aggregate-chart';
import MonthlyAggregateChart from '@/app/ui/monthly-aggregate-chart';
import FinancialOverviewPanel from '@/app/ui/financial-overview-panel';
import RiskGrowthPanel from '@/app/ui/risk-growth-panel';
import RecommendationsChart from '@/app/ui/recommendations-chart';
import { DailyData, CompanyMetricsData, RecommendationData } from "@/app/lib/definitions";
import { DailyAggregateChartSkeleton, MonthlyAggregateChartSkeleton, OverviewPanelSkeleton, RecommendationsChartSkeleton } from '@/app/ui/skeletons';

export default function DashboardContent({ 
  selectedStock,
  polygonData,
  companyMetrics,
  recommendations
}: { 
  selectedStock: string;
  polygonData?: DailyData[]; 
  companyMetrics?: CompanyMetricsData;
  recommendations?: RecommendationData;
}) {
  return (
    <main className="2xl:px-4 3xl:px-20 4xl:px-54">
      <h1 className="mb-4 font-extrabold text-2xl md:text-3xl">Overview</h1>
      <h6 className="text-greyish-300 mb-4">
        Welcome to Long Term Track!{' '}
        <span className={`pl-1 font-extrabold text-emerald-500`}>{selectedStock.split('\\')[1]}</span> is the current selected stock.
      </h6>

      {/* Top Row */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 xl:grid-cols-9">
        <div className="col-span-1 md:col-span-3 xl:col-span-6">
          <Panel title="Stock Price (Past 2 Years)">
            {polygonData
              ? <DailyAggregateChart data={polygonData} />
              : <DailyAggregateChartSkeleton />
            }
          </Panel>
        </div>

        <div className="col-span-1 xl:col-span-3">
          <Panel title="Return On Investment">
            {polygonData
              ? <MonthlyAggregateChart data={polygonData} selectedTicker={selectedStock.split('\\')[0]} />
              : <MonthlyAggregateChartSkeleton />
            }
          </Panel>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        {companyMetrics
          ? <FinancialOverviewPanel data={companyMetrics} /> 
          : <OverviewPanelSkeleton />
        }

        {companyMetrics
          ? <RiskGrowthPanel data={companyMetrics} />
          : <OverviewPanelSkeleton />
        }

        <div className="lg:col-span-2 h-full">
          <Panel title="Current Recommendations">
            {recommendations
              ? <RecommendationsChart recommendations={recommendations} />
              : <RecommendationsChartSkeleton />
            }
          </Panel>
        </div>

      </div>
    </main>
  );
}