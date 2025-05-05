const BASE_URL = `https://api.polygon.io/v2`;
const API_KEY = "NbONcR7tNxv8Y04sQv1p2WtwXl3QpbVR";

// store both data and the timestamp
const cache: Record<string, { data: any; timestamp: number }> = {};

// 24 hours in ms
const CACHE_TTL = 1000 * 60 * 60 * 24;

export async function getDailyAggregates(ticker: string = "AAPL") {
  const now = Date.now();
  const cached = cache[ticker];

  if (cached && now - cached.timestamp < CACHE_TTL) 
    return cached.data;
  
  const end = new Date().toISOString().split('T')[0];
  const start = new Date(new Date().setFullYear(new Date().getFullYear() - 2))
    .toISOString()
    .split('T')[0];

  const res = await fetch(
    `${BASE_URL}/aggs/ticker/${ticker}/range/1/day/${start}/${end}?adjusted=true&sort=asc&apiKey=${API_KEY}`
  );

  if (!res.ok) 
    throw new Error(`Failed to fetch stock data for ${ticker}`);
  
  const json = await res.json();
  const results = json.results || [];

  cache[ticker] = {
    data: results,
    timestamp: now,
  };

  return results;
}