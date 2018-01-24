Set.prototype.union = function(setB) {
  var union = new Set(this);
  for (var elem of setB) {
      union.add(elem);
  }
  return union;
}
/**
 * 
 * 
 * @param {any} arr 
 * @returns {Set<String>}
 */
function generatePermutationsForAllItems(arr) {
  let perm = new Set(arr)
  for(let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const itemArr = [...item]
    const itemPermutations = generatePermutations(item)
    perm = perm.union(itemPermutations)
  }
  return perm
}

/**
 * Generates all permutations of given array items
 *
 * @param {[]} a
 * @returns {Set<String>}
 */
function generatePermutations(a) {
  // if(a = ['a', 'i']) {debugger}
  const len = a.length;
  const r = new Set();
  for (let q = 0; q < len; q++) {
    for (let w = 0; w < len; w++) {
      const newItem = swapItems(a, len, q, w);
      r.add(newItem.join(''));
    }
  }
  return r;
}

/**
 * Ensures that the first index is less then second one
 *
 * @param {number} a
 * @param {number} b
 * @returns
 */
function ensureIndexOrder(a, b) {
  return a > b ? [b, a] : [a, b];
}

/**
 * Ensures two indexes are in score of array bounds.
 *
 * @param {number} arrLen
 * @param {number} idx1
 * @param {number} idx2
 * @returns {boolean}
 */
function areIndeciesInArray(arrLen, idx1, idx2) {
  return 0 <= idx1 && idx1 < arrLen && 0 <= idx2 && idx2 < arrLen;
}

/**
 * Swaps two items in array by given indexes.
 * Ensures indexes were in correct order.
 * Throws exception if the index is out of bound of array.
 *
 * @param {[]]} arr
 * @param {number} arrLen
 * @param {number} firstIdx
 * @param {number} lastIdx
 * @returns {[]}
 */
function swapItems(arr, arrLen, firstIdx, lastIdx) {
  if (!areIndeciesInArray(arrLen, firstIdx, lastIdx))
    throw new Error("Provided indecies are out of array bounds");
  const temp = [...arr];
  [temp[firstIdx], temp[lastIdx]] = [temp[lastIdx], temp[firstIdx]]
  return temp;
}
/**
 * Generates a set of arrays from initial input data
 *
 * @param {[]} arr
 * @returns {Set<[]>}
 */
function generateInitialSet(arr) {
  const result = generateArrayOfVariantsFromInput(arr)
  return new Set(result)
}
/**
 *
 *
 * @param {[]} arr
 * @returns {Set{}}
 */
function generateArrayOfVariantsFromInput(arr) {
  const result = new Set();
  arr.map((currentItem, itemIdx) => {
    const residualArray = getArrayWithoutCurrentItem(arr, itemIdx);
    if(residualArray.length === 0) return currentItem
    // Adds current elelemtn from input array with tail of elements from partial string
    residualArray.map((item, itemIdx) => {
      const value = [currentItem, ...residualArray.slice(0, itemIdx)].sort();
      result.add(value.join(""));
    });
    // Adds full partial string to Set
    result.add(residualArray.join(""));
  });
  // Adds full input array as string
  result.add(arr.join(""));
  return [...result];
}
/**
 *
 *
 * @param {[]} arr
 * @param {number} currentItemIdx
 * @returns {[]}
 */
function getArrayWithoutCurrentItem(arr, currentItemIdx) {
  return [...arr.slice(0, currentItemIdx), ...arr.slice(currentItemIdx + 1)];
}

// for ones
// for twoes
// for triads
// etc.

// generate all possible permutations

exports.generateInputSet = function generateInputSet(arr) {
  const data = generateInitialSet(arr);
  const permutations = generatePermutationsForAllItems([...data]);
  console.log([...permutations].sort())
  return permutations;
};
