"use client";

import { useState } from "react";

export default function SideNav() {
  const [currIndex, setCurrIndex] = useState(0);

  return (
    <div className="flex flex-col justify-between h-full py-4">

      <div>

        {/* Top Level */}
        <div className="w-full flex items-center py-2 justify-center mb-4 pr-8">

          <div className="bg-white/10 rounded-full p-2">
            <svg
              fill="white"
              height="20px"
              width="20px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48.698 48.698"
            >
              <g>
                <polygon points="47.784,13.309 24.349,0 0.914,13.309 24.349,26.698 	" />
                <polygon points="24.349,29.002 8.548,19.974 0.914,24.309 24.349,37.698 47.784,24.309 40.151,19.974 	" />
                <polygon points="24.349,40.002 8.548,30.974 0.914,35.309 24.349,48.698 47.784,35.309 40.151,30.974 	" />
              </g>
            </svg>
          </div>

          <h5 className="text-white font-bold pl-2 hb">long term track</h5>
        </div>

        {/* Add Button */}
        <div className="mb-8 mx-4">
          <button className="w-full bg-sky-600 rounded-xl py-3 text-white font-bold text-sm cursor-pointer shadow-sm hover:bg-blue-500 transition-all ease">
            + Track New Stock
          </button>
        </div>

        {/* Side Links */}
        <h6 className="text-xs text-zinc-400 pb-2 font-base pl-4">TRACKED STOCKS</h6>

        <ul className="w-full mb-4">

          <li className={`flex items-center py-2 cursor-pointer pl-4 transition-all ease ${currIndex === 0 ? 'border-l-4 border-l-blue-400 bg-white/10 w-full' : 'hover:bg-white/5'}`}>
            <div className="w-16">
              <p className="text-xs text-white">AAPL</p>
            </div>
            <p className="text-white text-base">Apple Inc</p>
          </li>

          <li className={`flex items-center py-2 cursor-pointer pl-4 transition-all ease ${currIndex === 1 ? 'border-l-4 border-l-blue-400 bg-white/10 w-full' : 'hover:bg-white/5'}`}>
            <div className="w-16">
              <p className="text-xs text-white">NVDA</p>
            </div>
            <p className="text-white text-base">NVIDIA Corp</p>
          </li>

        </ul>

      </div>

    </div>
  );
}