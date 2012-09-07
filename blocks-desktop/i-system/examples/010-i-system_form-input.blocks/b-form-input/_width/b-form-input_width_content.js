(function(){

var insets = [],
    lastVisibleInset = -1;

BEM.DOM.decl({ name: 'b-form-input', modName: 'width', modVal: 'content' }, {

    onSetMod : {

        js : function() {

            this.__base();

            // создаем линейку, которой будем мерять длину инпута
            this.domElem.append(
                $(BEM.HTML.build({ block: this.__self.getName(), elem: 'width-ruler', tag: 's' })));

            this
                ._initFont() // выставляем линейке такой же шрифт, как в инпуте, чтобы ширина совпадала
                ._initShift() // запоминаем, какой должен быть запас свободного места для ввода у инпута

                .on('change', this._setWidth) // вешаем пересчёт ширины инпута на изменение значения

                .bindToWin('resize', this._resetMaxWidth) // вешаем пересчёт максимальной ширины на ресайз окна

                .bindTo('box', 'leftclick', function(e) { // по клику в боксе ставим фокус на инпут
                    e.target == this.elem('clear')[0] ||
                    e.target == this.elem('input')[0] ||
                    this.findBlockOutside($(e.target), 'b-search-filter') ||
                        this.setMod('focused', 'yes');
                })
        }

    },

    _initFont : function() {

        setFont(this.elem('width-ruler'), this.elem('input'));

        return this;

    },

    _initShift : function() {

        this._shiftWidth = parseFloat(this.elem('width-ruler').css('paddingRight')); // запоминаем запас справа

        this.elem('width-ruler').css('paddingRight', 0); // обнуляем запас справа

        return this
                   ._setShiftWidth() // обнуляем правый маргин у инпута, т.к. по дефолту в строке нет токенов
                   ._updateInsetsWidth(); // обнуляем суммарную ширину токенов в строке

    },

    _setWidth : function() {

        if (lastVisibleInset >= 0) { // если в строке есть токены

            // считаем, какой длины у нас линейка — это идеальный вариант длины, когда виден весь запрос
            var rulerWidth = this.elem('width-ruler')
                            .text(this._val)
                            .width();

            if (this._maxWidth > rulerWidth) { // если хватает места в строке для инпута

                if (insets.length > lastVisibleInset + 1 && insets[lastVisibleInset + 1].width < this._maxWidth - rulerWidth) {
                    // если хватает места для показа первого скрытого токена — показываем его
                    return this._showHiddenInset(); // показываем первый невидимый токен
                }

                this._setShiftWidth();

            } else { // если не хватает места для инпута

                if (lastVisibleInset && insets.length > 1) {
                    // если есть токены, которые можно скрыть (должен остаться хотя бы один) — скрываем
                    return this._hideLastInset(); // скрываем последний видимый токен

                } else {
                    // если нечего скрывать, фиксируем ширину инпута в доступных рамках
                    rulerWidth = this._maxWidth - this._shiftWidth;
                    this._setShiftWidth(this._shiftWidth);

                }

            }

            rulerWidth += this._shiftWidth; // добавляем запас, который запомнили в начале

            this.elem('input').width(Math.floor(rulerWidth));

        } else { // если нет токенов

            if (insets.length) { // если есть токены для показа
                return this._showHiddenInset(); // показываем первый невидимый токен
            }

            this.elem('input').width('100%'); // выставляем ширину 100%

        }

        return this;

    },

    _setShiftWidth : function(shift) {

        this.elem('input').css('marginRight', shift || 0);

        return this;

    },

    _resetMaxWidth : function() {

        this.elem('input').hide(); // скрываем инпут, чтобы замерить ширину контейнера
        var availableWidth = this.elem('box').width() - this._shiftWidth - this._insetsWidth;
        this.elem('input').show();

        if (this._maxWidth != availableWidth) {

            this._maxWidth = availableWidth;
            this._setWidth();
        }

        return this;

    },

    _updateInsetsWidth : function(widthShift) {

        this._insetsWidth = (this._insetsWidth || 0) + (widthShift ? widthShift : 0);

        return this._resetMaxWidth();

    },

    _hideLastInset : function() {

        insets[lastVisibleInset].isVisible = false;
        insets[lastVisibleInset].domElem.hide();

        lastVisibleInset--;

        return this._updateInsetsWidth(-insets[lastVisibleInset + 1].width);

    },

    _showHiddenInset : function() {

        lastVisibleInset++;

        insets[lastVisibleInset].isVisible = true;
        insets[lastVisibleInset].domElem.show();

        return this._updateInsetsWidth(insets[lastVisibleInset].width);

    },

    appendInset : function(html) {

        var inset = $(html).hide();

        this.elem('input').after(inset);

        BEM.DOM.init(inset, function() {

            var insetWidth = Math.ceil(0.5 + inset.outerWidth() + parseFloat(inset.css('marginLeft')) + parseFloat(inset.css('marginRight')));

            insets.unshift({
                    domElem: inset.show(),
                    width: insetWidth,
                    isVisible: true
                });

            lastVisibleInset++;

            this._updateInsetsWidth(insetWidth);

        }, this);

        return this;

    },

    removeInset : function(inset, excludeSelf) {

        var _this = this,
            currentInsetId = inset.bem('b-search-filter').params.uniqId;

        $.each(insets, function(i) {

            if (insets[i].domElem.bem('b-search-filter').params.uniqId == currentInsetId) {

                var visible = insets[i].isVisible,
                    width = insets[i].width;

                BEM.DOM.destruct(inset, excludeSelf);
                inset.remove();
                insets.splice(i, 1);

                if (visible) {
                    lastVisibleInset--;
                    _this._updateInsetsWidth(-width);
                }

                visible && _this._setWidth();

                return false;

            }

        });

    },

    removeInsets : function() {
        return this._updateInsetsWidth(-this._insetsWidth);
    },

    resetWidth : function() {
        return this._resetMaxWidth();
    }

});

var fontProps = ['font-size', 'font-family'];

function setFont(toElem, fromElem) {
    if (toElem && fromElem)
        for(var i = fontProps.length; i--;) {
            var prop = fontProps[i];
            toElem.css(prop, fromElem.css(prop));
        }
    return toElem;
}

})();
