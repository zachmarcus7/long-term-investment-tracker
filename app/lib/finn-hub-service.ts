import { CompanyMetricsData, RecommendationData, StockSymbol } from "@/app/lib/definitions";

const BASE_URL =`https://finnhub.io/api/v1`;
const API_KEY = "cvsk6q9r01qhup0raco0cvsk6q9r01qhup0racog";

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

  return await res.json();
}