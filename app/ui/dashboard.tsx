'use client';

import { useState } from "react";
import SideNav from "@/app/ui/sidenav";
import DashboardContent from "@/app/ui/dashboard-content";

export default function Dashboard() {
  const [selectedStock, setSelectedStock] = useState("AAPL\\APPLE INC");

  const handleStockChange = (symbol: string) => {
    setSelectedStock(symbol);
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">

      <div className="w-full flex-none md:w-48 2xl:w-66 3xl:w-76 bg-nav">
        <SideNav onStockChange={handleStockChange} selectedStock={selectedStock} />
      </div>

      <div className="flex-grow p-6 md:overflow-y-auto md:p-12 shadow-3xl bg-main">
        <DashboardContent selectedStock={selectedStock} />
      </div>

    </div>
  );
}