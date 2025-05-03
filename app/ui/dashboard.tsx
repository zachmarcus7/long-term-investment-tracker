'use client';

import { useState, useEffect } from "react";
import SideNav from "@/app/ui/sidenav";
import DashboardContent from "@/app/ui/dashboard-content";
import { getDailyAggregates } from '@/app/lib/polygon-service';
import { getBasicFinancials, getRecommendations } from '@/app/lib/finn-hub-service';
import { showErrorToast } from '@/app/lib/toast-utils';
import { DailyData, CompanyMetricsData, RecommendationData } from "@/app/lib/definitions";

export default function Dashboard() {
  const [selectedStock, setSelectedStock] = useState("AAPL\\APPLE INC");
  const [polygonData, setPolygonData] = useState<DailyData[] | undefined>(undefined);
  const [companyMetrics, setCompanyMetrics] = useState<CompanyMetricsData | undefined>(undefined);
  const [recommendations, setRecommendations] = useState<RecommendationData[] | undefined>(undefined);
  
  /**
   * Event handler for when a new stock is selected from the 
   * sidenav.
   * @param stock - Stock data string formatted as 'symbol\\name'.
   */
  const handleStockChange = (stock: string) => {
    setSelectedStock(stock);
  }

  /**
   * Retrieves all the necessary stock data from Polygon and
   * FinnHub.
   */
  useEffect(() => {
    let stockSymbol = selectedStock.split('\\')[0];

    const fetchData = async () => {
      let agg = null;
    
      try {
        agg = await getDailyAggregates(stockSymbol);
      } catch (error) {
        showErrorToast("Stock data is currently limited to 5 retrievals per minute. Please wait a minute before attempting again.");
        
        // TODO: disable side nav for 1 minute
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
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">

      <div className="w-full flex-none md:w-48 2xl:w-66 3xl:w-76 bg-nav">
        <SideNav onStockChange={handleStockChange} selectedStock={selectedStock} />
      </div>

      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 shadow-3xl bg-main">
        <DashboardContent 
          selectedStock={selectedStock} 
          polygonData={polygonData}
          companyMetrics={companyMetrics}
          recommendations={recommendations ? recommendations[0] : undefined}
        />
      </div>

    </div>
  );
}