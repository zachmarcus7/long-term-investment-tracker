"use client"

/**
 * Creates a new tracked stock symbol in localStorage.
 * @param symbol Stock symbol to track.
 * @returns True is successful, false if stock already exists, null if error.
 */
export async function trackNewStock(symbol: string, description: string): Promise<boolean | null> {
  // placeholder delay to simulate async operation
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    const trackedStocks = JSON.parse(localStorage.getItem('trackedStocks') || '[]');

    if (trackedStocks.includes(`${symbol}\\${description}`) || (symbol === 'AAPL')) 
      return false;
    
    trackedStocks.push(`${symbol}\\${description}`);
    localStorage.setItem('trackedStocks', JSON.stringify(trackedStocks));

    return true;
  } catch (err) {
    console.error("LocalStorage error:", err);
    return null;
  }
}

/**
 * 
 */
export function retrieveTrackedStocks() {
  let trackedStocks = JSON.parse(localStorage.getItem('trackedStocks') || '[]');

  // always include AAPL as a default
  if (!trackedStocks.includes("AAPL\\APPLE INC"))
    trackedStocks = ["AAPL\\APPLE INC", ...trackedStocks];

  return trackedStocks.sort((a: string, b: string) => a.charAt(0).toLowerCase().localeCompare(b.charAt(0).toLowerCase()));
}