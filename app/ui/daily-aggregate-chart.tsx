import LineChart from "@/app/ui/line-chart";
import { ArrowUpRightIcon, ArrowDownRightIcon } from "@heroicons/react/24/outline";
import { getYearlyChange, getPercentChange } from "@/app/lib/polygon-utils";
import { DailyData } from "@/app/lib/definitions";

export default function DailyAggregateChart({
  data
}: {
  data?: DailyData[]
}) {
  const yearlyChange = getYearlyChange(data);
  const percentChange = getPercentChange(data);
  const positive = percentChange >= 0;

  return (
    <div className="h-full flex flex-col justify-between">

      <div className="w-full flex items-end justify-between pb-2 lg:pb-3 lg:pl-4 lg:pr-2">

        <div className="flex items-end gap-2">
          <h2 className={`text-xl lg:text-4xl 2xl:text-5xl font-bold ${positive ? 'text-emerald-500' : 'text-reddish-500'}`}>
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(yearlyChange)}
          </h2>
          {positive
            ? <ArrowUpRightIcon className="w-5 h-5 mb-1 text-emerald-500 font-bold"/>
            : <ArrowDownRightIcon className="w-5 h-5 mb-1 text-reddish-500 font-bold"/>
          }
        </div>

        <p className={`max-lg:mb-1 px-3 py-0.5 rounded-xl font-bold text-xs lg:text-sm ${positive ? 'bg-emerald-200/50 text-emerald-500' : 'bg-reddish-500/20 text-reddish-500'}`}>
          {positive? 'Up' : 'Down'} {percentChange}% <span className="max-lg:hidden">Past 2 Years</span>
        </p>

      </div>

      <div className="2xl:h-[350px] 3xl:h-[400px] 4xl:h-[450px]">
        <LineChart data={data} positive={positive} />
      </div>

    </div>
  );
}