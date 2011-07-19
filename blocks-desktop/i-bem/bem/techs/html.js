var myPath = require('bem/lib/path'),
    fs = require('fs'),
    vm = require('vm'),
    Template = require('bem/lib/template');

exports.techModule = module;

exports.newFileContent = function (vars) {
    var bemhtmlFile = vars.Prefix + '.bemhtml.js',
        bemjsonFile = vars.Prefix + '.bemjson.js',
        htmlFile = vars.Prefix + '.html',
        bemhtml,
        bemjson;

    bemhtml= fs.readFileSync(bemhtmlFile, 'utf-8');

    bemjson = fs.readFileSync(bemjsonFile, 'utf-8');

    vm.runInThisContext(bemhtml);
    vars.ApplyResult = BEMHTML.apply(vm.runInThisContext(bemjson));

    return Template.process([
        '{{bemApplyResult}}'
        ], vars);
};
