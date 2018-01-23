// entry point

// read File
const fs = require('fs')

let words = fs.readFileSync('./lib/words.txt');

const wordsList = words.split(',');

wordsList