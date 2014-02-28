var assert = require('assert'),
    fs = require('fs'),
    path = require('path'),
    bemhtml = require('../lib/bemhtml');

suite('BEMHTML Compiler', function() {
  function readFile(file) {
    return fs.readFileSync(path.resolve(__dirname, 'files', file)).toString();
  }

  function unit(name, src, data, dst) {
    test(name, function() {
      assert.equal(bemhtml.compile(src, { raw: true }).call(data), dst);
    });
  }

  unit('true predicate', 'true, true: true', {}, true);
  unit('mode predicate: false case', 'true: false, mode: true', {}, false);
  unit('mode predicate: true case', 'true: false, mode: true', {
    _mode: 'mode'
  }, true);
  unit(
    'apply mode',
    'true: false, mode2: true, mode1: { return apply("mode2") }',
    { _mode: 'mode1' },
    true
  );
  unit(
    'applyNext mode',
    'true: false, mode1: true, mode1: { return applyNext("mode1") }',
    { _mode: 'mode1' },
    true
  );

  unit(
    'hash map',
    readFile('basic/hash.bemhtml'),
    { _mode: 'nay', block: 'yay' },
    'ok'
  );
});
