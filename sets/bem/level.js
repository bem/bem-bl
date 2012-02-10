/*exports.baseLevelPath = require.resolve('../../tools/bem/level-naming-scheme.js');

exports.getTechs = function() {
    var techs = {
        'decl.js':   '../../tools/bem/techs/nodejs/decl.js.js',

        'title.txt': '../../tools/bem/techs/nodejs/title.txt.js',
        'desc.wiki': '../../tools/bem/techs/nodejs/desc.wiki.js',
        'wiki':      '../../tools/bem/techs/nodejs/wiki.js'
    };

    for (var alias in techs) {
        if (!techs.hasOwnProperty(alias)) continue;
        techs[alias] = require.resolve(techs[alias]);
    }

    return techs;
};*/

var PATH = require('path');

exports.resolvePaths = function(paths) {
    return paths.map(function(path) {
            return PATH.resolve(this.path, path);
        });
};
