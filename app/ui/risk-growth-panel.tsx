import { Panel } from "@/app/ui/panel";
import OverviewPanelSkeleton from "@/app/ui/skeletons/overview-panel-skeleton";
import { formatMarketCap } from "@/app/lib/finn-hub-utils";

export default function RiskGrowthPanel({data}: {data: any}) {
  if (data === null)
    return <OverviewPanelSkeleton />

  return (
    <Panel title="Risk & Growth">
      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-sm">Revenue Growth (3 Years)</h6>
        {data.metric['revenueGrowth3Y']
          ? <p className="font-bold text-base text-blueish-600">{data.metric['revenueGrowth3Y']}%</p>
          : <p className="font-bold text-base text-greyish-300">-</p>
        }
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-sm">Revenue Growth (5 Years)</h6>
        {data.metric['revenueGrowth5Y']
          ? <p className="font-bold text-base text-blueish-600">{data.metric['revenueGrowth5Y']}%</p>
          : <p className="font-bold text-base text-greyish-300">-</p>
        }
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-sm">5 Year ROI</h6>
        {data.metric['roi5Y']
          ? <p className="font-bold text-base text-blueish-600">{data.metric['roi5Y']}%</p>
          : <p className="font-bold text-base text-greyish-300">-</p>
        }
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-sm">Debt-To-Equity (Annual)</h6>
        {data.metric['longTermDebt/equityAnnual']
          ? <p className="font-bold text-base text-blueish-600">{data.metric['longTermDebt/equityAnnual']?.toFixed(2)}</p>
          : <p className="font-bold text-base text-greyish-300">-</p>
        }
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-sm">Debt-To-Equity (Quarterly)</h6>
        {data.metric['longTermDebt/equityQuarterly']
          ? <p className="font-bold text-base text-blueish-600">{data.metric['longTermDebt/equityQuarterly']?.toFixed(2)}</p>
          : <p className="font-bold text-base text-greyish-300">-</p>
        }
      </div>
    </Panel>
  );
}