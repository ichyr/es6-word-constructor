const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const SEGMENTS = [...ALPHABET, 'other'];

/**
 * function that creates array of `Set`s for
 * alphabet to divide incomming words into sections.
 *
 * @returns {Object} Set[]
 */
export function createInitialDictionary() {
  const result = {};
  for (let key in SEGMENTS) {
    result[key] = [];
  }
  return result;
}

/**
 *  Finds the key in dictionary segments for supplied word.
 *
 * @param {any} word
 * @returns {string}
 */
function selectDictionarySection(word) {
  const start = word[0].toUperCase();
  return ALPHABET.indexOf(start) > -1 ? start : 'other';
}


/**
 *  Returns array of dictionry sections.
 * 
 * @returns {string[]}
 */
export function getDictionarySections() {
  return SEGMENTS;
}

/**
 * adds words from provided data array to dictionary into respectful sections.
 * 
 * @param {string[]} data incomping data array
 * @param {object} dictionary dictionary data structure
 */
export function digestChunk(data, dictionary) {
  data.forEach(word => {
    const section = selectDictionarySection(word);
    dictionary[section].push(word.toLowerCase())
  });
}
