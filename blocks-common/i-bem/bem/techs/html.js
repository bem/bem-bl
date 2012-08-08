var BEM = require('bem'),
    Q = BEM.require('q'),
    VM = require('vm');

exports.techMixin = {

    getBemhtml: function(prefix) {

        var path = this.getPath(prefix, 'bemhtml.js');
        return BEM.util.readFile(path)
            .then(function(c) {
                /** @name BEMHTML variable appears after runInThisContext() call */
                VM.runInThisContext(c, path);
                return BEMHTML;
            });

    },

    getBemjson: function(prefix) {

        var path = this.getPath(prefix, 'bemjson.js');
        return BEM.util.readFile(path)
            .then(function(c) {
                return VM.runInThisContext(c, path);
            });

    },

    getCreateResult: function(path, suffix, vars) {

        return Q.all([
                this.getBemhtml(vars.Prefix),
                this.getBemjson(vars.Prefix)
            ])
            .spread(function(bemhtml, bemjson) {
                return bemhtml.apply(bemjson);
            });

    },

    storeCreateResult: function(path, suffix, res, force) {
        // always overwrite html files
        return this.__base(path, suffix, res, true);
    },

    getDependencies: function() {
        return ['bemjson.js', 'bemhtml.js'];
    }

};
