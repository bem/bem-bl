(function($) {
/**
 * @deprecated Will be removed in the next major version. jQuery core has the same method.
 */
$.isEmptyObject || ($.isEmptyObject = function(obj) {
        for(var i in obj) return false;
        return true;
    });

})(jQuery);
