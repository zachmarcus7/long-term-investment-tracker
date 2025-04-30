import DoughnutChart from "@/app/ui/doughnut-chart";
import { RecommendationData } from "@/app/lib/definitions";

export default function RecommendationsChart({
  recommendations
}: {
  recommendations: RecommendationData
}) {
  return (
    <div className="lg:flex">

      <div>
        <div>
          <h6 className="text-greyish-300 text-sm">Strong Buy</h6>
          <div className="flex">
            <div className="h-4 w-4 rounded-full bg-emerald-400 mt-1 flex items-center justify-center">
              <div className="bg-white rounded-full h-2 w-2"></div>
            </div>
            <p className="ml-2 font-bold text-base text-blueish-600">{recommendations.strongBuy}</p>
          </div>
        </div>

        <div className="mt-3">
          <h6 className="text-greyish-300 text-sm">Buy</h6>
          <div className="flex">
            <div className="h-4 w-4 rounded-full bg-emerald-200 mt-1 flex items-center justify-center">
              <div className="bg-white rounded-full h-2 w-2"></div>
            </div>
            <p className="ml-2 font-bold text-base text-blueish-600">{recommendations.buy}</p>
          </div>
        </div>

        <div className="mt-3">
          <h6 className="text-greyish-300 text-sm">Hold</h6>
          <div className="flex">
            <div className="h-4 w-4 rounded-full bg-greyish-300/30 mt-1 flex items-center justify-center">
              <div className="bg-white rounded-full h-2 w-2"></div></div>
            <p className="ml-2 font-bold text-base text-blueish-600">{recommendations.hold}</p>
          </div>
        </div>
      </div>

      <div className="ml-20">
        <div>
          <h6 className="text-greyish-300 text-sm">Sell</h6>
          <div className="flex">
            <div className="h-4 w-4 rounded-full bg-reddish-500/50 mt-1 flex items-center justify-center">
              <div className="bg-white rounded-full h-2 w-2"></div></div>
            <p className="ml-2 font-bold text-base text-blueish-600">{recommendations.sell}</p>
          </div>
        </div>

        <div className="mt-3">
          <h6 className="text-greyish-300 text-sm">Strong Sell</h6>
          <div className="flex">
            <div className="h-4 w-4 rounded-full bg-reddish-500 mt-1 flex items-center justify-center">
              <div className="bg-white rounded-full h-2 w-2"></div>
            </div>
            <p className="ml-2 font-bold text-base text-blueish-600">{recommendations.strongSell}</p>
          </div>
        </div>
      </div>

      <DoughnutChart recommendations={recommendations} />

    </div>
  );
}