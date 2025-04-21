import { Panel } from "@/app/ui/panel";
import OverviewPanelSkeleton from "@/app/ui/skeletons/overview-panel-skeleton";
import { formatMarketCap } from "@/app/lib/finn-hub-utils";

export default function RiskGrowthPanel({data}: {data: any}) {
  if (data === null)
    return <OverviewPanelSkeleton />

  return (
    <Panel title="Risk & Growth">
      <div className="flex w-full justify-between mb-2">
        <p className="text-zinc-400 text-sm">Revenue Growth (3 Years)</p>
        <h6 className="font-bold text-base">{data.metric['revenueGrowth3Y']}%</h6>
      </div>

      <div className="flex w-full justify-between mb-2">
        <p className="text-zinc-400 text-sm">Revenue Growth (5 Years)</p>
        <h6 className="font-bold text-base">{data.metric['revenueGrowth5Y']}%</h6>
      </div>

      <div className="flex w-full justify-between mb-2">
        <p className="text-zinc-400 text-sm">5 Year ROI</p>
        <h6 className="font-bold text-base">{data.metric['roi5Y']}%</h6>
      </div>

      <div className="flex w-full justify-between mb-2">
        <p className="text-zinc-400 text-sm">Debt-To-Equity (Annual)</p>
        <h6 className="font-bold text-base">{data.metric['longTermDebt/equityAnnual']?.toFixed(2)}</h6>
      </div>

      <div className="flex w-full justify-between mb-2">
        <p className="text-zinc-400 text-sm">Debt-To-Equity (Quarterly)</p>
        <h6 className="font-bold text-base">{data.metric['longTermDebt/equityQuarterly']?.toFixed(2)}</h6>
      </div>
    </Panel>
  );
}