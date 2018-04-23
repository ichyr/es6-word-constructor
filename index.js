// entry point
const fs = require('fs');
const { generateInputSet } = require('./src/inputUtilities');
const { simpleSearch } = require('./src/simpleSearch');
const { createInitialDictionary, digestChunk, getDictionarySections } = require('./src/dictionaryUtils');

// read input data
let inputLetterSet = fs.readFileSync('./input/input.txt', 'utf8');
inputLetterSet = [...inputLetterSet].map(_ => _.toLocaleLowerCase());

const inputSet = generateInputSet(inputLetterSet);

// read File
const readStream = fs.createReadStream('./lib/words.txt', 'utf8');
let count = 0;
let dictionary = createInitialDictionary();
readStream
  .on('data', function(chunk) {
    const data = chunk.split('\n');
    count += data.length;
    digestChunk(data, dictionary);
  })
  .on('end', function() {
    console.log('📖', ` dictionary of  ${dictionary.length} words loaded`);
    const start = Date.now();
    const correctWords = simpleSearch(inputSet, dictionary);
    const end = Date.now();

    console.log('⏰', ' it took ', end - start, ' ms to finish');
    console.log('📖', ` found ${correctWords.length} words in dictionary`);
    console.log('They are the following', ...correctWords);
  });
