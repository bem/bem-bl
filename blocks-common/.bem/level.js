var PATH = require('bem/lib/path');

exports.techs = {
    'js': '../i-bem/bem/techs/js.js',
    'css': 'bem/lib/techs/css',
    'bemhtml': '../i-bem/bem/techs/bemhtml.js',
    'ru.title.txt' : '',
    'ru.wiki' : '',
    'en.title.txt' : '',
    'en.wiki' : '',
    'bemjson.js' : '',
    'blocks' : ''
};

exports['get-elem'] = function(block, elem) {
    return PATH.join.apply(null,
        [block,
        (elem != 'examples' ? '__' : '')  + elem,
        block + '__' + elem]);
};

exports['get-elem-mod'] = function(block, elem, mod) {
    if (elem == 'examples') {
        return [block, elem, mod].join('/');
    }

    return [block,
        '__', elem,
        '_' + mod,
        block + '__' + elem + '_' + mod].join('/');
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

exports['match-examples-mod'] = function(path) {
    var m = this.matchRe(),
        match = (new RegExp(['^(' + m + ')',
            '(examples)',
            '(' + m + ')(.*?)$'].join('/'))).exec(path);
    if (!match) return false;
    return {
        block: match[1],
        elem: match[2],
        mod: match[3],
        suffix: match[4]
    };
};

exports['match-examples-mod-val'] = function(path) {
    var m = this.matchRe(),
        match = (new RegExp(['^(' + m + ')',
            '(examples)',
            '(' + m + ')_(' + m + ')(.*?)$'].join('/'))).exec(path);
    if (!match) return false;
    return {
        block: match[1],
        elem: match[2],
        mod: match[3] + '_' + match[4],
        //val: match[4],
        suffix: match[5]
    };
};

for (var alias in exports.techs) {
    var p = exports.techs[alias];
    if (/\.{1,2}\//.test(p)) exports.techs[alias] = PATH.absolute(p, __dirname);
}

exports.defaultTechs = ['css', 'js', 'bemhtml'];

exports.isIgnorablePath = function(path) {
    return (/\.(git|svn)$/.test(path) ||
        /(GNU|MAC)?[Mm]akefile/.test(path));
};
