/**
 * Returns a formatted string representation of the remaining centiseconds.
 *
 * @param {number} totalCentiseconds - The total number of centiseconds.
 * @returns {string} The formatted string representation of the remaining centiseconds.
 */
export function getCentisecondsValue(totalCentiseconds: number): string {
  const remainingCentiseconds = totalCentiseconds % 100;
  return remainingCentiseconds < 10
    ? `0${remainingCentiseconds}`
    : `${remainingCentiseconds}`;
}
