// entry point
const fs = require('fs')

// read input data
let inputLetterSet = fs.readFileSync('./input/input.txt', 'utf8')
inputLetterSet = inputLetterSet.split(' ')
console.log('Input data is ', inputLetterSet)


// read File
const readStream = fs.createReadStream('./lib/words.txt', 'utf8');
let count = 0
readStream.on('data', function(chunk) {  
    count += chunk.split('\n').length
}).on('end', function() {
    console.log(count);
});