/**
 * bemhtml
 * =======
 *
 * Склеивает *bemhtml*-файлы по deps'ам, обрабатывает BEMHTML-транслятором,
 * сохраняет (по умолчанию) в виде `?.bemhtml.js`.
 *
 * **Опции**
 *
 * * *String* **target** — Результирующий таргет. По умолчанию — `?.bemhtml.js`.
 * * *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
 *   (его предоставляет технология `files`). По умолчанию — `?.files`.
 * * *String* **sourceSuffixes** — суффиксы файлов, по которым строится `files`-таргет. По умолчанию — `bemtree.xjst`.
 * * *String* **exportName** — Имя переменной-обработчика BEMHTML. По умолчанию — `'BEMHTML'`.
 * * *String* **applyFuncName** — Имя apply-функции базового шаблона BEMHTML. По умолчанию — `'apply'`.
 * * *Boolean* **devMode** — Development-режим. По умолчанию `true`.
 * * *Boolean* **cache** — Кеширование. По умолчанию — `false`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('./techs/bemhtml'));
 * ```
 */

var path = require('path'),
    vow = require('vow'),
    vfs = require('enb/lib/fs/async-fs'),
    pinpoint = require('pinpoint'),
    BEMHTML = require('../../blocks-common/i-bem/__html/lib/bemhtml');

module.exports = require('enb/lib/build-flow').create()
    .name('bemhtml')
    .target('target', '?.bemhtml.js')
    .defineOption('exportName', 'BEMHTML')
    .defineOption('applyFuncName', 'apply')
    .defineOption('devMode', true)
    .defineOption('cache', false)
    .useFileList('bemhtml')
    .builder(function (sourceFiles) {
        var _this = this,
            node = this.node;

        return vow.all(sourceFiles.map(function (file) {
            return vfs.read(file.fullname, 'utf8')
                .then(function (source) {
                    return {
                        source: source,
                        filename: file.fullname
                    };
                });
        }))
            .then(function (fileSources) {
                var bemhtmlProcessor = BemhtmlProcessor.fork(),
                    sourceMap = SourceMap(fileSources),
                    code = sourceMap.getCode();

                node.getLogger().log('Calm down, OmetaJS is running...');

                return bemhtmlProcessor.process(code, _this._getOptions())
                    .then(function (res) {
                        var result = res.result,
                            error = res.error;

                        bemhtmlProcessor.dispose();

                        if (result) {
                            return result;
                        }

                        if (error) {
                            var original = sourceMap.getOriginal(error.line, error.column),
                                message = error.message.split('\n')[0].replace(/\sat\:\s(\d)+\:(\d)+/, ''),
                                relPath = path.relative(node._root, original.filename),
                                context = pinpoint(original.source, {
                                    line: original.line,
                                    column: original.column,
                                    indent: '    '
                                });

                            if (relPath.charAt(0) !== '.') {
                                relPath = './' + relPath;
                            }

                            throw new SyntaxError(message + ' at ' + relPath + '\n' + context);
                        }
                    });
            });
    })
    .methods({
        _getOptions: function () {
            return {
                devMode: this._devMode,
                cache: this._cache,
                exportName: this._exportName,
                applyFuncName: this._applyFuncName
            };
        }
    })
    .createTech();

var BemhtmlProcessor = require('sibling').declare({
    process: function (source, options) {
        try {
            return { result: BEMHTML.translate(source, options) };
        } catch (e) {
            return { error: e };
        }
    }
});

var SourceMap = function (fileSources) {
    var lastBoundary = 0,
        boundaries = [],
        filenames = [],
        sources = [],
        code = '';

    fileSources.forEach(function (fileSource) {
        var source = fileSource.source;

        lastBoundary += source.split('\n').length;

        boundaries.push(lastBoundary);
        filenames.push(fileSource.filename);
        sources.push(source);

        code += '\n' + source;
    });

    function _getRangeIndexByLineNumber(lineNumber) {
        if (lineNumber > lastBoundary) {
            return -1;
        }

        for (var i = 0; i < boundaries.length; ++i) {
            if (lineNumber <= boundaries[i]) {
                return i;
            }
        }

        return -1;
    }

    return {
        getOriginal: function (line, column) {
            var rangeIndex = _getRangeIndexByLineNumber(line),
                lowerBoundary = boundaries[rangeIndex - 1] || 0;

            if (rangeIndex !== -1) {
                return {
                    filename: filenames[rangeIndex],
                    source: sources[rangeIndex],
                    line: line - lowerBoundary - 1,
                    column: column
                };
            }
        },
        getCode: function () {
            return code;
        }
    };
};
