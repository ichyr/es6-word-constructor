/**
 * Function that uses Array.indexOf to find occurances of words in dictionary
 *
 * @param {string[]} input list of words generated from input letters
 * @param {string[]} dictionary content of dictionary
 * @returns {string[]} list of words from input array, found in dictionary
 */
function simpleSearch(input, dictionary) {
  const result = [];
  console.log(input);
  input.forEach(element => {
    if (dictionary.indexOf(element) > -1) {
      result.push(element);
    }
  });
  return result;
}

function simpleSearchAsync(input, dictionary, cb) {
  cb(simpleSearch(input, dictionary));
}

function simpleSearchPromise(input, dictionary) {
  return new Promise(function(resolve, reject) {
    try {
      resolve(simpleSearch(input, dictionary));
    } catch (error) {
      resolve(error);
    }
  });
}

module.exports = {
  simpleSearch,
  simpleSearchAsync,
  simpleSearchPromise
};
