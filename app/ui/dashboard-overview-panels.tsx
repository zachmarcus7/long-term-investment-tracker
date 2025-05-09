import FinancialOverviewPanel from '@/app/ui/financial-overview-panel';
import { getBasicFinancials } from "@/app/lib/finn-hub-service";
import RiskGrowthPanel from '@/app/ui/risk-growth-panel';

export default async function DashboardOverviewPanels({ stockSymbol }: { stockSymbol: string }) {
  const companyMetrics = await getBasicFinancials(stockSymbol);
  
  return (
    <>
      <FinancialOverviewPanel data={companyMetrics} />
      <RiskGrowthPanel data={companyMetrics} />
    </>
  );
}