var BEM = require('bem'),
    Q = BEM.require('qq'),
    PATH = require('path'),
    I18NJS = require('../../__i18n/lib/i18n-js'),

    pjoin = PATH.join;


exports.techMixin = BEM.util.extend({}, require('./i18n').LangsMixin, {

    getSuffixForLang: function(lang) {
        return pjoin('i18n', lang + '.keys.js');
    },

    getCreateSuffixes: function() {
        return this.getLangs().map(this.getSuffixForLang, this);
    },

    getCreateResults: function(prefix, vars) {

        var _this = this,
            source = this.getPath(prefix, this.getSourceSuffix());

        return BEM.util.readJsonJs(source)
            .then(function(data) {
                return Q.shallow(_this.getCreateResultsForLangs(prefix, data));
            });

    },

    getCreateResultsForLangs: function(prefix, data) {

        var _this = this;

        return _this.getLangs().reduce(function(res, lang) {

            var suffix = _this.getSuffixForLang(lang),
                dataLang = _this.extendLangDecl({}, data['all'] || {});

            dataLang = _this.extendLangDecl(dataLang, data[lang] || {});
            res[suffix] = _this.getCreateResult(prefix, suffix, dataLang, lang);

            return res;

        }, {});

    },

    getCreateResult: function(prefix, suffix, data, lang) {
        return (data ? this.serializeI18nData(data, lang) : []).concat(this.serializeI18nInit(lang));
    },

    storeCreateResult: function(path, suffix, res, force) {
        return this.__base(path, suffix, res, true);
    },

    serializeI18nInit: I18NJS.serializeInit,

    serializeI18nData: I18NJS.serializeData,

    getDependencies: function() {
        return ['i18n'];
    }

});
