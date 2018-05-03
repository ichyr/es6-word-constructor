/**
 *  Implementation of Heaps algorithm for generation of all possible permutations of array
 *
 * https://en.wikipedia.org/wiki/Heap%27s_algorithm
 *
 * @param {number} n number of items in array
 * @param {[]]} a
 */
exports.generateAllPermutations = function generateAllPermutations(a) {
  const n = a.length;
  let result = new Set();
  let c = [];
  for (let i = 0; i < n; i++) {
    c[i] = 0;
  }

  result.add(a.join(''));

  let i = 0;
  while (i < n) {
    if (c[i] < i) {
      if (i % 2 === 0) {
        [a[0], a[i]] = [a[i], a[0]];
      } else {
        [a[c[i]], a[i]] = [a[i], a[c[i]]];
      }
      result.add(a.join(''));
      c[i] += 1;
      i = 0;
    } else {
      c[i] = 0;
      i++;
    }
  }
  return [...result];
};
