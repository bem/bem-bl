/**
 * @module i-ecma__function
 */
(function() {

var slice = Array.prototype.slice;

/**
 * Привязывает контекст к функции
 * @exports
 */
Function.prototype.bind || (Function.prototype.bind = function(ctx) {

    var fn = this,
        args = slice.call(arguments, 1);

    return function () {
        return fn.apply(ctx, args.concat(slice.call(arguments)));
    }

});

})();
