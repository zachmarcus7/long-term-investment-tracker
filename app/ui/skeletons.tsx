const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function DailyAggregateChartSkeleton() {
  return (
    <div
      className={`${shimmer} relative ovflow-hidden p-2 2xl:h-[450px]`}
    >
      <div className="flex justify-between items-end">
        <div className="rounded-md bg-gray-200 h-6 w-16 2xl:h-12 2xl:w-32" />
        <div className="rounded-md bg-gray-200 h-4 w-20 2xl:h-8 2xl:w-36" />
      </div>
      <div className="bg-gray-200 rounded-xl h-90 w-full mt-6"></div>
    </div>
  );
}

export function OverviewPanelSkeleton() {
  return (
    <div
      className={`${shimmer} relative ovflow-hidden p-2 2xl:h-[450px]`}
    >
      <div className="flex justify-between items-end">
        <div className="rounded-md bg-gray-200 h-6 w-16 2xl:h-12 2xl:w-32" />
        <div className="rounded-md bg-gray-200 h-4 w-20 2xl:h-8 2xl:w-36" />
      </div>
      <div className="bg-gray-200 rounded-xl h-90 w-full mt-6"></div>
    </div>
  );
}