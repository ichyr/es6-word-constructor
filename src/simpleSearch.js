
/**
 * Function that uses Array.indexOf to find occurances of words in dictionary
 * 
 * @param {string[]} input - list of words generated from input letters
 * @param {string[]} dictionary - content of dictionary
 * @returns {string[]} list of words from input array, found in dictionary
 */
exports.simpleSearch = function simpleSearch(input, dictionary) {
    const result = []
    input.forEach(element => {
        // console.log('🚕', 'working on word ', element)
        if (dictionary.indexOf(element) > -1 ) {
            result.push(element)
        }
    });
    return result
}

exports.simpleSearch = function simpleSearchAsync(input, dictionary, cb) {
    const result = []
    input.forEach(element => {
        // console.log('🚕', 'working on word ', element)
        if (dictionary.indexOf(element) > -1 ) {
            result.push(element)
        }
    });
    cb(result);
}