/**
 * Helper function used to captilize the first letter of the passed string 
 * and set all other letters to lowercase.
 * @param word - String to perform operation on.
 * @returns - Formatted string.
 */
export function capitalizeFirstLetter(word: string) {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Helper function used to format the name of the passed stock.
 * @param stockName - Unformatted stock name.
 * @returns - Formatted stock name.
 */
export function formatStockName(stockName: string) {
  const formatted = stockName
    .split(' ')
    .map(word => (capitalizeFirstLetter(word)))
    .join(' ');

  return (formatted.length > 20)
    ? `${formatted.slice(0, 17)}...`
    : formatted;
}