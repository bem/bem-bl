/**
 * Block i-ecma. Shim for some ES5 methods
 *
 * @module i-ecma__object
 */
(function() {

/**
 * Возвращает массив свойств объекта
 *
 * @exports
 * @param {Object} obj объект
 * @returns {Array}
 */
Object.keys || (Object.keys = function(obj) {
    var res = [];

    for(var i in obj) obj.hasOwnProperty(i) &&
        res.push(i);

    return res;
});

})();
