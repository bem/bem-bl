(function(win) {
    var devicePixelRatio = 1,
        isHiDpi = false;

    // http://stackoverflow.com/questions/16383503/window-devicepixelratio-does-not-work-in-ie-10-mobile
    if ('deviceXDPI' in screen && 'logicalXDPI' in screen) {
        // Internet Explorer
        devicePixelRatio = screen.deviceXDPI / screen.logicalXDPI;
    } else if ('devicePixelRatio' in win) {
        // Standard way
        devicePixelRatio = win.devicePixelRatio;
    }

    if (typeof win.matchMedia === 'function') {
        // In fact, HiDPI begins from 1.3dppx.
        // There is a devices list for example: http://bjango.com/articles/min-device-pixel-ratio/
        // 124dpi ~ 1.3dppx
        var hiDpiQuery =
            'only screen and (-webkit-min-device-pixel-ratio: 1.3), ' +
            'only screen and (min-resolution: 124dpi)';
        isHiDpi = win.matchMedia(hiDpiQuery).matches;
    } else {
        isHiDpi = (devicePixelRatio >= 1.3);
    }

    /**
     * Block for gathering and providing UserAgent information
     */
    BEM.DOM.decl('i-ua', {

        onSetMod: {
            js: function() {
                var _this = this,
                    self = _this.__self;

                self.hiDpi && _this.setMod('hi-dpi', 'yes');
            }
        }

    }, {
        dpr: devicePixelRatio,
        hiDpi: isHiDpi
    });

})(window);
