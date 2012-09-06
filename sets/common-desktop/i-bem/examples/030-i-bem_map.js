/* ../../../../blocks-common/i-jquery/__inherit/i-jquery__inherit.js: begin */ /**/
/**
 * Inheritance plugin
 *
 * Copyright (c) 2010 Filatov Dmitry (dfilatov@yandex-team.ru)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @version 1.3.3
 */

(function($) {

var hasIntrospection = (function(){_}).toString().indexOf('_') > -1,
    needCheckProps = $.browser.msie, // fucking ie hasn't toString, valueOf in for
    specProps = needCheckProps? ['toString', 'valueOf'] : null,
    emptyBase = function() {};

function override(base, result, add) {

    var hasSpecProps = false;
    if(needCheckProps) {
        var addList = [];
        $.each(specProps, function() {
            add.hasOwnProperty(this) && (hasSpecProps = true) && addList.push({
                name : this,
                val  : add[this]
            });
        });
        if(hasSpecProps) {
            $.each(add, function(name) {
                addList.push({
                    name : name,
                    val  : this
                });
            });
            add = addList;
        }
    }

    $.each(add, function(name, prop) {
        if(hasSpecProps) {
            name = prop.name;
            prop = prop.val;
        }
        if($.isFunction(prop) &&
           (!hasIntrospection || prop.toString().indexOf('.__base') > -1)) {

            var baseMethod = base[name] || function() {};
            result[name] = function() {
                var baseSaved = this.__base;
                this.__base = baseMethod;
                var result = prop.apply(this, arguments);
                this.__base = baseSaved;
                return result;
            };

        }
        else {
            result[name] = prop;
        }

    });

}

$.inherit = function() {

    var args = arguments,
        hasBase = $.isFunction(args[0]),
        base = hasBase? args[0] : emptyBase,
        props = args[hasBase? 1 : 0] || {},
        staticProps = args[hasBase? 2 : 1],
        result = props.__constructor || (hasBase && base.prototype.__constructor)?
            function() {
                return this.__constructor.apply(this, arguments);
            } : function() {};

    if(!hasBase) {
        result.prototype = props;
        result.prototype.__self = result.prototype.constructor = result;
        return $.extend(result, staticProps);
    }

    $.extend(result, base);

    var inheritance = function() {},
        basePtp = inheritance.prototype = base.prototype,
        resultPtp = result.prototype = new inheritance();

    resultPtp.__self = resultPtp.constructor = result;

    override(basePtp, resultPtp, props);
    staticProps && override(base, result, staticProps);

    return result;

};

$.inheritSelf = function(base, props, staticProps) {

    var basePtp = base.prototype;

    override(basePtp, basePtp, props);
    staticProps && override(base, base, staticProps);

    return base;

};

})(jQuery);
/* ../../../../blocks-common/i-jquery/__inherit/i-jquery__inherit.js: end */ /**/

/* ../../../../blocks-common/i-jquery/__identify/i-jquery__identify.js: begin */ /**/
/**
 * Identify plugin
 *
 * @version 1.0.0
 */

(function($) {

var counter = 0,
    expando = '__' + (+new Date),
    get = function() {
        return 'uniq' + ++counter;
    };

/**
 * Makes unique ID
 * @param {Object} [obj] Object that needs to be identified
 * @param {Boolean} [onlyGet=false] Return a unique value only if it had already been assigned before
 * @returns {String} ID
 */
$.identify = function(obj, onlyGet) {

    if(!obj) return get();

    var key = 'uniqueID' in obj? 'uniqueID' : expando; // Use when possible. native uniqueID for elements in IE

    return onlyGet || key in obj?
        obj[key] :
        obj[key] = get();

};

})(jQuery);
/* ../../../../blocks-common/i-jquery/__identify/i-jquery__identify.js: end */ /**/

/* ../../../../blocks-common/i-jquery/__is-empty-object/i-jquery__is-empty-object.js: begin */ /**/
(function($) {

$.isEmptyObject || ($.isEmptyObject = function(obj) {
        for(var i in obj) return false;
        return true;
    });

})(jQuery);

/* ../../../../blocks-common/i-jquery/__is-empty-object/i-jquery__is-empty-object.js: end */ /**/

/* ../../../../blocks-common/i-jquery/__debounce/i-jquery__debounce.js: begin */ /**/
/**
 * Debounce and throttle function's decorator plugin 1.0.6
 *
 * Copyright (c) 2009 Filatov Dmitry (alpha@zforms.ru)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function($) {

$.extend({

    debounce : function(fn, timeout, invokeAsap, ctx) {

        if(arguments.length == 3 && typeof invokeAsap != 'boolean') {
            ctx = invokeAsap;
            invokeAsap = false;
        }

        var timer;

        return function() {

            var args = arguments;
            ctx = ctx || this;

            invokeAsap && !timer && fn.apply(ctx, args);

            clearTimeout(timer);

            timer = setTimeout(function() {
                invokeAsap || fn.apply(ctx, args);
                timer = null;
            }, timeout);

        };

    },

    throttle : function(fn, timeout, ctx) {

        var timer, args, needInvoke;

        return function() {

            args = arguments;
            needInvoke = true;
            ctx = ctx || this;

            timer || (function() {
                if(needInvoke) {
                    fn.apply(ctx, args);
                    needInvoke = false;
                    timer = setTimeout(arguments.callee, timeout);
                }
                else {
                    timer = null;
                }
            })();

        };

    }

});

})(jQuery);
/* ../../../../blocks-common/i-jquery/__debounce/i-jquery__debounce.js: end */ /**/

/* ../../../../blocks-common/i-jquery/__observable/i-jquery__observable.js: begin */ /**/
/**
 * Observable plugin
 *
 * Copyright (c) 2010 Filatov Dmitry (alpha@zforms.ru)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @version 1.0.0
 * @requires $.identify
 * @requires $.inherit
 */

(function($) {

var storageExpando = '__' + +new Date + 'storage',
    getFnId = function(fn, ctx) {
        return $.identify(fn) + (ctx? $.identify(ctx) : '');
    },
    Observable = /** @lends $.observable.prototype */{

        /**
         * Builds full event name
         * @protected
         * @param {String} e Event type
         * @returns {String}
         */
        buildEventName : function(e) {

            return e;

        },

        /**
         * Adding event handler
         * @param {String} e Event type
         * @param {Object} [data] Additional data that the handler gets as e.data
         * @param {Function} fn Handler
         * @param {Object} [ctx] Handler context
         * @returns {$.observable}
         */
        on : function(e, data, fn, ctx, _special) {

            if(typeof e == 'string') {
                if($.isFunction(data)) {
                    ctx = fn;
                    fn = data;
                    data = undefined;
                }

                var id = getFnId(fn, ctx),
                    storage = this[storageExpando] || (this[storageExpando] = {}),
                    eList = e.split(' '),
                    i = 0,
                    eStorage;

                while(e = eList[i++]) {
                    e = this.buildEventName(e);
                    eStorage = storage[e] || (storage[e] = { ids : {}, list : {} });

                    if(!(id in eStorage.ids)) {
                        var list = eStorage.list,
                            item = { fn : fn, data : data, ctx : ctx, special : _special };
                        if(list.last) {
                            list.last.next = item;
                            item.prev = list.last;
                        } else {
                            list.first = item;
                        }

                        eStorage.ids[id] = list.last = item;
                    }
                }
            } else {
                var _this = this;
                $.each(e, function(e, fn) {
                    _this.on(e, fn, data, _special);
                });
            }

            return this;

        },

        onFirst : function(e, data, fn, ctx) {

            return this.on(e, data, fn, ctx, { one : true });

        },

        /**
         * Removing event handler(s)
         * @param {String} [e] Event type
         * @param {Function} [fn] Handler
         * @param {Object} [ctx] Handler context
         * @returns {$.observable}
         */
        un : function(e, fn, ctx) {

            if(typeof e == 'string' || typeof e == 'undefined') {
                var storage = this[storageExpando];
                if(storage) {
                    if(e) { // if event type was passed
                        var eList = e.split(' '),
                            i = 0,
                            eStorage;
                        while(e = eList[i++]) {
                            e = this.buildEventName(e);
                            if(eStorage = storage[e]) {
                                if(fn) {  // if specific handler was passed
                                    var id = getFnId(fn, ctx),
                                        ids = eStorage.ids;
                                    if(id in ids) {
                                        var list = eStorage.list,
                                            item = ids[id],
                                            prev = item.prev,
                                            next = item.next;

                                        if(prev) {
                                            prev.next = next;
                                        }
                                        else if(item === list.first) {
                                            list.first = next;
                                        }

                                        if(next) {
                                            next.prev = prev;
                                        }
                                        else if(item === list.last) {
                                            list.last = prev;
                                        }

                                        delete ids[id];
                                    }
                                } else {
                                    delete this[storageExpando][e];
                                }
                            }
                        }
                    } else {
                        delete this[storageExpando];
                    }
                }
            } else {
                var _this = this;
                $.each(e, function(e, fn) {
                    _this.un(e, fn, ctx);
                });
            }

            return this;

        },

        /**
         * Fires event handlers
         * @param {String|$.Event} e Event
         * @param {Object} [data] Additional data
         * @returns {$.observable}
         */
        trigger : function(e, data) {

            var _this = this,
                storage = _this[storageExpando],
                rawType;

            typeof e === 'string'?
                e = $.Event(_this.buildEventName(rawType = e)) :
                e.type = _this.buildEventName(rawType = e.type);

            e.target || (e.target = _this);

            if(storage && (storage = storage[e.type])) {
                var item = storage.list.first,
                    ret;
                while(item) {
                    e.data = item.data;
                    ret = item.fn.call(item.ctx || _this, e, data);
                    if(typeof ret !== 'undefined') {
                        e.result = ret;
                        if(ret === false) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }

                    item.special && item.special.one &&
                        _this.un(rawType, item.fn, item.ctx);
                    item = item.next;
                }
            }

            return this;

        }

    };

$.observable = $.inherit(Observable, Observable);

})(jQuery);
/* ../../../../blocks-common/i-jquery/__observable/i-jquery__observable.js: end */ /**/

/* ../../../../blocks-common/i-bem/i-bem.js: begin */ /**/
/** @requires jquery.inherit */
/** @requires jquery.isEmptyObject */
/** @requires jquery.identify */
/** @requires jquery.observable */

(function($, undefined) {

/**
 * Storage for deferred functions
 * @private
 * @type Array
 */
var afterCurrentEventFns = [],

/**
 * Storage for block declarations (hash by block name)
 * @private
 * @type Object
 */
    blocks = {},

/**
 * Communication channels
 * @static
 * @private
 * @type Object
 */
    channels = {};

/**
 * Builds the name of the handler method for setting a modifier
 * @static
 * @private
 * @param {String} elemName Element name
 * @param {String} modName Modifier name
 * @param {String} modVal Modifier value
 * @returns {String}
 */
function buildModFnName(elemName, modName, modVal) {

    return (elemName? '__elem_' + elemName : '') +
           '__mod' +
           (modName? '_' + modName : '') +
           (modVal? '_' + modVal : '');

}

/**
 * Transforms a hash of modifier handlers to methods
 * @static
 * @private
 * @param {Object} modFns
 * @param {Object} props
 * @param {String} [elemName]
 */
function modFnsToProps(modFns, props, elemName) {

    $.isFunction(modFns)?
        (props[buildModFnName(elemName, '*', '*')] = modFns) :
        $.each(modFns, function(modName, modFn) {
            $.isFunction(modFn)?
                (props[buildModFnName(elemName, modName, '*')] = modFn) :
                $.each(modFn, function(modVal, modFn) {
                    props[buildModFnName(elemName, modName, modVal)] = modFn;
                });
        });

}

function buildCheckMod(modName, modVal) {

    return modVal?
        Array.isArray(modVal)?
            function(block) {
                var i = 0, len = modVal.length;
                while(i < len)
                    if(block.hasMod(modName, modVal[i++]))
                        return true;
                return false;
            } :
            function(block) {
                return block.hasMod(modName, modVal);
            } :
        function(block) {
            return block.hasMod(modName);
        };

}

/** @namespace */
this.BEM = $.inherit($.observable, /** @lends BEM.prototype */ {

    /**
     * @class Base block for creating BEM blocks
     * @constructs
     * @private
     * @param {Object} mods Block modifiers
     * @param {Object} params Block parameters
     * @param {Boolean} [initImmediately=true]
     */
    __constructor : function(mods, params, initImmediately) {

        var _this = this;

        /**
         * Cache of block modifiers
         * @private
         * @type Object
         */
        _this._modCache = mods || {};

        /**
         * Current modifiers in the stack
         * @private
         * @type Object
         */
        _this._processingMods = {};

        /**
         * The block's parameters, taking into account the defaults
         * @protected
         * @type Object
         */
        _this._params = params; // это нужно для правильной сборки параметров у блока из нескольких нод
        _this.params = null;

        initImmediately !== false?
            _this._init() :
            _this.afterCurrentEvent(function() {
                _this._init();
            });

    },

    /**
     * Initializes the block
     * @private
     */
    _init : function() {

        if(!this._initing && !this.hasMod('js', 'inited')) {
            this._initing = true;

            this.params = $.extend(this.getDefaultParams(), this._params);
            delete this._params;

            this.setMod('js', 'inited');
            delete this._initing;
            this.trigger('init');
        }

        return this;

    },

    /**
     * Changes the context of the function being passed
     * @protected
     * @param {Function} fn
     * @param {Object} [ctx=this] Context
     * @returns {Function} Function with a modified context
     */
    changeThis : function(fn, ctx) {

        return fn.bind(ctx || this);

    },

    /**
     * Executes the function in the context of the block, after the "current event"
     * @protected
     * @param {Function} fn
     * @param {Object} [ctx] Context
     */
    afterCurrentEvent : function(fn, ctx) {

        this.__self.afterCurrentEvent(this.changeThis(fn, ctx));

    },

    /**
     * Executes the block's event handlers and live event handlers
     * @protected
     * @param {String} e Event name
     * @param {Object} [data] Additional information
     * @returns {BEM}
     */
    trigger : function(e, data) {

        this
            .__base(e = this.buildEvent(e), data)
            .__self.trigger(e, data);

        return this;

    },

    buildEvent : function(e) {

        typeof e == 'string' && (e = $.Event(e));
        e.block = this;

        return e;

    },

    /**
     * Checks whether a block or nested element has a modifier
     * @protected
     * @param {Object} [elem] Nested element
     * @param {String} modName Modifier name
     * @param {String} [modVal] Modifier value
     * @returns {Boolean}
     */
    hasMod : function(elem, modName, modVal) {

        var len = arguments.length,
            invert = false;

        if(len == 1) {
            modVal = '';
            modName = elem;
            elem = undefined;
            invert = true;
        }
        else if(len == 2) {
            if(typeof elem == 'string') {
                modVal = modName;
                modName = elem;
                elem = undefined;
            }
            else {
                modVal = '';
                invert = true;
            }
        }

        var res = this.getMod(elem, modName) === modVal;
        return invert? !res : res;

    },

    /**
     * Returns the value of the modifier of the block/nested element
     * @protected
     * @param {Object} [elem] Nested element
     * @param {String} modName Modifier name
     * @returns {String} Modifier value
     */
    getMod : function(elem, modName) {

        var type = typeof elem;
        if(type === 'string' || type === 'undefined') { // elem either omitted or undefined
            modName = elem || modName;
            var modCache = this._modCache;
            return modName in modCache?
                modCache[modName] :
                modCache[modName] = this._extractModVal(modName);
        }

        return this._getElemMod(modName, elem);

    },

    /**
     * Returns the value of the modifier of the nested element
     * @private
     * @param {String} modName Modifier name
     * @param {Object} elem Nested element
     * @param {Object} [elem] Nested element name
     * @returns {String} Modifier value
     */
    _getElemMod : function(modName, elem, elemName) {

        return this._extractModVal(modName, elem, elemName);

    },

    /**
     * Returns values of modifiers of the block/nested element
     * @protected
     * @param {Object} [elem] Nested element
     * @param {String} [modName1, ..., modNameN] Modifier names
     * @returns {Object} Hash of modifier values
     */
    getMods : function(elem) {

        var hasElem = elem && typeof elem != 'string',
            _this = this,
            modNames = [].slice.call(arguments, hasElem? 1 : 0),
            res = _this._extractMods(modNames, hasElem? elem : undefined);

        if(!hasElem) { // caching
            modNames.length?
                modNames.forEach(function(name) {
                    _this._modCache[name] = res[name];
                }):
                _this._modCache = res;
        }

        return res;

    },

    /**
     * Sets the modifier for a block/nested element
     * @protected
     * @param {Object} [elem] Nested element
     * @param {String} modName Modifier name
     * @param {String} modVal Modifier value
     * @returns {BEM}
     */
    setMod : function(elem, modName, modVal) {

        if(typeof modVal == 'undefined') {
            modVal = modName;
            modName = elem;
            elem = undefined;
        }

        var _this = this;

        if(!elem || elem[0]) {

            var modId = (elem && elem[0]? $.identify(elem[0]) : '') + '_' + modName;

            if(this._processingMods[modId]) return _this;

            var elemName,
                curModVal = elem?
                    _this._getElemMod(modName, elem, elemName = _this.__self._extractElemNameFrom(elem)) :
                    _this.getMod(modName);

            if(curModVal === modVal) return _this;

            this._processingMods[modId] = true;

            var needSetMod = true,
                modFnParams = [modName, modVal, curModVal];

            elem && modFnParams.unshift(elem);

            [['*', '*'], [modName, '*'], [modName, modVal]].forEach(function(mod) {
                needSetMod = _this._callModFn(elemName, mod[0], mod[1], modFnParams) !== false && needSetMod;
            });

            !elem && needSetMod && (_this._modCache[modName] = modVal);

            needSetMod && _this._afterSetMod(modName, modVal, curModVal, elem, elemName);

            delete this._processingMods[modId];
        }

        return _this;

    },

    /**
     * Function after successfully changing the modifier of the block/nested element
     * @protected
     * @param {String} modName Modifier name
     * @param {String} modVal Modifier value
     * @param {String} oldModVal Old modifier value
     * @param {Object} [elem] Nested element
     * @param {String} [elemName] Element name
     */
    _afterSetMod : function(modName, modVal, oldModVal, elem, elemName) {},

    /**
     * Sets a modifier for a block/nested element, depending on conditions.
     * If the condition parameter is passed: when true, modVal1 is set; when false, modVal2 is set.
     * If the condition parameter is not passed: modVal1 is set if modVal2 was set, or vice versa.
     * @protected
     * @param {Object} [elem] Nested element
     * @param {String} modName Modifier name
     * @param {String} modVal1 First modifier value
     * @param {String} [modVal2] Second modifier value
     * @param {Boolean} [condition] Condition
     * @returns {BEM}
     */
    toggleMod : function(elem, modName, modVal1, modVal2, condition) {

        if(typeof elem == 'string') { // if this is a block
            condition = modVal2;
            modVal2 = modVal1;
            modVal1 = modName;
            modName = elem;
            elem = undefined;
        }
        if(typeof modVal2 == 'undefined') {
            modVal2 = '';
        } else if(typeof modVal2 == 'boolean') {
            condition = modVal2;
            modVal2 = '';
        }

        var _this = this;
        $.each(elem || [undefined], function(i, elem) {
            elem = elem && $(elem); // Если это элемент
            var modVal = _this.getMod(elem, modName);
            (modVal == modVal1 || modVal == modVal2) &&
                _this.setMod(
                    elem,
                    modName,
                    typeof condition === 'boolean'?
                        (condition? modVal1 : modVal2) :
                        _this.hasMod(elem, modName, modVal1)? modVal2 : modVal1);
        });

        return this;

    },

    /**
     * Removes a modifier from a block/nested element
     * @protected
     * @param {Object} [elem] Nested element
     * @param {String} modName Modifier name
     * @returns {BEM}
     */
    delMod : function(elem, modName) {

        if(!modName) {
            modName = elem;
            elem = undefined;
        }

        return this.setMod(elem, modName, '');

    },

    /**
     * Executes handlers for setting modifiers
     * @private
     * @param {String} elemName Element name
     * @param {String} modName Modifier name
     * @param {String} modVal Modifier value
     * @param {Array} modFnParams Handler parameters
     */
    _callModFn : function(elemName, modName, modVal, modFnParams) {

        var modFnName = buildModFnName(elemName, modName, modVal);
        return this[modFnName]?
           this[modFnName].apply(this, modFnParams) :
           undefined;

    },

    /**
     * Retrieves the value of the modifier
     * @private
     * @param {String} modName Modifier name
     * @param {Object} [elem] Element
     * @returns {String} Modifier value
     */
    _extractModVal : function(modName, elem) {

        return '';

    },

    /**
     * Retrieves name/value for a list of modifiers
     * @private
     * @param {Array} modNames Names of modifiers
     * @param {Object} [elem] Element
     * @returns {Object} Hash of modifier values by name
     */
    _extractMods : function(modNames, elem) {

        return {};

    },

    /**
     * Returns a named communication channel
     * @param {String} [id='default'] Channel ID
     * @param {Boolean} [drop=false] Destroy the channel
     * @returns {$.observable|undefined} Communication channel
     */
    channel : function(id, drop) {

        return this.__self.channel(id, drop);

    },

    /**
     * Returns a block's default parameters
     * @returns {Object}
     */
    getDefaultParams : function() {

        return {};

    },

    /**
     * Helper for cleaning up block properties
     * @param {Object} [obj=this]
     */
    del : function(obj) {

        var args = [].slice.call(arguments);
        typeof obj == 'string' && args.unshift(this);
        this.__self.del.apply(this.__self, args);
        return this;

	},

    /**
     * Deletes a block
     */
    destruct : function() {}

}, /** @lends BEM */{

    _name : 'i-bem',

    /**
     * Storage for block declarations (hash by block name)
     * @static
     * @protected
     * @type Object
     */
    blocks : blocks,

    /**
     * Declares blocks and creates a block class
     * @static
     * @protected
     * @param {String|Object} decl Block name (simple syntax) or description
     * @param {String} decl.block|decl.name Block name
     * @param {String} [decl.baseBlock] Name of the parent block
     * @param {String} [decl.modName] Modifier name
     * @param {String} [decl.modVal] Modifier value
     * @param {Object} [props] Methods
     * @param {Object} [staticProps] Static methods
     */
    decl : function(decl, props, staticProps) {

        if(typeof decl == 'string')
            decl = { block : decl };
        else if(decl.name) {
            decl.block = decl.name;
        }

        if(decl.baseBlock && !blocks[decl.baseBlock])
            throw('baseBlock "' + decl.baseBlock + '" for "' + decl.block + '" is undefined');

        props || (props = {});

        if(props.onSetMod) {
            modFnsToProps(props.onSetMod, props);
            delete props.onSetMod;
        }

        if(props.onElemSetMod) {
            $.each(props.onElemSetMod, function(elemName, modFns) {
                modFnsToProps(modFns, props, elemName);
            });
            delete props.onElemSetMod;
        }

        var baseBlock = blocks[decl.baseBlock || decl.block] || this;

        if(decl.modName) {
            var checkMod = buildCheckMod(decl.modName, decl.modVal);
            $.each(props, function(name, prop) {
                $.isFunction(prop) &&
                    (props[name] = function() {
                        var method;
                        if(checkMod(this)) {
                            method = prop;
                        } else {
                            var baseMethod = baseBlock.prototype[name];
                            baseMethod && baseMethod !== props[name] &&
                                (method = this.__base);
                        }
                        return method?
                            method.apply(this, arguments) :
                            undefined;
                    });
            });
        }

        var block;
        decl.block == baseBlock._name?
            // makes a new "live" if the old one was already executed
            (block = $.inheritSelf(baseBlock, props, staticProps))._processLive(true) :
            (block = blocks[decl.block] = $.inherit(baseBlock, props, staticProps))._name = decl.block;

        return block;

    },

    /**
     * Processes a block's live properties
     * @private
     * @param {Boolean} [heedLive=false] Whether to take into account that the block already processed its live properties
     * @returns {Boolean} Whether the block is a live block
     */
    _processLive : function(heedLive) {

        return false;

    },

    /**
     * Factory method for creating an instance of the block named
     * @static
     * @param {String|Object} block Block name or description
     * @param {Object} [params] Block parameters
     * @returns {BEM}
     */
    create : function(block, params) {

        typeof block == 'string' && (block = { block : block });

        return new blocks[block.block](block.mods, params);

    },

    /**
     * Returns the name of the current block
     * @static
     * @protected
     * @returns {String}
     */
    getName : function() {

        return this._name;

    },

    /**
     * Retrieves the name of an element nested in a block
     * @static
     * @private
     * @param {Object} elem Nested element
     * @returns {String|undefined}
     */
    _extractElemNameFrom : function(elem) {},

    /**
     * Adds a function to the queue for executing after the "current event"
     * @static
     * @protected
     * @param {Function} fn
     * @param {Object} ctx
     */
    afterCurrentEvent : function(fn, ctx) {

        afterCurrentEventFns.push({ fn : fn, ctx : ctx }) == 1 &&
            setTimeout(this._runAfterCurrentEventFns, 0);

    },

    /**
     * Executes the queue
     * @private
     */
    _runAfterCurrentEventFns : function() {

        var fnsLen = afterCurrentEventFns.length;
        if(fnsLen) {
            var fnObj,
                fnsCopy = afterCurrentEventFns.splice(0, fnsLen);

            while(fnObj = fnsCopy.shift()) fnObj.fn.call(fnObj.ctx || this);
        }

    },

    /**
     * Changes the context of the function being passed
     * @protected
     * @param {Function} fn
     * @param {Object} ctx Context
     * @returns {Function} Function with a modified context
     */
    changeThis : function(fn, ctx) {

        return fn.bind(ctx || this);

    },

    /**
     * Helper for cleaning out properties
     * @param {Object} [obj=this]
     */
    del : function(obj) {

        var delInThis = typeof obj == 'string',
            i = delInThis? 0 : 1,
            len = arguments.length;
        delInThis && (obj = this);

        while(i < len) delete obj[arguments[i++]];

        return this;

	},

    /**
     * Returns/destroys a named communication channel
     * @param {String} [id='default'] Channel ID
     * @param {Boolean} [drop=false] Destroy the channel
     * @returns {$.observable|undefined} Communication channel
     */
    channel : function(id, drop) {

        if(typeof id == 'boolean') {
            drop = id;
            id = undefined;
        }

        id || (id = 'default');

        if(drop) {
            if(channels[id]) {
                channels[id].un();
                delete channels[id];
            }
            return;
        }

        return channels[id] || (channels[id] = new $.observable());

    }

});

})(jQuery);
/* ../../../../blocks-common/i-bem/i-bem.js: end */ /**/

/* ../../../../blocks-common/i-ecma/__object/i-ecma__object.js: begin */ /**/
(function() {

/**
 * Возвращает массив свойств объекта
 * @param {Object} obj объект
 * @returns {Array}
 */
Object.keys || (Object.keys = function(obj) {
    var res = [];

    for(var i in obj) obj.hasOwnProperty(i) &&
        res.push(i);

    return res;
});

})();
/* ../../../../blocks-common/i-ecma/__object/i-ecma__object.js: end */ /**/

/* ../../../../blocks-common/i-ecma/__array/i-ecma__array.js: begin */ /**/
(function() {

var ptp = Array.prototype,
    toStr = Object.prototype.toString,
    methods = {

        /**
         * Finds the index of an element in an array
         * @param {Object} item
         * @param {Number} [fromIdx] Starting from index (length - 1 - fromIdx, if fromIdx < 0)
         * @returns {Number} Element index or -1, if not found
         */
        indexOf : function(item, fromIdx) {

            fromIdx = +(fromIdx || 0);

            var t = this, len = t.length;

            if(len > 0 && fromIdx < len) {
                fromIdx = fromIdx < 0? Math.ceil(fromIdx) : Math.floor(fromIdx);
                fromIdx < -len && (fromIdx = 0);
                fromIdx < 0 && (fromIdx = fromIdx + len);

                while(fromIdx < len) {
                    if(fromIdx in t && t[fromIdx] === item)
                        return fromIdx;
                    ++fromIdx;
                }
            }

            return -1;

        },

        /**
         * Calls the callback for each element
         * @param {Function} callback Called for each element
         * @param {Object} [ctx=null] Callback context
         */
        forEach : function(callback, ctx) {

            var i = -1, t = this, len = t.length;
            while(++i < len) i in t &&
                (ctx? callback.call(ctx, t[i], i, t) : callback(t[i], i, t));

        },

        /**
         * Creates array B from array A so that B[i] = callback(A[i])
         * @param {Function} callback Called for each element
         * @param {Object} [ctx=null] Callback context
         * @returns {Array}
         */
        map : function(callback, ctx) {

            var i = -1, t = this, len = t.length,
                res = new Array(len);

            while(++i < len) i in t &&
                (res[i] = ctx? callback.call(ctx, t[i], i, t) : callback(t[i], i, t));

            return res;

        },

        /**
         * Creates an array containing only the elements from the source array that the callback returns true for. 
         * @param {Function} callback Called for each element
         * @param {Object} [ctx] Callback context
         * @returns {Array}
         */
        filter : function(callback, ctx) {

            var i = -1, t = this, len = t.length,
                res = [];

            while(++i < len) i in t &&
                (ctx? callback.call(ctx, t[i], i, t) : callback(t[i], i, t)) && res.push(t[i]);

            return res;

        },

        /**
         * Wraps the array using an accumulator
         * @param {Function} callback Called for each element
         * @param {Object} [initialVal] Initial value of the accumulator
         * @returns {Object} Accumulator
         */
        reduce : function(callback, initialVal) {

            var i = -1, t = this, len = t.length,
                res;

            if(arguments.length < 2) {
                while(++i < len) {
                    if(i in t) {
                        res = t[i];
                        break;
                    }
                }
            }
            else {
                res = initialVal;
            }

            while(++i < len) i in t &&
                (res = callback(res, t[i], i, t));

            return res;

        },

        /**
         * Checks whether at least one element in the array meets the condition in the callback
         * @param {Function} callback
         * @param {Object} [ctx=this] Callback context
         * @returns {Boolean}
         */
        some : function(callback, ctx) {

            var i = -1, t = this, len = t.length;

            while(++i < len)
                if(i in t && (ctx ? callback.call(ctx, t[i], i, t) : callback(t[i], i, t)))
                    return true;

            return false;

        },

        /**
         * Checks whether every element in the array meets the condition in the callback
         * @param {Function} callback
         * @param {Object} [ctx=this] Context of the callback call
         * @returns {Boolean}
         */
        every : function(callback, ctx) {

            var i = -1, t = this, len = t.length;

            while(++i < len)
                if(i in t && !(ctx ? callback.call(ctx, t[i], i, t) : callback(t[i], i, t)))
                    return false;

            return true;

        }

    };

for(var name in methods)
    ptp[name] || (ptp[name] = methods[name]);

Array.isArray || (Array.isArray = function(obj) {
    return toStr.call(obj) === '[object Array]';
});

})();
/* ../../../../blocks-common/i-ecma/__array/i-ecma__array.js: end */ /**/

/* ../../../../blocks-common/i-ecma/__function/i-ecma__function.js: begin */ /**/
(function() {

var slice = Array.prototype.slice;

Function.prototype.bind || (Function.prototype.bind = function(ctx) {

    var fn = this,
        args = slice.call(arguments, 1);

    return function () {
        return fn.apply(ctx, args.concat(slice.call(arguments)));
    }

});

})();
/* ../../../../blocks-common/i-ecma/__function/i-ecma__function.js: end */ /**/

/* ../../../../blocks-common/i-bem/__internal/i-bem__internal.js: begin */ /**/
/** @fileOverview Module for internal BEM helpers */
/** @requires BEM */

(function(BEM, $, undefined) {

/**
 * Separator for modifiers and their values
 * @const
 * @type String
 */
var MOD_DELIM = '_',

/**
 * Separator between names of a block and a nested element
 * @const
 * @type String
 */
    ELEM_DELIM = '__',

/**
 * Pattern for acceptable element and modifier names
 * @const
 * @type String
 */
    NAME_PATTERN = '[a-zA-Z0-9-]+';

function buildModPostfix(modName, modVal, buffer) {

    buffer.push(MOD_DELIM, modName, MOD_DELIM, modVal);

}

function buildBlockClass(name, modName, modVal, buffer) {

    buffer.push(name);
    modVal && buildModPostfix(modName, modVal, buffer);

}

function buildElemClass(block, name, modName, modVal, buffer) {

    buildBlockClass(block, undefined, undefined, buffer);
    buffer.push(ELEM_DELIM, name);
    modVal && buildModPostfix(modName, modVal, buffer);

}

BEM.INTERNAL = {

    NAME_PATTERN : NAME_PATTERN,

    MOD_DELIM : MOD_DELIM,
    ELEM_DELIM : ELEM_DELIM,

    buildModPostfix : function(modName, modVal, buffer) {

        var res = buffer || [];
        buildModPostfix(modName, modVal, res);
        return buffer? res : res.join('');

    },

    /**
     * Builds the class of a block or element with a modifier
     * @private
     * @param {String} block Block name
     * @param {String} [elem] Element name
     * @param {String} [modName] Modifier name
     * @param {String} [modVal] Modifier value
     * @param {Array} [buffer] Buffer
     * @returns {String|Array} Class or buffer string (depending on whether the buffer parameter is present)
     */
    buildClass : function(block, elem, modName, modVal, buffer) {

        var typeOf = typeof modName;
        if(typeOf == 'string') {
            if(typeof modVal != 'string') {
                buffer = modVal;
                modVal = modName;
                modName = elem;
                elem = undefined;
            }
        } else if(typeOf != 'undefined') {
            buffer = modName;
            modName = undefined;
        } else if(elem && typeof elem != 'string') {
            buffer = elem;
            elem = undefined;
        }

        if(!(elem || modName || buffer)) { // оптимизация для самого простого случая
            return block;
        }

        var res = buffer || [];

        elem?
            buildElemClass(block, elem, modName, modVal, res) :
            buildBlockClass(block, modName, modVal, res);

        return buffer? res : res.join('');

    },

    /**
     * Builds full classes for a buffer or element with modifiers
     * @private
     * @param {String} block Block name
     * @param {String} [elem] Element name
     * @param {Object} [mods] Modifiers
     * @param {Array} [buffer] Buffer
     * @returns {String|Array} Class or buffer string (depending on whether the buffer parameter is present)
     */
    buildClasses : function(block, elem, mods, buffer) {

        if(elem && typeof elem != 'string') {
            buffer = mods;
            mods = elem;
            elem = undefined;
        }

        var res = buffer || [];

        elem?
            buildElemClass(block, elem, undefined, undefined, res) :
            buildBlockClass(block, undefined, undefined, res);

        mods && $.each(mods, function(modName, modVal) {
            if(modVal) {
                res.push(' ');
                elem?
                    buildElemClass(block, elem, modName, modVal, res) :
                    buildBlockClass(block, modName, modVal, res);
            }
        });

        return buffer? res : res.join('');

        /*var typeOf = typeof elem;
        if(typeOf != 'string' && typeOf != 'undefined') {
            buffer = mods;
            mods = elem;
            elem = undefined;
        }
        if($.isArray(mods)) {
            buffer = mods;
            mods = undefined;
        }

        var res = buffer || [];
        buildClasses(block, elem, mods, res);
        return buffer? res : res.join('');*/

    }

}

})(BEM, jQuery);
/* ../../../../blocks-common/i-bem/__internal/i-bem__internal.js: end */ /**/

/* ../../../../blocks-common/i-bem/__dom/i-bem__dom.js: begin */ /**/
/** @requires BEM */
/** @requires BEM.INTERNAL */

(function(BEM, $, undefined) {

var win = $(window),
    doc = $(document),

/**
 * Storage for DOM elements by unique key
 * @private
 * @type Object
 */
    uniqIdToDomElems = {},

/**
 * Storage for blocks by unique key
 * @static
 * @private
 * @type Object
 */
    uniqIdToBlock = {},

/**
 * Storage for block parameters
 * @private
 * @type Object
 */
    domElemToParams = {},

/**
 * Storage for liveCtx event handlers 
 * @private
 * @type Object
 */
    liveEventCtxStorage = {},

/**
 * Storage for liveClass event handlers
 * @private
 * @type Object
 */
    liveClassEventStorage = {},

    blocks = BEM.blocks,

    INTERNAL = BEM.INTERNAL,

    NAME_PATTERN = INTERNAL.NAME_PATTERN,

    MOD_DELIM = INTERNAL.MOD_DELIM,
    ELEM_DELIM = INTERNAL.ELEM_DELIM,

    buildModPostfix = INTERNAL.buildModPostfix,
    buildClass = INTERNAL.buildClass;

/**
 * Initializes blocks on a DOM element
 * @private
 * @param {jQuery} domElem DOM element
 * @param {String} uniqInitId ID of the "initialization wave"
 */
function init(domElem, uniqInitId) {

    var domNode = domElem[0];
    $.each(getParams(domNode), function(blockName, params) {
        processParams(params, domNode, blockName, uniqInitId);
        var block = uniqIdToBlock[params.uniqId];
        if(block) {
            if(block.domElem.index(domNode) < 0) {
                block.domElem = block.domElem.add(domElem);
                $.extend(block._params, params);
            }
        } else {
            initBlock(blockName, domElem, params);
        }
    });

}

/**
 * Initializes a specific block on a DOM element, or returns the existing block if it was already created
 * @private
 * @param {String} blockName Block name
 * @param {jQuery} domElem DOM element
 * @param {Object} [params] Initialization parameters
 * @param {Boolean} [forceLive] Force live initialization
 * @param {Function} [callback] Handler to call after complete initialization
 */
function initBlock(blockName, domElem, params, forceLive, callback) {

    if(typeof params == 'boolean') {
        callback = forceLive;
        forceLive = params;
        params = undefined;
    }

    var domNode = domElem[0];
    params = processParams(params || getParams(domNode)[blockName], domNode, blockName);

    var uniqId = params.uniqId;
    if(uniqIdToBlock[uniqId]) {
        return uniqIdToBlock[uniqId]._init();
    }

    uniqIdToDomElems[uniqId] = uniqIdToDomElems[uniqId]?
        uniqIdToDomElems[uniqId].add(domElem) :
        domElem;

    var parentDomNode = domNode.parentNode;
    if(!parentDomNode || parentDomNode.nodeType === 11) { // jquery doesn't unique disconnected node
        $.unique(uniqIdToDomElems[uniqId]);
    }

    var blockClass = blocks[blockName] || DOM.decl(blockName, {}, { live : true });
    if(!(blockClass._liveInitable = !!blockClass._processLive()) || forceLive || params.live === false) {
        var block = new blockClass(uniqIdToDomElems[uniqId], params, !!forceLive);
        delete uniqIdToDomElems[uniqId];
        callback && callback.apply(block, Array.prototype.slice.call(arguments, 4));
        return block;
    }

}

/**
 * Processes and adds necessary block parameters
 * @private
 * @param {Object} params Initialization parameters
 * @param {HTMLElement} domNode DOM node
 * @param {String} blockName Block name
 * @param {String} [uniqInitId] ID of the "initialization wave"
 */
function processParams(params, domNode, blockName, uniqInitId) {

    (params || (params = {})).uniqId ||
        (params.uniqId = (params.id? blockName + '-id-' + params.id : $.identify()) + (uniqInitId || $.identify()));

    var domUniqId = $.identify(domNode),
        domParams = domElemToParams[domUniqId] || (domElemToParams[domUniqId] = {});

    domParams[blockName] || (domParams[blockName] = params);

    return params;

}

/**
 * Helper for searching for a DOM element using a selector inside the context, including the context itself
 * @private
 * @param {jQuery} ctx Context
 * @param {String} selector CSS selector
 * @param {Boolean} [excludeSelf=false] Exclude context from search
 * @returns {jQuery}
 */
function findDomElem(ctx, selector, excludeSelf) {

    var res = ctx.find(selector);
    return excludeSelf?
       res :
       res.add(ctx.filter(selector));

}

/**
 * Returns parameters of a block's DOM element
 * @private
 * @param {HTMLElement} domNode DOM node
 * @returns {Object}
 */
function getParams(domNode) {

    var uniqId = $.identify(domNode);
    return domElemToParams[uniqId] ||
           (domElemToParams[uniqId] = extractParams(domNode));

}

/**
 * Retrieves block parameters from a DOM element
 * @private
 * @param {HTMLElement} domNode DOM node
 * @returns {Object}
 */
function extractParams(domNode) {

    var fn = domNode.onclick || domNode.ondblclick;
    if(!fn && domNode.tagName.toLowerCase() == 'body') { // LEGO-2027 in FF onclick doesn't work on body
        var elem = $(domNode),
            attr = elem.attr('onclick') || elem.attr('ondblclick');
        attr && (fn = Function(attr));
    }
    return fn? fn() : {};

}

/**
 * Cleans up all the BEM storages associated with a DOM node
 * @private
 * @param {HTMLElement} domNode DOM node
 */
function cleanupDomNode(domNode) {

    delete domElemToParams[$.identify(domNode)];

}

/**
 * Uncople DOM node from the block. If this is the last node, then destroys the block.
 * @private
 * @param {BEM.DOM} block block
 * @param {HTMLElement} domNode DOM node
 */
function removeDomNodeFromBlock(block, domNode) {

    block.domElem.length === 1?
        block.destruct(true) :
        block.domElem = block.domElem.not(domNode);

}

/**
 * Returns a DOM node for calculating the window size in IE
 * @returns {HTMLElement}
 */
function getClientNode() {

    return doc[0][$.support.boxModel? 'documentElement' : 'body'];

}

/**
 * Returns a block on a DOM element and initializes it if necessary 
 * @param {String} blockName Block name
 * @param {Object} params Block parameters
 * @returns {BEM}
 */
$.fn.bem = function(blockName, params) {
    return initBlock(blockName, this, params, true);
};

/**
 * @namespace
 * @name BEM.DOM
 */
var DOM = BEM.DOM = BEM.decl('i-bem__dom',/** @lends BEM.DOM.prototype */{
    /**
     * @class Base block for creating BEM blocks that have DOM representation 
     * @constructs
     * @private
     * @param {jQuery} domElem DOM element that the block is created on
     * @param {Object} params Block parameters
     * @param {Boolean} [initImmediately=true]
     */
    __constructor : function(domElem, params, initImmediately) {

        var _this = this;

        /**
         * Block's DOM elements
         * @protected
         * @type jQuery
         */
        _this.domElem = domElem;

        /**
         * Cache for names of events on DOM elements
         * @private
         * @type Object
         */
        _this._eventNameCache = {};

        /**
         * Cache for elements
         * @private
         * @type Object
         */
        _this._elemCache = {};

        /**
         * Unique block ID
         * @private
         * @type String
         */
        uniqIdToBlock[_this._uniqId = params.uniqId || $.identify(_this)] = _this;

        /**
         * Flag for whether it's necessary to unbind from the document and window when destroying the block
         * @private
         * @type Boolean
         */
        _this._needSpecialUnbind = false;

        _this.__base(null, params, initImmediately);

    },

    /**
     * Finds blocks inside the current block or its elements (including context)
     * @protected
     * @param {String|jQuery} [elem] Block element
     * @param {String|Object} block Name or description (block,modName,modVal) of the block to find
     * @returns {BEM[]}
     */
    findBlocksInside : function(elem, block) {

        return this._findBlocks('find', elem, block);

    },

    /**
     * Finds the first block inside the current block or its elements (including context)
     * @protected
     * @param {String|jQuery} [elem] Block element
     * @param {String|Object} block Name or description (block,modName,modVal) of the block to find
     * @returns {BEM}
     */
    findBlockInside : function(elem, block) {

        return this._findBlocks('find', elem, block, true);

    },

    /**
     * Finds blocks outside the current block or its elements (including context)
     * @protected
     * @param {String|jQuery} [elem] Block element
     * @param {String|Object} block Name or description (block,modName,modVal) of the block to find
     * @returns {BEM[]}
     */
    findBlocksOutside : function(elem, block) {

        return this._findBlocks('parents', elem, block);

    },

    /**
     * Finds the first block outside the current block or its elements (including context)
     * @protected
     * @param {String|jQuery} [elem] Block element
     * @param {String|Object} block Name or description (block,modName,modVal) of the block to find
     * @returns {BEM}
     */
    findBlockOutside : function(elem, block) {

        return this._findBlocks('closest', elem, block)[0] || null;

    },

    /**
     * Finds blocks on DOM elements of the current block or its elements
     * @protected
     * @param {String|jQuery} [elem] Block element
     * @param {String|Object} block Name or description (block,modName,modVal) of the block to find
     * @returns {BEM[]}
     */
    findBlocksOn : function(elem, block) {

        return this._findBlocks('', elem, block);

    },

    /**
     * Finds the first block on DOM elements of the current block or its elements
     * @protected
     * @param {String|jQuery} [elem] Block element
     * @param {String|Object} block Name or description (block,modName,modVal) of the block to find
     * @returns {BEM}
     */
    findBlockOn : function(elem, block) {

        return this._findBlocks('', elem, block, true);

    },

    _findBlocks : function(select, elem, block, onlyFirst) {

        if(!block) {
            block = elem;
            elem = undefined;
        }

        var ctxElem = elem?
                (typeof elem == 'string'? this.findElem(elem) : elem) :
                this.domElem,
            isSimpleBlock = typeof block == 'string',
            blockName = isSimpleBlock? block : (block.block || block.blockName),
            selector = '.' +
                (isSimpleBlock?
                    buildClass(blockName) :
                    buildClass(blockName, block.modName, block.modVal)) +
                (onlyFirst? ':first' : ''),
            domElems = ctxElem.filter(selector);

        select && (domElems = domElems.add(ctxElem[select](selector)));

        if(onlyFirst) {
            return domElems[0]? initBlock(blockName, domElems.eq(0), true) : null;
        }

        var res = [],
            uniqIds = {};

        $.each(domElems, function(i, domElem) {
            var block = initBlock(blockName, $(domElem), true);
            if(!uniqIds[block._uniqId]) {
                uniqIds[block._uniqId] = true;
                res.push(block);
            }
        });

        return res;

    },

    /**
     * Adds an event handler for any DOM element
     * @protected
     * @param {jQuery} domElem DOM element where the event will be listened for
     * @param {String|Object} event Event name or event object
     * @param {Function} fn Handler function, which will be executed in the block's context
     * @returns {BEM}
     */
    bindToDomElem : function(domElem, event, fn) {

        var _this = this;

        fn?
            domElem.bind(
                _this._buildEventName(event),
                function(e) {
                    (e.data || (e.data = {})).domElem = $(this);
                    return fn.apply(_this, arguments);
                }
            ) :
            $.each(event, function(event, fn) {
                _this.bindToDomElem(domElem, event, fn);
            });

        return _this;

    },

    /**
     * Adds an event handler to the document
     * @protected
     * @param {String} event Event name
     * @param {Function} fn Handler function, which will be executed in the block's context
     * @returns {BEM}
     */
    bindToDoc : function(event, fn) {

        this._needSpecialUnbind = true;
        return this.bindToDomElem(doc, event, fn);

    },

    /**
     * Adds an event handler to the window
     * @protected
     * @param {String} event Event name
     * @param {Function} fn Handler function, which will be executed in the block's context
     * @returns {BEM}
     */
    bindToWin : function(event, fn) {

        this._needSpecialUnbind = true;
        return this.bindToDomElem(win, event, fn);

    },

    /**
     * Adds an event handler to the block's main DOM elements or its nested elements
     * @protected
     * @param {jQuery|String} [elem] Element
     * @param {String} event Event name
     * @param {Function} fn Handler function, which will be executed in the block's context
     * @returns {BEM}
     */
    bindTo : function(elem, event, fn) {

        if(!event || $.isFunction(event)) { // if there is no element
            fn = event;
            event = elem;
            elem = this.domElem;
        } else if(typeof elem == 'string') {
            elem = this.elem(elem);
        }

        return this.bindToDomElem(elem, event, fn);

    },

    /**
     * Removes event handlers from any DOM element
     * @protected
     * @param {jQuery} domElem DOM element where the event was being listened for
     * @param {String} event Event name
     * @returns {BEM}
     */
    unbindFromDomElem : function(domElem, event) {

        domElem.unbind(this._buildEventName(event));
        return this;

    },

    /**
     * Removes event handler from document
     * @protected
     * @param {String} event Event name
     * @returns {BEM}
     */
    unbindFromDoc : function(event) {

        return this.unbindFromDomElem(doc, event);

    },

    /**
     * Removes event handler from window
     * @protected
     * @param {String} event Event name
     * @returns {BEM}
     */
    unbindFromWin : function(event) {

        return this.unbindFromDomElem(win, event);

    },

    /**
     * Removes event handlers from the block's main DOM elements or its nested elements
     * @protected
     * @param {jQuery|String} [elem] Nested element
     * @param {String} event Event name
     * @returns {BEM}
     */
    unbindFrom : function(elem, event) {

        if(!event) {
            event = elem;
            elem = this.domElem;
        } else if(typeof elem == 'string') {
            elem = this.elem(elem);
        }

        return this.unbindFromDomElem(elem, event);

    },

    /**
     * Builds a full name for an event
     * @private
     * @param {String} event Event name
     * @returns {String}
     */
    _buildEventName : function(event) {

        var _this = this;
        return event.indexOf(' ') > 1?
            event.split(' ').map(function(e) {
                return _this._buildOneEventName(e);
            }).join(' ') :
            _this._buildOneEventName(event);

    },

    /**
     * Builds a full name for a single event
     * @private
     * @param {String} event Event name
     * @returns {String}
     */
    _buildOneEventName : function(event) {

        var _this = this,
            eventNameCache = _this._eventNameCache;

        if(event in eventNameCache) return eventNameCache[event];

        var uniq = '.' + _this._uniqId;

        if(event.indexOf('.') < 0) return eventNameCache[event] = event + uniq;

        var lego = '.bem_' + _this.__self._name;

        return eventNameCache[event] = event.split('.').map(function(e, i) {
            return i == 0? e + lego : lego + '_' + e;
        }).join('') + uniq;

    },

    /**
     * Triggers block event handlers and live event handlers
     * @protected
     * @param {String} e Event name
     * @param {Object} [data] Additional information
     * @returns {BEM}
     */
    trigger : function(e, data) {

        this
            .__base(e = this.buildEvent(e), data)
            .domElem && this._ctxTrigger(e, data);

        return this;

    },

    _ctxTrigger : function(e, data) {

        var _this = this,
            storage = liveEventCtxStorage[_this.__self._buildCtxEventName(e.type)],
            ctxIds = {};

        storage && _this.domElem.each(function() {
            var ctx = this,
                counter = storage.counter;
            while(ctx && counter) {
                var ctxId = $.identify(ctx, true);
                if(ctxId) {
                    if(ctxIds[ctxId]) break;
                    var storageCtx = storage.ctxs[ctxId];
                    if(storageCtx) {
                        $.each(storageCtx, function(uniqId, handler) {
                            handler.fn.call(
                                handler.ctx || _this,
                                e,
                                data);
                        });
                        counter--;
                    }
                    ctxIds[ctxId] = true;
                }
                ctx = ctx.parentNode;
            }
        });

    },

    /**
     * Sets a modifier for a block/nested element
     * @protected
     * @param {jQuery} [elem] Nested element
     * @param {String} modName Modifier name
     * @param {String} modVal Modifier value
     * @returns {BEM}
     */
    setMod : function(elem, modName, modVal) {

        if(elem && typeof modVal != 'undefined' && elem.length > 1) {
            var _this = this;
            elem.each(function() {
                var item = $(this);
                item.__bemElemName = elem.__bemElemName;
                _this.setMod(item, modName, modVal);
            });
            return _this;
        }
        return this.__base(elem, modName, modVal);

    },

    /**
     * Retrieves modifier value from the DOM node's CSS class
     * @private
     * @param {String} modName Modifier name
     * @param {jQuery} [elem] Nested element
     * @param {String} [elemName] Name of the nested element
     * @returns {String} Modifier value
     */
    _extractModVal : function(modName, elem, elemName) {

        var domNode = (elem || this.domElem)[0],
            matches;

        domNode &&
            (matches = domNode.className
                .match(this.__self._buildModValRE(modName, elemName || elem)));

        return matches? matches[2] : '';

    },

    /**
     * Retrieves a name/value list of modifiers
     * @private
     * @param {Array} [modNames] Names of modifiers
     * @param {Object} [elem] Element
     * @returns {Object} Hash of modifier values by names
     */
    _extractMods : function(modNames, elem) {

        var res = {},
            extractAll = !modNames.length,
            countMatched = 0;

        ((elem || this.domElem)[0].className
            .match(this.__self._buildModValRE(
                '(' + (extractAll? NAME_PATTERN : modNames.join('|')) + ')',
                elem,
                'g')) || []).forEach(function(className) {
                    var iModVal = (className = className.trim()).lastIndexOf(MOD_DELIM),
                        iModName = className.substr(0, iModVal - 1).lastIndexOf(MOD_DELIM);
                    res[className.substr(iModName + 1, iModVal - iModName - 1)] = className.substr(iModVal + 1);
                    ++countMatched;
                });

        // empty modifier values are not reflected in classes; they must be filled with empty values
        countMatched < modNames.length && modNames.forEach(function(modName) {
            modName in res || (res[modName] = '');
        });

        return res;

    },

    /**
     * Sets a modifier's CSS class for a block's DOM element or nested element
     * @private
     * @param {String} modName Modifier name
     * @param {String} modVal Modifier value
     * @param {String} oldModVal Old modifier value
     * @param {jQuery} [elem] Element
     * @param {String} [elemName] Element name
     */
    _afterSetMod : function(modName, modVal, oldModVal, elem, elemName) {

        var _self = this.__self,
            classPrefix = _self._buildModClassPrefix(modName, elemName),
            classRE = _self._buildModValRE(modName, elemName),
            needDel = modVal === '';

        (elem || this.domElem).each(function() {
            var className = this.className;
            className.indexOf(classPrefix) > -1?
                this.className = className.replace(
                    classRE,
                    (needDel? '' : '$1' + classPrefix + modVal) + '$3') :
                needDel || $(this).addClass(classPrefix + modVal);
        });

        elemName && this
            .dropElemCache(elemName, modName, oldModVal)
            .dropElemCache(elemName, modName, modVal);

    },

    /**
     * Finds elements nested in a block
     * @protected
     * @param {String|jQuery} [ctx=this.domElem] Element where search is being performed
     * @param {String} names Nested element name (or names separated by spaces)
     * @param {String} [modName] Modifier name
     * @param {String} [modVal] Modifier value
     * @returns {jQuery} DOM elements
     */
    findElem : function(ctx, names, modName, modVal) {

        if(arguments.length % 2) { // if the number of arguments is one or three
            modVal = modName;
            modName = names;
            names = ctx;
            ctx = this.domElem;
        } else if(typeof ctx == 'string') {
            ctx = this.findElem(ctx);
        }

        var _self = this.__self,
            selector = '.' +
                names.split(' ').map(function(name) {
                    return buildClass(_self._name, name, modName, modVal);
                }).join(',.');
        return findDomElem(ctx, selector);

    },

    /**
     * Finds elements nested in a block
     * @protected
     * @param {String} name Nested element name
     * @param {String} [modName] Modifier name
     * @param {String} [modVal] Modifier value
     * @returns {jQuery} DOM elements
     */
    _elem : function(name, modName, modVal) {

        var key = name + buildModPostfix(modName, modVal),
            res;

        if(!(res = this._elemCache[key])) {
            res = this._elemCache[key] = this.findElem(name, modName, modVal);
            res.__bemElemName = name;
        }

        return res;

    },

    /**
     * Lazy search for elements nested in a block (caches results)
     * @protected
     * @param {String} names Nested element name (or names separated by spaces)
     * @param {String} [modName] Modifier name
     * @param {String} [modVal] Modifier value
     * @returns {jQuery} DOM elements
     */
    elem : function(names, modName, modVal) {

        if(modName && typeof modName != 'string') {
            modName.__bemElemName = names;
            return modName;
        }

        if(names.indexOf(' ') < 0) {
            return this._elem(names, modName, modVal);
        }

        var res = $([]),
            _this = this;
        names.split(' ').forEach(function(name) {
            res = res.add(_this._elem(name, modName, modVal));
        });
        return res;

    },

    /**
     * Clearing the cache for elements
     * @protected
     * @param {String} names Nested element name (or names separated by spaces)
     * @param {String} [modName] Modifier name
     * @param {String} [modVal] Modifier value
     * @returns {BEM}
     */
    dropElemCache : function(names, modName, modVal) {

        if(names) {
            var _this = this,
                modPostfix = buildModPostfix(modName, modVal);
            names.indexOf(' ') < 0?
                delete _this._elemCache[names + modPostfix] :
                names.split(' ').forEach(function(name) {
                    delete _this._elemCache[name + modPostfix];
                });
        } else {
            this._elemCache = {};
        }

        return this;

    },

    /**
     * Retrieves parameters of a block element
     * @param {String|jQuery} elem Element
     * @returns {Object} Parameters
     */
    elemParams : function(elem) {

        var elemName;
        if(typeof elem ==  'string') {
            elemName = elem;
            elem = this.elem(elem);
        } else {
            elemName = this.__self._extractElemNameFrom(elem);
        }

        return extractParams(elem[0])[buildClass(this.__self.getName(), elemName)] || {};

    },

    /**
     * Checks whether a DOM element is in a block
     * @protected
     * @param {jQuery} domElem DOM element
     * @returns {Boolean}
     */
    containsDomElem : function(domElem) {

        var res = false;

        this.domElem.each(function() {
            return !(res = domElem.parents().andSelf().index(this) > -1);
        });

        return res;

    },

    /**
     * Builds a CSS selector corresponding to a block/element and modifier
     * @param {String} [elem] Element name
     * @param {String} [modName] Modifier name
     * @param {String} [modVal] Modifier value
     * @returns {String}
     */
    buildSelector : function(elem, modName, modVal) {

        return this.__self.buildSelector(elem, modName, modVal);

    },

    /**
     * Deletes a block
     * @param {Boolean} [keepDOM=false] Whether to keep the block's DOM nodes in the document
     */
    destruct : function(keepDOM) {

        var _this = this,
            _self = _this.__self;

        _this._isDestructing = true;

        _this._needSpecialUnbind && _self.doc.add(_self.win).unbind('.' + _this._uniqId);

        _this.dropElemCache().domElem.each(function(i, domNode) {
            var params = getParams(domNode);
            $.each(params, function(blockName, blockParams) {
                var block = uniqIdToBlock[blockParams.uniqId];
                if(block) {
                    if(!block._isDestructing) {
                        removeDomNodeFromBlock(block, domNode);
                        delete params[blockName];
                    }
                }
                else {
                    delete uniqIdToDomElems[blockParams.uniqId];
                }
            });
            $.isEmptyObject(params) && cleanupDomNode(domNode);
        });

        keepDOM || _this.domElem.remove();

        delete uniqIdToBlock[_this.un()._uniqId];
        delete _this.domElem;
        delete _this._elemCache;

        _this.__base();

    }

}, /** @lends BEM.DOM */{

    /**
     * Document shortcut
     * @protected
     * @type jQuery
     */
    doc : doc,

    /**
     * Window shortcut
     * @protected
     * @type jQuery
     */
    win : win,

    /**
     * Processes a block's live properties
     * @private
     * @param {Boolean} [heedLive=false] Whether to take into account that the block already processed its live properties
     * @returns {Boolean} Whether the block is a live block
     */
    _processLive : function(heedLive) {

        var _this = this,
            res = _this._liveInitable;

        if('live' in _this) {
            var noLive = typeof res == 'undefined';

            if(noLive ^ heedLive) {
                if($.isFunction(_this.live)) {
                    res = _this.live() !== false;
                    _this.live = function() {};
                } else {
                    res = _this.live;
                }
            }
        }

        return res;

    },

    /**
     * Initializes blocks on a fragment of the DOM tree
     * @static
     * @protected
     * @param {jQuery} [ctx=document] Root DOM node
     * @returns {jQuery} ctx Initialization context
     */
    init : function(ctx, callback, callbackCtx) {

        if(!ctx || $.isFunction(ctx)) {
            callbackCtx = callback;
            callback = ctx;
            ctx = doc;
        }

        var uniqInitId = $.identify();
        findDomElem(ctx, '.i-bem').each(function() {
            init($(this), uniqInitId);
        });

        callback && this.afterCurrentEvent(
            function() {
                callback.call(callbackCtx || this, ctx);
            });

        // makes initialization completely synchronous
        this._runAfterCurrentEventFns();

        return ctx;

    },

    /**
     * Destroys blocks on a fragment of the DOM tree
     * @static
     * @protected
     * @param {Boolean} [keepDOM=false] Whether to keep DOM nodes in the document
     * @param {jQuery} ctx Root DOM node
     * @param {Boolean} [excludeSelf=false] Exclude the context
     */
    destruct : function(keepDOM, ctx, excludeSelf) {

        if(typeof keepDOM != 'boolean') {
            excludeSelf = ctx;
            ctx = keepDOM;
            keepDOM = undefined;
        }

        findDomElem(ctx, '.i-bem', excludeSelf).each(function(i, domNode) {
            var params = getParams(this);
            $.each(params, function(blockName, blockParams) {
                if(blockParams.uniqId) {
                    var block = uniqIdToBlock[blockParams.uniqId];
                    if(block) {
                        removeDomNodeFromBlock(block, domNode);
                        delete params[blockName];
                    }
                    else {
                        delete uniqIdToDomElems[blockParams.uniqId];
                    }
                }
            });
            $.isEmptyObject(params) && cleanupDomNode(this);
        });
        keepDOM || (excludeSelf? ctx.empty() : ctx.remove());

    },

    /**
     * Replaces a fragment of the DOM tree inside the context, destroying old blocks and intializing new ones
     * @static
     * @protected
     * @param {jQuery} ctx Root DOM node
     * @param {jQuery|String} content New content
     * @param {Function} [callback] Handler to be called after initialization
     * @param {Object} [callbackCtx] Handler's context
     */
    update : function(ctx, content, callback, callbackCtx) {

        this.destruct(ctx, true);
        this.init(ctx.html(content), callback, callbackCtx);

    },

    /**
     * Changes a fragment of the DOM tree including the context and initializes blocks.
     * @param {jQuery} ctx Root DOM node
     * @param {jQuery|String} content Content to be added
     */
    replace : function(ctx, content) {

        this.destruct(true, ctx);
        this.init($(content).replaceAll(ctx));

    },

    /**
     * Adds a fragment of the DOM tree at the end of the context and initializes blocks
     * @param {jQuery} ctx Root DOM node
     * @param {jQuery|String} content Content to be added
     */
    append : function(ctx, content) {

        this.init($(content).appendTo(ctx));

    },

    /**
     * Adds a fragment of the DOM tree at the beginning of the context and initializes blocks
     * @param {jQuery} ctx Root DOM node
     * @param {jQuery|String} content Content to be added
     */
    prepend : function(ctx, content) {

        this.init($(content).prependTo(ctx));

    },

    /**
     * Adds a fragment of the DOM tree before the context and initializes blocks
     * @param {jQuery} ctx Contextual DOM node
     * @param {jQuery|String} content Content to be added
     */
    before : function(ctx, content) {

        this.init($(content).insertBefore(ctx));

    },

    /**
     * Adds a fragment of the DOM tree after the context and initializes blocks
     * @param {jQuery} ctx Contextual DOM node
     * @param {jQuery|String} content Content to be added
     */
    after : function(ctx, content) {

        this.init($(content).insertAfter(ctx));

    },

    /**
     * Builds a full name for a live event
     * @static
     * @private
     * @param {String} e Event name
     * @returns {String}
     */
    _buildCtxEventName : function(e) {

        return this._name + ':' + e;

    },

    _liveClassBind : function(className, e, callback, invokeOnInit) {

        var _this = this;
        if(e.indexOf(' ') > -1) {
            e.split(' ').forEach(function(e) {
                _this._liveClassBind(className, e, callback, invokeOnInit);
            });
        }
        else {
            var storage = liveClassEventStorage[e],
                uniqId = $.identify(callback);

            if(!storage) {
                storage = liveClassEventStorage[e] = {};
                doc.bind(e, _this.changeThis(_this._liveClassTrigger, _this));
            }

            storage = storage[className] || (storage[className] = { uniqIds : {}, fns : [] });

            if(!(uniqId in storage.uniqIds)) {
                storage.fns.push({ uniqId : uniqId, fn : _this._buildLiveEventFn(callback, invokeOnInit) });
                storage.uniqIds[uniqId] = storage.fns.length - 1;
            }
        }

        return this;

    },

    _liveClassUnbind : function(className, e, callback) {

        var storage = liveClassEventStorage[e];
        if(storage) {
            if(callback) {
                if(storage = storage[className]) {
                    var uniqId = $.identify(callback);
                    if(uniqId in storage.uniqIds) {
                        var i = storage.uniqIds[uniqId],
                            len = storage.fns.length - 1;
                        storage.fns.splice(i, 1);
                        while(i < len) storage.uniqIds[storage.fns[i++].uniqId] = i - 1;
                        delete storage.uniqIds[uniqId];
                    }
                }
            } else {
                delete storage[className];
            }
        }

        return this;

    },

    _liveClassTrigger : function(e) {

        var storage = liveClassEventStorage[e.type];
        if(storage) {
            var node = e.target, classNames = [];
            for(var className in storage) storage.hasOwnProperty(className) && classNames.push(className);
            do {
                var nodeClassName = ' ' + node.className + ' ', i = 0;
                while(className = classNames[i++]) {
                    if(nodeClassName.indexOf(' ' + className + ' ') > -1) {
                        var j = 0, fns = storage[className].fns, fn;
                        while(fn = fns[j++]) fn.fn.call($(node), e);
                        if(e.isPropagationStopped()) return;
                        classNames.splice(--i, 1);
                    }
                }
            } while(classNames.length && (node = node.parentNode));
        }

    },

    _buildLiveEventFn : function(callback, invokeOnInit) {

        var _this = this;
        return function(e) {
            var args = [
                    _this._name,
                    ((e.data || (e.data = {})).domElem = $(this)).closest(_this.buildSelector()),
                    true ],
                block = initBlock.apply(null, invokeOnInit? args.concat([callback, e]) : args);
            block && (invokeOnInit || (callback && callback.apply(block, arguments)));
        };

    },

    /**
     * Helper for live initialization for an event on DOM elements of a block or its elements
     * @static
     * @protected
     * @param {String} [elemName] Element name or names (separated by spaces)
     * @param {String} event Event name
     * @param {Function} [callback] Handler to call after successful initialization
     */
    liveInitOnEvent : function(elemName, event, callback) {

        return this.liveBindTo(elemName, event, callback, true);

    },

    /**
     * Helper for subscribing to live events on DOM elements of a block or its elements
     * @static
     * @protected
     * @param {String|Object} [to] Description (object with modName, modVal, elem) or name of the element or elements (space-separated)
     * @param {String} event Event name
     * @param {Function} [callback] Handler
     */
    liveBindTo : function(to, event, callback, invokeOnInit) {

        if(!event || $.isFunction(event)) {
            callback = event;
            event = to;
            to = undefined;
        }

        if(!to || typeof to == 'string') {
            to = { elem : to };
        }

        to.elemName && (to.elem = to.elemName);

        var _this = this;

        if(to.elem && to.elem.indexOf(' ') > 1) {
            to.elem.split(' ').forEach(function(elem) {
                _this._liveClassBind(
                    buildClass(_this._name, elem, to.modName, to.modVal),
                    event,
                    callback,
                    invokeOnInit);
            });
            return _this;
        }

        return _this._liveClassBind(
            buildClass(_this._name, to.elem, to.modName, to.modVal),
            event,
            callback,
            invokeOnInit);

    },

    /**
     * Helper for unsubscribing from live events on DOM elements of a block or its elements
     * @static
     * @protected
     * @param {String} [elem] Name of the element or elements (space-separated)
     * @param {String} event Event name
     * @param {Function} [callback] Handler
     */
    liveUnbindFrom : function(elem, event, callback) {

        var _this = this;

        if(elem.indexOf(' ') > 1) {
            elem.split(' ').forEach(function(elem) {
                _this._liveClassUnbind(
                    buildClass(_this._name, elem),
                    event,
                    callback);
            });
            return _this;
        }

        return _this._liveClassUnbind(
            buildClass(_this._name, elem),
            event,
            callback);

    },

    /**
     * Helper for live initialization when a different block is initialized
     * @static
     * @private
     * @param {String} event Event name
     * @param {String} blockName Name of the block that should trigger a reaction when initialized
     * @param {Function} callback Handler to be called after successful initialization in the new block's context
     * @param {String} findFnName Name of the method for searching
     */
    _liveInitOnBlockEvent : function(event, blockName, callback, findFnName) {

        var name = this._name;
        blocks[blockName].on(event, function(e) {
            var args = arguments,
                blocks = e.block[findFnName](name);

            callback && blocks.forEach(function(block) {
                callback.apply(block, args);
            });
        });
        return this;

    },

    /**
     * Helper for live initialization for a different block's event on the current block's DOM element
     * @static
     * @protected
     * @param {String} event Event name
     * @param {String} blockName Name of the block that should trigger a reaction when initialized
     * @param {Function} callback Handler to be called after successful initialization in the new block's context
     */
    liveInitOnBlockEvent : function(event, blockName, callback) {

        return this._liveInitOnBlockEvent(event, blockName, callback, 'findBlocksOn');

    },

    /**
     * Helper for live initialization for a different block's event inside the current block
     * @static
     * @protected
     * @param {String} event Event name
     * @param {String} blockName Name of the block that should trigger a reaction when initialized
     * @param {Function} [callback] Handler to be called after successful initialization in the new block's context
     */
    liveInitOnBlockInsideEvent : function(event, blockName, callback) {

        return this._liveInitOnBlockEvent(event, blockName, callback, 'findBlocksOutside');

    },

    /**
     * Helper for live initialization when a different block is initialized on a DOM element of the current block
     * @deprecated - use liveInitOnBlockEvent
     * @static
     * @protected
     * @param {String} blockName Name of the block that should trigger a reaction when initialized
     * @param {Function} callback Handler to be called after successful initialization in the new block's context
     */
    liveInitOnBlockInit : function(blockName, callback) {

        return this.liveInitOnBlockEvent('init', blockName, callback);

    },

    /**
     * Helper for live initialization when a different block is initialized inside the current block
     * @deprecated - use liveInitOnBlockInsideEvent
     * @static
     * @protected
     * @param {String} blockName Name of the block that should trigger a reaction when initialized
     * @param {Function} [callback] Handler to be called after successful initialization in the new block's context
     */
    liveInitOnBlockInsideInit : function(blockName, callback) {

        return this.liveInitOnBlockInsideEvent('init', blockName, callback);

    },

    /**
     * Adds a live event handler to a block, based on a specified element where the event will be listened for
     * @static
     * @protected
     * @param {jQuery} [ctx] The element in which the event will be listened for
     * @param {String} e Event name
     * @param {Object} [data] Additional information that the handler gets as e.data
     * @param {Function} fn Handler
     * @param {Object} [fnCtx] Handler's context
     */
    on : function(ctx, e, data, fn, fnCtx) {

        return ctx.jquery?
            this._liveCtxBind(ctx, e, data, fn, fnCtx) :
            this.__base(ctx, e, data, fn);

    },

    /**
     * Removes the live event handler from a block, based on a specified element where the event was being listened for 
     * @static
     * @protected
     * @param {jQuery} [ctx] The element in which the event was being listened for
     * @param {String} e Event name
     * @param {Function} [fn] Handler
     * @param {Object} [fnCtx] Handler context
     */
    un : function(ctx, e, fn, fnCtx) {

        return ctx.jquery?
            this._liveCtxUnbind(ctx, e, fn, fnCtx) :
            this.__base(ctx, e, fn);

    },

    /**
     * Adds a live event handler to a block, based on a specified element where the event will be listened for
     * @deprecated Use on
     * @static
     * @protected
     * @param {jQuery} ctx The element in which the event will be listened for
     * @param {String} e Event name
     * @param {Object} [data] Additional information that the handler gets as e.data
     * @param {Function} fn Handler
     * @param {Object} [fnCtx] Handler context
     */
    liveCtxBind : function(ctx, e, data, fn, fnCtx) {

        return this._liveCtxBind(ctx, e, data, fn, fnCtx);

    },

    /**
     * Adds a live event handler to a block, based on a specified element where the event will be listened for
     * @static
     * @private
     * @param {jQuery} ctx The element in which the event will be listened for
     * @param {String} e  Event name
     * @param {Object} [data] Additional information that the handler gets as e.data
     * @param {Function} fn Handler
     * @param {Object} [fnCtx] Handler context
     */
    _liveCtxBind : function(ctx, e, data, fn, fnCtx) {

        var _this = this;

        if(typeof e == 'string') {
            if($.isFunction(data)) {
                fnCtx = fn;
                fn = data;
                data = undefined;
            }

            if(e.indexOf(' ') > -1) {
                e.split(' ').forEach(function(e) {
                    _this._liveCtxBind(ctx, e, data, fn, fnCtx);
                });
            } else {
                var ctxE = _this._buildCtxEventName(e),
                    storage = liveEventCtxStorage[ctxE] ||
                        (liveEventCtxStorage[ctxE] = { counter : 0, ctxs : {} });

                ctx.each(function() {
                    var ctxId = $.identify(this),
                        ctxStorage = storage.ctxs[ctxId];
                    if(!ctxStorage) {
                        ctxStorage = storage.ctxs[ctxId] = {};
                        ++storage.counter;
                    }
                    ctxStorage[$.identify(fn) + (fnCtx? $.identify(fnCtx) : '')] = {
                        fn   : fn,
                        data : data,
                        ctx  : fnCtx
                    };
                });
            }
        } else {
            $.each(e, function(e, fn) {
                _this._liveCtxBind(ctx, e, fn, data);
            });
        }

        return _this;

    },

    /**
     * Removes a live event handler from a block, based on a specified element where the event was being listened for
     * @deprecated Use on
     * @static
     * @protected
     * @param {jQuery} ctx The element in which the event was being listened for
     * @param {String} e Event name
     * @param {Function} [fn] Handler
     * @param {Object} [fnCtx] Handler context
     */
    liveCtxUnbind : function(ctx, e, fn, fnCtx) {

        return this._liveCtxUnbind(ctx, e, fn, fnCtx);

    },

    /**
     * Removes a live event handler from a block, based on a specified element where the event was being listened for
     * @static
     * @private
     * @param {jQuery} ctx The element in which the event was being listened for
     * @param {String} e Event name
     * @param {Function} [fn] Handler
     * @param {Object} [fnCtx] Handler context
     */
    _liveCtxUnbind : function(ctx, e, fn, fnCtx) {

        var _this = this,
            storage = liveEventCtxStorage[e =_this._buildCtxEventName(e)];

        if(storage) {
            ctx.each(function() {
                var ctxId = $.identify(this, true),
                    ctxStorage;
                if(ctxId && (ctxStorage = storage.ctxs[ctxId])) {
                    fn && delete ctxStorage[$.identify(fn) + (fnCtx? $.identify(fnCtx) : '')];
                    if(!fn || $.isEmptyObject(ctxStorage)) {
                        storage.counter--;
                        delete storage.ctxs[ctxId];
                    }
                }
            });
            storage.counter || delete liveEventCtxStorage[e];
        }

        return _this;

    },

    /**
     * Retrieves the name of an element nested in a block
     * @static
     * @private
     * @param {jQuery} elem Nested element
     * @returns {String|undefined}
     */
    _extractElemNameFrom : function(elem) {

        if(elem.__bemElemName) return elem.__bemElemName;

        var matches = elem[0].className.match(this._buildElemNameRE());
        return matches? matches[1] : undefined;

    },

    /**
     * Retrieves block parameters from a DOM element
     * @static
     * @param {HTMLElement} domNode DOM node
     * @returns {Object}
     */
    extractParams : extractParams,

    /**
     * Builds a prefix for the CSS class of a DOM element or nested element of the block, based on modifier name
     * @static
     * @private
     * @param {String} modName Modifier name
     * @param {jQuery|String} [elem] Element
     * @returns {String}
     */
    _buildModClassPrefix : function(modName, elem) {

        return buildClass(this._name) +
               (elem?
                   ELEM_DELIM + (typeof elem === 'string'? elem : this._extractElemNameFrom(elem)) :
                   '') +
               MOD_DELIM + modName + MOD_DELIM;

    },

    /**
     * Builds a regular expression for extracting modifier values from a DOM element or nested element of a block
     * @static
     * @private
     * @param {String} modName Modifier name
     * @param {jQuery|String} [elem] Element
     * @param {String} [quantifiers] Regular expression quantifiers
     * @returns {RegExp}
     */
    _buildModValRE : function(modName, elem, quantifiers) {

        return new RegExp('(\\s?)' + this._buildModClassPrefix(modName, elem) + '(' + NAME_PATTERN + ')(\\s|$)', quantifiers);

    },

    /**
     * Builds a regular expression for extracting names of elements nested in a block
     * @static
     * @private
     * @returns {RegExp}
     */
    _buildElemNameRE : function() {

        return new RegExp(this._name + ELEM_DELIM + '(' + NAME_PATTERN + ')(?:\\s|$)');

    },

    /**
     * Builds a CSS selector corresponding to the block/element and modifier
     * @param {String} [elem] Element name
     * @param {String} [modName] Modifier name
     * @param {String} [modVal] Modifier value
     * @returns {String}
     */
    buildSelector : function(elem, modName, modVal) {

        return '.' + buildClass(this._name, elem, modName, modVal);

    },

    /**
     * Returns a block instance by unique ID
     * @deprecated
     * @param {String} [uniqId]
     * @returns {BEM.DOM}
     */
    getBlockByUniqId : function(uniqId) {

        return uniqIdToBlock[uniqId];

    },

    /**
     * Returns the size of the current window
     * @returns {Object} Object with width and height fields
     */
    getWindowSize : function() {

        return {
            width  : win.width(),
            height : win.height()
        };

    }

});

})(BEM, jQuery);

/* ../../../../blocks-common/i-bem/__dom/i-bem__dom.js: end */ /**/

/* ../../../../blocks-common/i-ecma/__string/i-ecma__string.js: begin */ /**/
(function() {

String.prototype.trim || (String.prototype.trim = function () {

    var str = this.replace(/^\s\s*/, ''),
        ws = /\s/,
        i = str.length;

    while(ws.test(str.charAt(--i)));

    return str.slice(0, i + 1);

});

})();
/* ../../../../blocks-common/i-ecma/__string/i-ecma__string.js: end */ /**/

/* ../../../../blocks-common/i-bem/__dom/_init/i-bem__dom_init_auto.js: begin */ /**/
/* дефолтная инициализация */
$(function() {
    BEM.DOM.init();
});
/* ../../../../blocks-common/i-bem/__dom/_init/i-bem__dom_init_auto.js: end */ /**/

/* ../../../../blocks-desktop/i-bem/examples/030-i-bem_map.blocks/b-map/_api/b-map_api_dynamic.js: begin */ /**/
BEM.DOM.decl({ name: 'b-map', modName: 'api', modVal: 'dynamic' }, {

    onSetMod: {

        'js' : function() {
            this.hasMod('static') || this.loadMapsApi();
        }

    },

    // загружаемые пакеты
    mapsPakages: [
        // step one
        [
            'templateLayoutFactory',
            'hotspot.Layer',
            'hotspot.ObjectSource',
            'geometry.pixel.LineString',
            'package.geoObjects'
        ],
        // step two
        [
            'package.map'
        ]
    ],

    // загрузчик API
    loadMapsApi: function() {
        var _this = this;

        if (!window.ymaps) {
            var apiScript = document.createElement('script'),
                apiCallback = 'ymapsloaded';

            window[apiCallback] = function() {
                _this.onAPILoaded();
            }

            apiScript.src = ['http://api-maps.yandex.ru/2.0/?',
                'ns=ymaps',
                '&coordorder=longlat',
                '&load=' + this.mapsPakages[0].join(','),
                '&lang=' + this.params.lang,
                '&mode=release',
                '&onload=' + apiCallback].join('');

            document.getElementsByTagName('head')[0].appendChild(apiScript);
        } else {
            this.onAPILoaded();
        }
    },

    // после загрузки API
    onAPILoaded: function() {
        ymaps.load(this.mapsPakages[1].join(','), function() {
            this.initMap();
        }, this);
    },

    // инициализация карты
    initMap: function() {
        var _this = this,
            domElem = this.domElem,
            center = this.params.center || [55.76, 37.64],
            spn = this.params.spn,
            bounds = spn && [
                [ center[0] - spn[0] / 2, center[1] - spn[1] / 2 ],
                [ center[0] + spn[0] / 2, center[1] + spn[1] / 2 ]
            ],
            zoom = this.params.zoom || (spn && ymaps.util.bounds.getCenterAndZoom(bounds, [ domElem.width(), domElem.height() ]).zoom) || 10;

        this.ymap = new ymaps.Map(this.elem('map')[0], {
            type: this.params.type,
            center: center,
            zoom: zoom,
            behaviors:  ['drag', 'dblClickZoom', 'multiTouch']
        });

        this.ymap.zoomRange.get().then(function(range) {
            if (zoom > range[1]) {
                _this.ymap.setZoom(range[1], {
                    callback: function() { _this.showMap(); }
                });
            } else {
                _this.showMap();
            }
        });

        this._extendsYmaps(ymaps);

        this.attachEvents();

        if (this.params.userPos)
            this.showYa(this.params.userPos);

        this.trigger('map-inited');
    },

    // скрываем статическую карту, показываем динамику
    showMap: function() {
        this.elem('map').css('visibility', 'visible');
    },

    // слушаемые события
    attachEvents: function() {
        this.ymap.events
            .add('click', function() {
                var _this = this;

                this.trigger('user-action', { type: 'click' });
            }, this)
            .add('dblclick', function() {
                if (this.firstClickTimer) {
                    clearTimeout(this.firstClickTimer);
                    this.firstClickNeedSend = 0;
                }

                this.trigger('user-action', { type: 'dblclick' });
            }, this)
            .add('mousedown', function() {
                this.trigger('user-action', { type: 'mousedown' });
            }, this)
            .add('wheel', function() {
                this.trigger('user-action', { type: 'wheel' });
            }, this)
            .add('balloonopen', function() {
                this.trigger('user-action', { type: 'balloonopen' });
            }, this)
            .add('boundschange', this._onBoundsChangeCounter, this);

        this.on('user-action', this._onUserAction, this);
    },

    // расширение для api-карт, чтобы отображать линии с помощью полигона
    _extendsYmaps: function(ymaps) {
        !ymaps.overlay && (ymaps.overlay = {});
        ymaps.overlay.MultiLine = (function () {

            /**
             * @implements ymaps.IOverlay
             */
            function Overlay(geometry, data, options) {
                this._geometry = geometry;
                this._data = data;
                this.options = new ymaps.option.Manager(options);
                this.events = new ymaps.event.Manager({
                    context: this
                });
            }

            Overlay.prototype = {

                setMap: function (map) {
                    this._map = map;

                    if (map) {
                        this._onAddToMap(map);
                    } else {
                        this._onRemoveFromMap();
                    }
                },

                getMap: function () {
                    return this._map;
                },

                _onAddToMap: function (map) {
                    if (!this._graphicsOverlay) {
                        this._graphicsOverlay = ymaps.geoObject.overlayFactory.interactiveGraphics.createOverlay(this._getLineGeometry(), this._data);
                    }
                    this._graphicsOverlay.events.setParent(this.events);
                    this._graphicsOverlay.options.setParent(this.options);
                    this._graphicsOverlay.setMap(map);
                },

                _onRemoveFromMap: function () {
                    if (this._graphicsOverlay) {
                        this._graphicsOverlay.setMap(null);
                        this._graphicsOverlay = null;
                    }
                },

                setGeometry: function (geometry) {
                    this._geometry = geometry;
                    if (this._map) {
                        this._graphicsOverlay.setGeometry(this._getLineGeometry());
                    }
                },

                getGeometry: function () {
                    return this._geometry;
                },

                getData: function () {
                    return this._data;
                },

                _getLineGeometry: function () {
                    var coords = this.getGeometry().getCoordinates();

                    return new ymaps.geometry.pixel.LineString(
                        coords.reduce(function (result, coord) {
                            return result.concat(coord.splice(0, coord.length - 1), 0);
                        }, [])
                    );
                }

            };

            return Overlay;

        }());
    },

    _onUserAction: function(e, data) {
        data && data.type != 'mousedown' && (this.firstClickNeedSend = 0)
        this.isUserAction = (!data || !data.controls);
        this.elem('goto-map').show();
    },

    _mapButtonUpdate: function(e, data) {
        var bounds = data.bounds,
            pointId = data.selectedPoint && data.selectedPoint.params.id;

        this.elem('goto-map').attr(
            'href',
            this.params.mapUrl.replace(/\&?(source)=[^&$]*/gi, '') +
                ( (this.hasMod('geo-objects-yes') || pointId) ? '&where=' : '' ) +
                '&ll=' + data.center.join() +
                '&spn=' + [ bounds[1][0] - bounds[0][0], bounds[1][1] - bounds[0][1] ].join() +
                '&z=' + data.zoom +
                ((pointId)
                    ? ('&ol=biz'+ '&oid=' + pointId)
                    : ''
                )
        );
    },

    _onBoundsChangeCounter: function(e) {
    },

    // определить положение по geo api
    _geoLocation: function() {
        var _this = this;

        BEM.blocks['i-geolocation'].get({}, function(data) {
            if (data.error) {
                spin.delMod('progress');
                icon.show();
            } else {
                var yaPointData = {
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude
                };

                this._ajax = BEM.create('i-request_type_ajax', {
                    url: '//www.yandex.ru/gpsave',
                    dataType: 'jsonp',
                    callbackCtx: _this
                });

                this._ajax.get({
                        lon: data.coords.longitude,
                        lat: data.coords.latitude,
                        precision: data.coords.accuracy,
                        persistent: 1,
                        device: 1,
                        format: 'JSONP',
                        lang: 'ru',
                        yu: Lego.params.yandexuid
                    },
                    function(data) {
                        yaPointData.address = data.address;

                        this.showYa(yaPointData, function() {
                            this.findBlockInside('controls', 'b-spin').delMod('progress');
                            this.findElem('control-icon', 'type', 'userlocation').show();

                            this.getGeoData(null, null, function() {
                                this.fitAll();
                            });
                        });
                    }
                );
            }
        });
    },

    // выставить метку Я
    showYa: function(coords, callback) {
        if (this.yaPoint)
            this.ymap.geoObjects.remove(this.yaPoint);

        this.yaPoint = new ymaps.Placemark([ coords.longitude, coords.latitude ], {
            iconContent: 'ya',
            iconType: 'ya',

            hintContent: 'Ваше местоположение', // TODO: I18N!

            balloonContentBody: coords.address,
            balloonContentHeader: 'Ваше местоположение',
            isIconHovered: 'no'
        }, {
            iconLayout: ymaps.templateLayoutFactory.createClass(
                '<div class="i-geo-point i-geo-point_type_ya i-geo-point_hovered_$[properties.isIconHovered]"> </div>'
            ),
            zIndex: 1,
            openBalloonOnClick: true,
            balloonAutoPan: true,
            balloonMaxWidth: 320,
            balloonMaxHeight: 250
        });

        this.ymap.geoObjects.add(this.yaPoint);

        callback && callback.call(this);
    },

    // длительность анимации
    animDuration: 400,

    getCenter: function() {
        return this.ymap.getCenter();
    },

    getZoom: function() {
        return this.ymap.getZoom();
    },

    getGlobalPixelCenter: function() {
        return this.ymap.getGlobalPixelCenter();
    },

    getBounds: function() {
        return this.ymap.getBounds();
    },

    toGlobalPixels: function(coords, zoom) {
        return ymaps.projection.wgs84Mercator.toGlobalPixels([ parseFloat(coords[0]), parseFloat(coords[1]) ], zoom || this.ymap.getZoom())
    },

    fromGlobalPixels: function(coords, zoom) {
        return ymaps.projection.wgs84Mercator.fromGlobalPixels([ parseFloat(coords[0]), parseFloat(coords[1]) ], zoom || this.ymap.getZoom());
    },

    setCenter: function(center, zoom) {
        zoom = zoom || this.getZoom();
        this.setGlobalPixelCenter(this.toGlobalPixels(center, zoom), zoom);
    },

    setGlobalPixelCenter: function(center, zoom) {
        this.ymap.setGlobalPixelCenter(
            center,
            zoom || this.getZoom(),
            {
                //checkZoomRange: true,
                duration: this.animDuration
            }
        );
    },

    changeZoom: function(dz) {
        this.zoomChain = this.zoomChain || [];
        this.zoomChain.push(dz);

        if (this.zoomChain.length === 1)
            this._changeZoom();
    },

    _changeZoom: function(dz) {
        var zoomRange = this.ymap.zoomRange.getCurrent(),
            onActionEnd = function() {
                var dz = this.zoomChain.shift();

                this.ymap.action.events.remove('end', onActionEnd, this);

                dz && this._changeZoom(this.getZoom() + dz);
            };


        if (this.ymap.action.getCurrentState().isTicking) {
            this.ymap.action.events.add('end', onActionEnd, this);
        } else {
            var zoom = this.getZoom() + this.zoomChain.shift();

            // выставляем зум, если можно
            if (zoom >= zoomRange[0] && zoom <= zoomRange[1]) {
                this.setGlobalPixelCenter(this.toGlobalPixels(this.getCenter(), zoom), zoom);
                this.ymap.action.events.add('end', onActionEnd, this);
            } else {
                this.zoomChain.shift();
                this.zoomChain.length && this._changeZoom();
            }
        }
    },

    // передвинуть карту на точку
    moveTo: function(center, zoom) {
        this.setGlobalPixelCenter(this.toGlobalPixels(center, zoom), zoom);
    },

    destruct: function() {
        delete ymaps;
        this.ymap.destroy();
        delete this.ymap;
    }
}, {

});

/* ../../../../blocks-desktop/i-bem/examples/030-i-bem_map.blocks/b-map/_api/b-map_api_dynamic.js: end */ /**/

/* ../../../../blocks-desktop/i-bem/examples/030-i-bem_map.blocks/i-geo-point/i-geo-point.js: begin */ /**/
BEM.decl({ name: 'i-geo-point' }, {
    onSetMod: {
        js: function() {
            var point = this.params;

            this.mapPoint = new ymaps.Placemark([ point.location.longitude, point.location.latitude ], {
                iconContent: point.iconContent,
                iconType: point.type,
                iconWithContent: (point.type !== 'single' && point.type !== 'adv'),
                iconUrl: point.url,

                hintContent: point.hint,

                balloonContent: point.balloonContent,
                isIconHovered: 'no'
            }, {
                iconLayout: ymaps.templateLayoutFactory.createClass(
                    '<div href="$[properties.iconUrl]" class="i-geo-point [if properties.iconType]i-geo-point_type_$[properties.iconType][endif] i-geo-point_hovered_$[properties.isIconHovered]" target="_blank">' +
                        '[if properties.iconWithContent]<span class="i-geo-point__cont">$[properties.iconContent]</span>[endif]' +
                    '</div>'
                ),
                zIndex: 1,
                openBalloonOnClick: false,
                balloonAutoPan: false,
                balloonMaxWidth: 320,
                balloonMaxHeight: 250,
                balloonScrollX: false
            });

            // не вешаем события mouseenter и mouseleave на iPad'ах
            if (navigator.userAgent.match(/iPad/i) == null) {
                this.mapPoint.events.add('mouseenter', function() { this.trigger('point-mouseenter') }, this);
                this.mapPoint.events.add('mouseleave', function() { this.trigger('point-mouseleave') }, this);
            }
            this.mapPoint.events.add('click', function(e) {
                var origEvent = e.originalEvent.domEvent.originalEvent;
                this.trigger('point-select');

                origEvent.preventDefault && origEvent.preventDefault();
                origEvent.returnValue = false;
                return false;
            }, this);

            this.trigger('point-add');
        },

        selected: {
            '': function() {
                this.mapPoint.options.set('zIndex', this.zIndex);
                this.mapPoint.properties.set('isIconHovered', 'no');
            },

            'yes': function() {
                this.mapPoint.options.set('zIndex', '1000');
                this.mapPoint.properties.set('isIconHovered', 'no');
            }
        },

        hovered: {
            '': function() {
                this.mapPoint.options.set('zIndex', this.zIndex);
                this.mapPoint.properties.set('isIconHovered', 'no');
            },

            'yes': function() {
                this.mapPoint.options.set('zIndex', '1000');
                this.mapPoint.properties.set('isIconHovered', 'yes');

            }
        }
    },

    destruct: function() {
        this.trigger('point-del');
    }
}, {});


BEM.decl('i-snake', {
    onSetMod: {
        js: function() {
            this.map = this.params.map;

            this.size = 10;
            this.step = 1;
            this.coords = [ this.map.getGlobalPixelCenter() ];

            this.coords[1] = [ this.coords[0][0], this.coords[0][1] + this.size ];
            this.len = this.coords.length - 1;

            this.line = new ymaps.Polyline(this._getCoords(), {}, {
                strokeWidth: 8
            });

            this.points = [];
            for (var i = 0, n = 5; i < n; i++)
                this.points.push(this.createPoint());


            this.map.ymap.geoObjects.add(this.line);

            this.params.btn.elem('text').html('Счет: ' + (this.len - 1));

            this.start();
        }
    },

    _sign: function(val) {
        return (val > 0) - (val < 0);
    },

    _getCoords: function() {
        var geoCoords = [];
        for(var coords = this.coords, i = 0, n = coords.length; i < n; i++)
            geoCoords[i] = this.map.fromGlobalPixels(coords[i]);

        return geoCoords;
    },

    start: function() {
        var _this = this;
        this.timer = setInterval(function() {_this._tick()}, 10);
        $(window).bind('keydown', function(e) { return _this.control(e); })
    },

    stop: function() {
        clearInterval(this.timer);
        //todo: unsubscribe control
    },

    _tick: function() {
        this.move();
    },

    control: function(e) {
        var keyCode = e.keyCode;

        if (keyCode == 27)
            this.stop();

        // horizontal
        var head = this.coords[0],
            tail = this.coords[this.coords.length - 1],
            penult = this.coords[this.coords.length - 2],
            d = 0.00001;

        if (head[1] === this.coords[1][1]) {
            // up
            if (keyCode == 38) {
                this.coords.unshift([head[0], head[1] - d]);
                return false
            }
            // down
            if (keyCode == 40) {
                this.coords.unshift([head[0], head[1] + d]);
                return false
            }
        }

        // vertical
        if (head[0] === this.coords[1][0]) {
            // left
            if (keyCode == 37) {
                this.coords.unshift([head[0] - d, head[1]]);
                return false
            }
            // right
            if (keyCode == 39) {
                this.coords.unshift([head[0] + d, head[1]]);
                return false
            }
        }

        if (keyCode >= 37 &&  keyCode <= 40) return false;
    },

    move: function() {
        var length = 0,
            newHead = this.moveCoord(this.coords[0], this.coords[1]);

        for (var i = 0, n = this.coords.length-1; i < n; i++)
            length += Math.abs(this.coords[i][0] - this.coords[i+1][0]) + Math.abs(this.coords[i][1] - this.coords[i+1][1]);

        this.eatPoints(this.coords[0], newHead);
        if (!this.checkCross(this.coords[0], newHead))
            this.coords[0] = newHead;
        else
            this.die();

        if (Math.abs(length - this.size * this.len) < 0.001) {
            var tail = this.coords[this.coords.length - 1],
                newTail = this.moveCoord(tail, this.coords[this.coords.length - 2], true);
            if (this.coords.length > 2) {
                var penult = this.coords[this.coords.length - 2];
                if (tail[0] == penult[0] && this._sign(penult[1] - tail[1]) != this._sign(penult[1] - newTail[1]) ||
                    tail[1] == penult[1] && this._sign(penult[0] - tail[0]) != this._sign(penult[0] - newTail[0])) {
                    this.coords.pop();
                    this.coords[this.coords.length - 1] = this.moveCoord(this.coords[this.coords.length - 1], this.coords[this.coords.length - 2], true);
                } else {
                    this.coords[this.coords.length - 1] = newTail;
                }
            } else {
                this.coords[this.coords.length - 1] = newTail;
            }
        }

        this.line.geometry.setCoordinates(this._getCoords());
    },

    moveCoord: function(point, nextPoint, reverse) {
        if (point[0] == nextPoint[0]) {
            return [ point[0], point[1] + this.step * this._sign(point[1] - nextPoint[1]) * (reverse ? -1 : 1) ]
        }

        if (point[1] == nextPoint[1]) {
            return [ point[0] + this.step * this._sign(point[0] - nextPoint[0]) * (reverse ? -1 : 1), point[1] ]
        }
    },

    createPoint: function() {
        var posOffset = [ 350 - Math.round(Math.random() * 700), 150 - Math.round(Math.random() * 300)],
            mapCenter = this.map.getGlobalPixelCenter(),
            point = new ymaps.Placemark(this.map.fromGlobalPixels([mapCenter[0] + posOffset[0], mapCenter[1] + posOffset[1]] ), {
                iconType: 'ya',
                hintContent: 'Съешь меня',
                isIconHovered: 'no'
            }, {
                iconLayout: ymaps.templateLayoutFactory.createClass(
                    '<div class="i-geo-point i-geo-point_type_ya i-geo-point_hovered_$[properties.isIconHovered]"> </div>'
                ),
                zIndex: 1,
                openBalloonOnClick: false
            });
        this.map.ymap.geoObjects.add(point);

        return point;
    },

    eatPoints: function(head, newHead) {
        var points = this.points,
            lineW = 5,
            gcoord;

        for (var i = points.length; i--;) {
            gcoord = this.map.toGlobalPixels(points[i].geometry.getCoordinates());

            if (
                (head[0] === newHead[0] && gcoord[0] + lineW > head[0] && gcoord[0] - lineW < head[0] && this._sign(gcoord[1] - head[1]) != this._sign(gcoord[1] - newHead[1])) ||
                    (head[1] === newHead[1] && gcoord[1] + lineW > head[1] && gcoord[1] - lineW < head[1] && this._sign(gcoord[0] - head[0]) != this._sign(gcoord[0] - newHead[0]))
                ) {
                this.map.ymap.geoObjects.remove(points[i]);
                points.splice(i, 1);
                points.push(this.createPoint());
                this.len += 1;
                this.params.btn.elem('text').html('Счет: ' + (this.len - 1));
            }
        }
    },

    checkCross: function(p1, p2) {
        var i, n;
        if (p1[1] === p2[1])
            for (i = 0, n = this.coords.length-1; i < n; i++)
                if (this.coords[i][0] === this.coords[i+1][0] && ( (this.coords[i][1] >= p1[1] && this.coords[i+1][1] <= p1[1]) || (this.coords[i][1] <= p1[1] && this.coords[i+1][1] >= p1[1]) ) && this._sign(this.coords[i][0] - p1[0]) != this._sign(this.coords[i][0] - p2[0]))
                    return true;
        if (p1[0] === p2[0])
            for (i = 0, n = this.coords.length-1; i < n; i++)
                if (this.coords[i][1] === this.coords[i+1][1] && ( (this.coords[i][0] >= p1[0] && this.coords[i+1][0] <= p1[0]) || (this.coords[i][0] <= p1[0] && this.coords[i+1][0] >= p1[0]) ) && this._sign(this.coords[i][1] - p1[1]) != this._sign(this.coords[i][1] - p2[1]))
                    return true;
        return false;
    },

    die: function() {
        this.line.options.set('strokeColor', '#AA0000');
        this.stop();
    },

    destruct: function() {
        var points = this.points;

        for (var i = points.length; i--;)
            this.map.ymap.geoObjects.remove(points[i]);
        this.map.ymap.geoObjects.remove(this.line);
    }
});
/* ../../../../blocks-desktop/i-bem/examples/030-i-bem_map.blocks/i-geo-point/i-geo-point.js: end */ /**/

/* ../../../../blocks-desktop/i-bem/examples/030-i-bem_map.blocks/b-map/_geo-objects/b-map_geo-objects_yes.js: begin */ /**/
BEM.DOM.decl({ name: 'b-map', modName: 'geo-objects', modVal: 'yes' }, {

    // инициализация карты
    initMap: function() {
        this.geoObjectsArray = [];
        this.selected = null;

        this.__base.apply(this, arguments);

        this.params.points && this.createGeoObjects(this.params.points);

        this.params.streetLine && this.createStreetLine(this.params.streetLine);
    },

    attachEvents: function() {
        this.__base.apply(this, arguments);

        // хендлеры событий на точках карты
        this.pointsHandlers = {
            'point-add': function(e) {
                this._addPoint(e.target.mapPoint);
            },

            'point-mouseenter': function(e, data) {
                this._hoverPoint(this._getTargetPoint(e, data));
            },

            'point-mouseleave': function(e, data) {
                this._unhoverPoint(this._getTargetPoint(e, data));
            },

            'point-select': function(e, data) {
                this._selectPoint(this._getTargetPoint(e, data));
            },

            'point-del':function(e, data) {
                this._delPoint(this._getTargetPoint(e, data));
            }
        }

        // подписываемся на события на точках карты
        for (var name in this.pointsHandlers)
            if (this.pointsHandlers.hasOwnProperty(name))
                BEM.blocks['i-geo-point'].on(name, this.pointsHandlers[name], this)

        // слушаем события на карте
        this.ymap.events
            .add('click', function() {
                this._unselectPoint();
            }, this)
            .add('boundschange', this._onBoundsUpdate, this);
    },

    createGeoObjects: function(points) {
        this.add(points);
        this.fitAll(this.params.zoom);

        this.trigger('map-points-added', { total: this.params.total });

        if (this.params.searchText && this.params.searchText === 'Яндекс')
            this.bindTo('userlocation', 'click', function() {
                if (this.snake) {
                    this.snake.destruct();
                }

                if (this.findBlockInside('b-map-panel').getMod(this.findBlockInside('b-map-panel').elem('switcher'), 'state') != 'closed')
                    this.findBlockInside('b-map-panel')._toggleState();

                this.delMod('geo-objects-search');

                for (var i = this.geoObjectsArray.length; i--;)
                    this.geoObjectsArray[i].destruct();

                this.snake = BEM.create('i-snake', { map: this, btn: this.findBlockOn(this.elem('goto-map'), 'b-form-button') });
            })
    },

    createStreetLine: function(lines) {
        var _this = this;

        this._streetStrokeOpacity = 0.4;

        this._streetObject = new ymaps.Polygon(lines, {}, {
            strokeColor: '#000000',
            fillColor: '#00000000',
            strokeWidth: 4,
            strokeOpacity: this._streetStrokeOpacity,
            simplification: false,
            interactivityModel: 'default#transparent',
            overlayFactory: {
                createOverlay: function (pixelGeometry, data, options) {
                    return new ymaps.overlay.MultiLine(pixelGeometry, data, options);
                }
            }
        });

        this._streetObject.events
            .add('mouseenter', function() {
                this._streetObject.options.set('strokeOpacity', this._streetStrokeOpacity);

                clearTimeout(this._hideStreetTimeout);
                this._clearHideStreetAnimation();
            }, this)
            .add('mouseleave', function() {
                this._streetObject.options.set('strokeOpacity', '0');
            }, this);

        this._hideStreetTimeout = setTimeout(function() { _this._hideStreetTimeoutFunc() }, 2000);

        this.ymap.geoObjects.add(this._streetObject);
    },

    _hideStreetTimeoutFunc: function() {
        var _this = this;
        this._hideStreetAnimationTick = 0;
        this._hideStreetAnimationTimeout = setTimeout(function () { return _this._hideStreetAnimationFunc() }, 100);
    },

    _hideStreetAnimationFunc: function() {
        var _this = this,
            optMax = this._streetStrokeOpacity,
            opt;

        this._hideStreetAnimationTick++;

        opt = optMax - optMax * Math.sin(Math.PI * this._hideStreetAnimationTick / 20);
        this._streetObject.options.set('strokeOpacity', Math.round(opt * 100) / 100);

        if (opt > 0)
            this._hideStreetAnimationTimeout = setTimeout(function() { _this._hideStreetAnimationFunc()}, 10);
    },

    _clearHideStreetAnimation: function() {
        this._hideStreetAnimationTick = 0;
        clearTimeout(this._hideStreetAnimationTimeout);
    },

    _addPoint: function(point) {
        this.ymap.geoObjects.add(point);
    },

    _delPoint: function(point) {
        this.ymap.geoObjects.remove(point.mapPoint);
    },

    _hoverPoint: function(point) {
        point.setMod('hovered', 'yes');
    },

    _unhoverPoint: function(point) {
        point.delMod('hovered');
    },

    _selectPoint: function(point) {
        if (this.selected !== point) {
            this._unselectPoint();
            this.selected = point;
        }
        var balloon = point.mapPoint.balloon.open(), // открываем балун, получаем ссылку на него
            bBounds = balloon.getOverlay().getBalloonLayout().getClientBoundingRect(),
            bSize = [ Math.abs(bBounds[1][0] - bBounds[0][0]), Math.abs(bBounds[1][1] - bBounds[0][1]) + 21 ], // 21 -- высота хвоста
            zoom = this.getZoom(),
            gCenter = this.getGlobalPixelCenter(),
            mapBounds = this.getBounds(),
            gMapBounds = [ this.toGlobalPixels(mapBounds[0]), this.toGlobalPixels(mapBounds[1]) ],
            gPoint = this.toGlobalPixels(point.mapPoint.geometry.getCoordinates(), zoom),
            gBalloonBounds = [
                [gPoint[0] - bSize[0] / 2, gPoint[1]],
                [gPoint[0] + bSize[0] / 2, gPoint[1] - bSize[1]]
            ],
            gBalloonOffset = [
                [ gMapBounds[0][0] - gBalloonBounds[0][0], gMapBounds[0][1] - gBalloonBounds[0][1] ],
                [ gMapBounds[1][0] - gBalloonBounds[1][0], gMapBounds[1][1] - gBalloonBounds[1][1] ]
            ],
            gOffset = [
                (gBalloonOffset[0][0] > 0 && Math.abs(gBalloonOffset[0][0]) < bSize[0])
                    ? gBalloonOffset[0][0] + 30
                    : (gBalloonOffset[1][0] < 0 && Math.abs(gBalloonOffset[1][0]) < bSize[0])
                        ? gBalloonOffset[1][0] - 20
                        : 0,
                (gBalloonOffset[0][1] < 0)
                    ? gBalloonOffset[0][1] - 20
                    : (gBalloonOffset[1][1] > 0)
                        ? gBalloonOffset[1][1] + 30
                        : 0
            ],
            panelOffset = [0, 0];

        point.setMod('selected', 'yes');

        this.setGlobalPixelCenter([gCenter[0] - gOffset[0] + panelOffset[0], gCenter[1] - gOffset[1]], zoom);
        this._onBoundsUpdate();
    },

    _unselectPoint: function() {
        if (!this.selected) return;
        this.selected.delMod('selected');
        this.selected.mapPoint.balloon.close();
        this.selected.trigger('point-unselect');
        this.selected = null;

        this._onBoundsUpdate();
    },

    // обработчик изменения показываемой области
    _onBoundsUpdate: function(e) {
        // прокидываем событие, чтобы внешние блоки могли на него подписаться
        this.trigger('map-boundschange', {
            center: this.getCenter(),
            bounds: this.getBounds(),
            zoom: (e)
                ? e.get('newZoom')
                : this.getZoom(),
            selectedPoint: this.selected
        });
    },

    // поиск точки по имени
    _findPointByName: function(name) {
        for (var i = 0, n = this.geoObjectsArray.length, point; point = this.geoObjectsArray[i], i < n; i++)
            if (point.params.name.toString() == name.toString()) return point;
        return false;
    },

    _getTargetPoint: function(e, data) {
        return (e.target.mapPoint && e.target) || (data && this._findPointByName(data.name));
    },

    // добавить точку/массив точек
    add: function(point) {
        var geoObjectsArray = this.geoObjectsArray;
        for (var i = 0, n = point.length !== undefined ? point.length : 1, p; p = point[i] || point, i < n; i++) {
            geoObjectsArray.push(BEM.create({ block: 'i-geo-point', mods: { type: p.type } }, p));
        }

        var groups = [],
            inGroup, nGroups,
            radius = 20;
        // группируем точки с одинаковыми координатами
        for (i = 0, n = geoObjectsArray.length; i < n; i++) {
            var pointLocation = geoObjectsArray[i].params.location;
            for (inGroup = 0, nGroups = groups.length; inGroup < nGroups; inGroup++) {
                var groupLocation = geoObjectsArray[groups[inGroup][0]].params.location;
                if (groupLocation.longitude == pointLocation.longitude && groupLocation.latitude == pointLocation.latitude)
                    break;
            }
            groups[inGroup] ? groups[inGroup].push(i) : (groups[inGroup] = [i]);
        }
        // смешаем точки в каждой группе по кругу
        for (i = 0, n = groups.length; i < n; i++) {
            geoObjectsArray[groups[i][0]].mapPoint.options.set('zIndex', (geoObjectsArray[groups[i][0]].zIndex = (groups.length - i) + groups[i].length));
            for (inGroup = 1, nGroups = groups[i].length; inGroup < nGroups; inGroup++) {
                geoObjectsArray[groups[i][inGroup]].mapPoint.options
                    .set('iconOffset', [ Math.round(radius * Math.cos(2 * Math.PI * inGroup / nGroups)) , Math.round(radius * Math.sin(2 * Math.PI * inGroup / nGroups))  ])
                    .set('zIndex', (geoObjectsArray[groups[i][inGroup]].zIndex = nGroups - inGroup));
            }
        }
    },

    // удалить точку
    remove: function(item) {
        for (var i = 0, n = this.geoObjectsArray.length; i < n; i++) {
            if (this.geoObjectsArray[i] === item) {
                item.destruct();
                this.geoObjectsArray.splice(i, 1);
                return;
            }
        }
    },

    // удалить все точки
    removeAll: function() {
        for (var i = 0, n = this.geoObjectsArray.length; i < n; i++)
            this.geoObjectsArray[i].destruct();

        this.geoObjectsArray = [];
    },

    // уместить все точки в видимой области
    fitAll: function(zoom) {
        var _this = this,
            lats = [],
            longs = [],
            rightTop,
            leftBottom,
            centerAndZoom;

        for (var i = 0, n = this.geoObjectsArray.length, loc; i < n; i++) {
            loc = this.geoObjectsArray[i].params.location;
            lats.push(loc.latitude);
            longs.push(loc.longitude);
        }

        leftBottom = [ Math.min.apply(Math, longs), Math.max.apply(Math, lats) ];
        rightTop = [ Math.max.apply(Math, longs), Math.min.apply(Math, lats) ];

        centerAndZoom = ymaps.util.bounds.getCenterAndZoom([leftBottom, rightTop], [ this.domElem.width() * 0.8, this.domElem.height() * 0.8]);

        this.ymap.zoomRange.get(centerAndZoom.center).then(function(range){
            _this.moveTo(centerAndZoom.center, Math.min(zoom || _this.getZoom(), centerAndZoom.zoom , range[1]));

            _this.showMap();
        });
    },

    destruct: function() {
        for (var name in this.pointsHandlers)
            if (this.pointsHandlers.hasOwnProperty(name))
                BEM.blocks['i-geo-point'].un(name, this.pointsHandlers[name], this);

        this.__base.apply(this, arguments);
    }

}, {

});

/* ../../../../blocks-desktop/i-bem/examples/030-i-bem_map.blocks/b-map/_geo-objects/b-map_geo-objects_yes.js: end */ /**/

