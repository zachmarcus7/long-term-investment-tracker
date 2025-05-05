/**
 * 
 * @param value 
 * @returns 
 */
export function formatMarketCap(value: number) {
  try {
    if (value >= 1000000) return (value / 1000000).toFixed(2) + 'T';
    if (value >= 1000) return (value / 1000).toFixed(2) + 'B';
    return value.toFixed(2) + 'M';
  }
  catch (err) {
    console.log(err);
  }
}