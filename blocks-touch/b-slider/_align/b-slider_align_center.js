/**
 * Слайдер
 *
 * Центрует слайдер, чтобы активная рубрика была по середине.
 *
 */
BEM.DOM.decl({ block: 'b-slider', modName: 'align', modVal: 'center' }, {

    onSetMod: {

        js: {
            inited: function() {
                'use strict';

                var self = this;

                self.__base.apply(self, arguments);

                // прячем this в замыкание
                self._correctToCenter  = self._correctToCenter.bind(self);

                // небольшая задержка, чтобы дать блоку дорисоваться
                // для дальнейших расчетов позиционирования
                setTimeout(self._correctToCenter, 1000);

                // при смене ориентации скорректировать по центру
                BEM.DOM.win.bind('orientchange', self._correctToCenter);

            }
        }

    },

    destruct: function() {
        'use strict';

        var self = this;

        self.__base.apply(self, arguments);

        BEM.DOM.win.unbind('orientchange', self._correctToCenter);
    },

    /*
     * Корректируем слайдер по центру
     */
    _correctToCenter: function() {
        'use strict';

        // минимальный сдвиг
        var self = this,
            active_item = self.findElem('active-item');

        if (!active_item.length) {
            return;
        }

        self._calcParams();

        var minX = 0,

            // максимальный сдвиг
            maxX = self._width - self._parentWidth,

            // складываем текущее смещение активного элемента и половину его высоты
            x = active_item.offset().left + active_item.outerWidth()/2
                // и вычитаем половину ширины родителя и текущее смещение слайдера
                - self._parentWidth/2 - self._currentX;

        // если maxX < 0, значит родитель больше слайдера и корректировка не нужна
        if ( x > minX && maxX > 0) {
            self._currentX = -((x < maxX) ? x : maxX);
            self._correct();
        }
    }
});
