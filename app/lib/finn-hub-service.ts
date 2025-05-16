import { CompanyMetricsData, RecommendationData, StockSymbol } from "@/app/lib/definitions";

const BASE_URL = process.env.FINNHUB_API_BASE_URL;
const API_KEY = process.env.FINNHUB_API_KEY;

/**
 * Retrieves company basic financials such as margin, P/E ratio, 52-week high/low etc. Defaults to "AAPL".
 * @param ticker - Stock ticker to retrieve data for.
 * @returns - CompanyMetricsData object.
 */
export async function getBasicFinancials(ticker: string = "AAPL"): Promise<CompanyMetricsData> {
  const res = await fetch(`${BASE_URL}/stock/metric?symbol=${ticker}&metric=all&token=${API_KEY}`);

  if (!res.ok)
    throw new Error(`Failed to fetch stock data for ${ticker}`);
  
  return await res.json();
}

/**
 * Retrieves latest analyst recommendation trends for a company.
 * @param ticker - Stock ticker to retrieve data for.
 * @returns - RecommendationData array.
 */
export async function getRecommendations(ticker: string = "AAPL"): Promise<RecommendationData[]> {
  const res = await fetch(`${BASE_URL}/stock/recommendation?symbol=${ticker}&token=${API_KEY}`);

  if (!res.ok)
    throw new Error(`Failed to fetch recommendations for ${ticker}`);

  return await res.json();
}

/**
 * Retrieves supported stock symbols.
 * @returns - StockSymbol array.
 */
export async function getStockSymbols(): Promise<StockSymbol[]> {
  const res = await fetch(`${BASE_URL}/stock/symbol?exchange=US&token=${API_KEY}`);

  if (!res.ok)
    throw new Error(`Failed to fetch stock symbols`);

  const allSymbols: StockSymbol[] = await res.json();

  return allSymbols.slice(0, 1);  // return only the first 50
}