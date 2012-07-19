var BEM = require('bem'),
    myPath = BEM.require('./path'),
    Template = BEM.require('./template'),
    Js = BEM.require('./legacy-techs/js');

exports.techModule = module;

exports.outFile = Js.outFile;

exports.newFileContent = function (vars) {
    vars.BemObj = 'BEM' + (/^i-/.test(vars.BlockName) ? '' : '.DOM');
    vars.DeclObj = "'" + vars.BlockName + "'";
    if (vars.ModName || vars.ModVal) {
        vars.DeclObj = "{ block: " + vars.DeclObj +
            (vars.ModName? ", modName: '" + vars.ModName + "'" : '') +
            (vars.ModVal? ", modVal: '" + vars.ModVal + "'" : '') +
            '}';
    }

    return Template.process([
        '/** @requires {{bemBemObj}} */',
        '',
        '(function() {',
        '',
        "{{bemBemObj}}.decl({{bemDeclObj}}, {",
        '',
        '    onSetMod : {',
        "        'js' : function() {",
        '            /* ... */',
        '        }',
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
};
