var PATH = require('path');

exports.baseTechName = 'js';

exports.techMixin = {

    /**
     * Build and return result of build of specified prefixes.
     *
     * @protected
     * @param {Promise * String[]} prefixes Prefixes to build from.
     * @param {String}          outputDir   Output dir name for build result.
     * @param {String}          outputName  Output name of build result.
     * @returns {Promise * Object}  Promise for build results object.
     */
    getBuildResults: function(prefixes, outputDir, outputName) {
        var _this = this;

        return this.__base(prefixes, outputDir, outputName)
            .then(function(res) {

                return _this.concatBemhtml(res)
                    .then(function() {
                        return res;
                    });

            });
    },

    concatBemhtml: function(res) {

        var context = this.context,
            opts = context.opts;

        return opts.declaration
            .then(function(decl) {

                decl = decl.depsByTechs;

                // do nothing if decl.depsByTechs.js.bemhtml doesn't exists
                if (!decl || !decl.js || !decl.js.bemhtml) return;

                // js+bemhtml decl
                decl = { deps: decl.js.bemhtml };

                var bemhtmlTech = context.createTech('bemhtml'),
                    // get `.js` build prefixes
                    prefixes = bemhtmlTech.getBuildPrefixes(
                        bemhtmlTech.transformBuildDecl(decl),
                        context.getLevels()
                    ),
                    // and build bemhtml based on them
                    bemhtmlResults = bemhtmlTech.getBuildResults(
                        prefixes,
                        opts.outputDir,
                        opts.outputName
                    );

                return bemhtmlResults
                    .then(function(r) {

                        // put bemhtml templates at the top of builded js file
                        Object.keys(res).forEach(function(suffix) {
                            // test for array as in i18n.js+bemhtml tech
                            // there's hack to create symlink for default lang
                            // so 'js' key is a string there
                            Array.isArray(res[suffix]) && res[suffix].unshift(r['bemhtml.js']);
                        });

                    });

            });

    }

};
