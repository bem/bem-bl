var BEM = require('bem'),
    Q = BEM.require('qq'),
    PATH = require('path'),
    I18NJS = require('../../__i18n/lib/i18n-js'),

    LangsMixin = require('./i18n').LangsMixin,

    pjoin = PATH.join;


exports.techMixin = BEM.util.extend({}, LangsMixin, {

    getBuildSuffixForLang: function(lang) {
        return pjoin('i18n', lang + '.keys.js');
    },

    getBuildSuffixes: function() {
        return this.getLangs().map(this.getBuildSuffixForLang, this);
    },

    getBuildResults: function(prefixes, outputDir, outputName) {

        var _this = this,
            prefix = PATH.resolve(outputDir, outputName),
            source = this.getPath(prefix, this.getSourceSuffix());

        return BEM.util.readJsonJs(source)
            .then(function(data) {
                return Q.shallow(_this.getBuildResultsForLangs(prefixes, outputDir, outputName, data));
            });

    },

    getBuildResultsForLangs: function(prefixes, outputDir, outputName, data) {

        var _this = this;

        return _this.getLangs().reduce(function(res, lang) {

            var suffix = _this.getBuildSuffixForLang(lang),
                dataLang = _this.extendLangDecl({}, data['all'] || {});

            dataLang = _this.extendLangDecl(dataLang, data[lang] || {});
            res[suffix] = _this.getBuildResult(prefixes, suffix, outputDir, outputName, dataLang, lang);

            return res;

        }, {});

    },

    getBuildResult: function(prefixes, suffix, outputDir, outputName, data, lang) {
        return (data ? this.serializeI18nData(data, lang) : []).concat(this.serializeI18nInit(lang));
    },

    serializeI18nInit: I18NJS.serializeInit,

    serializeI18nData: I18NJS.serializeData,

    getDependencies: function() {
        return ['i18n'];
    }

});
