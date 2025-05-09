/**
 * Formats the passed market cap of a company to a more readable string.
 * @param value - Number value of market cap.
 * @returns - Readable string.
 */
export function formatMarketCap(value: number): string {
  try {
    if (value >= 1000000) return (value / 1000000).toFixed(2) + 'T';
    if (value >= 1000) return (value / 1000).toFixed(2) + 'B';
    return value.toFixed(2) + 'M';
  }
  catch (err) {
    console.log(err);
    return "Not Found";
  }
}