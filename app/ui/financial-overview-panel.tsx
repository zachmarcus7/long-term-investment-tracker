import { CompanyMetricsData } from "@/app/lib/definitions";
import { formatMarketCap } from "@/app/lib/finn-hub-utils";
import { Panel } from "@/app/ui/panel";

export default function FinancialOverviewPanel({
  data
}: {
  data?: CompanyMetricsData
}) {
  return (
    <Panel title="Financial Overview">
      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-xs 2xl:text-sm">Market Cap</h6>
        {data && data.metric.marketCapitalization
          ? <p className="font-bold text-sm 2xl:text-base text-blueish-600">${formatMarketCap(data.metric.marketCapitalization)}</p>
          : <p className="font-bold text-sm 2xl:text-base text-greyish-300">-</p>
        }
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-xs 2xl:text-sm">1 Year High</h6>
        {data && data.metric['52WeekHigh']
          ? <p className="font-bold text-sm 2xl:text-base text-blueish-600">${data.metric['52WeekHigh']}</p>
          : <p className="font-bold text-sm 2xl:text-base text-greyish-300">-</p>
        }
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-xs 2xl:text-sm">1 Year Low</h6>
        {data && data.metric['52WeekLow']
          ? <p className="font-bold text-sm 2xl:text-base text-blueish-600">${data.metric['52WeekLow']}</p>
          : <p className="font-bold text-sm 2xl:text-base text-greyish-300">-</p>
        }
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-xs 2xl:text-sm">P/E Ratio</h6>
        {data && data.metric.peNormalizedAnnual
          ? <p className="font-bold text-sm 2xl:text-base text-blueish-600">{data.metric.peNormalizedAnnual?.toFixed(2)}</p>
          : <p className="font-bold text-sm 2xl:text-base text-greyish-300">-</p>
        }
      </div>

      <div className="flex w-full justify-between mb-2">
        <h6 className="text-greyish-300 text-xs 2xl:text-sm">P/B Ratio</h6>
        {data && data.metric.pbAnnual
          ? <p className="font-bold text-sm 2xl:text-base text-blueish-600">{data.metric.pbAnnual?.toFixed(2)}</p>
          : <p className="font-bold text-sm 2xl:text-base text-greyish-300">-</p>
        }
      </div>
    </Panel>
  );
}