// XXX: Support tanker-like syntax of keys in `i-bem__i18n`
// i18n['prj']['keyset']['key'](params);
var i18n = i18n || {};

(function(bem_, undefined) {

var cache = {},
    // {String[]} A stack used for restoring context with dynamic keysets
    stack = [],
    /** {String} */
    MOD_DELIM = '_',
    /** {String} */
    ELEM_DELIM = '__',
    /** {String} */
    DEFAULT_LANG = 'ru';

function bemName(decl) {

    typeof decl === 'string' && (decl = { block: decl });

    return decl.block +
        (decl.elem ? (ELEM_DELIM + decl.elem) : '') +
        (decl.modName ? MOD_DELIM + decl.modName + MOD_DELIM + decl.modVal : '');

}

function bemParse(name) {

    var bemitem = {};

    name.split(ELEM_DELIM).forEach(function(item, i) {
        var keys = [ i ? 'elem' : 'block', 'mod', 'val' ];

        item.split(MOD_DELIM).forEach(function(part, j) {
            bemitem[keys[j]] = part;
        });
    });

    return bemitem;

}

function _pushStack(name) {
    if(!name) return false;

    var len = stack.length;
    return !(len && stack[len - 1] === name) && stack.push(name);
}

function _popStack(name) {
    var len = stack.length;
    return len && stack[len - 1] !== name && stack.pop();
}

/**
 * @constructor
 */
function _i18n() {
    this._lang = '';
    this._prj = 'lego'; // FIXME: bem-bl?
    this._keyset = '';
    this._key = '';
}

_i18n.prototype = {

    lang : function(name) {
        this._lang = name;
        return this;
    },

    project : function(name) {
        this._prj = name;
        return this;
    },

    keyset : function(name) {
        _pushStack(this._keyset);

        this._keyset = bemName(name);
        return this;
    },

    key : function(name) {
        this._key = name;
        return this;
    },

    /**
     * FIXME: Move legacy-syntax support into separat method
     * @param {Object|Function} v
     */
    decl : function(v) {
        var bemitem = bemParse(this._keyset),
            // tanker legacy syntax
            prj = bemitem.block === 'i-tanker' ? 'tanker' : this._prj,
            keyset = bemitem.elem || this._keyset,
            key = this._key;

        prj = i18n[prj] || (i18n[prj] = {});
        keyset = prj[keyset] || (prj[keyset] = {});
        keyset[key] = typeof v === 'function' ? v : (function(p) { return (v); });

        // `BEM.I18N` syntax
        var l = cache[this._lang] || (cache[this._lang] = {}),
            k = l[this._keyset] || (l[this._keyset] = {});

        k[key] = v;
    },

    val : function(params, thisCtx) {
        var value = cache[this._lang] && cache[this._lang][this._keyset];
        if(!value) {
            console && console.log &&
                console.log("[Error] keyset: " + this._keyset + " key: " + this._key + " (lang: " + this._lang + ")");
            return '';
        }

        value = value[this._key];
        if(!value) return '';

        try{
            return typeof value === 'string' ?
                value : thisCtx ? value.call(thisCtx, params) : value.call(this, params);
        } catch(e) {
            throw "[Error] keyset: " + this._keyset + " key: " + this._key + " (lang: " + this._lang + ")";
        }
    },

    _c : function() { return cache; }

};

/**
 * @namespace
 * @lends BEM.I18N
 */
bem_.I18N = (function(base) {

    /**
     * Shortcut to get key value
     *
     * @param {String|Object} keyset
     * @param {String} key
     * @param {Object} [params]
     * @return {String}
     */
    var klass = function(keyset, key, params) {
        return klass.keyset(keyset).key(key, params);
    };

    ['project', 'keyset'].forEach(function(p) {
        klass[p] = function(v) { this._i18n[p](v); return this; };
    });

    /**
     * @param {String} name Key name
     * @param {Object} params
     * @return {String}
     */
    klass.key = function(name, params) {
        var proto = this._i18n,
            _keyset, result;

        proto.lang(this._currentLang).key(name);

        result = proto.val.call(proto, params, klass);

        // восстанавливаем значение предыдущего кейсета, если нужно
        _keyset = _popStack(proto._keyset);
        _keyset && proto.keyset(_keyset);

        return result;
    };

    /**
     * Declaration of translations
     *
     * @param {String|Object} bemitem
     * @param {Object} keysets
     * @param {Object} [declProps] declaration params
     */
    klass.decl = function(bemitem, keysets, declProps) {
        var proto = this._i18n, k;

        declProps || (declProps = {});
        declProps.lang && proto.lang(declProps.lang);

        proto.keyset(bemitem);

        for(k in keysets)
            proto.key(k).decl(keysets[k]);

        return this;
    };

    /**
     * Get/set current language
     *
     * @param {String} [lang]
     * @return {String}
     */
    klass.lang = function(lang) {
        typeof lang !== undefined
            && (this._currentLang = lang);

        return this._currentLang;
    };

    klass._i18n = base;

    klass._currentLang = DEFAULT_LANG;

    return klass;

}(new _i18n()));

/** Global */
BEM = this.BEM = bem_;

})(typeof BEM === 'undefined' ? {} : BEM);
