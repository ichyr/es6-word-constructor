const fs = require('fs');
const { createInitialDictionary, digestChunk } = require('../dictionaryUtils');
const { dictionarySearchRawGenerator } = require('../sectionedDictionarySearch');
const { printResult, digestDataChunk, getInputSet } = require('../utils');

const inputSet = getInputSet(fs, '../../input/input.txt');
const readStream = fs.createReadStream('../../lib/words.txt', 'utf8');
let count = 0;
let dictionary = createInitialDictionary();

readStream.on('data', digestDataChunk(dictionary, digestChunk, count)).on('end', function() {
  /*eslint-disable-next-line no-console*/
  console.log('📖', ` dictionary of  ${count} words loaded`);
  const start = Date.now();
  dictionarySearchRawGenerator(inputSet, dictionary, correctWords => {
    printResult({ start, correctWords });
  });
});
