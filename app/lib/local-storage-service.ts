"use client"

/**
 * Creates a new tracked stock symbol in localStorage.
 * @param symbol Stock symbol to track.
 * @returns True if successful, false if stock already exists, null if error.
 */
export async function trackNewStock(symbol: string, description: string): Promise<boolean | null> {
  // placeholder delay to simulate async operation
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    const trackedStocks = JSON.parse(localStorage.getItem('trackedStocks') || '[]');

    // Check if the stock already exists or if it's 'AAPL'
    if (trackedStocks.includes(`${symbol}\\${description}`) || (symbol === 'AAPL')) {
      return false;
    }

    // Add the new stock
    trackedStocks.push(`${symbol}\\${description}`);

    // If there are more than 10 items, remove the first (oldest) item
    if (trackedStocks.length > 10) {
      trackedStocks.shift(); // Removes the first item in the array
    }

    // Save the updated list back to localStorage
    localStorage.setItem('trackedStocks', JSON.stringify(trackedStocks));
    
    return true;
  } catch (err) {
    console.error("LocalStorage error:", err);
    return null;
  }
}

/**
 * Retrieves currently tracked stocks from user's local storage.
 * 'AAPL' is always included as a default.
 */
export function retrieveTrackedStocks() {
  let trackedStocks = JSON.parse(localStorage.getItem('trackedStocks') || '[]');

  if (!trackedStocks.includes("AAPL\\APPLE INC"))
    trackedStocks = ["AAPL\\APPLE INC", ...trackedStocks];

  return trackedStocks.sort((a: string, b: string) => a.charAt(0).toLowerCase().localeCompare(b.charAt(0).toLowerCase()));
}