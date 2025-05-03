const BASE_URL =`https://finnhub.io/api/v1`;
const API_KEY = "cvsk6q9r01qhup0raco0cvsk6q9r01qhup0racog";

/**
 * 
 * @param ticker 
 * @returns 
 */
export async function getBasicFinancials(ticker: string = "AAPL") {
  const res = await fetch(`${BASE_URL}/stock/metric?symbol=${ticker}&metric=all&token=${API_KEY}`);

  if (!res.ok)
    throw new Error(`Failed to fetch stock data for ${ticker}`);
  
  return await res.json();
}

/**
 * 
 * @param ticker 
 * @returns 
 */
export async function getCompanyProfile(ticker: string = "AAPL") {
  const res = await fetch(`${BASE_URL}/stock/profile2?symbol=${ticker}&token=${API_KEY}`);

  if (!res.ok)
    throw new Error(`Failed to fetch stock data for ${ticker}`);

  return await res.json();
}

/**
 * 
 * @param ticker 
 * @returns 
 */
export async function getRecommendations(ticker: string = "AAPL") {
  const res = await fetch(`${BASE_URL}/stock/recommendation?symbol=${ticker}&token=${API_KEY}`);

  if (!res.ok)
    throw new Error(`Failed to fetch recommendations for ${ticker}`);

  return await res.json();
}

/**
 * 
 * @param ticker 
 * @returns 
 */
export async function getStockSymbols() {
  const res = await fetch(`${BASE_URL}/stock/symbol?exchange=US&token=${API_KEY}`);

  if (!res.ok)
    throw new Error(`Failed to fetch stock symbols`);

  return await res.json();
}