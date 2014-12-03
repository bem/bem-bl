var ometajs = require('ometajs'),
    esprima = require('esprima'),
    escodegen = require('escodegen'),
    estraverse = require('estraverse'),
    xjst = require('xjst'),
    vm = require('vm'),
    bemhtml = require('../ometa/bemhtml'),
    checks = require('./checks'),
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
      engine: 'sort-group',
      scoreFilter: function(pred) {
        if (pred[0] !== 'getp')
          return 0;
        if (pred[1][0] !== 'string' || pred[1][1] !== '_mode')
          return 0;
        if (pred[2][0] !== 'get' || pred[2][1] !== '__$ctx')
          return 0;

        return Infinity;
      },
      afterCompile: function(tree) {
        if (options.nochecks)
          return;

        var errors = [];

        errors = errors.concat(checks.treeStructure(tree));

        if (errors.length) {
          var red = '\x1b[1;31m';
          var rst = '\x1b[0m';
          console.error(red + '!!! WARNING !!!!');
          for (var i = 0; i < errors.length; i++)
            console.error(errors[i]);
          console.error('!!! WARNING !!!!' + rst);
        }
      }
    });
  } catch (e) {
    throw new Error("xjst to js compilation failed:\n" + e.stack);
  }

  var exportName = options.exportName;

  // Replace known context lookups with context vars
  var cr = new ContextReplacer();
  xjstJS = cr.run(xjstJS);

  return 'var ' + exportName + ' = function() {\n' +
         '  var ' + propValues.join(', ') + ';\n' +
         cr.getCallWrap() + '\n' +
         cr.getApplyWrap() + '\n' +
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
                  propKeys.map(function(prop) {
                    return properties[prop] + ' = \'\'\n';
                  }).join('') +
         '      } else {\n' +
                  propKeys.map(function(prop) {
                    if (options.preinit) {
                      return properties[prop] + ' = context.' + prop +
                          ' || \'\';\n';
                    } else {
                      return properties[prop] + ' = \'\';\n';
                    }
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

function ContextReplacer() {
  // estraverse context
  this.estraverse = null;

  this.applyc = null;
  this.map = null;

  this.needCallWrap = false;
  this.needApplyWrap = false;
};

ContextReplacer.prototype.translateProp = function translateProp(prop) {
  if (properties.hasOwnProperty(prop))
    return properties[prop];
  else
    return false;
};

ContextReplacer.prototype.isHash = function isHash(node, kind) {
  var val = node.init;
  if (!val)
    return false;

  if (val.type !== 'ObjectExpression')
    return false;

  var props = val.properties;
  if (kind === 'legacy')
    if (props.length !== 3)
      return false;

  return props.every(function(prop) {
    var name = prop.key.name;
    var val = prop.value;

    if (kind === 'legacy') {
      if ((name === 'n' || name === 'm') && val.type === 'ObjectExpression')
        return true;
      if (name === 'd' && val.type === 'FunctionExpression')
        return true;
      return false;
    } else {
      return val.type === 'FunctionExpression' ||
             val.type === 'Identifier';
    }
  });
};

ContextReplacer.prototype.run = function run(src) {
  var ast = esprima.parse(src);

  var self = this;
  return escodegen.generate(estraverse.replace(ast, {
    enter: function(node, parent) {
      self.estraverse = this;
      return self.enterNode(node, parent);
    },
    leave: function(node) {
      return self.leaveNode(node);
    }
  }));
};

ContextReplacer.prototype.isApplyc = function isApplyc(node) {
  var isFunction = node.type === 'FunctionDeclaration' ||
                   node.type === 'FunctionExpression';
  var id = node.id && node.id.name;

  return this.applyc === null &&
         isFunction &&
         (this.map !== null || /^(applyc|\$\d+)$/.test(id))
};

ContextReplacer.prototype.isMap = function isMap(node) {
  if (this.applyc !== null || node.type !== 'VariableDeclarator')
    return false;

  if (/^__(h|\$m)\d+$/.test(node.id && node.id.name))
    return this.isHash(node, 'legacy');

  if (/^__h\d+_\w$/.test(node.id && node.id.name))
    return this.isHash(node, 'new');

  return false;
};

ContextReplacer.prototype.enterNode = function enterNode(node, parent) {
  var isFunction = node.type === 'FunctionDeclaration' ||
                   node.type === 'FunctionExpression';

  if (this.isApplyc(node)) {
    this.applyc = node;
  } else if (this.isMap(node)) {
    this.map = node;
  } else if (this.applyc === null) {
    return;
  }

  if (this.applyc !== node && isFunction) {
    this.replaceEscapingApplies(node, parent);
    return this.estraverse.skip();
  }

  var res;

  res = this.handleMember(node);
  if (res)
    return res;

  res = this.handleEscapingThis(node, parent);
  if (res)
    return res;
};

ContextReplacer.prototype.handleMember = function handleMember(node) {
  if (node.type !== 'MemberExpression' || node.computed)
    return;

  var obj = node.object;
  if (obj.type !== 'Identifier' || obj.name !== '__$ctx')
    return;

  var prop = this.translateProp(node.property.name || node.property.value);
  if (!prop)
    return;

  return { type: 'Identifier', name: prop };
};

ContextReplacer.prototype.isMapCall = function isMapCall(node) {
  if (node.type !== 'LogicalExpression' || node.operator !== '||')
    return false;

  var match = false;
  estraverse.traverse(node, {
    enter: function(node) {
      if (node.type === 'Identifier' && /^__(h|\$m)\d+(_\w)?$/.test(node.name)) {
        match = true;
        this['break']();
      }
    }
  });

  return match;
};

ContextReplacer.prototype.handleEscapingThis =
    function handleEscapingThis(node, parent) {
  if (node.type !== 'Identifier' || node.name !== '__$ctx')
    return;

  if (/Expression$/.test(parent.type)) {
    if (parent.type === 'FunctionExpression')
      return;

    var isMember = parent.type === 'MemberExpression' &&
                   (!parent.computed || parent.property.type === 'Literal');
    if (isMember)
      return;

    if (parent.type === 'CallExpression') {
      var c = parent.callee;

      // Ignore $1(__$ctx) calls
      if (c.type === 'Identifier' && /^(applyc|\$e|\$\d+)$/.test(c.name))
        return;

      // Ignore __$wrapThis(__$ctx)
      if (c.type === 'Identifier' && c.name === '__$wrapThis')
        return;

      // Ignore (typeof x === 'number' ? __$m\.n[x] : __$m.d)(__$ctx)
      if (this.isMapCall(c))
        return;
    }
  } else if (parent.type === 'VariableDeclarator') {
    // Internal, xjst-thing
    if (parent.id.type === 'Identifier' && parent.id.name === '__this')
      return;

    if (parent.init !== node)
      return;
  } else {
    return;
  }

  this.needCallWrap = true;

  // Wrap in call
  return {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: '__$wrapThis'
    },
    arguments: [ node ]
  };
};

ContextReplacer.prototype.replaceEscapingApplies =
    function replaceEscapingApplies(node, parent) {
  if (this.applyc === null)
    return;

  var self = this;
  estraverse.replace(node, {
    enter: function(node, parent) {
      return self.handleEscapingApply(node, parent);
    }
  });
};

ContextReplacer.prototype.handleEscapingApply =
    function handleEscapingApply(node, parent) {
  if (node.type !== 'CallExpression')
    return;

  var callee = node.callee;
  if (callee.type !== 'Identifier' || callee.name !== 'applyc')
    return;

  this.needApplyWrap = true;

  // Wrap in call
  return {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: '__$wrapApply'
    },
    arguments: [ callee ].concat(node.arguments)
  };
};

ContextReplacer.prototype.leaveNode = function leaveNode(node) {
  if (node === this.applyc)
    this.applyc = null;
  if (node === this.map)
    this.map = null;
};

ContextReplacer.prototype.getCallWrap = function getCallWrap() {
  if (!this.needCallWrap)
    return '';

  return 'function __$wrapThis(ctx) {\n' +
      propKeys.map(function(key) {
        return 'ctx.' + key + ' = ' + properties[key] + ';';
      }).join('\n') + '\n' +
      'return ctx;\n' +
      '};'
};

ContextReplacer.prototype.getApplyWrap = function getApplyWrap() {
  if (!this.needApplyWrap)
    return '';

  return 'function __$wrapApply(applyc, ctx) {\n' +
      // var __t$prop = $$prop;
      // $$prop = this.prop;
      propKeys.map(function(key) {
        return 'var __t$' + key + ' = ' + properties[key] + ';\n' +
               properties[key] + ' = ctx.' + key + ';';
      }).join('\n') + '\n' +
      'var r = applyc(ctx);\n' +
      // $$prop = __t$prop;
      propKeys.map(function(key) {
        return properties[key] + ' = __t$' + key + ';';
      }).join('\n') + '\n' +
     'return r;\n' +
     '};'
};
