var DOM = require('dom-js'),
    QUOTE_CHAR = '"',
    SINGLE_QUOTE_CHAR = "'",
    isArray = Array.isArray,
    isJson = function (obj) {
        if (isString(obj)) {
            var jsonStart = obj.trim().charAt(0);
            if (jsonStart === '{' || jsonStart === '[') {
                return true
            }
        }
        return false;
    },
    isString = function(str) {
        return typeof str === 'string';
    },
    isSimple = function(obj) {
        var type = typeof obj;
        return type === 'string' || type === 'number';
    };


/**
 * @param {String} xml
 * @returns {Nodes[]}
 */
function syncParser(el, cb){
    try {
        new DOM.DomJS().parse('<root>' + el + '</root>', function (err, dom) {
            if(err) {
                cb(err, dom.children);
            }
            cb(null, dom.children);
        });
    } catch (e) {
        syncParser(DOM.escape(el), cb);
    }
}

function stringToArray(str){
    var res;
    try {
        res = JSON.parse(str);
    } catch (e) {
        str = str.trim();
        res = str.slice(1, str.length-1).split(',');
    }
    return res;
}

/**
 * @param {String} xml
 * @returns {Nodes[]}
 */
var parseXml = exports.parseXml = function (xml, cb) {
    var result;
    // in case of '[...]'
    if(isJson(xml)){
        xml = stringToArray(xml);
    }
    if (isSimple(xml)) {
        syncParser(xml, function(err, data){
            if(err) {
                throw new Error('parse error ' + xml);
            }
            result = data;
        });
    } else {
        // dynamic keys are parsed separately
        if(isArray(xml)){
            result = xml.map(function(data){
                var res;
                syncParser(data, function(err, data){
                    if(err) {
                        throw new Error('parse error ' + xml);
                    }
                    data.noWrap = true;
                    res = domToJs(data);
                });
                return res;
            });
            result = [{json: result}];
        } else {
            throw new Error('unexpected type of ' + xml);
        }
    }
    cb(result);
};

/**
 * @param {Nodes[]} node
 * @returns {String}
 */
var domToJs = exports.domToJs = function (nodes) {
    var noWrap = nodes.noWrap,
        code = expandNodes(toCommonNodes(nodes), jsExpander);
    if (code.length === 0) {
        return '\'\'';
    } else {
        var firstLine = code[0],
            firstChar = firstLine.charAt(0);
        if (code.length === 1 && (firstChar === QUOTE_CHAR || firstChar === SINGLE_QUOTE_CHAR)) {
            return firstLine;
        }
        code = code.join(' + ');
        return noWrap ? code : 'function (params) { return ' + code + ' }';
    }
};

/**
 * @param {String} xml
 * @returns {Nodes[]}
 */
exports.xmlToJs = function (xml, cb) {
    parseXml(xml, function(nodes){
        cb(domToJs(nodes));
    });
};

/**
 * @param {Array|String|Number} node
 * @param {Function} expanderFn
 */
function expandNodes(node, expanderFn) {

    if(isSimple(node)) return node;

    return node.map(function(item) {
        return isSimple(item)? item : expanderFn(item);
    });

}

/**
 * Convert AST to js String
 *
 * @param {AST}
 * @returns {String}
 */
function jsExpander(node, _raw) {

    _raw == null && (_raw = false);

    var currentExpander = function(node) {
            return jsExpander(node, _raw);
        },
        rawExpander = function(node) {
            return jsExpander(node, true);
        };

    if(!node) {
        // FIXME: should we throw?
        console.warn('[WARN]: Undefined item');
        return '';
    }

    var nodeclass = node.pop(),
        code;

    switch(nodeclass) {

    case 'TANKER_DYNAMIC':
        // [ keyset, key, [params] ]
        code = expandNodes(node, currentExpander);
        return "this.keyset('" + code[0] + "').key('" + code[1] + "', " + (code[2] || "{}") + ")";

    case 'JS_DYNAMIC':
        // [ code ]
        code = '(function(params) { ' + expandNodes(node[0], rawExpander).join('') + ' }).call(this, params);';
        return code;

    case 'XSL_DYNAMIC':
        // [ code ]
        return '';

    case 'XML':
        // [ tag, attrs, [content] ]
        var tag = node[0],
            attrs = node[1],
            prop = [],
            s = '', t, c;

        code = [];

        for(c in attrs) { prop.push([c, SINGLE_QUOTE_CHAR + attrs[c] + SINGLE_QUOTE_CHAR].join('=')); };
        prop = prop.length? jsQuote(' ' + prop.join(' ')) : '';

        c = '';
        t = '"<' + tag + prop;

        if(node[2].length) {
            s = ' + ';

            t += '>"';
            code.push(t);

            c = expandNodes(node[2], currentExpander);
            isArray(c) || (c = [c]);
            [].push.apply(code, c);

            code.push(t = '"</' + tag + '>"');
        } else {
            t += '/>"';
            code.push(t);
        }

        return code.join(s);

    case 'PARAMS':
        // [ [params] ]
        return "{ " + expandNodes(node, currentExpander).join(', ') + " } ";

    case 'PARAM':
        // [ name, [code] ]
        code = expandNodes(node[1], currentExpander);
        return [node[0], isArray(code) ? code.join(' + ') : code].join(': ');

    case 'PARAM-CALL':
        // [ key ]
        return 'params[' + node[0] + ']';

    case 'TEXT':
        // [ text ]
        return _raw ? node[0] : SINGLE_QUOTE_CHAR + jsQuote(node[0]) + SINGLE_QUOTE_CHAR;

    default:
        throw new Error('Unexpected item type: ' + nodeclass);

    }

}

/**
 *  Process Node to AST
 *  [{ name: 'i18n:param'...}, {text: 'Hello'}] => [[..., 'PARAM'], ['Hello', 'TEXT']]
 *
 * @param {Node[]} nodes
 * @returns {AST[]}
 */
function toCommonNodes(nodes) {
    return nodes
        .map(function (node) {
            if(node.name){
                return _node(node);
            }
            if(node.json){
                return _json(node.json);
            }
            return _text(node.text);
        })
        .filter(function (node) {
            return node;
        });
}

/**
 * @param {Object|Node} str
 * @returns {AST|String}
 */
function _text(str) {

    if(!isSimple(str)) return '';

    str = str.replace(/\n\s\s+/g, '\n ');

    if(!str.length) return '';

    return [str, 'TEXT'];

}

/**
 * @returns {AST}
 */
function _empty() {
    return ['', 'TEXT'];
}

/**
 * @param {Node} node
 * @returns {AST}
 */
function _node(node) {

    var name = node.name;
    switch(name) {

    case 'i18n:dynamic':
        var attrs = node.attributes;
        if(attrs && attrs.key) {
            // tanker dynamic
            var keyset = _keyset(attrs),
                params = _params(node.children);

            return [keyset, attrs.key, params, 'TANKER_DYNAMIC'];

        }

        // custom
        return _dynamic(node.children);

    case 'i18n:param':
        if(node.firstChild())
            return _paramCall(node.children[0]);

    }

    if(!~name.indexOf(':'))
        return _xml(node);

}

/**
 * @param {Node} node
 * @returns {AST}
 */
function _xml(node) {
    return [node.name, node.attributes, toCommonNodes(node.children), 'XML'];
}

/**
 * @param {Node[]} nodes
 * @returns {AST}
 */
function _json(nodes) {
    var keys = ['one', 'some', 'many', 'none'],
        params,
        type;

    params = [
        ['"count"', [ ['"count"', 'PARAM-CALL'] ], 'PARAM']
    ].concat(nodes.map(function (node, i) {
        return [quotify(keys[i]), node , 'PARAM'];
    }))
    .concat('PARAMS');

    switch (nodes.length){
        case 4:
            type = 'plural_adv'; break;
        case 3:
            type = 'plural'; break;
        default:
            throw new Error('Unexpected data: ' + nodes);
    }

    return ['i-tanker__dynamic', type, params, 'TANKER_DYNAMIC'];
}

/**
 * @param {Node[]} nodes
 * @returns {AST}
 */
function _dynamic(nodes) {

    var code = [];

    nodes.forEach(function(node) {
        var name = node.name;

        if(name === 'i18n:js') {
            code.push([toCommonNodes(node.children), 'JS_DYNAMIC']);
        //} else if(name === 'i18n:xsl') {
        //    code.push([toCommonNodes(node.children), 'XSL_DYNAMIC']);
        }

    });

    return code.length === 1? code[0] : code;

}

/**
 * @param {Node[]} nodes
 * @returns {AST}
 */
function _params(nodes) {
    return nodes
        .filter(function (node) {
            return ('name' in node);
        })
        .map(function(param){
            return _param(param);
        })
        .concat('PARAMS');
}

/**
 * @param {Node} param
 * @returns {AST}
 */
function _param(param) {
    var name = param.name.replace(/i18n:/, ''),
        val = toCommonNodes(param.children);

    val.length || val.push(_empty());

    return [JSON.stringify(name), val, 'PARAM'];
}

/**
 * @param {Node} param
 * @returns {AST}
 */
function _paramCall(param) {
    return [JSON.stringify(param.text), 'PARAM-CALL'];
}

/**
 * @param {Node} param
 * @returns {String}
 */
function _keyset(param) {
    // FIXME: get rid of Yandex.Tanker specifics
    return ((param.project && param.project === 'tanker') ? 'i-' + param.project + '__' : '') + param.keyset;
}


/** Helpers **/

function jsQuote(s) {
    return '' + s.replace(/([\\\/\'\r\n])/g, '\\$1');
}

function quotify(str) {
    if(isString(str))
        return QUOTE_CHAR + str + QUOTE_CHAR;
    return str;
}
