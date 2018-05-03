const { generateInputSet } = require('./inputUtilities');

exports.printResult = function({ start, correctWords }) {
  const end = Date.now();
  console.log('⏰', ' it took ', end - start, ' ms to finish');
  console.log('📖', ` found ${correctWords.length} words in dictionary`);
  console.log('They are the following', ...correctWords);
};

exports.digestDataChunk = function(dictionary, digestChunk, count) {
  return function(chunk) {
    const data = chunk.split('\n');
    count[0] += data.length;
    digestChunk(data, dictionary);
  };
};

exports.getInputSet = function(fs, path) {
  let inputLetterSet = fs.readFileSync(path, 'utf8');
  inputLetterSet = [...inputLetterSet].map(_ => _.toLocaleLowerCase());
  return generateInputSet(inputLetterSet);
};
