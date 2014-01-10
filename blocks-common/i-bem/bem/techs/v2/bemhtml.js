var BEM = require('bem'),
    Q = BEM.require('q'),
    PATH = require('path'),
    SYS = require('util'),
    BEMHTML = require('../../../__html/lib/bemhtml'),

    readFile = BEM.require('./util').readFile;

exports.API_VER = 2;

exports.getBuildResultChunk = function(relPath, path, suffix) {
    var _this = this;

    return readFile(path)
        .then(function(c) {

            // adding info about current chunk location
            // in concatenated file. This info will be
            // used to show correct error location if
            // resulting bemhtml will fail to parse.
            _this._chunks.push({
                file: path,
                offset: _this._nextOffset
            });

            var lines = c.split('\n').length;

            //add 4 more lines: 2 comments and 2 between chunks
            _this._nextOffset += lines + 4;

            return [
                '/* ' + path + ': start */',
                c,
                '/* ' + path + ': end */',
                '\n'
            ].join('\n');

        });

};

exports.getBuildResult = function(files, suffix, output, opts) {

    // stores line offsets of all bemhtml chunks
    this._chunks = [];

    //stores offset of next chunk to be added
    this._nextOffset = 0;

    var _this = this;
    return this.__base(files, suffix, output, opts)
        .then(function(sources) {
            sources = sources.join('\n');


            try {

                return BEMHTML.translate(sources, {
                  devMode: process.env.BEMHTML_ENV == 'development',
                  cache: process.env.BEMHTML_CACHE == 'on'
                });

            } catch (e) {
                if (e.line) {
                    BEM.logger.ferror(_this._formatError(sources, e));
                    return Q.reject();
                } else {
                    throw e;
                }

            }

        });

};

exports._formatError = function _formatError(sourceCode, error) {
    var lines = sourceCode.split('\n'),
        errorLine = lines[error.line - 1],
        errorSource = this._getErrorSource(error.line);

    return SYS.format('Unable to parse %s. Error at %d:%d:\n%s\n%s',
        PATH.relative(process.cwd(), errorSource.file),
        errorSource.line,
        error.column,
        errorLine,
        new Array(error.column).join(' ')  + '^');
};

exports._getErrorSource = function _getErrorSource(line) {
    // restoring original file name and line number
    // using offsets info we collected in getBuildResultChunk
    if (this._chunks.length === 0) {
        return;
    } else if (this._chunks.length === 1) {
        return {
            file: this._chunks[0].file,
            offset: line - 1 //top comment line, added by tech
        };
    }

    var i = 0;

    while (line >= this._chunks[i + 1].offset) {
        i++;
    }

    return {
        file: this._chunks[i].file,
        //-1 = top comment line, added by tech
        line: line - this._chunks[i].offset - 1
    };
};

exports.getBuildSuffixesMap = function() {
    return {
        'bemhtml.js': ['bemhtml']
    };
}
