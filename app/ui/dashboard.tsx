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
  
  useEffect(() => {
    handleStockChange("AAPL\\APPLE INC");
  }, []);

  const handleStockChange = async (stock: string) => {
    if (stock === selectedStock) {
      return;
    }

    const prevStock = selectedStock;
    setSelectedStock(stock);
    setPolygonData(undefined);
    setCompanyMetrics(undefined);
    setRecommendations(undefined);
    const stockSymbol = stock.split('\\')[0];

    try {
      await fetchStockData(stockSymbol);
    } catch (error) {
      console.log("Failed to fetch stock data", error);
      showErrorToast("Stock data retrieval is currently capped at 5 requests per minute. Please wait a moment before trying again.");
      setSelectedStock(prevStock);
    }
  };

  const fetchStockData = async (stockSymbol: string) => {
    const [aggregates, metrics, recs] = await Promise.all([
      getDailyAggregates(stockSymbol),
      getBasicFinancials(stockSymbol),
      getRecommendations(stockSymbol),
    ]);
    
    setPolygonData(aggregates);
    setCompanyMetrics(metrics);
    setRecommendations(recs);
  };

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
