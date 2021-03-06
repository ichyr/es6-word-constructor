# es6-word-constructor

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5656bb4e41064d2d96a791da584f3974)](https://www.codacy.com/app/ichyr/es6-word-constructor?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ichyr/es6-word-constructor&amp;utm_campaign=Badge_Grade)

Application to train async possibilities of ES6/7 by creating a list of all words that can be generated from given set of letters.

General tasks
---------------
- [x] read file with words
- [x] Generate array of arrays with words, based on first letter
- [x] read input from input file (input is specified as word (no trailing spaces or other characters as this will be treated as another character) in `input/input.txt` file)
- [x] set up repo and write down tasks
- [x] communicate progress while working in console

Approaches to implement
---------------
- [x] Callbacks
- [x] Thunks
- [x] Promise
- [x] Generators
- [x] Threaded Callbacks (with ChildProcess .fork() usage)


Input
---------------
Dictionary file is located under `/lib` folder. User input file is `input/input.txt`.
User input file is read, then each character is treated as separate input.

e.g. `space shuttle` will be treated as `['s','p','a','c','e',' ','s','h','u','t','t','l','e']` - thus 13 symbols.


Running application
----------------
1. Install node
2. Run `npm i` in the root
3. To run program you need to navigate to `src` folder and select one ofthe folders called `01_...` to `06_...`.
4. go inside one of them anre run filename that starts with `01_....index.js`.



Notes
---------------
Worlds list is taken from https://github.com/dwyl/english-words


Thunk
----------------
Function that has everything it needs to return you a value. Basically a function with
some closured state or wrapper around state.

Async thunk will be a function that doesn't need anything to run except a callback to be executed with return value.