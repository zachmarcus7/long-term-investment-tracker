'use client';

import Image from "next/image";
import { formatStockName } from "@/app/lib/utils";
import PrimaryButton from "@/app/ui/primary-button";

export default function SideNavDesktop({
  currentStock,
  trackedStocks,
  onDialogOpen,
  onStockChange
}: {
  currentStock: string;
  trackedStocks: string[];
  onDialogOpen: () => void;
  onStockChange: (stock: string) => void;
}) {
  return (
    <div className="w-full flex-none md:w-56 2xl:w-66 3xl:w-76">

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
          onClick={onDialogOpen}
        />
      </div>

      {/* Side Links */}
      <h6 className="text-xs text-greyish-400 pb-2 font-base pl-4">TRACKED STOCKS</h6>

      <ul className="w-full mb-4">
        {trackedStocks.map((stock: string, index: number) => (
          <li
            key={index}
            className={`flex items-center py-2 cursor-pointer pl-4 transition-all ease ${stock.split('\\')[0] === currentStock ? 'border-l-4 border-l-emerald-400 bg-white/10 w-full' : 'hover:bg-white/5'}`}
            onClick={() => { onStockChange(stock) }}
          >
            <div className="w-0 max-3xl:hidden 3xl:w-16">
              <p className="text-xs text-zinc-200">{stock.split('\\')[0]}</p>
            </div>
            <p className="text-white text-base max-3xl:pl-2 pr-3">{formatStockName(stock.split('\\')[1])}</p>
          </li>
        ))}
      </ul>

    </div>
  );
}