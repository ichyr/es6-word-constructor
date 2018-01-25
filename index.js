// entry point
const fs = require('fs')
const {generateInputSet} = require('./src/inputUtilities')

// read input data
let inputLetterSet = fs.readFileSync('./input/input.txt', 'utf8')
inputLetterSet = inputLetterSet.split(' ')

generateInputSet(['i', 'v', 'a'])

// read File
const readStream = fs.createReadStream('./lib/words.txt', 'utf8');
let count = 0
let dictionary = []
readStream.on('data', function(chunk) {  
    const data = chunk.split('\n')
    count += data.length
    dictionary = dictionary.concat(data)
}).on('end', function() {
    console.log(count);
    console.log(dictionary.length)
});