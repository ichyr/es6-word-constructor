const { simpleSearchAsync } = require('./simpleSearch');

/**
 * Function that uses Array.indexOf to find occurances of words in dictionary
 *
 * @param {string[]} input - list of words generated from input letters
 * @param {string[]} dictionary - content of dictionary
 * @returns {string[]} list of words from input array, found in dictionary
 */
exports.dictionarySearch = function dictionarySearch(input, dictionary) {
  const result = [];
  for (const key in dictionary) {
    simpleSearchAsync(index, dictionary[key], data => {
      console.log('🌷 completed for section ', key);
      result.push(data);
    });
  }
  return result;
};

exports.dictionarySearchAsync = function dictionarySearch(input, dictionary, cb) {
    const result = [];
    for (const key in dictionary) {
      simpleSearchAsync(index, dictionary[key], data => {
        console.log('🌷 completed for section ', key);
        result.push(data);
      });
    }
    cb(result);
  };