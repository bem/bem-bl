exports.baseLevelPath = require.resolve('bem/lib/levels/project');

exports.getTechs = function() {

    return require('bem').util.extend(this.__base() || {}, {
        blocks: 'v2/level-proto',
        bundles: 'v2/level-proto',
        sets: 'v2/level-proto'
    });

};
