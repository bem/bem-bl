var assert = require('assert'),
    ometajs = require('ometajs'),
    bemhtml = require('../lib/bemhtml');

suite('Jail Grammar', function() {
  function unit(name, src, dst) {
    test(name, function() {
      var ast = ometajs.grammars.BSJSParser.matchAll(src, 'topLevel'),
          translated = bemhtml.Jail.match(ast, 'topLevel', ['$']),
          out = ometajs.grammars.BSJSTranslator.match(translated, 'trans');

      assert.equal(out, dst);
    });
  }

  unit('global var', 'a', 'a');
  unit('local var', 'var a', 'var $a');
  unit('local var and use', 'var a;a', '{var $a;$a}');
  unit('local var and define', 'var a;a=1', '{var $a;$a = 1}');
  unit('function with local use', 'function a() {var x = 1; return x}',
       'function $a(){var x = 1;return x}');
  unit('function with outer use', 'var x = 1;function a() {return x}',
       '{var $x = 1;function $a(){return $x}}');
});
