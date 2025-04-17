import StockChart from "@/app/ui/stock-chart";
import { getDailyAggregates } from "@/app/lib/polygonService";

export default async function DailyAggregateChart({}: {}) {
  const data = await getDailyAggregates();

  return (
    <>
      <StockChart data={data} />
    </>
  );
}