var BEM = require('bem'),
    Template = BEM.require('./template');

exports.baseTechPath = BEM.require.resolve('./techs/js.js');

exports.techMixin = {

    getCreateResult : function(path, suffix, vars) {

        vars.BemObj = 'BEM' + (/^i-/.test(vars.BlockName) ? '' : '.DOM');
        vars.DeclObj = "'" + vars.BlockName + "'";

        if (vars.ModName || vars.ModVal) {
            vars.DeclObj = "{ block: " + vars.DeclObj +
                (vars.ModName? ", modName: '" + vars.ModName + "'" : '') +
                (vars.ModVal? ", modVal: '" + vars.ModVal + "'" : '') +
                '}';
        }

        return Template.process([
            '/** @requires BEM */',
            '/** @requires {{bemBemObj}} */',
            '',
            '(function(undefined) {',
            '',
            "{{bemBemObj}}.decl({{bemDeclObj}}, {",
            '',
            '    onSetMod : {',
            '',
            "        'js' : function() {",
            '            /* ... */',
            '        }',
            '',
            '    }',
            '',
            '}, {',
            '',
            '    live : function() {',
            '        /* ... */',
            '    }',
            '',
            '});',
            '',
            '})();'], vars);

    },

    getBuildResult: function(prefixes, suffix, outputDir, outputName) {
        return this.__base(prefixes, suffix, outputDir, outputName).then(function(res) {
            if(suffix === 'js' && process.env.BEM_CONFLICTS_NO) {
                res.unshift('(function(BEM_CONFLICTS_NO) {');
                res.push('})(' + process.env.BEM_CONFLICTS_NO + ');');
            }
            return res;

        });

    }


};
