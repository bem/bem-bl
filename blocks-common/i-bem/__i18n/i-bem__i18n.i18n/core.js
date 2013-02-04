// XXX: Support tanker-like syntax of keys in `i-bem__i18n`
// i18n['prj']['keyset']['key'](params);
// FIXME: Should not work, because of vars hoisting
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
    return stack.push(name);
}

function _popStack() {
    return stack.length && stack.pop();
}


/**
 * @constructor
 */
function _i18n() {
    this._declProps = {};
    this._prj = 'lego'; // FIXME: bem-bl?
    this._keyset = '';
    this._key = '';
}

_i18n.prototype = {
    project : function(name) {
        this._prj = name;
        return this;
    },

    keyset : function(name, saveCtx) {
        saveCtx && _pushStack(this._keyset);

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
        var c = cache;
        var _this = this;
        Object.keys(this._declProps).forEach(function (key) {
            c = c[key] || (c[key] = {});
            c = c[_this._declProps[key]] || (c[_this._declProps[key]] = {});
        });
        var k = c[this._keyset] || (c[this._keyset] = {});

        k[key] = v;
    },

    val : function(params, thisCtx, props) {
        var c = cache;
        props = props || this._orderProps.slice(0);

        for (var i = 0, length = props.length; i < length; i++) {
            var key = props[i];
            c = c[key] || (c[key] = {});
            c = c[this._declProps[key]] || (c[this._declProps[key]] = {});
        };

        var value = c[this._keyset];
        if (!value) {
            if (props.length > 1) {
                props.pop();
                return this.val(params, thisCtx, props);
            } else {
                console && console.log &&
                    console.log("[Error] keyset: " + this._keyset + " key: " + this._key + " (_props: " + (this._props && this._props.join(' ')) + ")");
                return '';
            };
        };

        value = value[this._key];
        if(!value) {
            if (props.length > 1) {
                    props.pop();
                    return this.val(params, thisCtx, props);
            } else {
                return '';
            };
        };

        try{
            return typeof value === 'string' ?
                value : thisCtx ? value.call(thisCtx, params) : value.call(this, params);
        } catch(e) {
            throw "[Error] keyset: " + this._keyset + " key: " + this._key + " (_props: " + (this._props && this._props.join(' ')) + ")";
        }
    },

    setDeclProp: function (key, value) {
        if (!key) {
            console.log("[Error] setDeclProp: no key");
            return this;
        };

        if (!value) {
            delete this._declProps[key];
            return this;
        };

        this._declProps[key] = value;
        return this;
    },

    flushDeclProps: function () {
        this._declProps = {};
        return this;
    },

    setOrderProps: function (order) {
        this._orderProps = order.slice(0);  
    },

    _c : function() { return cache; },
    _orderProps: []

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

    /**
     * @param {String} name
     * @returns {BEM.I18N}
     */
    klass.project = function(name) {
        this._i18n.project(name);
        return this;
    };

    /**
     * @param {String} name
     * @returns {BEM.I18N}
     */
    klass.keyset = function(name) {
        this._i18n.keyset(name, true);
        return this;
    };

    /**
     * @param {String} name Key name
     * @param {Object} params
     * @return {String}
     */
    klass.key = function(name, params) {
        var proto = this._i18n,
            result,
            ksetRestored;

        proto.key(name);
        for (var key in this._freezed) {
            proto.setDeclProp(key, this._freezed[key]);
        };

        result = proto.val(params, klass);

        // restoring keyset's context
        // NOTE: should not save current ctx, `saveCtx = false`
        ksetRestored = _popStack();
        ksetRestored && proto.keyset(ksetRestored, false);

        return result;
    };

    /**
     *
     * @param {String} name
     * @param {String} value
     * @param {Boolean} isFreezed
     */
    klass.setDeclProp = function (name, value, isFreezed) {
        if (isFreezed)
            this._freezed[name] = value;

        this._i18n.setDeclProp(name, value);
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
        for (var key in declProps) {
            if (Object.prototype.hasOwnProperty.call(declProps, key))
                this.setDeclProp(key, declProps[key]);
        };
        proto.keyset(bemitem);

        for(k in keysets)
            keysets.hasOwnProperty(k) &&
                proto.key(k).decl(keysets[k]);

        proto.flushDeclProps();
        return this;
    };

    /**
     * Get/set current language
     *
     * @param {String} [lang]
     * @return {String}
     */
    klass.lang = function(lang) {
        if (typeof lang !== 'undefined') {
            this.setDeclProp('lang', lang, true);
        };
        // FIXME
        return this._i18n._declProps['lang'];
    };

    klass.setOrderProps = function () {
        this._i18n.setOrderProps(Array.prototype.slice.call(arguments, 0));
    };

    klass._freezed = {}
    klass._i18n = base;

    klass.lang(DEFAULT_LANG);
    klass.setOrderProps('lang');

    return klass;

}(new _i18n()));


/** Global */
BEM = this.BEM = bem_;

})(typeof BEM === 'undefined' ? {} : BEM);
