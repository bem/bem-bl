(function(BEM, $, undefined) {

    BEM.decl('i-bem__dom', {}, {

        _liveClassBind: function(className, e, callback, invokeOnInit) {
            var _this = this;

            if(e.indexOf(' ') < 0 && e === 'tap') {
                var origCallback = callback;
                callback = function() {
                    // при обычном превенте появляется-прачется адресный тулбар,
                    // т.е. клик как событие происходит, просто нет действия
                    _this.doc.bind('click.preventClick', function() {
                        _this.doc.unbind('.preventClick');
                        return false;
                    });

                    // http://cubiq.org/dropbox/clickdelay.html
                    $('body').css('pointer-events', 'none');
                    setTimeout(function() {
                        _this.doc.unbind('.preventClick');
                        $('body').css('pointer-events', 'auto');
                    }, 750);

                    origCallback.apply(this, arguments);
                }
            }

            return this.__base(className, e, callback, invokeOnInit);
        }

    });

})(BEM, jQuery);