var fs = require('fs'),
    vm = require('vm');

exports.techModule = module;

exports.newFileContent = function(vars) {
    var bemhtmlFile = vars.Prefix + '.bemhtml.js',
        bemjsonFile = vars.Prefix + '.bemjson.js';

    vm.runInThisContext(fs.readFileSync(bemhtmlFile, 'utf-8'));
    return BEMHTML.apply(vm.runInThisContext(fs.readFileSync(bemjsonFile, 'utf-8')));
};

exports.getDependencies = function() {
    return ['bemjson.js', 'bemhtml.js'];
};
