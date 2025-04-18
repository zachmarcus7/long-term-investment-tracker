const BASE_URL =`https://api.polygon.io/v2`;
//const API_KEY = process.env.POLYGON_API_KEY;
const API_KEY = "NbONcR7tNxv8Y04sQv1p2WtwXl3QpbVR";

/**
 * 
 * @param ticker 
 * @returns 
 */
export async function getYearlyPrice(ticker: string = "AAPL") {
  const now = new Date();
  const end = now.toISOString().split('T')[0];
  const start = new Date(now.setFullYear(now.getFullYear() - 1)).toISOString().split('T')[0];

  const res = await fetch(`${BASE_URL}/aggs/ticker/${ticker}/range/1/day/${start}/${end}?adjusted=true&sort=asc&apiKey=${API_KEY}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch stock data for ${ticker}`);
  }

  const json = await res.json();
  return json.results || [];
}

/**
 * 
 * @param ticker 
 * @returns 
 */
export async function getDailyAggregates(ticker: string = "AAPL") {
  const now = new Date();
  const end = now.toISOString().split('T')[0];
  const start = new Date(now.setFullYear(now.getFullYear() - 1)).toISOString().split('T')[0];

  const res = await fetch(`${BASE_URL}/aggs/ticker/${ticker}/range/1/day/${start}/${end}?adjusted=true&sort=asc&apiKey=${API_KEY}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch stock data for ${ticker}`);
  }

  const json = await res.json();
  return json.results || [];
}

/**
 * 
 * @param ticker 
 * @returns 
 */
export async function getMonthlyAggregates(ticker: string = "AAPL") {
  const now = new Date();
  const end = now.toISOString().split('T')[0];
  const start = new Date(now.setFullYear(now.getFullYear() - 1)).toISOString().split('T')[0];

  const res = await fetch(`${BASE_URL}/aggs/ticker/${ticker}/range/1/month/${start}/${end}?adjusted=true&sort=asc&apiKey=${API_KEY}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch stock data for ${ticker}`);
  }

  const json = await res.json();
  return json.results || [];
}

/**
 * 
 * @param ticker 
 * @returns 
 */
export async function getStockNews(ticker: string = "AAPL") {
  const res = await fetch(`${BASE_URL}/reference/news?ticker=${ticker}&apiKey=${API_KEY}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch news for ${ticker}`);
  }

  const json = await res.json();
  return json.results || [];
}

/**
 * 
 * @param ticker 
 * @returns 
 */
export async function getCompanyProfile(ticker: string = "AAPL") {
  const res = await fetch(`${BASE_URL}/reference/tickers/${ticker}?apiKey=${API_KEY}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch profile for ${ticker}`);
  }

  const json = await res.json();
  return json.results || {};
}