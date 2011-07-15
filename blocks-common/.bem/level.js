var level = require('../../tools/bem/level.js');
for (var n in level) exports[n] = level[n];

exports['get-elem'] = function(block, elem) {
    return [block,
           '__' + elem,
           block + '__' + elem].join('/');
};


exports['match-elem'] = function(path) {
    var m = this.matchRe(),
        match = (new RegExp(['^(' + m + ')',
        '__(' + m + ')',
        '\\1__\\2(.*?)$'].join('/'))).exec(path);
    if (!match) return false;
    return {
        block: match[1],
        elem: match[2],
        suffix: match[3]
    };
};

exports['match-elem-mod'] = function(path) {
    var match = this.match('examples-mod', path);
    if (match) return match;

    var m = this.matchRe();
    match = (new RegExp(['^(' + m + ')',
        '__(' + m + ')',
        '_(' + m + ')',
        '\\1__\\2_\\3(.*?)$'].join('/'))).exec(path);
    if (!match) return false;
    return {
        block: match[1],
        elem: match[2],
        mod: match[3],
        suffix: match[4]
    };
};

exports['match-elem-mod-val'] = function(path) {
    var match = this.match('examples-mod-val', path);
    if (match) return match;

    var m = this.matchRe();
    match = (new RegExp(['^(' + m + ')',
        '__(' + m + ')',
        '_(' + m + ')',
        '\\1__\\2_\\3_(' + m + ')(.*?)$'].join('/'))).exec(path);
    if (!match) return false;
    return {
        block: match[1],
        elem: match[2],
        mod: match[3],
        val: match[4],
        suffix: match[5]
    };
};
