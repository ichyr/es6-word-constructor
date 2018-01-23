// entry point

// read File
const fs = require('fs')

const readStream = fs.createReadStream('./lib/words.txt', 'utf8');
let count = 0
readStream.on('data', function(chunk) {  
    count += chunk.split('\n').length
}).on('end', function() {
    console.log(count);
});

let inputLetterSet = fs.readFileSync('./input/input.txt', 'utf8')
inputLetterSet = inputLetterSet.split('\n')