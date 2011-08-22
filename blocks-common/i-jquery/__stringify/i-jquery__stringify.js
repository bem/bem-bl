/**
 * Stringify plugin 1.0.0
 *
 * Copyright (c) 2010 Filatov Dmitry (alpha@zforms.ru)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function($, undefined) {
    if(typeof JSON != 'undefined') {
        return $.stringify = JSON.stringify;
    }
    var _toString = Object.prototype.toString;
    $.stringify = function(value) {
        if(value === null) {
            return 'null';
        }
        switch(_toString.call(value)) {
            case '[object String]':
                return '"' + value.replace(/"/g, '\\"') + '"';
            case '[object Number]':
            case '[object Boolean]':
                return '' + value;
            case '[object Array]':
                var res = '[', i = 0, len = value.length, strValue;
                while(i < len) {
                    strValue = $.stringify(value[i]);
                    res += (i++ > 0? ',' : '') + (typeof strValue == 'undefined'? 'null' : strValue);
                }
                return res + ']';
            case '[object Object]':
                var res = '{', i = 0, strValue;
                for(var key in value) {
                    if(value.hasOwnProperty(key)) {
                        strValue = $.stringify(value[key]);
                        typeof strValue != 'undefined' && (res += (i++ > 0? ',' : '') + '"' + key + '":' + strValue);
                    }
                }
                return res + '}';
            default:
                return undefined;
        }
    };

    window.JSON = {
        stringify: $.stringify
    };
})(jQuery);
