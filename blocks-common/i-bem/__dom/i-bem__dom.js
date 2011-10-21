/** @requires BEM */
/** @requires BEM.INTERNAL */

(function(BEM, $, undefined) {

var win = $(window),
    doc = $(document),

/**
 * Хранилище для DOM-элементов по уникальному ключу
 * @private
 * @type Object
 */
    uniqIdToDomElems = {},


/**
 * Хранилище для блоков по уникальному ключу
 * @static
 * @private
 * @type Object
 */
    uniqIdToBlock = {},

/**
 * Хранилище для параметров блоков
 * @private
 * @type Object
 */
    domElemToParams = {},

/**
 * Хранилище для обработчиков liveCtx-событий
 * @private
 * @type Object
 */
    liveEventCtxStorage = {},

/**
 * Хранилище для обработчиков liveClass-событий
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
 * Инициализирует блоки на DOM-элементе
 * @private
 * @param {jQuery} domElem DOM-элемент
 * @param {String} uniqInitId идентификатор "волны инициализации"
 */
function init(domElem, uniqInitId) {

    var domNode = domElem[0];
    $.each(getParams(domNode), function(blockName, params) {
        processParams(params, domNode, blockName, uniqInitId);
        var block = uniqIdToBlock[params.uniqId];
        if(block) {
            block.domElem = block.domElem.add(domElem);
            $.extend(block.params, params);
        } else {
            initBlock(blockName, domElem, params);
        }
    });

}

/**
 * Инициализирует конкретный блок на DOM-элементе или возвращает существующий блок, если он уже был создан
 * @private
 * @param {String} blockName имя блока
 * @param {jQuery} domElem DOM-элемент
 * @param {Object} [params] параметры инициализации
 * @param {Boolean} [forceLive] форсировать возможность live-инициализации
 * @param {Function} [callback] обработчик, вызываемый после полной инициализации
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

    var blockClass = blocks[blockName] || DOM.decl(blockName, {}, { live : true });
    if(!(blockClass._liveInitable = !!blockClass._processLive()) || forceLive || params.live === false) {
        var block = new blockClass(uniqIdToDomElems[uniqId], params, !!forceLive);
        delete uniqIdToDomElems[uniqId];
        callback && callback.apply(block, Array.prototype.slice.call(arguments, 4));
        return block;
    }

}

/**
 * Обрабатывает и добавляет необходимые параметры блока
 * @private
 * @param {Object} params параметры инициализации
 * @param {HTMLElement} domNode DOM-нода
 * @param {String} blockName имя блока
 * @param {String} [uniqInitId] идентификатор "волны инициализации"
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
 * Хелпер для поиска DOM-элемента по селектору внутри контекста, включая сам контекст
 * @private
 * @param {jQuery} ctx контекст
 * @param {String} selector CSS-селектор
 * @param {Boolean} [excludeSelf=false] исключить контекст из поиска
 * @returns {jQuery}
 */
function findDomElem(ctx, selector, excludeSelf) {

    var res = ctx.find(selector);
    return excludeSelf?
       res :
       res.add(ctx.filter(selector));

}

/**
 * Возвращает параметры DOM-элемента блока
 * @private
 * @param {HTMLElement} domNode DOM-нода
 * @returns {Object}
 */
function getParams(domNode) {

    var uniqId = $.identify(domNode);
    return domElemToParams[uniqId] ||
           (domElemToParams[uniqId] = extractParams(domNode));

}

/**
 * Извлекает параметры блока из DOM-элемента
 * @private
 * @param {HTMLElement} domNode DOM-нода
 * @returns {Object}
 */
function extractParams(domNode) {

    var fn = domNode.onclick || domNode.ondblclick;
    if(!fn && domNode.tagName.toLowerCase() == 'body') { // LEGO-2027 в FF onclick не работает на body
        var elem = $(domNode),
            attr = elem.attr('onclick') || elem.attr('ondblclick');
        attr && (fn = Function(attr));
    }
    return fn? fn() : {};

}

/**
 * Очищает все BEM-хранилища, связанные с DOM-нодой
 * @private
 * @param {HTMLElement} domNode DOM-нода
 */
function cleanupDomNode(domNode) {

    delete domElemToParams[$.identify(domNode)];

}

/**
 * Возвращает DOM-ноду для вычислений размера окна в IE
 * @returns {HTMLElement}
 */
function getClientNode() {

    return doc[0][$.support.boxModel? 'documentElement' : 'body'];

}

/**
 * Возвращает и, при необходимости, инициализирует блок на DOM-элементе
 * @param {String} blockName имя блока
 * @param {Object} params параметры блока
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
     * @class Базовый блок для создания bem-блоков, имеющих DOM-представление
     * @constructs
     * @private
     * @param {jQuery} domElem DOM-элемент, на котором создается блок
     * @param {Object} params параметры блока
     * @param {Boolean} [initImmediately=true]
     */
    __constructor : function(domElem, params, initImmediately) {

        var _this = this;

        /**
         * DOM-элементы блока
         * @protected
         * @type jQuery
         */
        _this.domElem = domElem;

        /**
         * кэш для имен событий на DOM-элементах
         * @private
         * @type Object
         */
        _this._eventNameCache = {};

        /**
         * кэш для элементов
         * @private
         * @type Object
         */
        _this._elemCache = {};

        /**
         * уникальный идентификатор блока
         * @private
         * @type String
         */
        uniqIdToBlock[_this._uniqId = params.uniqId || $.identify(_this)] = _this;

        /**
         * флаг необходимости unbind от document и window при уничтожении блока
         * @private
         * @type Boolean
         */
        _this._needSpecialUnbind = false;

        _this.__base(null, params, initImmediately);

    },

    /**
     * Находит блоки внутри (включая контекст) текущего блока или его элементов
     * @protected
     * @param {String|jQuery} [elem] элемент блока
     * @param {String|Object} block имя или описание (blockName,modName,modVal) искомого блока
     * @returns {BEM[]}
     */
    findBlocksInside : function(elem, block) {

        return this._doBlocksMethod(
            this._buildFindBlocksParams('find', elem, block));

    },

    /**
     * Находит первый блок внутри (включая контекст) текущего блока или его элементов
     * @protected
     * @param {String|jQuery} [elem] элемент блока
     * @param {String|Object} block имя или описание (blockName,modName,modVal) искомого блока
     * @returns {BEM}
     */
    findBlockInside : function(elem, block) {

        return this._doBlocksMethod(
            this._buildFindBlocksParams('find', elem, block, true));

    },

    /**
     * Находит блоки снаружи (включая контекст) текущего блока или его элементов
     * @protected
     * @param {String|jQuery} [elem] элемент блока
     * @param {String|Object} block имя или описание (blockName,modName,modVal) искомого блока
     * @returns {BEM[]}
     */
    findBlocksOutside : function(elem, block) {

        return this._doBlocksMethod(
            this._buildFindBlocksParams('parents', elem, block));

    },

    /**
     * Находит первый блок снаружи (включая контекст) текущего блока или его элементов
     * @protected
     * @param {String|jQuery} [elem] элемент блока
     * @param {String|Object} block имя или описание (blockName,modName,modVal) искомого блока
     * @returns {BEM}
     */
    findBlockOutside : function(elem, block) {

        return this._doBlocksMethod(
            this._buildFindBlocksParams('closest', elem, block))[0];

    },

    /**
     * Находит блоки на DOM-элементах текущего блока или его элементов
     * @protected
     * @param {String|jQuery} [elem] элемент блока
     * @param {String|Object} block имя или описание (blockName,modName,modVal) искомого блока
     * @returns {BEM[]}
     */
    findBlocksOn : function(elem, block) {

        return this._doBlocksMethod(
            this._buildFindBlocksParams('', elem, block));

    },

    /**
     * Находит первый блок на DOM-элементах текущего блока или его элементов
     * @protected
     * @param {String|jQuery} [elem] элемент блока
     * @param {String|Object} block имя или описание (blockName,modName,modVal) искомого блока
     * @returns {BEM}
     */
    findBlockOn : function(elem, block) {

        return this._doBlocksMethod(
            this._buildFindBlocksParams('', elem, block, true));

    },

    /**
     * Хелпер для маппинга аргументов поиска в хэш параметров для вызова
     * @private
     * @param {String} select возможные значения: 'find', 'closest', ''
     * @param {String|jQuery|undefined} elem элемент блока
     * @param {String|Object} block имя или описание (blockName,modName,modVal) искомого блока
     * @returns {Object}
     */
    _buildFindBlocksParams : function(select, elem, block, onlyFirst) {

        return {
            select    : select,
            elem      : block? elem : undefined,
            block     : block || elem,
            onlyFirst : onlyFirst
        };

    },

    /**
     * Выполняет метод блоков внутри (включая контекст) текущего блока или его элементов
     * @protected
     * @param {String|jQuery} [elem] элемент блока
     * @param {String|Object} block имя или описание (blockName,modName,modVal) искомого блока
     * @param {String} method имя метода
     * @param {Array} [args] параметры метода
     * @returns {Array} результаты вызовов метода
     */
    doBlocksMethodInside : function(elem, block, method, args) {

        return this._doBlocksMethod(
            this._buildDoBlocksMethodParams('find', elem, block, method, args));

    },

    /**
     * Выполняет метод блоков снаружи (включая контекст) текущего блока или его элементов
     * @protected
     * @param {String|jQuery} [elem] элемент блока
     * @param {String|Object} block имя или описание (blockName,modName,modVal) искомого блока
     * @param {String} method имя метода
     * @param {Array} [args] параметры метода
     * @returns {Array} результаты вызовов метода
     */
    doBlocksMethodOutside : function(elem, block, method, args) {

        return this._doBlocksMethod(
            this._buildDoBlocksMethodParams('closest', elem, block, method, args));

    },

    /**
     * Выполняет метод блоков на DOM-элементах текущего блока или его элементов
     * @protected
     * @param {String|jQuery} [elem] элемент блока
     * @param {String|Object} block имя или описание (blockName,modName,modVal) искомого блока
     * @param {String} method имя метода
     * @param {Array} [args] параметры метода
     * @returns {Array} результаты вызовов метода
     */
    doBlocksMethodOn : function(elem, block, method, args) {

        return this._doBlocksMethod(
            this._buildDoBlocksMethodParams('', elem, block, method, args));

    },

    /**
     * Выполняет метод блоков
     * @protected
     * @param {BEM[]} blocks блоки
     * @param {String} method имя метода
     * @param {Array} [args] параметры метода
     * @returns {Array} результаты вызовов метода
     */
    doBlocksMethod : function(blocks, method, args) {

        return this._doBlocksMethod({
            blocks  : blocks,
            method  : method,
            args    : args
        });

    },

    /**
     * Хелпер для маппинга аргументов вызова методов в хэш параметров для вызова
     * @private
     * @param {String} select возможные значения: 'find', 'closest', ''
     * @param {String|jQuery|undefined} elem элемент блока
     * @param {String|Object} block имя или описание (blockName,modName,modVal) искомого блока
     * @param {String} method имя метода
     * @param {Array} [args] параметры метода
     * @returns {Object}
     */
    _buildDoBlocksMethodParams : function(select, elem, block, method, args) {

        var hasElem = typeof method == 'string';
        return {
            select : select,
            elem   : hasElem? elem : undefined,
            block  : hasElem? block : elem,
            method : hasElem? method : block,
            args   : hasElem? args : method
        };

    },

    /**
     * Ищет блоки и выполняет заданный метод, если метод не задан, то возвращает блоки
     * @private
     * @param {Object} params параметры
     * @returns {BEM[]|Array} блоки или результаты вызовов метода
     */
    _doBlocksMethod : function(params) {

        var _this = this;

        if(params.blocks) {
            return $.map(params.blocks, function(block) {
                return _this._doBlockMethod(block, params.method, params.args);
            });
        }

        var ctxElem = params.elem?
                (typeof params.elem == 'string'? this.findElem(params.elem) : params.elem) :
                this.domElem,
            isSimpleBlock = typeof params.block == 'string',
            blockName = isSimpleBlock? params.block : params.block.blockName,
            selector = '.' +
                (isSimpleBlock?
                    buildClass(blockName) :
                    buildClass(blockName, params.block.modName, params.block.modVal)) +
                (params.onlyFirst? ':first' : ''),
            domElems = ctxElem.filter(selector);

        params.select && (domElems = domElems.add(ctxElem[params.select](selector)));

        if(params.onlyFirst) {
            return domElems[0]?
                this._doBlockMethod(
                    initBlock(blockName, domElems.eq(0), true),
                    params.method,
                    params.args) :
                null;
        }

        if(params.method) {
            return $.map(domElems, function(domElem) {
                return _this._doBlockMethod(
                    initBlock(blockName, $(domElem), true),
                    params.method,
                    params.args);
            });
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
     * Выполняет заданный метод, если метод не задан, то возвращает блок
     * @private
     * @param {BEM} block блок
     * @param {String} method имя метода
     * @param {Array} args параметры метода
     */
    _doBlockMethod : function(block, method, args) {

        return method? block[method].apply(block, args || []) : block;

    },

    /**
     * Добавляет обработчик события произвольного DOM-элемента
     * @protected
     * @param {jQuery} domElem DOM-элемент, на котором будет слушаться событие
     * @param {String|Object} event имя события или объект события
     * @param {Function} fn функция-обработчик, будет выполнена в контексте блока
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
     * Добавляет обработчик события на document
     * @protected
     * @param {String} event имя события
     * @param {Function} fn функция-обработчик, будет выполнена в контексте блока
     * @returns {BEM}
     */
    bindToDoc : function(event, fn) {

        this._needSpecialUnbind = true;
        return this.bindToDomElem(doc, event, fn);

    },

    /**
     * Добавляет обработчик события на window
     * @protected
     * @param {String} event имя события
     * @param {Function} fn функция-обработчик, будет выполнена в контексте блока
     * @returns {BEM}
     */
    bindToWin : function(event, fn) {

        this._needSpecialUnbind = true;
        return this.bindToDomElem(win, event, fn);

    },

    /**
     * Добавляет обработчик события на основные DOM-элементы блока или его вложенные элементы
     * @protected
     * @param {jQuery|String} [elem] элемент
     * @param {String} event имя события
     * @param {Function} fn функция-обработчик, будет выполнена в контексте блока
     * @returns {BEM}
     */
    bindTo : function(elem, event, fn) {

        if(!event || $.isFunction(event)) { // если нет элемента
            fn = event;
            event = elem;
            elem = this.domElem;
        } else if(typeof elem == 'string') {
            elem = this.elem(elem);
        }

        return this.bindToDomElem(elem, event, fn);

    },

    /**
     * Удаляет обработчики события произвольного DOM-элемента
     * @protected
     * @param {jQuery} domElem DOM-элемент, на котором будет слушаться событие
     * @param {String} event имя события
     * @returns {BEM}
     */
    unbindFromDomElem : function(domElem, event) {

        domElem.unbind(this._buildEventName(event));
        return this;

    },

    /**
     * Удаляет обработчик события у document
     * @protected
     * @param {String} event имя события
     * @returns {BEM}
     */
    unbindFromDoc : function(event) {

        return this.unbindFromDomElem(doc, event);

    },

    /**
     * Удаляет обработчик события у document
     * @protected
     * @param {String} event имя события
     * @returns {BEM}
     */
    unbindFromWin : function(event) {

        return this.unbindFromDomElem(win, event);

    },

    /**
     * Удаляет обработчики события из основных DOM-элементы блока или его вложенных элементов
     * @protected
     * @param {jQuery|String} [elem] вложенный элемент
     * @param {String} event имя события
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
     * Строит полное имя события
     * @private
     * @param {String} event имя события
     * @returns {String}
     */
    _buildEventName : function(event) {

        var _this = this;
        return event.indexOf(' ') > 1?
            $.map(event.split(' '), function(e) {
                return _this._buildOneEventName(e);
            }).join(' ') :
            _this._buildOneEventName(event);

    },

    /**
     * Строит полное имя для одного события
     * @private
     * @param {String} event имя события
     * @returns {String}
     */
    _buildOneEventName : function(event) {

        var _this = this,
            eventNameCache = _this._eventNameCache;

        if(event in eventNameCache) return eventNameCache[event];

        var uniq = '.' + _this._uniqId;

        if(event.indexOf('.') < 0) return eventNameCache[event] = event + uniq;

        var lego = '.bem_' + _this.__self._name;

        return eventNameCache[event] = $.map(event.split('.'), function(e, i) {
            return i == 0? e + lego : lego + '_' + e;
        }).join('') + uniq;

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
     * Устанавливает модификатор у блока/вложенного элемента
     * @protected
     * @param {jQuery} [elem] вложенный элемент
     * @param {String} modName имя модификатора
     * @param {String} modVal значение модификатора
     * @returns {BEM}
     */
    setMod : function(elem, modName, modVal) {

        if(elem && typeof modVal != 'undefined' && elem.length > 1) {
            var _this = this;
            elem.each(function() {
                _this.setMod($(this), modName, modVal);
            });
            return _this;
        }
        return this.__base(elem, modName, modVal);

    },

    /**
     * Извлекает значение модификатора из CSS-класса DOM-ноды
     * @private
     * @param {String} modName имя модификатора
     * @param {jQuery} [elem] вложенный элемент
     * @param {String} [elemName] имя вложенного элемента
     * @returns {String} значение модификатора
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
     * Извлекает имя/значение списка модификаторов
     * @private
     * @param {Array} [modNames] имена модификаторов
     * @param {Object} [elem] элемент
     * @returns {Object} хэш значений модификаторов по имени
     */
    _extractMods : function(modNames, elem) {

        var res = {},
            extractAll = !modNames.length,
            countMatched = 0;

        $.each((elem || this.domElem)[0].className
            .match(this.__self._buildModValRE(
                '(' + (extractAll? NAME_PATTERN : modNames.join('|')) + ')',
                elem,
                'g')) || [], function(i, className) {
                    var iModVal = (className = $.trim(className)).lastIndexOf(MOD_DELIM),
                        iModName = className.substr(0, iModVal - 1).lastIndexOf(MOD_DELIM);
                    res[className.substr(iModName + 1, iModVal - iModName - 1)] = className.substr(iModVal + 1);
                    ++countMatched;
                });

        // пустые значения модификаторов не отражены в классах, нужно их заполнить пустыми значения
        countMatched < modNames.length && $.each(modNames, function(i, modName) {
            modName in res || (res[modName] = '');
        });

        return res;

    },

    /**
     * Уставливает CSS-класс модификатора на DOM-элемент блока или вложенный элемент
     * @private
     * @param {String} modName имя модификатора
     * @param {String} modVal значение модификатора
     * @param {jQuery} [elem] DOM-элемент
     * @param {String} [elemName] имя элемента
     */
    _afterSetMod : function(modName, modVal, elem, elemName) {

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
        elemName && this.dropElemCache(elemName, modName, modVal);

    },

    /**
     * Находит вложенные в блок элементы
     * @protected
     * @param {String|jQuery} [ctx=this.domElem] элемент, на котором проходит поиск
     * @param {String} names имя (или через пробел имена) вложенного элемента
     * @param {String} [modName] имя модификатора
     * @param {String} [modVal] значение модификатора
     * @returns {jQuery} DOM-элементы
     */
    findElem : function(ctx, names, modName, modVal) {

        if(arguments.length % 2) { // если кол-во аргументов один или три
            modVal = modName;
            modName = names;
            names = ctx;
            ctx = this.domElem;
        } else if(typeof ctx == 'string') {
            ctx = this.findElem(ctx);
        }

        var _self = this.__self,
            selector = '.' +
                $.map(names.split(' '), function(name) {
                    return buildClass(_self._name, name, modName, modVal);
                }).join(',.');
        return findDomElem(ctx, selector);

    },

    /**
     * Находит вложенные в блок элементы
     * @protected
     * @param {String} name имя вложенного элемента
     * @param {String} [modName] имя модификатора
     * @param {String} [modVal] значение модификатора
     * @returns {jQuery} DOM-элементы
     */
    _elem : function(name, modName, modVal) {

        var key = name + buildModPostfix(modName, modVal);
        return this._elemCache[key] || (this._elemCache[key] = this.findElem(name, modName, modVal));

    },

    /**
     * Ленивый поиск вложенных в блок элементы (результат кэшируется)
     * @protected
     * @param {String} names имя (или через пробел имена) вложенных элементов
     * @param {String} [modName] имя модификатора
     * @param {String} [modVal] значение модификатора
     * @returns {jQuery} DOM-элементы
     */
    elem : function(names, modName, modVal) {

        if(names.indexOf(' ') < 0) {
            return this._elem(names, modName, modVal);
        }

        var res = $([]),
            _this = this;
        $.each(names.split(' '), function() {
            res = res.add(_this._elem(this, modName, modVal));
        });
        return res;

    },

    /**
     * Сброс кэша для элементов
     * @protected
     * @param {String} names имя (или через пробел имена) вложенных элементов
     * @param {String} [modName] имя модификатора
     * @param {String} [modVal] значение модификатора
     * @returns {BEM}
     */
    dropElemCache : function(names, modName, modVal) {

        if(names) {
            var _this = this,
                modPostfix = buildModPostfix(modName, modVal);
            names.indexOf(' ') < 0?
                delete _this._elemCache[names + modPostfix] :
                $.each(names.split(' '), function(i, name) {
                    delete _this._elemCache[name + modPostfix];
                });
        } else {
            this._elemCache = {};
        }

        return this;

    },

    /**
     * Извлекает параметры элемента блока
     * @param {String|jQuery} elem элемент
     * @returns {Object} параметры
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
     * Проверяет, находится ли DOM-элемент в блоке
     * @protected
     * @param {jQuery} domElem DOM-элемент
     * @returns {Boolean}
     */
    containsDomElem : function(domElem) {

        return domElem.parents().andSelf().index(this.domElem) > -1;

    },

    /**
     * Строит CSS-селектор, соответствующий блоку/элементу и модификатору
     * @param {String} [elem] имя элемент
     * @param {String} [modName] имя модификатора
     * @param {String} [modVal] значение модификатора
     * @returns {String}
     */
    buildSelector : function(elem, modName, modVal) {

        return this.__self.buildSelector(elem, modName, modVal);

    },

    /**
     * Удаляет блок
     * @param {Boolean} [keepDOM=false] нужно ли оставлять DOM-ноды блока в документе
     */
    destruct : function(keepDOM) {

        var _this = this,
            _self = _this.__self;

        _this._isDestructing = true;

        _this._needSpecialUnbind && _self.doc.add(_self.win).unbind('.' + _this._uniqId);

        _this.dropElemCache().domElem.each(function(i, domNode) {
            $.each(getParams(domNode), function(blockName, blockParams) {
                var block = uniqIdToBlock[blockParams.uniqId];
                block && !block._isDestructing && block.destruct();
            });
            cleanupDomNode(domNode);
        });

        keepDOM || _this.domElem.remove();

        delete uniqIdToBlock[_this.un()._uniqId];
        delete _this.domElem;
        delete _this._elemCache;

        _this.__base();

    }

}, /** @lends BEM.DOM */{

    /**
     * Шорткат для документа
     * @protected
     * @type jQuery
     */
    doc : doc,

    /**
     * Шорткат для window
     * @protected
     * @type jQuery
     */
    win : win,

    /**
     * Осуществляет обработку live-свойств блока
     * @private
     * @param {Boolean} [heedLive=false] нужно ли учитывать то, что блок обрабатывал уже свои live-свойства
     * @returns {Boolean} является ли блок live-блоком
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
     * Инициализирует блоки на фрагменте DOM-дерева
     * @static
     * @protected
     * @param {jQuery} [ctx=document] корневая DOM-нода
     * @param {Function} [callback] обработчик, вызываемый после инициализации
     * @param {Object} [callbackCtx] контекст обработчика
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

    },

    /**
     * Уничтожает блоки на фрагменте DOM-дерева
     * @static
     * @protected
     * @param {Boolean} [keepDOM=false] нужно ли оставлять DOM-ноды в документе
     * @param {jQuery} ctx корневая DOM-нода
     * @param {Boolean} [excludeSelf=false] не учитывать контекст
     */
    destruct : function(keepDOM, ctx, excludeSelf) {

        if(typeof keepDOM != 'boolean') {
            excludeSelf = ctx;
            ctx = keepDOM;
            keepDOM = undefined;
        }

        findDomElem(ctx, '.i-bem', excludeSelf).each(function() {
            $.each(getParams(this), function(blockName, blockParams) {
                if(blockParams.uniqId) {
                    var block = uniqIdToBlock[blockParams.uniqId];
                    block && block.destruct(true);
                }
            });
            cleanupDomNode(this);
        });
        keepDOM || (excludeSelf? ctx.empty() : ctx.remove());

    },

    /**
     * Заменяет фрагмент DOM-дерева внутри контекста, уничтожая старые блоки и инициализируя новые
     * @static
     * @protected
     * @param {jQuery} ctx корневая DOM-нода
     * @param {jQuery|String} content новый контент
     * @param {Function} [callback] обработчик, вызываемый после инициализации
     * @param {Object} [callbackCtx] контекст обработчика
     */
    update : function(ctx, content, callback, callbackCtx) {

        this.destruct(ctx, true);
        this.init(ctx.html(content), callback, callbackCtx);

    },

    /**
     * Строит полное имя live-события
     * @static
     * @private
     * @param {String} e имя события
     * @returns {String}
     */
    _buildCtxEventName : function(e) {

        return this._name + ':' + e;

    },

    _liveClassBind : function(className, e, callback, invokeOnInit) {

        var _this = this;
        if(e.indexOf(' ') > -1) {
            $.each(e.split(' '), function(i, e) {
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
            block && (invokeOnInit || callback.apply(block, arguments));
        };

    },

    /**
     * Хелпер для live-инициализации по событию на DOM-элементах блока или его элементов
     * @static
     * @protected
     * @param {String} [elemName] имя элемента или элементов (через пробел)
     * @param {String} event имя события
     * @param {Function} callback обработчик, вызываемый после успешной инициализации
     */
    liveInitOnEvent : function(elemName, event, callback) {

        return this.liveBindTo(elemName, event, callback, true);

    },

    /**
     * Хелпер для подписки на live-события на DOM-элементах блока или его элементов
     * @static
     * @protected
     * @param {String|Object} [to] описание (объект с modName, modVal, elemName) или имя элемента или элементов (через пробел)
     * @param {String} event имя события
     * @param {Function} callback обработчик
     */
    liveBindTo : function(to, event, callback, invokeOnInit) {

        if(!callback) {
            callback = event;
            event = to;
            to = undefined;
        }

        if(!to || typeof to == 'string') {
            to = { elemName : to };
        }

        var _this = this;

        if(to.elemName && to.elemName.indexOf(' ') > 1) {
            $.each(to.elemName.split(' '), function(i, elemName) {
                _this._liveClassBind(
                    buildClass(_this._name, elemName, to.modName, to.modVal),
                    event,
                    callback,
                    invokeOnInit);
            });
            return _this;
        }

        return _this._liveClassBind(
            buildClass(_this._name, to.elemName, to.modName, to.modVal),
            event,
            callback,
            invokeOnInit);

    },

    /**
     * Хелпер для отписки от live-событий на DOM-элементах блока или его элементов
     * @static
     * @protected
     * @param {String} [elemName] имя элемента или элементов (через пробел)
     * @param {String} event имя события
     * @param {Function} [callback] обработчик
     */
    liveUnbindFrom : function(elemName, event, callback) {

        var _this = this;

        if(elemName.indexOf(' ') > 1) {
            $.each(elemName.split(' '), function(i, elemName) {
                _this._liveClassUnbind(
                    buildClass(_this._name, elemName),
                    event,
                    callback);
            });
            return _this;
        }

        return _this._liveClassUnbind(
            buildClass(_this._name, elemName),
            event,
            callback);

    },

    /**
     * Хелпер для live-инициализации по инициализации другого блока
     * @static
     * @private
     * @param {String} blockName имя блока, на инициализацию которого нужно реагировать
     * @param {Function} callback обработчик, вызываемый после успешной инициализации в контексте нового блока
     * @param {String} findFnName имя метода для поиска
     */
    _liveInitOnBlockInit : function(blockName, callback, findFnName) {

        var name = this._name;
        blocks[blockName].on('init', function(e) {
            var blocks = e.block[findFnName](name);
            callback && $.each(blocks, function() {
                callback.call(this);
            });
        });
        return this;

    },

    /**
     * Хелпер для live-инициализации по инициализации другого блока на DOM-элементе текущего
     * @static
     * @protected
     * @param {String} blockName имя блока, на инициализацию которого нужно реагировать
     * @param {Function} callback обработчик, вызываемый после успешной инициализации в контексте нового блока
     */
    liveInitOnBlockInit : function(blockName, callback) {

        return this._liveInitOnBlockInit(blockName, callback, 'findBlocksOn');

    },

    /**
     * Хелпер для live-инициализации по инициализации другого блока внутри текущего
     * @static
     * @protected
     * @param {String} blockName имя блока, на инициализацию которого нужно реагировать
     * @param {Function} [callback] обработчик, вызываемый после успешной инициализации в контексте нового блока
     */
    liveInitOnBlockInsideInit : function(blockName, callback) {

        return this._liveInitOnBlockInit(blockName, callback, 'findBlocksOutside');

    },

    /**
     * Добавляет обработчик live-события на блок, с учётом заданного элемента,
     * внутри которого будет слушаться событие
     * @static
     * @protected
     * @param {jQuery} [ctx] элемент, внутри которого будет слушаться событие
     * @param {String} e имя события
     * @param {Object} [data] дополнительные данные, приходящие в обработчик как e.data
     * @param {Function} fn обработчик
     * @param {Object} [fnCtx] контекст обработчика
     */
    on : function(ctx, e, data, fn, fnCtx) {

        return ctx.jquery?
            this._liveCtxBind(ctx, e, data, fn, fnCtx) :
            this.__base(ctx, e, data, fn);

    },

    /**
     * Удаляет обработчик live-события у блока, с учётом заданного элемента,
     * внутри которого слушалось событие
     * @static
     * @protected
     * @param {jQuery} [ctx] элемент, внутри которого слушалось событие
     * @param {String} e имя события
     * @param {Function} [fn] обработчик
     * @param {Object} [fnCtx] контекст обработчика
     */
    un : function(ctx, e, fn, fnCtx) {

        return ctx.jquery?
            this._liveCtxUnbind(ctx, e, fn, fnCtx) :
            this.__base(ctx, e, fn);

    },

    /**
     * Добавляет обработчик live-события на блок, с учётом заданного элемента,
     * внутри которого будет слушаться событие
     * @deprecated использовать on
     * @static
     * @protected
     * @param {jQuery} ctx элемент, внутри которого будет слушаться событие
     * @param {String} e имя события
     * @param {Object} [data] дополнительные данные, приходящие в обработчик как e.data
     * @param {Function} fn обработчик
     * @param {Object} [fnCtx] контекст обработчика
     */
    liveCtxBind : function(ctx, e, data, fn, fnCtx) {

        return this._liveCtxBind(ctx, e, data, fn, fnCtx);

    },

    /**
     * Добавляет обработчик live-события на блок, с учётом заданного элемента,
     * внутри которого будет слушаться событие
     * @static
     * @private
     * @param {jQuery} ctx элемент, внутри которого будет слушаться событие
     * @param {String} e имя события
     * @param {Object} [data] дополнительные данные, приходящие в обработчик как e.data
     * @param {Function} fn обработчик
     * @param {Object} [fnCtx] контекст обработчика
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
                $.each(e.split(' '), function(i, e) {
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
     * Удаляет обработчик live-события у блока, с учётом заданного элемента,
     * внутри которого слушалось событие
     * @deprecated использовать un
     * @static
     * @protected
     * @param {jQuery} ctx элемент, внутри которого слушалось событие
     * @param {String} e имя события
     * @param {Function} [fn] обработчик
     * @param {Object} [fnCtx] контекст обработчика
     */
    liveCtxUnbind : function(ctx, e, fn, fnCtx) {

        return this._liveCtxBind(ctx, e, fn, fnCtx);

    },

    /**
     * Удаляет обработчик live-события у блока, с учётом заданного элемента,
     * внутри которого слушалось событие
     * @static
     * @private
     * @param {jQuery} ctx элемент, внутри которого слушалось событие
     * @param {String} e имя события
     * @param {Function} [fn] обработчик
     * @param {Object} [fnCtx] контекст обработчика
     */
    _liveCtxUnbind : function(ctx, e, fn, fnCtx) {

        var _this = this,
            storage = liveEventCtxStorage[e =_this.buildEventName(e)];

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
     * Извлекает имя вложенного в блок элемента
     * @static
     * @private
     * @param {jQuery} elem вложенный элемент
     * @returns {String|undefined}
     */
    _extractElemNameFrom : function(elem) {

        var matches = elem[0].className.match(this._buildElemNameRE());
        return matches? matches[1] : undefined;

    },

    /**
     * Извлекает параметры блока из DOM-элемента
     * @static
     * @param {HTMLElement} domNode DOM-нода
     * @returns {Object}
     */
    extractParams : extractParams,

    /**
     * Строит префикс для CSS-класса DOM-элемента или вложенного элемента блока по имени модификатора
     * @static
     * @private
     * @param {String} modName имя модификатора
     * @param {jQuery|String} [elem] элемент
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
     * Строит регулярное выражение для извлечения значения модификатора из DOM-элемента или вложенного элемента блока
     * @static
     * @private
     * @param {String} modName имя модификатора
     * @param {jQuery|String} [elem] элемент
     * @param {String} [quantifiers] квантификаторы регулярного выражения
     * @returns {RegExp}
     */
    _buildModValRE : function(modName, elem, quantifiers) {

        return new RegExp('(\\s?)' + this._buildModClassPrefix(modName, elem) + '(' + NAME_PATTERN + ')(\\s|$)', quantifiers);

    },

    /**
     * Строит регулярное выражение для извлечения имени вложенного в блок элемента
     * @static
     * @private
     * @returns {RegExp}
     */
    _buildElemNameRE : function() {

        return new RegExp(this._name + ELEM_DELIM + '(' + NAME_PATTERN + ')(?:\\s|$)');

    },

    /**
     * Строит CSS-селектор, соответствующий блоку/элементу и модификатору
     * @param {String} [elem] имя элемент
     * @param {String} [modName] имя модификатора
     * @param {String} [modVal] значение модификатора
     * @returns {String}
     */
    buildSelector : function(elem, modName, modVal) {

        return '.' + buildClass(this._name, elem, modName, modVal);

    },

    /**
     * Возвращает инстанс блока по уникальному идентификатору
     * @deprecated
     * @param {String} [uniqId]
     * @returns {BEM.DOM}
     */
    getBlockByUniqId : function(uniqId) {

        return uniqIdToBlock[uniqId];

    },

    /**
     * Возвращает размер текущего окна
     * @returns {Object} объект с полями width, height
     */
    getWindowSize : function() {

        var winNode = win[0];
        if(typeof winNode.innerWidth != 'undefined')
            return { width : winNode.innerWidth, height : winNode.innerHeight };

        var clientNode = getClientNode();
        return { width : clientNode.clientWidth, height : clientNode.clientHeight };

    }

});

})(BEM, jQuery);
