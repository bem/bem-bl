/**
 * css vendor prefixes wrapper for $.fn.css()
 *
 * Copyright (c) 2011-2012 Kir Belevich (deepsweet@yandex-team.ru)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @version 0.2.1
 */

(function($) {

    var prefixes = ['', 'webkit', 'moz', 'o', 'ms'],
        cache = {},
        prevCSS = $.fn.css;

    // верблюдизация
    // -webkit-transform -> WebkitTransform
    function camelize(prop) {

        // костыль для ms, который всегда в lower case
        return prop.replace('-ms-', 'ms-').replace(/-+(.)?/g, function(match, chr) {
            return chr ? chr.toUpperCase() : '';
        });

    };

    // 'transform' -> 'WebkitTransform' || null
    function getPrefixedProp(prop) {

        // если в кэше - вернуть из кэша
        if (prop in cache) {
            return cache[prop];
        }

        var testProp,
            prefix;

        for(var i = 0; i < prefixes.length; i++) {
            prefix = prefixes[i];

            var testProp = prefix ? camelize('-' + prefix + '-' + prop) : prop;

            if (document.documentElement.style[testProp] !== undefined) {
                return cache[prop] = testProp;
            }

        }

        return cache[prop] = null;

    };

    // 'transform' -> 'WebkitTransform' || null
    $.cssPrefixedProp = function(prop) {

        return getPrefixedProp(prop);

    };

    // $(this).css('transform') -> $(this).css('WebkitTransform')
    $.fn.css = function(prop, val) {

        // два аргумента - свойство и значение
        if (arguments.length === 2) {

            return prevCSS.call(this, getPrefixedProp(prop) || prop, val);

        } else {

            // один аргумент - объект
            if (Object.prototype.toString.call(prop) === '[object Object]') {

                var prefixedObj = {};

                for(var k in prop) {
                    prefixedObj[getPrefixedProp(k) || prop] = prop[k];
                }

                return prevCSS.call(this, prefixedObj);

            // один аргумент - свойство
            } else {

                return prevCSS.call(this, getPrefixedProp(prop) || prop);

            }

        }

    };

})(jQuery);