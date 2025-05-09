'use client';

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";
import { capitalizeFirstLetter } from "@/app/lib/utils";
import Dialog from "@/app/ui/dialog";
import { getStockSymbols } from "@/app/lib/finn-hub-service";
import NewStockForm from "@/app/ui/new-stock-form";
import PrimaryButton from "@/app/ui/primary-button";
import { showSuccessToast, showErrorToast } from '@/app/lib/toast-utils';
import { StockSymbol } from '@/app/lib/definitions';
import { trackNewStock, retrieveTrackedStocks } from '@/app/lib/local-storage-service';

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
    const fetchTrackedStocks = retrieveTrackedStocks();
    setTrackedStocks(fetchTrackedStocks);

    const fetchData = async () => {
      const symbols = await getStockSymbols();
      setStockSymbols(symbols);
    };
    
    fetchData();
  }, []);

  /**
   * 
   * @param symbol 
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
    <div className="w-full flex-none md:w-48 2xl:w-66 3xl:w-76 bg-nav">

      {/* Top Level */}
      <div className="w-full flex items-center justify-center pr-4 pt-10 pb-8">
        <Image 
          src="/logo.svg" 
          alt="App Logo"
          width={25}
          height={25}
        />
        <h5 className="text-white font-bold pl-2 font-hb">long term track</h5>
      </div>

      {/* Add Button */}
      <div className="mb-8 mx-4">
        <PrimaryButton
          text="Track New Stock"
          showPlusIcon={true}
          onClick={() => { setIsDialogOpen(true); }}
        />
      </div>

      {/* Side Links */}
      <h6 className="text-xs text-greyish-400 pb-2 font-base pl-4">TRACKED STOCKS</h6>

      <ul className="w-full mb-4">
        {trackedStocks.map((stock: string, index: number) => (
          <li
            key={index}
            className={`flex items-center py-2 cursor-pointer pl-4 transition-all ease ${stock.split('\\')[0] === currentStock ? 'border-l-4 border-l-emerald-400 bg-white/10 w-full' : 'hover:bg-white/5'}`}
            onClick={() => { handleStockChange(stock); }}
          >
            <div className="w-16">
              <p className="text-xs text-zinc-200">{stock.split('\\')[0]}</p>
            </div>
            <p className="text-white text-base">{capitalizeFirstLetter(stock.split('\\')[1].split(' ')[0])}</p>
          </li>
        ))}
      </ul>

      {/* Dialog for adding stock tickers */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => { setIsDialogOpen(false); }}
        title="Track New Stock"
      >
        <NewStockForm
          data={stockSymbols}
          onNewStockSubmit={handleStockSubmit}
          pendingAdd={pendingAdd}
        />
      </Dialog>

    </div>
  );
}