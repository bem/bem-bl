var BEM = require('bem'),
    Q = BEM.require('q');

exports.baseTechName = 'browser.js';

exports.techMixin = {

    getBuildResults: function(decl, levels, output, opts) {
        var _this = this;

        return this.__base(decl, levels, output, opts)
            .then(function(res) {

                return _this.concatBemhtml(res, output, opts)
                    .then(function() {
                        return res;
                    });

            });
    },

    concatBemhtml: function(res, output, opts) {
        var _this = this,
            context = this.context,
            declaration = context.opts.declaration;

        return declaration
            .then(function(decl) {

                decl = decl.depsByTechs;

                if (!decl || !decl.js || !decl.js.bemhtml) return;

                decl = { deps: decl.js.bemhtml };

                var bemhtmlTech = context.createTech('bemhtml');

                if (bemhtmlTech.API_VER !== 2) return Q.reject(new Error(_this.getTechName() +
                    ' can’t use v1 bemhtml tech to concat bemhtml content. Configure level to use v2 bemhtml.'));

                var bemhtmlResults = bemhtmlTech.getBuildResults(
                        decl,
                        context.getLevels(),
                        output,
                        opts
                    );

                return bemhtmlResults
                    .then(function(r) {

                        // put bemhtml templates at the bottom of builded js file
                        Object.keys(res).forEach(function(suffix) {
                            // test for array as in i18n.js+bemhtml tech
                            // there's hack to create symlink for default lang
                            // so 'js' key is a string there
                            Array.isArray(res[suffix]) && res[suffix].push(r['bemhtml.js']);
                        });

                    });

            });
    }

};
