const { simpleSearch, simpleSearchAsync, simpleSearchPromise } = require('./simpleSearch');
const { makeThunk } = require('./03_thunks/00_utils');

/**
 * Function that uses Array.indexOf to find occurances of words in dictionary
 *
 * @param {string[]} input - list of words generated from input letters
 * @param {string[]} dictionary - content of dictionary
 * @returns {string[]} list of words from input array, found in dictionary
 */
function dictionarySearch(input, dictionary) {
  let result = [];
  function digestSimpleSearchAsync(data) {
    result = [...result, ...data];
  }

  for (const key in dictionary) {
    simpleSearchAsync(input[key], dictionary[key], digestSimpleSearchAsync);
  }
  return result;
}
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
}

function dictionarySearchThunk(input, dictionary) {
  let thunks = [];
  let result = [];
  for (const key in dictionary) {
    thunks.push(makeThunk(simpleSearchAsync, input[key], dictionary[key]));
  }

  thunks.forEach(thunk =>
    thunk(data => {
      result = [...result, ...data];
    })
  );

  return result;
}

function dictionarySearchThunkAsync(input, dictionary, cb) {
  cb(dictionarySearchThunk(input, dictionary));
}

function dictionarySearchPromise(input, dictionary) {
  return new Promise(function(resolve, reject) {
    let searches = [];
    for (const key in dictionary) {
      searches.push(simpleSearchPromise(input[key], dictionary[key]));
    }
    Promise.all(searches).then(function(data) {
      resolve(data.reduce((aggr, curr) => [...aggr, ...curr], []));
    });
  });
}

function dictionarySearchRawGenerator(input, dictionary, cb) {
  let results = [];

  // do i need something to happend in parallel ->
  // store those things in intermediate promises and then sequence their responses
  // sequentially -> run them after yield keyword
  function* digestInput(input, dictionary) {
    for (const key in dictionary) {
      yield simpleSearch(input[key], dictionary[key]);
    }
  }

  const process = digestInput(input, dictionary);
  for (const result of process) {
    results = [...results, ...result];
  }

  cb(results);
}

module.exports = {
  dictionarySearch,
  dictionarySearchAsync,
  dictionarySearchThunk,
  dictionarySearchThunkAsync,
  dictionarySearchPromise,
  dictionarySearchRawGenerator
};
