var ASSERT = require('assert'),
    PATH = require('path'),
    FS = require('fs'),

    inspect = require('util').inspect,

    PARSER = require('../lib/tanker.js');

function readFile(src) {
    return FS.readFileSync(PATH.resolve(__dirname, 'files', src), 'utf-8').toString();
}


function unit(name) {
    var content = {
            src: readFile(name + '.xml')
        };

    PARSER.parseXml(content.src, function(xml) {
        var js = PARSER.domToJs(xml);
        /*
        console.log('\n= FILE:', name);
        console.log('\n=== XML ===\n', inspect(xml, false, 23), '\n=== END OF XML ===\n');
        console.log('\n=== JAVASCRIPT ===\n', js, '\n=== END OF JAVASCRIPT ===\n');
        */
    });
}

unit('dynamic-01');
unit('dynamic-02');
unit('dynamic-03');
unit('param-xml-01');
unit('html-01');
unit('html-02');
unit('entity-01');
unit('param-empty-01');
unit('complex-01');
unit('literal-01');
unit('literal-02');
unit('literal-03');
unit('json-01');
