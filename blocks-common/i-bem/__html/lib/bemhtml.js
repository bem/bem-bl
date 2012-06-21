var ometajs = require('ometajs'),
    xjst = require('xjst'),
    vm = require('vm'),
    bemhtml = require('./ometa/bemhtml'),
    BEMHTMLParser = bemhtml.BEMHTMLParser,
    BEMHTMLToXJST = bemhtml.BEMHTMLToXJST;

//
// ### function translate (source)
// #### @source {String} BEMHTML Source code
// #### @options {Object} Compilation options **optional**
// Returns source translated to javascript
//
exports.translate = function translate(source, options) {
  var tree = BEMHTMLParser.matchAll(source, 'topLevel'),
      xjstSources = BEMHTMLToXJST.match(tree, 'topLevel');

  options || (options = {});

  try {
    var xjstTree = xjst.parse(xjstSources);
  } catch (e) {
    throw new Error("xjst parse failed\n" + e.stack);
  }

  try {
    var xjstJS = options.devMode ?
                   xjst.compile(xjstTree, '', { 'no-opt': true })
                   :
                   xjst.compile(xjstTree, { engine: options.engine });
  } catch (e) {
      throw new Error("xjst to js compilation failed:\n" + e.stack);
  }

  return 'var BEMHTML = function(BEM) {\n' +
         '  var BEMHTML = ' + xjstJS + ';\n' +
         '  BEMHTML = (function(xjst) {\n' +
         '    return function() {\n' +
         '      return xjst.apply.call(\n' +
         (options.raw ? 'this' : '[this]') + '\n' +
         '      );\n' +
         '    };\n' +
         '  }(BEMHTML));\n' +
         '  return BEMHTML;\n' +
         '};\n' +
         'if (typeof exports === "undefined") {\n' +
         '  BEMHTML = BEMHTML();\n' +
         '} else {\n' +
         '  exports.BEMHTML = BEMHTML;\n' +
         '}';
};

//
// ### function compile (source)
// #### @source {String} BEMHTML Source code
// #### @options {Object} Compilation options **optional**
// Returns generator function
//
exports.compile = function compile(source, options) {
  var body = exports.translate(source, options),
      context = { exports: {} };

  if (options && options.devMode) context.console = console;
  vm.runInNewContext(body, context);

  return context.BEMHTML;
};

//
// Jail grammar
//
exports.Jail = require('./ometa/jail').Jail;
