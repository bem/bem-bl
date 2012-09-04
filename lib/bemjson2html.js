#!/usr/bin/env node

var fs = require('fs'),
    vm = require('vm'),
    bemhtmlFile = process.argv[2],
    bemjsonFile = process.argv[3] || bemhtmlFile.replace(/bemhtml.js$/, 'bemjson.js'),
    htmlFile = process.argv[4] || bemjsonFile.replace(/bemjson.js$/, 'html'),
    bemhtml, bemjson;

fs.readFile(bemhtmlFile, 'utf-8', function(err, content) {
    if (err) throw err;
    bemhtml = content;
    bemjson && buildHtml();
});

fs.readFile(bemjsonFile, 'utf-8', function(err, content) {
    if (err) throw err;
    bemjson = content;
    bemhtml && buildHtml();
});

function buildHtml() {
    vm.runInThisContext(bemhtml);

    fs.writeFile(
        htmlFile,
        BEMHTML.apply(vm.runInThisContext(bemjson)),
        function (err) {
            if (err) throw err;
            console.log(htmlFile);
        });
}
