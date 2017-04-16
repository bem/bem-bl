var assert = require('assert'),
    fs = require('fs'),
    path = require('path'),
    bemhtml = require('../lib/bemhtml'),
    iBem = fs.readFileSync(path.resolve(
      __dirname,
      '../i-bem__html.bemhtml'
    )).toString();

suite('i-bem block and others', function() {
  function readFile(file) {
    return fs.readFileSync(path.resolve(__dirname, 'files', file)).toString();
  }

  function unit(name, file, raw) {
    test(name, function() {
      var contents = {
        src: readFile('i-bem/' + file + '.bemhtml'),
        data: JSON.parse(readFile('i-bem/' + file + '.json')),
        dst: readFile('i-bem/' + file + '.html')
      };

      assert.equal(
        bemhtml.compile(iBem + contents.src, { devMode: true, raw: raw })
            .call(contents.data) + '\n',
        contents.dst
      );
      assert.equal(
        bemhtml.compile(iBem + contents.src, { devMode: false, raw: raw })
            .call(contents.data) + '\n',
        contents.dst
      );
    });
  }

  unit('basic block', 'basic-block');
  unit('block with nested mixes', 'nested-mix');
  unit('block with nested looped mixes', 'looped-mix');
  unit('block with single non-array mix', 'single-mix');
  unit('blocks with local variables', 'local-var');
  unit('attr with empty value', 'empty-attrs');
  unit('one symbol elem', 'one-symbol-elem');
  unit('bemhtml with comments', 'comments');
  unit('bemhtml with custom predicates', 'custom-predicates');
  unit('mix regression #232', 'gh-232');
  unit('condition regression #239', 'gh-239', true);
  unit('simple types regression #254', 'gh-254');
  unit('applyNext in content regression #289', 'gh-289');
  unit('mods redefinition #550', 'gh-550');
  unit('block with escaping this', 'escaping-this');
  unit('mix with same block bem-core/804', 'gh-core-804');

  test('re-entrance', function() {
    var t = bemhtml.compile(iBem + readFile('i-bem/re-entrant.bemhtml'));
    assert.throws(function() {
      t.call({ block: 'b2' });
    });
    assert.equal(t.call({ block: 'b1' }), '<div class="b1">ok</div>');
  });
});
