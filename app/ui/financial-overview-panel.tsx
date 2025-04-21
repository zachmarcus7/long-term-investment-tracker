import { Panel } from "@/app/ui/panel";
import OverviewPanelSkeleton from "@/app/ui/skeletons/overview-panel-skeleton";
import { formatMarketCap } from "@/app/lib/finn-hub-utils";

export default function FinancialOverviewPanel({data}: {data: any}) {
  if (data === null)
    return <OverviewPanelSkeleton />

  return (
    <Panel title="Financial Overview">
      <div className="flex w-full justify-between mb-2">
        <p className="text-zinc-400 text-sm">Market Cap</p>
        <h6 className="font-bold text-base">${formatMarketCap(data.metric.marketCapitalization)}</h6>
      </div>

      <div className="flex w-full justify-between mb-2">
        <p className="text-zinc-400 text-sm">1 Year High</p>
        <h6 className="font-bold text-base">${data.metric['52WeekHigh']}</h6>
      </div>

      <div className="flex w-full justify-between mb-2">
        <p className="text-zinc-400 text-sm">1 Year Low</p>
        <h6 className="font-bold text-base">${data.metric['52WeekLow']}</h6>
      </div>

      <div className="flex w-full justify-between mb-2">
        <p className="text-zinc-400 text-sm">P/E Ratio</p>
        <h6 className="font-bold text-base">{data.metric.peNormalizedAnnual?.toFixed(2)}</h6>
      </div>

      <div className="flex w-full justify-between mb-2">
        <p className="text-zinc-400 text-sm">P/B Ratio</p>
        <h6 className="font-bold text-base">{data.metric.pbAnnual?.toFixed(2)}</h6>
      </div>
    </Panel>
  );
}