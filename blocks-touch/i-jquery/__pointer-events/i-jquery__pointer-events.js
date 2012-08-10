/*
 * universal pointer-events plugin
 * универсальные pointer-события
 *
 * Copyright (c) 2010-2011 Kir Belevich (deepsweet@yandex-team.ru)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @version 0.3.1
 */

(function($) {

    var events;

    // тач
    if ('ontouchstart' in window && navigator.userAgent.indexOf('Android') === -1) {
        events = {
            type: 'touch',
            down: 'touchstart',
            move: 'touchmove',
            up: 'touchend',
            cancel: 'touchcancel'
        }
    // ms-поинтер
    } else if (window.navigator.msPointerEnabled) {
        events = {
            type: 'mspointer',
            down: 'MSPointerDown',
            move: 'MSPointerMove',
            up: 'MSPointerUp',
            cancel: 'MSPointerOut'
        }
    // мышь
    } else {
        events = {
            type: 'mouse',
            down: 'mousedown',
            move: 'mousemove',
            up: 'mouseup',
            cancel: 'mouseleave'
        }
    }

    // pointerdown
    $.event.special.pointerdown = {

        // подписываемся
        setup: function() {

            $(this).bind(events.down + '.pointerEvents', function(e) {
                // если мышиные события - запоминаем нажата ли кнопка
                if (events.type == 'mouse') {
                    this._pointerIsDown = true;
                }

                // передаём параметры
                e.pointer = {
                    x: events.type == 'touch' ? e.originalEvent.touches[0].pageX : e.clientX,
                    y: events.type == 'touch' ? e.originalEvent.touches[0].pageY : e.clientY
                }

                // триггерим
                e.type = 'pointerdown';
                $.event.handle.apply(this, arguments);
            });

        },

        // отписываемся и забываем
        teardown: function() {

            $(this).unbind(events.down + '.pointerEvents');

        }

    };

    // pointermove
    $.event.special.pointermove = {

        // подписываемся
        setup: function() {

            $(this).bind(events.move + '.pointerEvents', function(e) {
                // если не мышиные события, или мышиные, но кнопка зажата
                if (events.type != 'mouse' || (events.type == 'mouse' && this._pointerIsDown)) {
                    // передаём параметры
                    e.pointer = {
                        x: events.type == 'touch' ? e.originalEvent.touches[0].pageX : e.clientX,
                        y: events.type == 'touch' ? e.originalEvent.touches[0].pageY : e.clientY
                    }

                    // триггерим
                    e.type = 'pointermove';
                    $.event.handle.apply(this, arguments);
                }
            });

        },

        // отписываемся и забываем
        teardown: function() {

            $(this).unbind(events.move + '.pointerEvents');

        }

    };

    // pointerup
    $.event.special.pointerup = {

        // подписываемся
        setup: function() {

            $(this).bind(events.up + '.pointerEvents', function(e) {
                // если мышиные события, то забываем, что кнопка была зажата
                if (events.type == 'mouse') {
                    delete this._pointerIsDown;
                }

                // триггерим
                e.type = 'pointerup';
                $.event.handle.apply(this, arguments);
            })

        },

        // отписываемся и забываем
        teardown: function() {

            $(this).unbind(events.up + '.pointerEvents');

        }

    };

    // pointercancel
    $.event.special.pointercancel = {

        // подписываемся
        setup: function() {

            $(this).bind(events.cancel + '.pointerEvents', function(e) {
                // если мышиные события, то забываем, что кнопка была зажата
                if (events.type == 'mouse') {
                    delete this._pointerIsDown;
                }

                // триггерим
                e.type = 'pointercancel';
                $.event.handle.apply(this, arguments);
            });

        },

        // отписываемся и забываем
        teardown: function() {

            $(this).unbind(events.cancel + '.pointerEvents');

        }

    };

    // tap
    $.event.special.tap = {

        // подписываемся
        setup: function() {

            // если мышь, то эмулируем тап через обычный клик
            if (events.type == 'mouse') {

                $(this).bind('click.tapEvent', function(e) {
                    e.type = 'tap';
                    $.event.handle.apply(this, arguments);
                });

            } else {

                var touch = {};

                $(this).bind({
                    'pointerdown.tapEvent': function(e) {
                        touch.target = this;
                        touch.x1 = e.pointer.x;
                    },
                    'pointermove.tapEvent': function(e) {
                        touch.x2 = e.pointer.x;
                    },
                    'pointerup.tapEvent': function(e) {
                        // если совсем не было move, или был, но меньше 5 пикселей, то триггерим тап
                        if (!touch.x2 || Math.abs(touch.x2 - touch.x1) < 5) {
                            // предотвращаем мышиные события
                            if (touch.target.nodeType !== 9) {
                                // при обычном превенте появляется-прачется адресный тулбар,
                                // т.е. клик как событие происходит, просто нет действия
                                $(touch.target).bind('click.preventClick', function() {
                                    $(touch.target).unbind('.preventClick');
                                    return false;
                                });

                                // http://cubiq.org/dropbox/clickdelay.html
                                $('body').css('pointer-events', 'none');
                                setTimeout(function() {
                                    $(touch.target).unbind('.preventClick');
                                    $('body').css('pointer-events', 'auto');
                                }, 750);
                            }

                            e.type = 'tap';
                            $.event.handle.apply(this, arguments);
                        }

                        touch = {};
                    },
                    'pointercancel.tapEvent': function() {
                        touch = {};
                    }
                });

            }

        },

        // отписываемся и забываем
        teardown: function() {

            $(this).unbind('.tapEvent');

        }

    };

})(jQuery);
