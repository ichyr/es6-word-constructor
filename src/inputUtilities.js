const { generateAllPermutations } = require('./heapAlgo');
const { createInitialDictionary, digestChunk } = require('./dictionaryUtils');

Set.prototype.union = function(setB) {
  var union = new Set(this);
  for (var elem of setB) {
    union.add(elem);
  }
  return union;
};
/**
 *
 *
 * @param {any} arr
 * @returns {Set<String>}
 */
function generatePermutationsForAllItems(arr) {
  let perm = new Set(arr);
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const itemArr = [...item];
    const itemPermutations = generateAllPermutations(itemArr);
    perm = perm.union(itemPermutations);
  }
  return perm;
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
    if (residualArray.length === 0) return currentItem;
    // Adds current elelemtn from input array with tail of elements from partial string
    residualArray.map((item, itemIdx) => {
      const value = [currentItem, ...residualArray.slice(0, itemIdx)].sort();
      result.add(value.join(''));
    });
    // Adds full partial string to Set
    result.add(residualArray.join(''));
  });
  // Adds full input array as string
  result.add(arr.join(''));
  return [...result];
}

/**
 * Generates a set of arrays from initial input data
 *
 * @param {[]} arr
 * @returns {Set<[]>}
 */
function generateInitialSet(arr) {
  const result = generateArrayOfVariantsFromInput(arr);
  return new Set(result);
}

/**
 * Function generates all possible permutations of input letters
 *
 * @param {Array<String>} arr - aray of letters from input file
 * @returns {Array<String>} sorted array of all permutations for given input
 */
exports.generateInputSetOriginal = function(arr) {
  const data = generateInitialSet(arr);
  const permutations = generatePermutationsForAllItems([...data]);
  return [...permutations].sort();
};

/**
 * Function generates all possible permutations of input letters
 *
 * @param {Array<String>} arr - aray of letters from input file
 * @returns {Array<String>} sorted array of all permutations for given input
 */
exports.generateInputSet = function(arr) {
  const data = generateInitialSet(arr);
  const permutations = generatePermutationsForAllItems([...data]);
  // return [...permutations].sort();
  const dictionary = createInitialDictionary();
  return digestChunk(permutations, dictionary);
};
