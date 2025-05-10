import { CompanyMetricsData } from "@/app/lib/definitions";
import { Panel } from "@/app/ui/panel";

export default function RiskGrowthPanel({
  data
}: {
  data?: CompanyMetricsData
}) {
  return (
    <Panel title="Risk & Growth">
      <div className="flex w-full justify-between mb-2">
        <div>
          <h6 className="text-greyish-300 text-xs 2xl:text-sm">3 Year Growth</h6>
        </div>
        {data && data.metric['revenueGrowth3Y']
          ? <p className="font-bold text-sm 2xl:text-base text-blueish-600">{data.metric['revenueGrowth3Y']}%</p>
          : <p className="font-bold text-sm 2xl:text-base text-greyish-300">-</p>
        }
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-xs 2xl:text-sm">5 Year Growth</h6>
        {data && data.metric['revenueGrowth5Y']
          ? <p className="font-bold text-sm 2xl:text-base text-blueish-600">{data.metric['revenueGrowth5Y']}%</p>
          : <p className="font-bold text-sm 2xl:text-base text-greyish-300">-</p>
        }
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-xs 2xl:text-sm">5 Year ROI</h6>
        {data && data.metric['roi5Y']
          ? <p className="font-bold text-sm 2xl:text-base text-blueish-600">{data.metric['roi5Y']}%</p>
          : <p className="font-bold text-sm 2xl:text-base text-greyish-300">-</p>
        }
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-xs 2xl:text-sm">Annual D/E</h6>
        {data && data.metric['longTermDebt/equityAnnual']
          ? <p className="font-bold text-sm 2xl:text-base text-blueish-600">{data.metric['longTermDebt/equityAnnual']?.toFixed(2)}</p>
          : <p className="font-bold text-sm 2xl:text-base text-greyish-300">-</p>
        }
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-xs 2xl:text-sm">Quarterly D/E</h6>
        {data && data.metric['longTermDebt/equityQuarterly']
          ? <p className="font-bold text-sm 2xl:text-base text-blueish-600">{data.metric['longTermDebt/equityQuarterly']?.toFixed(2)}</p>
          : <p className="font-bold text-sm 2xl:text-base text-greyish-300">-</p>
        }
      </div>
    </Panel>
  );
}