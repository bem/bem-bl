var BEM = require('bem'),
    PATH = require('path');

exports.baseTechName = 'i18n.js';

exports.techMixin = {

    getBuildResult: function(prefixes, suffix, outputDir, outputName, data, lang) {

        var _this = this,
            context = _this.context,
            opts = context.opts;

        return _this.__base(prefixes, this.getBaseTechSuffix(), outputDir, outputName)
            .then(function(res) {

                res = data && !BEM.util.isEmptyObject(data)? res
                        .concat(_this.serializeI18nData(data, lang))
                        .concat([_this.serializeI18nInit(lang)]) : res;

                return opts.declaration
                    .then(function(decl) {

                        decl = decl.depsByTechs;

                        if (!decl || !decl.js || !decl.js.bemhtml) return res;

                        decl = { deps: decl.js.bemhtml };

                        var bemhtmlTech = context.createTech('bemhtml'),
                            output = PATH.resolve(
                                opts.outputDir,
                                opts.outputName
                            ),
                            prefixes = bemhtmlTech.getBuildPrefixes(
                                bemhtmlTech.transformBuildDecl(decl),
                                context.getLevels()
                            ),
                            bemhtmlResults = bemhtmlTech.getBuildResults(
                                prefixes,
                                PATH.dirname(output) + PATH.dirSep,
                                PATH.basename(output)
                            );

                        return bemhtmlResults
                            .then(function(r) {

                                res.unshift(r['bemhtml.js']);

                                return res;

                            });

                    });

            });

    }

};
