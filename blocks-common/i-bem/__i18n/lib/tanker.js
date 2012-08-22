var DomJS = require('dom-js').DomJS,

    QUOTE_CHAR = '"',
    SINGLE_QUOTE_CHAR = "'";

var parseXml = exports.parseXml = function(xml, cb) {

    new DomJS().parse('<root>' + xml + '</root>', function(err, dom) {
        cb(dom.children);
    });

};

var domToJs = exports.domToJs = function(nodes) {

    var code = expandNodes(toCommonNodes(nodes), jsExpander);

    return code.length === 1 &&
        (code[0].charAt(0) === QUOTE_CHAR || code[0].charAt(0) === SINGLE_QUOTE_CHAR ) ?
            code[0] : 'function(params) { return ' + code.join(' + ') + ' }';

};

exports.xmlToJs = function(xml, cb) {

    parseXml(xml, function(nodes) {
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

// TODO: js-quote()
function jsQuote(s) {
    return '' + s.replace(/([\\\/\'\r\n])/g, '\\$1');
}

/**
 * @param {Array} item
 * @returns {String}
 */
function jsExpander(item, _raw) {

    typeof _raw !== 'undefined' || (_raw = false);

    var currentExpander = function(item) {
            return jsExpander(item, _raw);
        },
        rawExpander = function(item) {
            return jsExpander(item, true);
        };

    if(!item) {
        // FIXME: should we throw?
        console.warn('[WARN]: Undefined item');
        return '';
    }

    var type = item.pop(),
        code;

    switch(type) {

    case 'TANKER_DYNAMIC':
        // [ keyset, key, [params] ]
        code = expandNodes(item, currentExpander);
        return "this.keyset('" + code[0] + "').key('" + code[1] + "', " + (code[2] || "{}") + ")";

    case 'JS_DYNAMIC':
        // [ code ]
        code = '(function(params) { ' + expandNodes(item[0], rawExpander).join('') + ' }).call(this, params);';
        return code;

    case 'XSL_DYNAMIC':
        // [ code ]
        return '';

    case 'XML':
        // [ tag, attrs, [content] ]
        var tag = item[0],
            attrs = item[1],
            prop = [],
            a;

        for(a in attrs) { prop.push([a, SINGLE_QUOTE_CHAR + attrs[a] + SINGLE_QUOTE_CHAR].join('=')); };
        prop = prop.length? jsQuote(' ' + prop.join(' ')) : '';

        code = item[2].length?
            ['"<' + tag + prop + '>"', expandNodes(item[2], currentExpander), '"</' + tag + '>"'].join(' + ') :
            '"<' + tag + prop + '/>"';

        return code;

    case 'PARAMS':
        // [ [params] ]
        return "{ " + expandNodes(item, currentExpander).join(', ') + " } ";

    case 'PARAM':
        // [ name, [code] ]
        code = expandNodes(item[1], currentExpander);
        return [item[0], toString.call(code) === '[object Array]' ? code.join(' + ') : code].join(': ');

    case 'PARAM-CALL':
        // [ key ]
        return 'params[' + item[0] + ']';

    case 'TEXT':
        // [ text ]
        return _raw ? item[0] : SINGLE_QUOTE_CHAR + jsQuote(item[0]) + SINGLE_QUOTE_CHAR;

    default:
        throw new Error('Unexpected item type: ' + type);

    }

}

function isSimple(obj) {
    var type = typeof obj;
    return type === 'string' || type === 'number';
}

/**
 * @param {Array} nodes
 */
function toCommonNodes(nodes) {

    var code = [];

    nodes.forEach(function(node) {
        if(node.name) {

            code.push(_node(node));

        }
        else if(node.text) {

            var text = _text(node.text);
            if(text) code.push(text);

        }
    });

    return code;

}

function _text(str) {

    if(!isSimple(str)) return '';

    str = str.replace(/\n\s\s+/g, '\n ');

    if(!str.length) return '';

    return [str, 'TEXT'];

}

function _node(node) {

    if(node.name === 'i18n:dynamic') {

        var attrs = node.attributes;
        if(attrs && attrs.key) {

            var keyset = _keyset(attrs),
                params = _params(node.children);

            return [keyset, attrs.key, params, 'TANKER_DYNAMIC'];

        } else {
            // custom
            return _dynamic(node.children);
        }

    }
    else if(node.name === 'i18n:param') {

        if(node.firstChild()) return _param(node.children[0]);

    }
    else if(node.name.indexOf(':') === -1) {
        return _xml(node);
    }

}

function _xml(node) {
    return [node.name, node.attributes, toCommonNodes(node.children), 'XML'];
}


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

function _params(nodes) {

    var params = [];

    nodes.forEach(function(node) {
        if(!node.name || !node.firstChild()) return;

        params.push([JSON.stringify(node.name.replace(/i18n:/, '')), toCommonNodes(node.children), 'PARAM']);
    });

    params.push('PARAMS');

    return params;

}

function _param(params) {
    return [JSON.stringify(params.text), 'PARAM-CALL'];
}

function _keyset(params) {
    // FIXME: get rid of Yandex.Tanker specifics
    return ((params.project && params.project === 'tanker') ? 'i-' + params.project + '__' : '') + params.keyset;
}
