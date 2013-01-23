var assert = require('assert'),
    fs = require('fs'),
    path = require('path'),
    bemhtml = require('../lib/bemhtml'),
    iBem = fs.readFileSync(path.resolve(
      __dirname,
      '../i-bem__html.bemhtml'
    )).toString();

suite('i-bem block and cache', function() {
  function readFile(file) {
    return fs.readFileSync(path.resolve(__dirname, 'files', file)).toString();
  }

  function unit(name, file, raw) {
    suite(name, function() {
      var contents = {
        src: readFile('cache/' + file + '.bemhtml'),
        data: JSON.parse(readFile('cache/' + file + '.json')),
        dst: readFile('cache/' + file + '.html')
      };

      [true, false].forEach(function(devMode) {
        var options = {
          cache: bemhtml.cache.create()
        };
        ['empty', 'full'].forEach(function(cache) {
          test(
            'when devMode = ' + devMode + ' and cache is ' + cache,
            function() {
              var result = bemhtml.compile(iBem + contents.src, {
                devMode: devMode,
                cache: true,
                raw: raw
              }).call(contents.data, options) + '\n';

              assert.equal(result, contents.dst);
            }
          );
        });
      });
    });
  }

  unit('basic block', 'basic');
});
