const { simpleSearch } = require('../simpleSearch');

const queue = [];

// console.log('SPAWNED CHILD PRC => ', process.pid);

process.on('message', ({ input, dictionary, key }) => {
  // console.log(`CHILD (${process.pid}) ::: REQUEST for ${key}`);
  queue.push({ input, dictionary, key });
  // if the queue length was zero we should run handler ( and now is 1)
  if (queue.length === 1) {
    // here we access first element of the queue - now .shift() it
    handleSearch(queue[0]);
  }
});

function handleSearch({ input, dictionary, key }) {
  const result = simpleSearch(input, dictionary);
  // console.log(`CHILD (${process.pid}) ::: RESULT SENDING ${result}`);
  process.send({ result, key });
  // after entry was processes we .shift it()
  queue.shift();

  // if the queue is has entries - we continue by reccursively calling this function
  if (queue.length) {
    handleSearch(queue[0]);
  }
}
