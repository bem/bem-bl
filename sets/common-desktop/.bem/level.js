var bemUtil = require('bem/lib/util');

exports.baseLevelPath = require.resolve('../../bem/level.js');

exports.getConfig = function() {
    return bemUtil.extend({}, this.__base(), {
        set: {
            levels: this.resolvePaths([
                '../../blocks-common',
                '../../blocks-desktop'
            ])
        }
    });
};
