import { Suspense } from 'react';
// import DashboardTopPanels from '@/app/ui/dashboard-top-panels';
// import { DashboardTopPanelsSkeleton } from '@/app/ui/skeletons';
import DashboardOverviewPanels from '@/app/ui/dashboard-overview-panels';
import { DashboardOverviewPanelsSkeleton, RecommendationsPanelSkeleton } from '@/app/ui/skeletons';
import RecommendationsPanel from '@/app/ui/recommendations-panel';

export default async function Page(props: { params: Promise<{ symbol: string }> }) {
  const params = await props.params;
  const currentStock = params.symbol;

  return (
    <div className="flex-grow md:overflow-y-auto shadow-3xl bg-main p-6 md:p-10 xl:p-12">

      <main className="2xl:px-4 3xl:px-20 4xl:px-54">

        <h1 className="mb-4 font-extrabold text-2xl md:text-3xl">Overview</h1>
        <h6 className="text-greyish-300 mb-4 text-sm 2xl:text-base">
          Welcome to Long Term Track!{' '}
          <span>
            <span className={`pl-1 font-extrabold text-emerald-500`}>{currentStock}</span> is the current selected stock.
          </span>
        </h6>
{/* 
        <Suspense fallback={<DashboardTopPanelsSkeleton />}>
          <DashboardTopPanels stockSymbol={currentStock} />
        </Suspense> */}
        
        
        <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-4">

          <Suspense fallback={<DashboardOverviewPanelsSkeleton />}>
            <DashboardOverviewPanels stockSymbol={currentStock} />
          </Suspense>

          <Suspense fallback={<RecommendationsPanelSkeleton />}>
            <RecommendationsPanel stockSymbol={currentStock} />
          </Suspense>

        </div> 

      </main>

    </div>
  );
}