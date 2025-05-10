import DoughnutChart from "@/app/ui/doughnut-chart";
import { getRecommendations } from "@/app/lib/finn-hub-service";
import { Panel } from '@/app/ui/panel';

export default async function RecommendationsPanel({ stockSymbol }: { stockSymbol: string }) {
  const recommendations = await getRecommendations(stockSymbol);
  const recommendation = (recommendations !== undefined && recommendations.length > 0) ? recommendations[0] : undefined;

  return (
    <div className="h-full col-span-1 md:col-span-4 xl:col-span-2">
      <Panel title="Current Recommendations">
        <div className="flex max-md:flex-wrap">

          {/* Left Column */}
          <div>

            <div>
              <h6 className="text-greyish-300 text-xs 2xl:text-sm">Strong Buy</h6>
              <div className="flex">
                <div className={`h-4 w-4 rounded-full bg-emerald-400 mt-1 flex items-center justify-center ${recommendation === undefined && 'hidden'}`}>
                  <div className="bg-white rounded-full h-2 w-2"></div>
                </div>
                {recommendation
                  ? <p className="ml-2 font-bold text-sm 2xl:text-base text-blueish-600">{recommendation.strongBuy}</p>
                  : <p className="font-bold text-base text-greyish-300">-</p>
                }
              </div>
            </div>

            <div className="mt-3">
              <h6 className="text-greyish-300 text-xs 2xl:text-sm">Buy</h6>
              <div className="flex">
                <div className={`h-4 w-4 rounded-full bg-emerald-200 mt-1 flex items-center justify-center ${recommendation === undefined && 'hidden'}`}>
                  <div className="bg-white rounded-full h-2 w-2"></div>
                </div>
                {recommendation
                  ? <p className="ml-2 font-bold text-sm 2xl:text-base text-blueish-600">{recommendation.buy}</p>
                  : <p className="font-bold text-base text-greyish-300">-</p>
                }
              </div>
            </div>

            <div className="mt-3">
              <h6 className="text-greyish-300 text-xs 2xl:text-sm">Hold</h6>
              <div className="flex">
                <div className={`h-4 w-4 rounded-full bg-greyish-300/30 mt-1 flex items-center justify-center ${recommendation === undefined && 'hidden'}`}>
                  <div className="bg-white rounded-full h-2 w-2"></div>
                </div>
                {recommendation
                  ? <p className="ml-2 font-bold text-sm 2xl:text-base text-blueish-600">{recommendation.hold}</p>
                  : <p className="font-bold text-base text-greyish-300">-</p>
                }
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="ml-20">
            <div>
              <h6 className="text-greyish-300 text-xs 2xl:text-sm">Sell</h6>
              <div className="flex">
                <div className={`h-4 w-4 rounded-full bg-reddish-500/50 mt-1 flex items-center justify-center ${recommendation === undefined && 'hidden'}`}>
                  <div className="bg-white rounded-full h-2 w-2"></div>
                </div>
                {recommendation
                  ? <p className="ml-2 font-bold text-sm 2xl:text-base text-blueish-600">{recommendation.sell}</p>
                  : <p className="font-bold text-base text-greyish-300">-</p>
                }
              </div>
            </div>

            <div className="mt-3">
              <h6 className="text-greyish-300 text-xs 2xl:text-sm">Strong Sell</h6>
              <div className="flex">
                <div className={`h-4 w-4 rounded-full bg-reddish-500 mt-1 flex items-center justify-center ${recommendation === undefined && 'hidden'}`}>
                  <div className="bg-white rounded-full h-2 w-2"></div>
                </div>
                {recommendation
                  ? <p className="ml-2 font-bold text-sm 2xl:text-base text-blueish-600">{recommendation.strongSell}</p>
                  : <p className="font-bold text-base text-greyish-300">-</p>
                }
              </div>
            </div>
          </div>

          <DoughnutChart recommendations={recommendation} />

        </div>
      </Panel>
    </div>
  );
}