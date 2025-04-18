import { getDailyAggregates } from "@/app/lib/polygon-service";
import LineChart from "@/app/ui/line-chart";
import { ArrowUpRightIcon, ArrowDownLeftIcon } from "@heroicons/react/24/outline";
import { getYearlyChange, getPercentChange } from "@/app/lib/polygon-utils";

export default async function DailyAggregateChart({}: {}) {
  const data = await getDailyAggregates();
  const yearlyChange = getYearlyChange(data);
  const percentChange = getPercentChange(data);
  const positive = percentChange >= 0;

  return (
    <>
      <div className="w-full flex items-end justify-between pb-2 lg:pb-3 lg:pl-4 lg:pr-2">

        <div className="flex items-end gap-2">
          <h2 className={`text-xl lg:text-4xl 2xl:text-5xl font-bold ${positive ? 'text-emerald-500' : 'text-rose-500'}`}>
            <span className="text-base lg:text-3xl 2xl:text-4xl">$</span>
            {yearlyChange}
          </h2>
          {positive
            ? <ArrowUpRightIcon className="w-5 h-5 mb-1 text-emerald-500 font-bold"/>
            : <ArrowDownLeftIcon className="w-5 h-5 mb-1 text-emerald-500 font-bold"/>
          }
        </div>

        <p className="max-lg:mb-1 px-3 py-0.5 rounded-xl text-xs lg:text-sm bg-emerald-200/50 text-emerald-500">
          {positive? 'Up' : 'Down'} {percentChange}% <span className="max-lg:hidden">Past Year</span>
        </p>

      </div>

      <div>
        <LineChart 
          data={data}
          positive={positive}
        />
      </div>

    </>
  );
}