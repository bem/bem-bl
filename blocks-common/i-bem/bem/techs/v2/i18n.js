var BEM = require('bem'),
    Q = BEM.require('q'),
    INHERIT = BEM.require('inherit'),
    PATH = require('path'),

    DEFAULT_LANGS = ['ru', 'en'],

    pjoin = PATH.join;

var LangsMixin = exports.LangsMixin = {

    getLangs: function() {
        var env = process.env.BEM_I18N_LANGS;
        return env? env.split(' ') : [].concat(DEFAULT_LANGS);
    },

    getDefaultLang: function() {
        return process.env.BEM_I18N_DEFAULT_LANG || this.getLangs().shift();
    },

    getSuffixForLang: function(lang) {
        return lang + '.' + this.getTechName();
    },

    getSourceSuffix: function() {
        return pjoin('i18n', 'all.js');
    },

    extendDecl: function(decl, ext) {

        Object.keys(ext).forEach(function(lang) {
            decl[lang] = this.extendLangDecl(decl[lang] || {}, ext[lang]);
        }, this);

        return decl;

    },

    extendLangDecl: function(decl, ext) {

        Object.keys(ext).forEach(function(keyset) {

            // fallback to BEM.util.extend() on normal keysets
            if (keyset !== '') {
                // TODO: here will also go merge of i18n:js and i18n:xsl content of key values in the future
                decl[keyset] = BEM.util.extend(true, decl[keyset] || {}, ext[keyset]);
                return;
            }

            // concatenate values of empty keysets
            decl[keyset] || (decl[keyset] = '');
            decl[keyset] += '\n' + ext[keyset];

        });

        return decl;

    }

};

exports.Tech = INHERIT(BEM.TechV2, BEM.util.extend({}, LangsMixin, {

    getSuffixForLang: function(lang) {
        return pjoin(this.getTechName(), lang + '.js');
    },

    getSuffixes: function() {
        return this.getLangs().map(this.getSuffixForLang, this);
    },

    getCreateSuffixes: function() {
        return this.getLangs().map(this.getSuffixForLang, this);
    },

    getBuildSuffixesMap: function() {
        var suffixes = {};
        suffixes[this.getSuffixForLang('all')] = this.getLangs().map(this.getSuffixForLang, this);

        return suffixes;
    },

    getBuildResult: function(files, suffix, output, opts) {

        var _this = this;

        return Q.when(
            files.reduce(function(decl, file) {
                return Q.all([decl, _this.readLangContent(file.absPath, file.file.substr(0, 2))])
                    .spread(_this.extendLangDecl.bind(_this));
            }, {})
        );
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
    },

    readLangContent: function(path, lang) {

        return this.readContent(path)
            .then(function(c) {
                var d = {};
                d[lang] = c;
                return d;
            });

    }

}));
