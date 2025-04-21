"use client";

import { useState } from "react";
import PrimaryButton from "@/app/ui/primary-button";

export default function SideNav() {
  const [currIndex, setCurrIndex] = useState(0);

  return (
    <>

      {/* Top Level */}
      <div className="w-full flex items-center justify-center pr-4 pt-10 pb-8">
        <img src="/logo.svg" alt="App Logo" />
        <h5 className="text-white font-bold pl-2 hb">long term track</h5>
      </div>

      {/* Add Button */}
      <div className="mb-8 mx-4">
        <PrimaryButton
          text="Track New Stock"
          showPlusIcon={true}
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

    </>
  );
}