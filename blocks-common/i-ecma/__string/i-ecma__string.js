(function() {

String.prototype.trim || (String.prototype.trim = function() {

    var str = this.replace(/^\s\s*/, ''),
        ws = /\s/,
        i = str.length;

    /* jshint -W116 */
    // jscs: disable requireCurlyBraces
    while(ws.test(str.charAt(--i)));
    // jscs: enable requireCurlyBraces
    /* jshint +W116 */

    return str.slice(0, i + 1);

});

})();
