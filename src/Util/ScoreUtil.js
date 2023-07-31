/**
 * Map an anime analysis score to a display value.  Results are converted to
 * percent integer, for display.  Mapping is performed to avoid showing very
 * low scores.
 * @param {number} value The score from the API, in the range [0, 1].
 * @returns A mapped integer in [20, 100] for display value of the score.
 */
export function mapScoreValue(value) {
  if (value === undefined || value === null) {
    return value;
  }
  // Scores at 0 are disliked items, perform no mapping.
  if (value === 0) {
    return 0;
  }
  // Map the (0, 1] scores to ints [20, 100] for positive vibes.
  return Math.floor((value * 0.8 + 0.2) * 100);
}
