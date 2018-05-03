// Sync thunk
function add(a, b) {
    return a + b;
}

function thunk() {
    return add(10, 15);
}

thunk();

// Async thunk

function add(a, b, cb) {
    cb(a + b);
}

function thunk() {
    return function(cb) {
        add(10, 15, cb);
    };
}

thunk(function(result) {
    console.log(result);
});

// Creates thunk
function getResult(file) {
    var result, fn;

    compute(file, function(response) {
        if (fn) {
            fn(response);
        } else {
            result = response;
        }
    });

    return function(cb) {
        if (response) {
            cb(response);
        } else {
            fn = cb;
        }
    };
}
