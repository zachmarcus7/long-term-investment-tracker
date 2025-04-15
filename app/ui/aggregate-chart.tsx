import StockChart from "@/app/ui/stock-chart";

async function getStockData() {
  const now = new Date();
  const end = now.toISOString().split('T')[0];
  const start = new Date(now.setFullYear(now.getFullYear() - 1)).toISOString().split('T')[0];
  //const API_KEY = process.env.POLYGON_API_KEY;
  const API_KEY = "NbONcR7tNxv8Y04sQv1p2WtwXl3QpbVR";

  const res = await fetch(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/${start}/${end}?adjusted=true&sort=asc&apiKey=${API_KEY}`);
  const json = await res.json();

  return json.results || [];
}

export default async function AggregateChart() {
  const data = await getStockData();

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4">AAPL Stock Price (Past Year)</h1>
      <StockChart data={data} />
    </main>
  );
}