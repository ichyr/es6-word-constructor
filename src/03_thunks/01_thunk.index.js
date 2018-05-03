const fs = require('fs');
const { makeThunk } = require('./00_utils');
const { createInitialDictionary, digestChunk } = require('../dictionaryUtils');
const { dictionarySearchThunkAsync } = require('../sectionedDictionarySearch');
const { printResult, digestDataChunk, getInputSet } = require('../utils');

const inputSet = getInputSet(fs, '../../input/input.txt');
const readStream = fs.createReadStream('../../lib/words.txt', 'utf8');
let count = [0];
let dictionary = createInitialDictionary();

readStream.on('data', digestDataChunk(dictionary, digestChunk, count)).on('end', function() {
  console.log('📖', ` dictionary of  ${count} words loaded`);
  const start = Date.now();

  const dictionarySearchThunk = makeThunk(dictionarySearchThunkAsync, inputSet, dictionary);

  dictionarySearchThunk(correctWords => {
    printResult({ start, correctWords });
  });
});
