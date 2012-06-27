var BEM = require('bem'),
    Q = BEM.require('q'),
    INHERIT = BEM.require('inherit'),
    PATH = require('path'),

    DEFAULT_LANGS = ['ru', 'en'];

var LangsMixin = exports.LangsMixin = {

    getLangs: function() {
        var env = process.env.BEM_I18N_LANGS;
        return env? env.split(' ') : DEFAULT_LANGS;
    },

    getSuffixForLang: function(lang) {
        return lang + '.' + this.getTechName();
    }

};

exports.Tech = INHERIT(BEM.Tech, BEM.util.extend({}, LangsMixin, {

    getSuffixForLang: function(lang) {
        return [this.getTechName(), lang + '.json.js'].join('/');
    },

    getSuffixes: function() {
        return this.getLangs().map(this.getSuffixForLang, this);
    },

    getBuildResult: function(prefixes, suffix, outputDir, outputName) {

        var _this = this;
        return Q.when(this.filterPrefixes(prefixes, [suffix]), function(paths) {

            return paths.reduce(function(decl, path) {

                return Q.all([decl, _this.readContent(path, suffix)])
                    .spread(function(decl, c) {
                        return BEM.util.extend(true, decl, c);
                    });

            }, {});

        });

    },

    storeBuildResult: function(path, suffix, res) {

        BEM.util.mkdirs(PATH.dirname(path));

        res = '(' + JSON.stringify(res, null, 4) + ')\n';
        return this.__base(path, suffix, res);

    },

    getCreateResult: function(path, suffix, vars) {
        return {};
    },

    storeCreateResult: function(path, suffix, res, force) {
        res = 'module.exports = ' + JSON.stringify(res, null, 4) + ';\n';
        return this.__base(path, suffix, res, force);
    },

    readContent: function(path, suffix) {
        return BEM.util.readDecl(path);
    }

}));
