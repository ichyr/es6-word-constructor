const { fork } = require('child_process');
const POOL_CAPACITY = 4;

const pool = [];

let nextIndex = 0;
function getNextIndex() {
  return nextIndex === 3 ? 0 : nextIndex++;
}

exports.startPool = function() {
  for (let i = 0; i < POOL_CAPACITY; i++) {
    pool.push(fork('../10_concurrency/02_search.js'));
  }
};

exports.execute = function(input, dictionary, cb) {
  const idx = getNextIndex();
  const data = { input, dictionary };
  pool[idx].send(data);
  pool[idx].on('message', cb);
};

exports.endPool = function() {
  pool.forEach(fork => fork.kill());
};
