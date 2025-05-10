'use client';

import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatStockName } from "@/app/lib/utils";
import PrimaryButton from "@/app/ui/primary-button";

export default function SideNavMobile({
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top bar with logo and menu button */}
      <div className="w-full flex items-center justify-between px-4 py-5 bg-nav z-50 shadow-md md:hidden">

        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="App Logo"
            width={25}
            height={25}
          />
          <h5 className="text-white font-bold pl-2 pt-1 font-hb">long term track</h5>
        </div>

        <button onClick={() => setIsOpen(true)}>
          <Bars3Icon height={25} width={25} color="white" />
        </button>

      </div>

      {/* Slide-in menu */}
      <AnimatePresence>
        {isOpen && (
          <>

            <motion.div
              className="fixed top-0 left-0 h-full w-full bg-nav z-50 p-4"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              
              <div className="flex justify-end mb-4">
                <button onClick={() => setIsOpen(false)}>
                  <XMarkIcon height={24} width={24} color="white" />
                </button>
              </div>

              <PrimaryButton
                text="Track New Stock"
                showPlusIcon={true}
                onClick={() => {
                  onDialogOpen();
                  setIsOpen(false);
                }}
              />

              <h6 className="text-xs text-greyish-400 pb-2 font-base mt-6">TRACKED STOCKS</h6>

              <ul className="w-full mb-4">
                {trackedStocks.map((stock, index) => (
                  <li
                    key={index}
                    className={`flex items-center py-2 cursor-pointer pl-2 transition-all ease ${stock.split('\\')[0] === currentStock ? 'border-l-4 border-l-emerald-400 bg-white/10 w-full' : 'hover:bg-white/5'}`}
                    onClick={() => {
                      onStockChange(stock);
                      setIsOpen(false);
                    }}
                  >
                    <div className="w-14">
                      <p className="text-xs text-zinc-200">{stock.split('\\')[0]}</p>
                    </div>
                    <p className="text-white text-base">{formatStockName(stock.split('\\')[1])}</p>
                  </li>
                ))}
              </ul>

            </motion.div>

          </>
        )}
      </AnimatePresence>
    </>
  );
}