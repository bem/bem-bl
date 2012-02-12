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
 * Уникализатор
 * @param {Object} [obj] объект, который нужно идентифицировать
 * @param {Boolean} [onlyGet=false] возвращать уникальное значение, только если оно уже до этого было присвоено
 * @returns {String} идентификатор
 */
$.identify = function(obj, onlyGet) {

    if(!obj) return get();

    var key = 'uniqueID' in obj? 'uniqueID' : expando; // используем, по возможности. нативный uniqueID для элементов в IE

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
         * Строит полное имя события
         * @protected
         * @param {String} e тип события
         * @returns {String}
         */
        buildEventName : function(e) {

            return e;

        },

        /**
         * Добавление обработчика события
         * @param {String} e тип события
         * @param {Object} [data] дополнительные данные, приходящие в обработчик как e.data
         * @param {Function} fn обработчик
         * @param {Object} [ctx] контекст обработчика
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
         * Удаление обработчика/обработчиков события
         * @param {String} [e] тип события
         * @param {Function} [fn] обработчик
         * @param {Object} [ctx] контекст обработчика
         * @returns {$.observable}
         */
        un : function(e, fn, ctx) {

            if(typeof e == 'string' || typeof e == 'undefined') {
                var storage = this[storageExpando];
                if(storage) {
                    if(e) { // если передан тип события
                        var eList = e.split(' '),
                            i = 0,
                            eStorage;
                        while(e = eList[i++]) {
                            e = this.buildEventName(e);
                            if(eStorage = storage[e]) {
                                if(fn) {  // если передан конкретный обработчик
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
         * Запускает обработчики события
         * @param {String|$.Event} e событие
         * @param {Object} [data] дополнительные данные
         * @returns {$.observable}
         */
        trigger : function(e, data) {

            var _this = this,
                storage = _this[storageExpando],
                rawType;

            typeof e === 'string'?
                e = $.Event(_this.buildEventName(rawType = e)) :
                e.type = _this.buildEventName(rawType = e.type);

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

/* ../../../../blocks-common/i-ecma/__array/i-ecma__array.js: begin */ /**/
(function() {

var ptp = Array.prototype,
    toStr = Object.prototype.toString,
    methods = {

        /**
         * Находит индекс элемента в массиве
         * @param {Object} item
         * @param {Number} [fromIdx] начиная с индекса (length - 1 - fromIdx, если fromIdx < 0)
         * @returns {Number} индекс элемента или -1, если не найдено
         */
        indexOf : function(item, fromIdx) {

            fromIdx = +(fromIdx || 0);

            var len = this.length;

            if(len > 0 && fromIdx < len) {
                fromIdx = fromIdx < 0? Math.ceil(fromIdx) : Math.floor(fromIdx);
                fromIdx < -len && (fromIdx = 0);
                fromIdx < 0 && (fromIdx = fromIdx + len);

                while(fromIdx < len)
                    if(this[fromIdx++] === item)
                        return fromIdx - 1;
            }

            return -1;

        },

        /**
         * Вызывает callback для каждого элемента
         * @param {Function} callback вызывается для каждого элемента
         * @param {Object} [ctx=null] контекст для callback
         */
        forEach : function(callback, ctx) {

            var i = -1, t = this, len = t.length;
            while(++i < len) i in t &&
                (ctx? callback.call(ctx, t[i], i, t) : callback(t[i], i, t));

        },

        /**
         * Создает массив B из массива A, такой что B[i] = callback(A[i])
         * @param {Function} callback вызывается для каждого элемента
         * @param {Object} [ctx=null] контекст для callback
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
         * Создает массив, содержащий только те элементы из исходного массива, для которых callback возвращает true.
         * @param {Function} callback вызывается для каждого элемента
         * @param {Object} [ctx] контекст для callback
         * @returns {Array}
         */
        filter : function(callback, ctx) {

            var i = -1, t = this, len = t.length,
                res = [];

            while(++i < len) i in t &&
                (ctx? callback.call(ctx, t[i], i, t) : callback(t[i], i, t)) && res.push(t[i]);

            return res;

        }

    };

for(var name in methods)
    ptp[name] || (ptp[name] = methods[name]);

Array.isArray || (Array.isArray = function(obj) {
    return toStr.call(obj) === '[object Array]';
});

})();
/* ../../../../blocks-common/i-ecma/__array/i-ecma__array.js: end */ /**/

/* ../../../../blocks-common/i-bem/i-bem.js: begin */ /**/
/** @requires jquery.inherit */
/** @requires jquery.isEmptyObject */
/** @requires jquery.identify */
/** @requires jquery.observable */

(function($, undefined) {

/**
 * Хранилище для отложенных функций
 * @private
 * @type Array
 */
var afterCurrentEventFns = [],

/**
 * Хранилище деклараций блоков (хэш по имени блока)
 * @private
 * @type Object
 */
    blocks = {},

/**
 * Каналы сообщений
 * @static
 * @private
 * @type Object
 */
    channels = {};

/**
 * Строит имя метода-обработчика установки модификатора
 * @static
 * @private
 * @param {String} elemName имя элемента
 * @param {String} modName имя модификатора
 * @param {String} modVal значение модификатора
 * @returns {String}
 */
function buildModFnName(elemName, modName, modVal) {

    return (elemName? '__elem_' + elemName : '') +
           '__mod' +
           (modName? '_' + modName : '') +
           (modVal? '_' + modVal : '');

}

/**
 * Преобразует хэш обработчиков модификаторов в методы
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

/** @namespace */
this.BEM = $.inherit($.observable, /** @lends BEM.prototype */ {

    /**
     * @class Базовый блок для создания bem-блоков
     * @constructs
     * @private
     * @param {Object} mods модификаторы блока
     * @param {Object} params параметры блока
     * @param {Boolean} [initImmediately=true]
     */
    __constructor : function(mods, params, initImmediately) {

        var _this = this;

        /**
         * кэш модификаторов блока
         * @private
         * @type Object
         */
        _this._modCache = mods || {};

        /**
         * текущие модификаторы в стэке установки
         * @private
         * @type Object
         */
        _this._processingMods = {};

        /**
         * параметры блока с учетом дефолтных
         * @protected
         * @type Object
         */
        _this.params = $.extend(_this.getDefaultParams(), params);

        initImmediately !== false?
            _this._init() :
            _this.afterCurrentEvent(_this._init);

    },

    /**
     * Инициализирует блок
     * @private
     */
    _init : function() {

        return this
            .setMod('js', 'inited')
            .trigger('init');

    },

    /**
     * Изменяет контекст передаваемой функции
     * @protected
     * @param {Function} fn
     * @param {Object} [ctx=this] контекст
     * @returns {Function} функция с измененным контекстом
     */
    changeThis : function(fn, ctx) {

        var _this = this;
        return function() {
            return fn.apply(ctx || _this, arguments);
        };

    },

    /**
     * Выполняет функцию в контексте блока после "текущего события"
     * @protected
     * @param {Function} fn
     * @param {Object} [ctx] контекст
     */
    afterCurrentEvent : function(fn, ctx) {

        this.__self.afterCurrentEvent(this.changeThis(fn, ctx));

    },

    /**
     * Запускает обработчики события у блока и обработчики live-событий
     * @protected
     * @param {String} e имя события
     * @param {Object} [data] дополнительные данные
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
     * Проверят наличие модификатора у блока/вложенного элемента
     * @protected
     * @param {Object} [elem] вложенный элемент
     * @param {String} modName имя модификатора
     * @param {String} [modVal] значение модификатора
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
     * Возвращает значение модификатора блока/вложенного элемента
     * @protected
     * @param {Object} [elem] вложенный элемент
     * @param {String} modName имя модификатора
     * @returns {String} значение модификатора
     */
    getMod : function(elem, modName) {

        var type = typeof elem;
        if(type === 'string' || type === 'undefined') { // elem либо отсутствует, либо undefined
            modName = elem || modName;
            var modCache = this._modCache;
            return modName in modCache?
                modCache[modName] :
                modCache[modName] = this._extractModVal(modName);
        }

        return this._getElemMod(modName, elem);

    },

    /**
     * Возвращает значение модификатора вложенного элемента
     * @private
     * @param {String} modName имя модификатора
     * @param {Object} elem вложенный элемент
     * @param {Object} [elem] имя вложенного элемента
     * @returns {String} значение модификатора
     */
    _getElemMod : function(modName, elem, elemName) {

        return this._extractModVal(modName, elem, elemName);

    },

    /**
     * Возвращает значения модификаторов блока/вложенного элемента
     * @protected
     * @param {Object} [elem] вложенный элемент
     * @param {String} [modName1, ..., modNameN] имена модификаторов
     * @returns {Object} значения модификаторов в виде хэша
     */
    getMods : function(elem) {

        var hasElem = elem && typeof elem != 'string',
            _this = this,
            modNames = [].slice.call(arguments, hasElem? 1 : 0),
            res = _this._extractMods(modNames, hasElem? elem : undefined);

        if(!hasElem) { // кэшируем
            modNames.length?
                $.each(modNames, function(i, name) {
                    _this._modCache[name] = res[name];
                }):
                _this._modCache = res;
        }

        return res;

    },

    /**
     * Устанавливает модификатор у блока/вложенного элемента
     * @protected
     * @param {Object} [elem] вложенный элемент
     * @param {String} modName имя модификатора
     * @param {String} modVal значение модификатора
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
                currentModVal = elem?
                    _this._getElemMod(modName, elem, elemName = _this.__self._extractElemNameFrom(elem)) :
                    _this.getMod(modName);

            if(currentModVal === modVal) return _this;

            this._processingMods[modId] = true;

            var needSetMod = true,
                modFnParams = [modName, modVal, currentModVal];

            elem && modFnParams.unshift(elem);

            $.each([['*', '*'], [modName, '*'], [modName, modVal]], function(){
                needSetMod = _this._callModFn(elemName, this[0], this[1], modFnParams) !== false && needSetMod;
            });

            !elem && needSetMod && (_this._modCache[modName] = modVal);

            needSetMod && _this._afterSetMod(modName, modVal, elem, elemName);

            delete this._processingMods[modId];
        }

        return _this;

    },

    /**
     * Функция после успешного изменения модификатора у блока/вложенного элемента
     * @protected
     * @param {String} modName имя модификатора
     * @param {String} modVal значение модификатора
     * @param {Object} [elem] вложенный элемент
     */
    _afterSetMod : function(modName, modVal, elem) {},

    /**
     * Устанавливает модификатор у блока/вложенного элемента в зависимости от условия.
     * Если передан параметр condition, то при true устанавливается modVal1, при false - modVal2,
     * если же condition не передан, то устанавливается modVal1, если установлен modVal2, и наоборот
     * @protected
     * @param {Object} [elem] вложенный элемент
     * @param {String} modName имя модификатора
     * @param {String} modVal1 первое значение модификатора
     * @param {String} [modVal2] второе значение модификатора
     * @param {Boolean} [condition] условие
     * @returns {BEM}
     */
    toggleMod : function(elem, modName, modVal1, modVal2, condition) {

        if(typeof elem == 'string') { // если это блок
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

        var modVal = this.getMod(elem, modName);
        (modVal == modVal1 || modVal == modVal2) &&
            this.setMod(
                elem,
                modName,
                typeof condition === 'boolean'?
                    (condition? modVal1 : modVal2) :
                    this.hasMod(elem, modName, modVal1)? modVal2 : modVal1);

        return this;

    },

    /**
     * Удаляет модификатор у блока/вложенного элемента
     * @protected
     * @param {Object} [elem] вложенный элемент
     * @param {String} modName имя модификатора
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
     * Выполняет обработчики установки модификаторов
     * @private
     * @param {String} elemName имя элемента
     * @param {String} modName имя модификатора
     * @param {String} modVal значение модификатора
     * @param {Array} modFnParams параметры обработчика
     */
    _callModFn : function(elemName, modName, modVal, modFnParams) {

        var modFnName = buildModFnName(elemName, modName, modVal);
        return this[modFnName]?
           this[modFnName].apply(this, modFnParams) :
           undefined;

    },

    /**
     * Извлекает значение модификатора
     * @private
     * @param {String} modName имя модификатора
     * @param {Object} [elem] элемент
     * @returns {String} значение модификатора
     */
    _extractModVal : function(modName, elem) {

        return '';

    },

    /**
     * Извлекает имя/значение списка модификаторов
     * @private
     * @param {Array} modNames имена модификаторов
     * @param {Object} [elem] элемент
     * @returns {Object} хэш значений модификаторов по имени
     */
    _extractMods : function(modNames, elem) {

        return {};

    },

    /**
     * Возвращает именованный канал сообщений
     * @param {String} [id='default'] идентификатор канала
     * @param {Boolean} [drop=false] уничтожить канал
     * @returns {$.observable|undefined} канал сообщений
     */
    channel : function(id, drop) {

        return this.__self.channel(id, drop);

    },

    /**
     * Возвращает дефолтные параметры блока
     * @returns {Object}
     */
    getDefaultParams : function() {

        return {};

    },

    /**
     * Хелпер для очистки свойств блока
     * @param {Object} [obj=this]
     */
    del : function(obj) {

        var args = [].slice.call(arguments);
        typeof obj == 'string' && args.unshift(this);
        this.__self.del.apply(this.__self, args);
        return this;

	},

    /**
     * Удаляет блок
     */
    destruct : function() {}

}, /** @lends BEM */{

    _name : 'i-bem',

    /**
     * Хранилище деклараций блоков (хэш по имени блока)
     * @static
     * @protected
     * @type Object
     */
    blocks : blocks,

    /**
     * Декларатор блоков, создает класс блока
     * @static
     * @protected
     * @param {String|Object} decl имя блока (простой синтаксис) или описание
     * @param {String} decl.block|decl.name имя блока
     * @param {String} [decl.baseBlock] имя родительского блока
     * @param {String} [decl.modName] имя модификатора
     * @param {String} [decl.modVal] значение модификатора
     * @param {Object} [props] методы
     * @param {Object} [staticProps] статические методы
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
            $.each(props, function(name, prop) {
                $.isFunction(prop) &&
                    (props[name] = function() {
                        var method;
                        if(this.hasMod(decl.modName, decl.modVal)) {
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
            // делаем новый live в том случае, если уже запускался старый
            (block = $.inheritSelf(baseBlock, props, staticProps))._processLive(true) :
            (block = blocks[decl.block] = $.inherit(baseBlock, props, staticProps))._name = decl.block;

        return block;

    },

    /**
     * Осуществляет обработку live-свойств блока
     * @private
     * @param {Boolean} [heedLive=false] нужно ли учитывать то, что блок обрабатывал уже свои live-свойства
     * @returns {Boolean} является ли блок live-блоком
     */
    _processLive : function(heedLive) {

        return false;

    },

    /**
     * Фабричный метод для создания экземпляра блока по имени
     * @static
     * @param {String|Object} block имя блока или описание
     * @param {Object} [params] параметры блока
     * @returns {BEM}
     */
    create : function(block, params) {

        typeof block == 'string' && (block = { block : block });

        return new blocks[block.block](block.mods, params);

    },

    /**
     * Возвращает имя текущего блока
     * @static
     * @protected
     * @returns {String}
     */
    getName : function() {

        return this._name;

    },

    /**
     * Извлекает имя вложенного в блок элемента
     * @static
     * @private
     * @param {Object} elem вложенный элемент
     * @returns {String|undefined}
     */
    _extractElemNameFrom : function(elem) {},

    /**
     * Добавляет функцию в очередь для запуска после "текущего события"
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
     * Запускает очерель
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
     * Изменяет контекст передаваемой функции
     * @protected
     * @param {Function} fn
     * @param {Object} ctx контекст
     * @returns {Function} функция с измененным контекстом
     */
    changeThis : function(fn, ctx) {

        return function() {
            return fn.apply(ctx || this, arguments);
        };

    },

    /**
     * Хелпер для очистки свойств
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
     * Возвращает/уничтожает именованный канал сообщений
     * @param {String} [id='default'] идентификатор канала
     * @param {Boolean} [drop=false] уничтожить канал
     * @returns {$.observable|undefined} канал сообщений
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

/* ../../../../blocks-common/i-bem/__internal/i-bem__internal.js: begin */ /**/
/** @fileOverview модуль для внутренних BEM-хелперов */
/** @requires BEM */

(function(BEM, $, undefined) {

/**
 * Разделитель для модификаторов и их значений
 * @const
 * @type String
 */
var MOD_DELIM = '_',

/**
 * Разделитель между именами блока и вложенного элемента
 * @const
 * @type String
 */
    ELEM_DELIM = '__',

/**
 * Паттерн для допустимых имен элементов и модификаторов
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
     * Строит класс блока или элемента с учетом модификатора
     * @private
     * @param {String} block имя блока
     * @param {String} [elem] имя элемента
     * @param {String} [modName] имя модификатора
     * @param {String} [modVal] значение модификатора
     * @param {Array} [buffer] буфер
     * @returns {String|Array} строка класса или буфер (в зависимости от наличия параметра buffer)
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
     * Строит полные классы блока или элемента с учетом модификаторов
     * @private
     * @param {String} block имя блока
     * @param {String} [elem] имя элемента
     * @param {Object} [mods] модификаторы
     * @param {Array} [buffer] буфер
     * @returns {String|Array} строка класса или буфер (в зависимости от наличия параметра buffer)
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

/* ../../../../blocks-common/i-jquery/__leftclick/i-jquery__leftclick.js: begin */ /**/
/**
 * leftClick event plugin
 *
 * Copyright (c) 2010 Filatov Dmitry (alpha@zforms.ru)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @version 1.0.0
 */

(function($) {

var leftClick = $.event.special.leftclick = {

    setup : function() {

        $(this).bind('click', leftClick.handler);

    },

    teardown : function() {

        $(this).unbind('click', leftClick.handler);

    },

    handler : function(e) {

        if(!e.button) {
            e.type = 'leftclick';
            $.event.handle.apply(this, arguments);
            e.type = 'click';
        }

    }

};

})(jQuery);
/* ../../../../blocks-common/i-jquery/__leftclick/i-jquery__leftclick.js: end */ /**/

/* ../../../../blocks-desktop/b-link/_pseudo/b-link_pseudo_yes.js: begin */ /**/
BEM.DOM.decl({'name': 'b-link', 'modName': 'pseudo', 'modVal': 'yes'}, {

    _onClick : function(e) {

        e.preventDefault();

        this.hasMod('disabled', 'yes') || this.afterCurrentEvent(function() {
            this.trigger('click');
        });

    }

}, {

    live : function() {

        this.liveBindTo({ modName : 'pseudo', modVal : 'yes' }, 'leftclick', function(e) {
            this._onClick(e);
        });

    }

});

/* ../../../../blocks-desktop/b-link/_pseudo/b-link_pseudo_yes.js: end */ /**/

