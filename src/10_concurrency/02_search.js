const { simpleSearch } = require('../simpleSearch');

process.on('message', ({ input, dictionary, key }) => {
  const result = simpleSearch(input, dictionary);
  process.send({ result, key });
});
