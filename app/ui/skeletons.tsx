import { Panel } from "@/app/ui/panel";

const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function DailyAggregateChartSkeleton() {
  return (
    <div className="overflow-hidden">
      <div className={`${shimmer} relative ovflow-hidden p-2`}>
        <div className="flex justify-between items-end">
          <div className="rounded-md bg-gray-200 h-6 w-20 2xl:h-12 2xl:w-32" />
          <div className="rounded-md bg-gray-200 h-4 w-24 2xl:h-8 2xl:w-36" />
        </div>
        <div className="bg-gray-200 rounded-xl h-90 w-full mt-6"></div>
      </div>
    </div>
  );
}

export function DashboardOverviewPanelsSkeleton() {
  return (
    <>
      <OverviewPanelSkeleton />
      <OverviewPanelSkeleton />
    </>
  );
}

export function DashboardTopPanelsSkeleton() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 xl:grid-cols-9">
      <div className="col-span-1 md:col-span-3 xl:col-span-6">
        <Panel title="Stock Price (Past 2 Years)">
          <DailyAggregateChartSkeleton />
        </Panel>
      </div>

      <div className="col-span-1 xl:col-span-3">
        <Panel title="Return On Investment">
          <MonthlyAggregateChartSkeleton />
        </Panel>
      </div>
    </div>
  );
}

export function MonthlyAggregateChartSkeleton() {
  return (
    <div className="overflow-hidden">
      <div className={`${shimmer} relative ovflow-hidden p-2`}>
        <div className="flex flex-col justify-between items-end">
          <div className="rounded-md bg-gray-200 h-4 w-full 2xl:h-8" />
          <div className="rounded-md bg-gray-200 h-4 w-full 2xl:h-8 mt-2" />
        </div>
        <div className="bg-gray-200 rounded-xl h-90 w-full mt-8"></div>
      </div>
    </div>
  );
}

export function OverviewPanelSkeleton() {
  return (
    <Panel title="Risk & Growth">
      <div className={`${shimmer} relative ovflow-hidden p-2`}>
        <div className="flex flex-col justify-between items-end">
          <div className="rounded-md bg-gray-200 h-4 w-full 2xl:h-8" />
          <div className="rounded-md bg-gray-200 h-4 w-full 2xl:h-8 mt-2" />
          <div className="rounded-md bg-gray-200 h-4 w-full 2xl:h-8 mt-2" />
          <div className="rounded-md bg-gray-200 h-4 w-full 2xl:h-8 mt-2" />
        </div>
      </div>
    </Panel>
  );
}

export function RecommendationsPanelSkeleton() {
  return (
    <div className="lg:col-span-2 h-full">
      <Panel title="Current Recommendations">
        <div className="overflow-hidden">
          <div className={`${shimmer} relative ovflow-hidden p-2`}>
            <div className="flex flex-col justify-between items-end">
              <div className="rounded-md bg-gray-200 h-4 w-full 2xl:h-8" />
              <div className="rounded-md bg-gray-200 h-4 w-full 2xl:h-8 mt-2" />
              <div className="rounded-md bg-gray-200 h-4 w-full 2xl:h-8 mt-2" />
              <div className="rounded-md bg-gray-200 h-4 w-full 2xl:h-8 mt-2" />
            </div>
          </div>
        </div>
      </Panel></div>
  );
}