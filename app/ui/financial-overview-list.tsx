import { formatMarketCap } from "@/app/lib/finn-hub-utils";
import FinancialOverviewListSkeleton from "@/app/ui/skeletons/financial-overview-list.skeleton";

export default function FinancialOverviewList({data}: {data: any}) {
  if (data === null)
    return <FinancialOverviewListSkeleton />

  return (
    <>
      <div className="flex w-full justify-between mb-2">
        <h6 className="text-zinc-400">Market Cap</h6>
        <p className="font-bold text-base">${formatMarketCap(data.metric.marketCapitalization)}</p>
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-zinc-400">1 Year High</h6>
        <p className="font-bold text-base">${data.metric['52WeekHigh']}</p>
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-zinc-400">1 Year Low</h6>
        <p className="font-bold text-base">${data.metric['52WeekLow']}</p>
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-zinc-400">P/E Ratio</h6>
        <p className="font-bold text-base">{data.metric.peNormalizedAnnual?.toFixed(2)}</p>
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-zinc-400">P/B Ratio</h6>
        <p className="font-bold text-base">{data.metric.pbAnnual?.toFixed(2)}</p>
      </div>
    </>
  );
}