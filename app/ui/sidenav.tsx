"use client";

import { useState, useEffect } from "react";
import PrimaryButton from "@/app/ui/primary-button";
import Dialog from "@/app/ui/dialog";
import NewStockForm from "@/app/ui/new-stock-form";
import { getStockSymbols } from "@/app/lib/finn-hub-service";
import { trackNewStock, retrieveTrackedStocks } from '@/app/lib/local-storage-service';
import { showSuccessToast, showErrorToast } from '@/app/lib/toast-utils';
import { StockSymbol } from '@/app/lib/definitions';

export default function SideNav() {
  const [currIndex, setCurrIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [stockSymbols, setStockSymbols] = useState([]);
  const [pendingAdd, setPendingAdd] = useState(false);
  const [trackedStocks, setTrackedStocks] = useState([]);

  /**
   * This is for retrieving all available stock symbols data from the
   * FinnHub API.
   */
  useEffect(() => {
    const fetchData = async () => {
      const symbols = await getStockSymbols();
      setStockSymbols(symbols);
    };
    fetchData();
  }, []);

  /**
   * 
   */
  useEffect(() => {
    const trackedStocks = retrieveTrackedStocks();
    setTrackedStocks(trackedStocks);
  }, []);

  /**
   * 
   * @param selectedStock 
   */
  const handleStockSubmit = async (selectedStock: StockSymbol) => {
    setPendingAdd(true);
    const result = await trackNewStock(selectedStock.symbol, selectedStock.description);

    if (result === true) {
      showSuccessToast("Stock successfully added");
      const trackedStocks = retrieveTrackedStocks();
      setTrackedStocks(trackedStocks);
      setIsDialogOpen(false);
    } else if (result === false) {
      showErrorToast("Stock already being tracked")
    } else if (result === null) {
      showErrorToast("An error has occurred. Please try again.")
    }

    setPendingAdd(false);
  };

  /**
   * 
   * @param index 
   */
  const handleNavClick = (index: number) => {
    setCurrIndex(index);
  }

  /**
   * 
   * @param word 
   * @returns 
   */
  const capitalizeFirstLetter = (word: string) => {
    if (!word) return word; 
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  return (
    <>

      {/* Top Level */}
      <div className="w-full flex items-center justify-center pr-4 pt-10 pb-8">
        <img src="/logo.svg" alt="App Logo" />
        <h5 className="text-white font-bold pl-2 font-hb">long term track</h5>
      </div>

      {/* Add Button */}
      <div className="mb-8 mx-4">
        <PrimaryButton
          text="Track New Stock"
          showPlusIcon={true}
          onClick={() => {setIsDialogOpen(true)}}
        />
      </div>

      {/* Side Links */}
      <h6 className="text-xs text-zinc-400 pb-2 font-base pl-4">TRACKED STOCKS</h6>

      <ul className="w-full mb-4">
        {trackedStocks.map((symbol: string, index: number) => (
          <li 
            key={index} 
            className={`flex items-center py-2 cursor-pointer pl-4 transition-all ease ${currIndex === index ? 'border-l-4 border-l-emerald-400 bg-white/10 w-full' : 'hover:bg-white/5'}`}
            onClick={() => handleNavClick(index)}
          >
            <div className="w-16">
              <p className="text-xs text-zinc-200">{symbol.split('\\')[0]}</p>
            </div>
            <p className="text-white text-base">{capitalizeFirstLetter(symbol.split('\\')[1].split(' ')[0])}</p>
          </li>
        ))}
      </ul> 

      {/* Dialog for adding stock tickers */}
      <Dialog 
        isOpen={isDialogOpen} 
        onOpen={() => {}}
        onClose={() => {setIsDialogOpen(false)}}
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