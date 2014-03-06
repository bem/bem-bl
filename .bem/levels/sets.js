var PATH = require('path'),
    BEM = require('bem'),
    SETS = require('bem-sets'),
    environ = require('bem-environ');

exports.baseLevelPath = SETS.resolveLevel('sets');

exports.getTechs = function() {
    return BEM.util.extend(this.__base() || {}, {
        'examples' : PATH.resolve(environ.PRJ_ROOT, '.bem/techs/examples.js')
    });
};
