/*
 * $.event.show - специальное событие jQuery, отслеживающее появление элемента в видимой области страницы.
 * Пример: $("#element").one("show", function(){ $.getScript("http://the_url_for_submitting_tracking_data") });
 */
(function($){

$.event.special.show = {
    setup: function() {
        var _this = this, $this = $(this);

        $this
            .data('jqueryShow.check', function(event){
                var offset = $this.data('jqueryShow.offset');
                if (!offset) return;

                var $window = $(window),
                    windowHeight = $window.height(),
                    windowWidth = $window.width(),
                    scrollTop = $window.scrollTop(),
                    scrollLeft = $window.scrollLeft();

                if (offset.left + _this.offsetWidth >= scrollLeft &&
                    offset.left < scrollLeft + windowWidth &&
                    offset.top + _this.offsetHeight >= scrollTop &&
                    offset.top < scrollTop + windowHeight)
                {
                    if (!$this.data('jqueryShow.shown')) {
                        event.type = 'show';
                        $.event.handle.apply(_this, arguments);
                        $this.data('jqueryShow.shown', true);
                    }
                } else {
                    $this.data('jqueryShow.shown', false);
                }
            })
            .data('jqueryShow.recalculate', function(){
                $this.data('jqueryShow.offset', $this.offset());
            });

        $(window)
            .bind('resize load', $this.data('jqueryShow.recalculate'))
            .bind('resize load scroll', $this.data('jqueryShow.check'));
    },

    teardown: function() {
        var $this = $(this);
        $(window)
            .unbind('resize load', $this.data('jqueryShow.recalculate'))
            .unbind('resize load scroll', $this.data('jqueryShow.check'));
    }
};

})(jQuery);
