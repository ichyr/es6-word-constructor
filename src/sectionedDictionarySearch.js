const {
  simpleSearch,
  simpleSearchAsync,
  simpleSearchPromise
} = require('./simpleSearch');
const { makeThunk } = require('./03_thunks/00_utils');
const { ThreadPool } = require('./10_concurrency/01_tread_pool');

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
 * Async threaded version of dictionarySearch function. Passes resulting value to third
 * argument - callback function.
 *
 * @param {string[]} input array of test words
 * @param {string[]} dictionary array of words
 * @param {(data: string[]) => void} cb
 */
function dictionarySearchThreaded(input, dictionary, cb) {
  const pool = new ThreadPool(digestSimpleSearchAsync);
  let results = [];
  let counter = Object.keys(dictionary);

  /**
   * We start with `counter` variable set to array of all keys in dictionary object.
   * After finishing searching specific key in dictionary we call this function.
   * It filters out finished key from initial array. Once array is finished we
   * call callback argument with list of all matched words and kill all processes in the pool
   *
   * @param {string} key for which search was finished
   */
  function onProcessFinish(key) {
    counter = counter.filter(elem => elem !== key);
    if (!counter.length) {
      cb(results);
      pool.endPool();
    }
  }

  /**
   * Adds matched variables to results array. calls onProcessFinish for finished key.
   *
   * @param {any} { result, key }
   */
  function digestSimpleSearchAsync({ result, key }) {
    results = [...results, ...result];
    onProcessFinish(key);
  }

  for (const key in dictionary) {
    pool.execute(input[key], dictionary[key], key, digestSimpleSearchAsync);
  }
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
    Promise.all(searches)
      .then(function(data) {
        resolve(data.reduce((aggr, curr) => [...aggr, ...curr], []));
      })
      .catch(function(err) {
        reject(err);
      });
  });
}

function dictionarySearchRawGenerator(input, dictionary, cb) {
  let results = [];

  // do i need something to happend in parallel ->
  // store those things in intermediate promises and then sequence their responses
  // sequentially -> run them after yield keyword
  function* digestInput(input, dictionary) {
    // const parallel = {};
    // for (const key in dictionary) {
    //   parallel[key] = simpleSearch(input[key], dictionary[key]);
    // }
    // for (const key in dictionary) {
    //   yield parallel[key];
    // }

    // sequential
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
  dictionarySearchRawGenerator,
  dictionarySearchThreaded
};
