exports.baseLevelPath = require.resolve('bem/lib/levels/simple');

exports.getTechs = function() {

    return require('bem').util.extend(require('./bundles.js').getTechs() || {}, {
        'title.txt' : require('path').resolve(__dirname, '../techs/i18n.title.txt.js')
    });

};
