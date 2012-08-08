var BEM = require('bem'),
    Q = BEM.require('qq'),
    LangsMixin = require('./i18n').LangsMixin,
    VM = require('vm'),
    I18NJS = require('../../__i18n/lib/i18n-js');

exports.baseTechName = 'html';

exports.techMixin = BEM.util.extend({}, LangsMixin, {

    getSuffixes: function() {
        return ['html'];
    },

    getBemhtml: function(prefix) {

        var _this = this,
            path = this.getPath(prefix, 'bemhtml.js'),
            i18nPath = this.getPath(prefix, this.getSourceSuffix()),
            i18nCode = BEM.util.readJsonJs(i18nPath)
                .then(function(data) {
                    return I18NJS.serializeAllData(
                        data,
                        _this.getLangs(),
                        _this.getDefaultLang()).join('\n');
                });

        return Q.all([BEM.util.readFile(path), i18nCode])
            .spread(function(bemhtml, i18nCode) {
                /** @name BEMHTML variable appears after runInThisContext() call */
                VM.runInThisContext(i18nCode + '\n\n' + bemhtml, path);
                return BEMHTML;
            });

    },

    getDependencies: function() {
        return ['i18n'].concat(this.__base());
    }

});
