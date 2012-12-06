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
      /*
        console.log('\n= FILE:', name);
        console.log('\n=== XML ===\n', inspect(xml, false, 23), '\n=== END OF XML ===\n');
        console.log('\n=== JAVASCRIPT ===\n', PARSER.domToJs(xml), '\n=== END OF JAVASCRIPT ===\n');
       */
    });
}

unit('dynamic-01');
unit('dynamic-02');
unit('param-xml-01');
unit('html-01');
unit('entity-01');
