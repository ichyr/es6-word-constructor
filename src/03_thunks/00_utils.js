/**
 * Utility function to create thunk from function.
 * 
 * @param {any} fn function that will be made a **thunk**
 * @param {*} argument following arguments that are applied to the `fn`
 * @returns function that take the callback that is executed with thunk returning value.
 */
exports.makeThunk = function(fn) {
    const args = [].slice.call(arguments, 1);
    return function(cb) {
        args.push(cb);
        fn.apply(null, args);
    };
};
