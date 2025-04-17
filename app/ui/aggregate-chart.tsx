import StockChart from "@/app/ui/stock-chart";
import { getYearlyPrice } from "@/app/lib/polygonService";

export default async function AggregateChart({}: {}) {
  const data = await getYearlyPrice();

  return (
    <>
      <StockChart data={data} />
    </>
  );
}