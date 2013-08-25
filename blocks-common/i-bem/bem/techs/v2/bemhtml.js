var BEM = require('bem'),
    PATH = require('path'),
    SYS = require('util'),

    readFile = BEM.require('./util').readFile;

exports.API_VER = 2;

exports.getBuildResultChunk = function(relPath, path, suffix) {

    return readFile(path)
        .then(function(c) {

            return [
                '/* ' + path + ': start */',
                c,
                '/* ' + path + ': end */',
                '\n'
            ].join('\n');

        });

};

exports.getBuildResult = function(files, suffix, output, opts) {

    var _this = this;
    return this.__base(files, suffix, output, opts)
        .then(function(sources) {
            sources = sources.join('\n');

            var BEMHTML = require('../../../__html/lib/bemhtml');

            return BEMHTML.translate(sources, {
              devMode: process.env.BEMHTML_ENV == 'development',
              cache: process.env.BEMHTML_CACHE == 'on'
            });

        });

};

exports.getBuildSuffixesMap = function() {
    return {
        'bemhtml.js': ['bemhtml']
    };
}
