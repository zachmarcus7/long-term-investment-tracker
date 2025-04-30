import { Panel } from "@/app/ui/panel";
import OverviewPanelSkeleton from "@/app/ui/skeletons/overview-panel-skeleton";
import { formatMarketCap } from "@/app/lib/finn-hub-utils";

export default function FinancialOverviewPanel({data}: {data: any}) {
  if (data === null)
    return <OverviewPanelSkeleton />

  return (
    <Panel title="Financial Overview">
      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-sm">Market Cap</h6>
        <p className="font-bold text-base text-blueish-600">${formatMarketCap(data.metric.marketCapitalization)}</p>
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-sm">1 Year High</h6>
        <p className="font-bold text-base text-blueish-600">${data.metric['52WeekHigh']}</p>
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-sm">1 Year Low</h6>
        <p className="font-bold text-base text-blueish-600">${data.metric['52WeekLow']}</p>
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-sm">P/E Ratio</h6>
        <p className="font-bold text-base text-blueish-600">{data.metric.peNormalizedAnnual?.toFixed(2)}</p>
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-sm">P/B Ratio</h6>
        <p className="font-bold text-base text-blueish-600">{data.metric.pbAnnual?.toFixed(2)}</p>
      </div>
    </Panel>
  );
}