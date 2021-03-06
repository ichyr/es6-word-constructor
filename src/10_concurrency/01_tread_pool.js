const { fork } = require('child_process');

const POOL_CAPACITY = 8;

class ThreadPool {
  constructor(executionCallback) {
    this.pool = [];
    this.nextIndex = 0;
    this.startPool(POOL_CAPACITY);
    this.cb = executionCallback;
  }
  /**
   * Get index of next thread for round robin algorithm
   *
   * @returns {number}
   * @memberof ThreadPool
   */
  getNextIndex() {
    const idx = this.nextIndex;
    this.nextIndex = idx === this.pool.length - 1 ? 0 : idx + 1;
    return idx;
  }

  /**
   * Starts pool of child processes
   *
   * @param {any} count number of threads to start in the pool
   * @memberof ThreadPool
   */
  startPool(count) {
    for (let i = 0; i < count; i++) {
      this.pool.push(fork('../10_concurrency/02_search.js'));
      this.pool[i].on('message', data => {
        // console.log(`POOL ::: RESPONSE for ${data.key}`);
        // console.log(data);
        this.cb(data);
      });
    }

    
  }

  /**
   *  Schedules task based on round robin algorithm for child processes.
   *
   * @param {any} input array of strings from input belonging to part `key`
   * @param {any} dictionary array of string from dictionary belonging to part `key`
   * @param {any} key descriptor of section of input/dictionary
   * @param {any} cb callback to be called when
   * @memberof ThreadPool
   */
  execute(input, dictionary, key) {
    const idx = this.getNextIndex();
    const data = { input, dictionary, key };
    // console.log(`POOL ::: REQUEST for ${key}`);
    this.pool[idx].send(data);
  }

  /**
   * Finishes all threads in thread pool
   *
   * @memberof ThreadPool
   */
  endPool() {
    this.pool.forEach(fork => fork.kill());
  }
}

exports.ThreadPool = ThreadPool;
