(function($) {

var HTML = BEM.HTML,
    DOM = BEM.DOM,

    /** {HTMLElement} */
    activeNode;

// LEGO-3098
$(function() {
    $(window).bind('focus', function() {
        activeNode = document.activeElement;
    });
});

DOM.decl({ name : 'b-form-input', modName : 'autocomplete', modVal : 'yes' }, {

    onSetMod : {

        'js' : function() {

            var _this = this;

            _this.params.foot && (_this.foot = _this.params.foot); // упячка!

            _this._preventRequest = true;

            _this.__base.apply(_this, arguments);

            // последнее значение, введенное пользователем с клавиатуры
            _this._userVal = _this.val();

            // выключаем браузерный автокомплит
            var focused = _this._focused;
            focused && _this.delMod('focused');
            _this.elem('input').attr('autocomplete', 'off');
            _this._preventRequest = false;
            focused && _this.setMod('focused', 'yes');

            _this._items = [];
            _this._curItemIndex = -1;

            _this._doRequest = $.debounce(_this._doRequest, 50);

        },

        'focused' : {

            'yes' : function() {

                this.__base();
                this.on('change', this._onChange());

            },

            '' : function() {

                this.__base();
                this
                    .un('change', this._onChange)
                    ._preventHide || this._getPopup().hide();

            }

        }

    },

    /**
     * Возвращает dataprovider
     */
    getDataprovider: function() {

        return this._dataprovider || (this._dataprovider = BEM.create(
            this.params.dataprovider.name || this.__self.getName() + '__dataprovider',
            $.extend(this.params.dataprovider, { callbackCtx : this })));

    },

    _onChange : function() {

        /**
         * (LEGO-3098) Не отправлять запрос и не показывать попап
         * при переключении между вкладками
         */
        activeNode === this.elem('input')[0] ?
            activeNode = null :
            this._preventRequest || this._doRequest();

        return this._onChange;

    },

    _onKeyDown : function(e) {

        if(e.keyCode == 38 || e.keyCode == 40) {
            e.preventDefault();
            var len = this._items.length;
            if(len) {
                var direction = e.keyCode - 39, // пользуемся особенностями кодов клавиш "вверх"/"вниз" ;-)
                    index = this._curItemIndex,
                    i = 0;

                do {
                    index += direction;
                    index = index < 0? len - 1 : index >= len? 0 : index;
                } while(this._onEnterItem(this._items[index], true) === false && ++i < len);
            }
        }

    },

    _onKeyPress : function(e) {

        if(e.keyCode == 13 && this._curItemIndex > -1) {
            e.preventDefault();
            this._onSelectItem(this._items[this._curItemIndex], true);
        }

    },

    /**
     * Ленивое получение попапа
     * @returns {BEM} блок попапа
     */
    _getPopup : function() {

        var _this = this;
        if(!_this._popup) {
            var keyDownEvent = $.browser.opera? 'keypress' : 'keydown',
                block = _this.__self.getName(),
                content = [{ elem : 'items', tag : 'ul', mix : [{ block : block, elem : 'popup-items' }]},
                    { block: 'b-form-input', elem: 'shadow', tag: 'i' }
                ];

            _this._hasPopupFade() && content.push({ block : block, elem : 'fade' });

            _this._popup = $(HTML.build({
                    block : 'i-popup',
                    mix : [{
                        block : block,
                        elem : 'popup',
                        mods : _this.params.popupMods
                    }],
                    content : content
                })).bem('i-popup')
                    .on({
                        'show' : function() {
                            _this
                                .bindTo('keypress', _this._onKeyPress)
                                .bindTo(keyDownEvent, _this._onKeyDown)
                                .bindToWin('resize', _this._updatePopupPos);
                        },
                        'outside-click' : function(e, data) {
                            _this.containsDomElem($(data.domEvent.target)) && e.preventDefault();
                        },
                        'hide' : function() {
                            _this
                                .unbindFrom('keypress ' + keyDownEvent)
                                .unbindFromWin('resize')
                                ._curItemIndex = -1;
                        }
                    });

            // при первом создании попапа подписываемся на live-события его элементов
            $.each({
                    mouseover : _this._onEnterItem,
                    mouseout  : _this._onLeaveItem,
                    mousedown : _this._onSelectItem
                }, function(e, fn) {
                    BEM.blocks['b-autocomplete-item'].liveCtxBind(_this._popup.domElem, e, function(e) {
                        fn.call(_this, e.block);
                    });
                });
        }

        return _this._popup;

    },

    _hasPopupFade : function() {

        return (this.params.popupMods || {}).fade == 'yes';

    },

    _updatePopupPos : function() {

        var box = this.elem('box'),
            css = box.offset();

        css.top += box.outerHeight();
        this._hasPopupFade() && (css.width = box.outerWidth());

        this._getPopup().show(css);

    },

    _onEnterItem : function(item, byKeyboard) {

        if(item.hasMod('enterable', 'no')) return false;

        var items = this._items,
            index = this._curItemIndex;

        index > -1 && items[index].delMod('hovered');
        index = this._getItemIndex(item);
        index > -1 && items[this._curItemIndex = index].setMod('hovered', 'yes');

        if(byKeyboard && this.params.updateOnEnter) {
            this._preventRequest = true;
            this
                .val(
                    item.enter() !== false? item.val() : this._userVal,
                    { source : 'autocomplete', itemIndex: this._curItemIndex })
                .del('_preventRequest');
        }

    },

    _onLeaveItem : function(item) {

        var index = this._curItemIndex;
        if(index > -1 && index == this._getItemIndex(item)) {
            this._items[index].delMod('hovered');
            this._curItemIndex = -1;
        }

    },

    _onSelectItem : function(item, byKeyboard) {

        if(item.hasMod('enterable', 'no'))
            return this.afterCurrentEvent(function() {
                this.setMod('focused', 'yes');
            });

        var needUpdate = item.select(byKeyboard || false) !== false;
        this._preventRequest = true;
        needUpdate && this
            .val(
                this._userVal = item.val(),
                { source : 'autocomplete', itemIndex: this._curItemIndex })
            ._getPopup().hide();

        if(byKeyboard) {
            this.del('_preventRequest');
        } else {
            needUpdate || (this._preventHide = true);
            this.afterCurrentEvent(function() {
                this
                    .setMod('focused', 'yes')
                    .del('_preventRequest', '_preventHide');
            });
        }

        needUpdate && this.trigger('select', { item: item, byKeyboard: byKeyboard });

    },

    _getItemIndex : function(item) {

        return $.inArray(item, this._items);

    },

    _doRequest : function() {

        var _this = this;
        _this._userVal = _this.val();
        _this
            .trigger('data-requested')
            .getDataprovider().get(
                _this.val(),
                function(data) {
                    _this.trigger('data-received', data);

                    var popup = _this._getPopup(),
                        dataItems = data.items || data;

                    _this.foot && dataItems.length && ($.inArray(_this.foot, dataItems) == -1) && dataItems.push(_this.foot);

                    if(dataItems.length) {
                        _this._curItemIndex = -1;
                        DOM.update(popup.elem('items'), _this._buildItemsHtml(dataItems), function() {
                            _this._updatePopupPos();
                            _this._items = popup.findBlocksInside('b-autocomplete-item');
                            _this.trigger('update-items');
                        });
                    } else {
                        popup.hide();
                    }
                });

    },

    _buildItemsHtml : function(data) {

        return HTML.build($.map(data, function(data, i) {
            return {
                block : 'b-autocomplete-item',
                data  : data,
                mods  : { type : $.isArray(data)? data[0] : 'text' }
            };
        }));

    },

    getDefaultParams : function() {

        return $.extend(this.__base(), {
            updateOnEnter : true
        });

    }

});

})(jQuery);
