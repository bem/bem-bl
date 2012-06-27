var BEM = require('bem'),
    Q = BEM.require('qq'),
    INHERIT = BEM.require('inherit'),
    LangsMixin = require('./i18n').LangsMixin,
    PATH = require('path'),
    TANKER = require('../../__i18n/lib/tanker');

exports.Tech = INHERIT(BEM.Tech, BEM.util.extend({}, LangsMixin, {

    getSuffixForLang: function(lang, techSuffix) {
        typeof techSuffix === 'string' || (techSuffix = 'js');
        return ['i18n', lang + '.' + techSuffix].join('/');
    },

    getSuffixForAll: function() {
        return ['i18n', 'all.js'].join('/');
    },

    getSuffixes: function() {

        return this.getLangs()
            .map(this.getSuffixForLang)
            .concat([this.getSuffixForAll()]);

    },

    getCreateResults: function(prefix, vars) {

        var all = this.getSuffixForAll(),
            res = {};

        this.getLangs().forEach(function(lang) {

            var suffix = this.getSuffixForLang(lang);
            res[suffix] = this.getCreateResult(this.getPath(prefix, suffix), suffix, BEM.util.extend({ lang: lang }, vars));

        }, this);

        return Q.shallow(res)
            .then(function(res) {

                res[all] = Object.keys(res).reduce(function(content, suffix) {

                    return content.concat([
                        '/* begin ' + suffix + ' */',
                        '',
                        res[suffix],
                        '/* end ' + suffix + ' */',
                        ''
                    ]);

                }, []).join('\n');

                return res;

            });

    },

    getCreateResult: function(path, suffix, vars) {

        var source = this.getPath(vars.Prefix, this.getSuffixForLang(vars.lang, 'json.js'));

        return BEM.util.readJsonJs(source)
            .then(function(data) {

                var res = [];

                Object.keys(data).forEach(function(keyset) {

                    res.push("BEM.I18N.decl('" + keyset + "', {");

                    Object.keys(data[keyset]).forEach(function(key, i, arr) {

                        TANKER.xmlToJs(data[keyset][key], function(js) {
                            res.push(JSON.stringify(key) + ': ' + js + (i === arr.length - 1 ? '' : ','));
                        });

                    });

                    res.push('}, {\n"lang": "' + vars.lang + '"\n});\n');

                });

                return res.join('\n');

            });

    },

    storeCreateResult: function(path, suffix, res, force) {
        return this.__base(path, suffix, res, true);
    },

    getDependencies: function() {
        return ['i18n'];
    }

}));
