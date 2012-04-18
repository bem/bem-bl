(function(BEM, $, undefined) {

    BEM.decl('i-bem__dom', {}, {

        _liveClassBind: function(className, e, callback, invokeOnInit) {
            var _this = this;

            if(e.indexOf(' ') < 0 && e === 'tap') {
                var origCallback = callback;
                callback = function() {
                    // при обычном превенте появляется-прачется адресный тулбар,
                    // т.е. клик как событие происходит, просто нет действия

                    // 450ms - http://cubiq.org/dropbox/clickdelay.html
                    $('body').css('pointer-events', 'none');
                    setTimeout(function() {
                        $('body').css('pointer-events', 'auto');
                    }, 450);

                    origCallback.apply(this, arguments);
                }
            }

            return this.__base(className, e, callback, invokeOnInit);
        }

    });

})(BEM, jQuery);