/**
 * Extracts and returns the first valid URL found in a given string.
 *
 * @param {string} link - The input string to search for a URL.
 * @returns {string} - The first URL found in the input string, or the original string if no URL is found.
 */

export const clearLink = (link: string): string => {
  const urlRegex = /(https?:\/\/|www\.)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]/i;
  const match = link.match(urlRegex);
  return match ? match[0] : link;
}
