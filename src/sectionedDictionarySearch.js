const { simpleSearchAsync } = require('./simpleSearch');
const { makeThunk } = require('./02_thunks/00_utils');

/**
 * Function that uses Array.indexOf to find occurances of words in dictionary
 *
 * @param {string[]} input - list of words generated from input letters
 * @param {string[]} dictionary - content of dictionary
 * @returns {string[]} list of words from input array, found in dictionary
 */
function dictionarySearch(input, dictionary) {
  let result = [];
  for (const key in dictionary) {
    simpleSearchAsync(input, dictionary[key], data => {
      result = [...result, ...data];
    });
  }
  return result;
};
/**
 * Async version of dictionarySearch function. Passes resulting value to third
 * argument - callback function.
 * 
 * @param {string[]} input array of test words
 * @param {string[]} dictionary array of words 
 * @param {(data: string[]) => void} cb 
 */
function dictionarySearchAsync(input, dictionary, cb) {
  cb(dictionarySearch(input, dictionary));
};

function dictionarySearchThunk(input, dictionary) {
  let thunks = [];
  let result = [];
  for (const key in dictionary) {
    thunks.push(makeThunk(simpleSearchAsync, input, dictionary[key]));
  }

  thunks.forEach(thunk => thunk(data => {
    result = [...result, ...data];
  }));

  return result;
}

function dictionarySearchThunkAsync(input, dictionary, cb) {
  cb(dictionarySearchThunk(input, dictionary));
};

module.exports = {
  dictionarySearch,
  dictionarySearchAsync,
  dictionarySearchThunk,
  dictionarySearchThunkAsync,
}