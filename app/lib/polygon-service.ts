import { DailyData } from "@/app/lib/definitions";

const BASE_URL = process.env.POLYGON_API_BASE_URL;
const API_KEY = process.env.POLYGON_API_KEY;

// store both data and the timestamp
const cache: Record<string, { data: DailyData[]; timestamp: number | undefined }> = {};

// 24 hours in ms
const CACHE_TTL = 1000 * 60 * 60 * 24;

/**
 * Retrieves daily OHLC (open, high, low, close), volume, and volume-weighted 
 * average price (VWAP) data for all U.S. stocks on a specified trading date.
 * @param ticker - Stock ticker to retrieve data for.
 * @returns - DailyData array.
 */
export async function getDailyAggregates(ticker: string = "AAPL"): Promise<DailyData[]> {
  const now = Date.now();
  const cached = cache[ticker];

  // check cache to see if data was retrieved within the past day
  if (cached) {
    if (now - cached.timestamp! < CACHE_TTL) {
      return cached.data;
    } else { 
      cache[ticker] = {data: [], timestamp: undefined };
    }
  } 
  
  // format time to retrieve data for
  const end = new Date().toISOString().split('T')[0];
  const start = new Date(new Date().setFullYear(new Date().getFullYear() - 2))
    .toISOString()
    .split('T')[0];

  const res = await fetch(`${BASE_URL}/aggs/ticker/${ticker}/range/1/day/${start}/${end}?adjusted=true&sort=asc&apiKey=${API_KEY}`);

  if (!res.ok) 
    throw new Error(`Failed to fetch stock data for ${ticker}`);
  
  const json = await res.json();
  const results = json.results || [];

  // cache data for future use
  cache[ticker] = {data: results, timestamp: now };
  return results;
}