'use client';

import { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import Dialog from "@/app/ui/dialog";
import NewStockForm from "@/app/ui/new-stock-form";
import { showSuccessToast, showErrorToast } from '@/app/lib/toast-utils';
import { StockSymbol } from '@/app/lib/definitions';
import { trackNewStock, retrieveTrackedStocks } from '@/app/lib/local-storage-service';
import SideNavDesktop from "@/app/ui/sidenav-desktop";
import SideNavMobile from "@/app/ui/sidenav-mobile";

export default function SideNav() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split('/');
  const currentStock = segments[2];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [stockSymbols, setStockSymbols] = useState<StockSymbol[]>([]);
  const [pendingAdd, setPendingAdd] = useState(false);
  const [trackedStocks, setTrackedStocks] = useState<string[]>([]);

  /**
   * Sets available stock symbols on initial render.
   */
  useEffect(() => {
    setTrackedStocks(retrieveTrackedStocks());

    const fetchData = async () => {
      try {
        const res = await fetch('/api/stock-symbols');
        const data = await res.json();
        setStockSymbols(data);
      } catch (err) {
        console.error('Failed to fetch stock symbols:', err);
      }
    };

    fetchData();
  }, []);

  /**
   * Sets current selected stock to passed symbol.
   * @param symbol - Stock info formatted as 'symbol\\name'
   */
  const handleStockChange = (symbol: string) => {
    router.push(`/stock/${symbol.split('\\')[0]}`);
  }

  /**
   * Handles form submission for new stock tracking.
   * @param selectedStock - Stock object containing new stock data.
   */
  const handleStockSubmit = async (selectedStock: StockSymbol) => {
    setPendingAdd(true);
    const result = await trackNewStock(selectedStock.symbol, selectedStock.description);

    if (result === true) {
      showSuccessToast("Stock successfully added");
      const updatedTrackedStocks = retrieveTrackedStocks();
      setTrackedStocks(updatedTrackedStocks);
      setIsDialogOpen(false);
    } else if (result === false) {
      showErrorToast("Stock already being tracked");
    } else if (result === null) {
      showErrorToast("An error has occurred. Please try again.");
    }

    setPendingAdd(false);
  };

  return (
    <>
      <div className="max-md:hidden h-full bg-nav">
        <SideNavDesktop
          currentStock={currentStock}
          trackedStocks={trackedStocks}
          onDialogOpen={() => setIsDialogOpen(true)}
          onStockChange={handleStockChange}
        />

      </div>

      <div className="md:hidden">
        <SideNavMobile
          currentStock={currentStock}
          trackedStocks={trackedStocks}
          onDialogOpen={() => setIsDialogOpen(true)}
          onStockChange={handleStockChange}
        />
      </div>

      {/* Dialog for adding stock tickers */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => { setIsDialogOpen(false) }}
        title="Track New Stock"
      >
        <NewStockForm
          data={stockSymbols}
          onNewStockSubmit={handleStockSubmit}
          pendingAdd={pendingAdd}
        />
      </Dialog>

    </>
  );
}