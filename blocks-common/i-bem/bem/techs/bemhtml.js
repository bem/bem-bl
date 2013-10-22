var BEM = require('bem'),
    Q = BEM.require('q'),
    PATH = require('path'),
    compat = require('bemhtml-compat');

exports.getBuildResultChunk = function(relPath, path, suffix) {
    var content = this.readContent(path, suffix);
    return (suffix !== 'bemhtml.xjst' ?
        content.then(function(source) { return compat.transpile(source); }) :
        content)
            .then(function(source) {
                return '\n/* begin: ' + relPath + ' */\n' +
                    source +
                    '\n/* end: ' + relPath + ' */\n';
            });
};

exports.getBuildResult = function(prefixes, suffix, outputDir, outputName) {

    var _this = this;
    return this.filterPrefixes(prefixes, this.getCreateSuffixes())
        .then(function(paths) {
            return Q.all(paths.map(function(path) {
                return _this.getBuildResultChunk(
                    PATH.relative(outputDir, path), path, suffix);
            }));
        })
        .then(function(sources) {
            sources = sources.join('\n');

            var BEMHTML = require('../../../../.bem/lib/bemhtml');

            return BEMHTML.translate(sources, {
                devMode : process.env.BEMHTML_ENV == 'development',
                cache   : process.env.BEMHTML_CACHE == 'on',
                exportName : 'BEMHTML'
            });
        });

};

exports.getSuffixes = function() {
    return ['bemhtml'];
};

exports.getBuildSuffixes = function() {
    return ['bemhtml.js'];
};
