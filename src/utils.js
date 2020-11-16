/**
 * Utility function - produces an array for the values provided.
 *
 * @example range(3) -> [0, 1, 2]
 * @example range(6) -> [0, 1, 2, 3, 4, 5]
 */
export function range(end) {
  var ans = [];
  for (let i = 0; i < end; i++) {
    ans.push(i);
  }
  return ans;
}
