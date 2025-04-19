export default function SideNav() {
  return (
    <div className="flex h-full bg-white flex-col py-4 border-r border-r-slate-200 px-2">

      {/* Top Level */}
      <div className="w-full flex justify-center items-center bg-slate-100 px-6 py-2 rounded-3xl mb-2">
        <h5 className="text-zinc-500">Monitored Stocks</h5>
      </div>

      {/* Side Links */}
      <ul className="w-full mb-4 pl-6">
        <li>

          <div className="flex items-center py-2 cursor-pointer border-b border-b-slate-200">
            <p className="w-16 text-sm text-zinc-400">AAPL</p>
            <p>Apple Inc</p>
          </div>

          <div className="flex items-center py-2 cursor-pointer border-b border-b-slate-200">
            <p className="w-16 text-sm text-zinc-400">NVDA</p>
            <p>NVIDIA Corp</p>
          </div>

        </li>
      </ul>

      <button className="rounded-full border border-white/10 bg-slate-700/40 py-2 px-6 font-semibold text-white hover:border-white/20 hover:bg-slate-700/60 focus:outline-hidden focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900">
        + Track New Stock
      </button>

    </div>
  );
}