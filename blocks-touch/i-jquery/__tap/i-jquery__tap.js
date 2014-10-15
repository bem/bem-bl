/**
 * Плагин предназначен для эмуляции события tap для touch-платформ.
 * Создан для сохранения обратной совместимости
 * на проектах, использующих одноверменно islands-библиотек и romochka
 */

(function($) {

var tap = $.event.special.tap = {

    setup : function() {

        $(this).bind('click', tap.handler);

    },

    teardown : function() {

        $(this).unbind('click', tap.handler);

    },

    handler : function(e) {

        if(!e.button) {
            e.type = 'tap';
            $.event.dispatch.apply(this, arguments);
            e.type = 'click';
        }

    }

};

})(jQuery);
