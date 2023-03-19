/**
 * Returns a random signed integer number between min and max (inclusive).
 *
 * @param {number} [min=Number.MIN_SAFE_INTEGER] - The minimum value of the range (inclusive). Default is -2⁵³ = -9_007_199_254_740_991.
 * @param {number} [max=Number.MAX_SAFE_INTEGER] - The maximum value of the range (inclusive). Default is 2⁵³ = 9_007_199_254_740_991.
 *
 * @returns {number} A random signed integer number between min and max (inclusive).
 */
export function getRandomInt(
  min: number = Number.MIN_SAFE_INTEGER,
  max: number = Number.MAX_SAFE_INTEGER
): number {
  const range: number = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}
