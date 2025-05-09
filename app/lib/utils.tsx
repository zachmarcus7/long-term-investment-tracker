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