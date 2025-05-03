'use client';

import { Panel } from '@/app/ui/panel';
import { getDailyAggregates } from '@/app/lib/polygon-service';
import { getBasicFinancials, getRecommendations } from '@/app/lib/finn-hub-service';
import DailyAggregateChart from '@/app/ui/daily-aggregate-chart';
import MonthlyAggregateChart from '@/app/ui/monthly-aggregate-chart';
import FinancialOverviewPanel from '@/app/ui/financial-overview-panel';
import RiskGrowthPanel from '@/app/ui/risk-growth-panel';
import RecommendationsChart from '@/app/ui/recommendations-chart';
import { useState, useEffect } from 'react';
import { showErrorToast } from '@/app/lib/toast-utils';

export default function DashboardContent({ 
  selectedStock 
}: { 
  selectedStock: string 
}) {
  const [polygonData, setPolygonData] = useState([]);
  const [companyMetrics, setCompanyMetrics] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  /**
   * Retrieves all the necessary stock data from Polygon and
   * FinnHub. The selectedStock variable is received as:
   * 'symbol\\name'.
   */
  useEffect(() => {
    let stockSymbol = selectedStock.split('\\')[0];

    const fetchData = async () => {
      let agg = null;
    
      try {
        agg = await getDailyAggregates(stockSymbol);
      } catch (error) {
        showErrorToast("Stock data is currently limited to 5 pulls a minute. Please wait a minute before attempting again.")  
      }
    
      const [metrics, recs] = await Promise.all([
        getBasicFinancials(stockSymbol),
        getRecommendations(stockSymbol),
      ]);
    
      setPolygonData(agg);
      setCompanyMetrics(metrics);
      setRecommendations(recs);
    };

    fetchData();
  }, [selectedStock]);

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
            <DailyAggregateChart data={polygonData} />
          </Panel>
        </div>

        <div className="col-span-1 xl:col-span-3">
          <Panel title="Return On Investment">
            <MonthlyAggregateChart data={polygonData} selectedTicker={selectedStock.split('\\')[0]} />
          </Panel>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <FinancialOverviewPanel data={companyMetrics} />
        <RiskGrowthPanel data={companyMetrics} />
        <div className="lg:col-span-2 h-full">
          <Panel title="Current Recommendations">
            <RecommendationsChart recommendations={recommendations} />
          </Panel>
        </div>
      </div>
    </main>
  );
}