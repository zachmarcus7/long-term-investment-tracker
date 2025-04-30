"use client";

import { useState, useEffect } from "react";
import PrimaryButton from "@/app/ui/primary-button";
import Dialog from "@/app/ui/dialog";
import NewStockForm from "@/app/ui/new-stock-form";
import { getStockSymbols } from "@/app/lib/finn-hub-service";

export default function SideNav() {
  const [currIndex, setCurrIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [stockSymbols, setStockSymbols] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const symbols = await getStockSymbols();
      setStockSymbols(symbols);
    };
    fetchData();
  }, []);

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

        <li className={`flex items-center py-2 cursor-pointer pl-4 transition-all ease ${currIndex === 0 ? 'border-l-4 border-l-emerald-400 bg-white/10 w-full' : 'hover:bg-white/5'}`}>
          <div className="w-16">
            <p className="text-xs text-zinc-200">AAPL</p>
          </div>
          <p className="text-white text-base">Apple Inc</p>
        </li>

        <li className={`flex items-center py-2 cursor-pointer pl-4 transition-all ease ${currIndex === 1 ? 'border-l-4 border-l-emerald-400 bg-white/10 w-full' : 'hover:bg-white/5'}`}>
          <div className="w-16">
            <p className="text-xs text-zinc-200">NVDA</p>
          </div>
          <p className="text-white text-base">NVIDIA Corp</p>
        </li>

      </ul>

      {/* Dialog for adding stock tickers */}
      <Dialog 
        isOpen={isDialogOpen} 
        onOpen={() => {}}
        onClose={() => {setIsDialogOpen(false)}}
        title="Track New Stock"
      >
        <NewStockForm data={stockSymbols} />
      </Dialog>

    </>
  );
}