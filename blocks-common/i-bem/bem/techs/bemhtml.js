var BEM = require('bem'),
    PATH = require('path');

exports.getBuildResultChunk = function(relPath, path, suffix) {

    return BEM.util.readFile(path)
        .then(function(c) {

            return [
                '/* ' + path + ': start */',
                c,
                '/* ' + path + ': end */',
                '\n'
            ].join('\n');

        });

};

exports.getBuildResult = function(prefixes, suffix, outputDir, outputName) {

    return this.__base.apply(this, arguments)
        .then(function(sources) {
            sources = sources.join('\n');

            var BEMHTML = require('../../__html/lib/bemhtml');

            return BEMHTML.translate(sources, {
              devMode: process.env.BEMHTML_ENV == 'development',
              cache: process.env.BEMHTML_CACHE == 'on'
            });
        });

};

exports.getSuffixes = function() {
    return ['bemhtml'];
};

exports.getBuildSuffixesMap = function() {
    return { 'bemhtml.js': this.getSuffixes() };
};
