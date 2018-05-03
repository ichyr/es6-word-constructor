const { simpleSearch } = require('../simpleSearch');

process.on('message', ({ input, dictionary }) => {
  const result = simpleSearch(input, dictionary);
  process.send({ result });
});
