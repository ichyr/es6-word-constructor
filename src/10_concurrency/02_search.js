const { simpleSearch } = require('../simpleSearch');

console.log('SPAWNED CHILD PRC => ', process.pid);

process.on('message', ({ input, dictionary, key }) => {
  console.log(`CHILD (${process.pid}) ::: REQUEST for ${key}`);
  const result = simpleSearch(input, dictionary);
  console.log(`CHILD (${process.pid}) ::: RESULT SENDING ${result}`);
  process.send({ result, key });
});
