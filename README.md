# es6-word-constructor

Application to train async possibilities of ES6/7 by creating a list of all words that can be generated from given set of letters.

General tasks
---------------
- [x] read file with words
- [x] Generate array of arrays with words, based on first letter
- [x] read input from input file (input is specified as word (no trailing spaces or other characters as this will be treated as another character) in `input/input.txt` file)
- [ ] create switch to govern type of interaction  
- [ ] test performance
- [x] set up repo and write down tasks

Approaches to implement
---------------
- [x] Callbacks
- [x] Thunks
- [ ] Promise
- [ ] Generators
- [ ] Communicating sequential process

Notes
---------------
Worlds list is taken from https://github.com/dwyl/english-words


Thunk
----------------
Function that has everything it needs to return you a value. Basically a function with
some closured state or wrapper around state.

Async thunk will be a function that doesn't need anything to run except a callback to be executed with return value.