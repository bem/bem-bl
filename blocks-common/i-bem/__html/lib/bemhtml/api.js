var ometajs = require('ometajs'),
    esprima = require('esprima'),
    escodegen = require('escodegen'),
    estraverse = require('estraverse'),
    xjst = require('xjst'),
    vm = require('vm'),
    bemhtml = require('../ometa/bemhtml'),
    BEMHTMLParser = bemhtml.BEMHTMLParser,
    BEMHTMLToXJST = bemhtml.BEMHTMLToXJST,
    BEMHTMLLogLocal = bemhtml.BEMHTMLLogLocal;

var properties = {
  _mode: '$$mode',
  block: '$$block',
  elem: '$$elem',
  elemMods: '$$elemMods',
  mods: '$$mods'
};
var propKeys = Object.keys(properties);
var propValues = propKeys.map(function(key) {
  return properties[key];
});

var api = exports;

api.parse = function parse(source) {
    return BEMHTMLParser.matchAll(source, 'topLevel');
};

//
// ### function translate (source)
// #### @source {String} BEMHTML Source code
// #### @options {Object} Compilation options **optional**
// Returns source translated to javascript
//
api.translate = function translate(source, options) {
  var tree = api.parse(source),
      xjstPre = BEMHTMLToXJST.match(tree, 'topLevel'),
      vars = [];

  options || (options = {});
  options.exportName || (options.exportName = 'BEMHTML');
  options.applyFuncName || (options.applyFuncName = 'apply');

  if (options.cache === true) {
    var xjstCached = BEMHTMLLogLocal.match(xjstPre, 'topLevel');
    vars = xjstCached[0];
    xjstPre = xjstCached[1];
  }

  var xjstTree = xjst.translate(xjstPre);

  try {
    var xjstJS = xjst.compile(xjstTree, '', {
      'no-opt': !!options.devMode,
      engine: 'sort-group'
    });
  } catch (e) {
    throw new Error("xjst to js compilation failed:\n" + e.stack);
  }

  var exportName = options.exportName;

  // Replace known context lookups with context vars
  xjstJS = replaceContext(xjstJS);

  return 'var ' + exportName + ' = function() {\n' +
         '  var ' + propValues.join(', ') + ';\n' +
         '  var cache,\n' +
         '      exports = {},\n' +
         '      xjst = '  + xjstJS + ';\n' +
         '  return function(options) {\n' +
         '    var context = this;\n' +
         '    if (!options) options = {};\n' +
         '    cache = options.cache;\n' +
         '    return function() {\n' +
         '      if (context === this) {\n' +
         '        context = undefined;\n' +
         '      } else {\n' +
                  propKeys.map(function(prop) {
                    return properties[prop] + ' = context.' + prop + ';\n';
                  }).join('') +
         '      }\n' +
         (vars.length > 0 ? '    var ' + vars.join(', ') + ';\n' : '') +
         '      return xjst.' + options.applyFuncName + '.call(\n' +
         (options.raw ? 'context' : '[context]') + '\n' +
         '      );\n' +
         '    }.call(null);\n' +
         '  };\n' +
         '}();\n' +
         'typeof exports === "undefined" || (exports.' + exportName + ' = ' + exportName + ');';
};

//
// ### function compile (source)
// #### @source {String} BEMHTML Source code
// #### @options {Object} Compilation options **optional**
// Returns generator function
//
api.compile = function compile(source, options) {
  var body = exports.translate(source, options),
      context = { exports: {} };

  if (options && options.devMode || true) context.console = console;
  vm.runInNewContext(body, context);

  return context.BEMHTML;
};

function replaceContext(src) {
  function translateProp(prop) {
    if (properties.hasOwnProperty(prop))
      return properties[prop];
    else
      return false;
  };

  var applyc = null;
  var map = null;

  var ast = esprima.parse(src);
  ast = estraverse.replace(ast, {
    enter: function(node) {
      var isFunction = node.type === 'FunctionDeclaration' ||
                       node.type === 'FunctionExpression';
      var id = node.id && node.id.name;
      if (applyc === null &&
          isFunction &&
          (map !== null || /^(applyc|\$\d+)$/.test(id))) {
        applyc = node;
      } else if (applyc === null &&
                 node.type === 'VariableDeclarator' &&
                 /^__h\d+$/.test(id)) {
        map = node;
      } else if (applyc === null) {
        return;
      }

      if (applyc !== node && isFunction) {
        this.skip();
        return;
      }

      if (node.type === 'MemberExpression' &&
          node.computed === false &&
          node.object.type === 'Identifier' &&
          node.object.name === '__$ctx') {
        var prop = translateProp(node.property.name || node.property.value);
        if (!prop)
          return;

        return { type: 'Identifier', name: prop };
      }
    },
    leave: function(node) {
      if (node === applyc)
        applyc = null;
      if (node === map)
        applyc = null;
    }
  });
  return escodegen.generate(ast);
}
