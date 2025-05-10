import FinancialOverviewPanel from '@/app/ui/financial-overview-panel';
import { getBasicFinancials } from "@/app/lib/finn-hub-service";
import RiskGrowthPanel from '@/app/ui/risk-growth-panel';

export default async function DashboardOverviewPanels({ stockSymbol }: { stockSymbol: string }) {
  const companyMetrics = await getBasicFinancials(stockSymbol);
  
  return (
    <>
      <div className="col-span-1 md:col-span-2 xl:col-span-1">
        <FinancialOverviewPanel data={companyMetrics} />
      </div>
      <div className="col-span-1 md:col-span-2 xl:col-span-1">
        <RiskGrowthPanel data={companyMetrics} />
      </div>
    </>
  );
}