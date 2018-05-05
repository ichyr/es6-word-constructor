const { simpleSearch } = require('../simpleSearch');

const queue = [];

// console.log('SPAWNED CHILD PRC => ', process.pid);

process.on('message', ({ input, dictionary, key }) => {
  // console.log(`CHILD (${process.pid}) ::: REQUEST for ${key}`);
  queue.push({ input, dictionary, key });
  // if the queue length is zero we should run handler
  if (queue.length === 1) {
    handleSearch(queue[0]);
  }
});

function handleSearch({ input, dictionary, key }) {
  const result = simpleSearch(input, dictionary);
  // console.log(`CHILD (${process.pid}) ::: RESULT SENDING ${result}`);
  process.send({ result, key });
  queue.shift();

  if (queue.length) {
    handleSearch(queue[0]);
  }
}
