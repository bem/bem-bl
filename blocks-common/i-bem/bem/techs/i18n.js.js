var BEM = require('bem'),
    Q = BEM.require('qq'),
    INHERIT = BEM.require('inherit'),
    Tech = BEM.require('./techs/js-i').Tech,
    LangsMixin = require('./i18n').LangsMixin,
    PATH = require('path'),
    TANKER = require('../../__i18n/lib/tanker');

exports.Tech = INHERIT(Tech, BEM.util.extend({}, LangsMixin, {

    getBaseTechSuffix: function() {
        return 'js';
    },

    getSuffixForAll: function() {
        return ['i18n', 'all.js'].join('/');
    },

    getSuffixes: function() {
        return [this.getBaseTechSuffix()];
    },

    getBuildSuffixes: function() {

        return this.getLangs()
            .map(this.getBuildSuffixForLang, this);

    },

    getBuildSuffixForLang: function(lang) {
        return lang + '.' + this.getBaseTechSuffix();
    },

    getBuildResults: function(prefixes, outputDir, outputName) {

        var _this = this,
            prefix = PATH.resolve(outputDir, outputName),
            source = this.getPath(prefix, this.getSuffixForAll()),
            res = {};

        return BEM.util.readJsonJs(source)
            .then(function(data) {

                _this.getLangs().forEach(function(lang) {

                    var suffix = _this.getBuildSuffixForLang(lang),
                        dataLang = _this.extendLangDecl({}, data['all'] || {});

                    dataLang = _this.extendLangDecl(dataLang, data[lang] || {});
                    res[suffix] = _this.getBuildResult(prefixes, suffix, outputDir, outputName, dataLang, lang);

                });

                return Q.shallow(res);

            });

    },

    getBuildResult: function(prefixes, suffix, outputDir, outputName, data, lang) {

        var _this = this;
        return this.__base(prefixes, this.getBaseTechSuffix(), outputDir, outputName)
            .then(function(res) {
                return res.concat(_this.serializeI18nData(data, lang));
            });

    },

    serializeI18nData: function(data, lang) {

        var res = [];

        Object.keys(data).sort().forEach(function(keyset) {

            // output value of empty keyset as a simple js code
            if (keyset === '') {
                res.push(data[keyset]);
                return;
            }

            // generate i18n declaration for normal keysets
            res.push("BEM.I18N.decl('" + keyset + "', {");

            Object.keys(data[keyset]).forEach(function(key, i, arr) {

                TANKER.xmlToJs(data[keyset][key], function(js) {
                    res.push(JSON.stringify(key) + ': ' + js + (i === arr.length - 1 ? '' : ','));
                });

            });

            res.push('}, {\n"lang": "' + lang + '"\n});\n');

        });

        return res;

    },

    getDependencies: function() {
        return ['i18n'];
    }

}));
