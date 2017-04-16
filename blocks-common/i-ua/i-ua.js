(function(win, ua) {
    var devicePixelRatio = 1,
        isHiDpi;

    // http://stackoverflow.com/questions/16383503/window-devicepixelratio-does-not-work-in-ie-10-mobile
    if ('deviceXDPI' in screen && 'logicalXDPI' in screen) {
        // Internet Explorer
        devicePixelRatio = screen.deviceXDPI / screen.logicalXDPI;
    } else if ('devicePixelRatio' in win) {
        // Standard way
        devicePixelRatio = win.devicePixelRatio;
    }

    /*
    In fact, HiDPI begins from 1.3dppx.
    There is a devices list for example: http://bjango.com/articles/min-device-pixel-ratio/
    124dpi (used for IE) ~ 1.3dppx for now,
    but by standard 'dpi' means dots-per-CSS-inch, not dots-per-physical-inch
    */
    isHiDpi = devicePixelRatio >= 1.3;
    if (typeof win.matchMedia === 'function') {
        var mql = win.matchMedia(
            'only screen and (-webkit-min-device-pixel-ratio: 1.3), ' +
            'only screen and (min-resolution: 1.3dppx), ' +
            'only screen and (min-resolution: 124dpi)'
        );
        if (mql) {
            isHiDpi = mql.matches;
        }
    }

    var browser = {};

    if(/msie|trident/i.test(ua)) {
        browser.ie = parseInt(ua.split(/msie|rv:/i)[1], 10);
    } else if (win.opera) {
        browser.opera = parseInt(win.opera.version(), 10);
    }

    var platform = {},
        device = {},
        match;

    if (match = ua.match(/Android\s+([\d.]+)/)) {
        platform.android = match[1];
    } else if (ua.match(/\sHTC[\s_].*AppleWebKit/)) {
        // фэйковый десктопный UA по умолчанию у некоторых HTC (например, HTC Sensation)
        platform.android = '2.3';
    } else if (match = ua.match(/iPhone\sOS\s([\d_]+)/)) {
        platform.ios = match[1].replace(/_/g, '.');
        device.iphone = true;
    } else if (match = ua.match(/iPad.*OS\s([\d_]+)/)) {
        platform.ios = match[1].replace(/_/g, '.');
        device.ipad = true;
    } else if (match = ua.match(/Bada\/([\d.]+)/)) {
        platform.bada = match[1];
    } else if (match = ua.match(/Windows\sPhone[^\d]*\s([\d.]+)/)) {
        platform.wp = match[1];
    } else if (match = ua.match(/MSIE\s9/)) {
        platform.wp = '7.5';
    } else {
        platform.other = true;
    }

    /**
     * Block for gathering and providing UserAgent information
     */
    BEM.DOM.decl('i-ua', {

        onSetMod: {
            js: function() {
                var self = this.__self;

                this.setMod('platform',
                    self.ios ? 'ios' :
                    self.android ? 'android' :
                    self.bada ? 'bada' :
                    self.wp ? 'wp' :
                    self.opera ? 'opera' :
                    'other'
                );

                self.hiDpi && this.setMod('hi-dpi', 'yes');
            }
        }
    }, {
        ios: platform.ios,
        iphone: device.iphone,
        ipad: device.ipad,
        android: platform.android,
        bada: platform.bada,
        wp: platform.wp,
        other: platform.other,
        dpr: devicePixelRatio,
        hiDpi: isHiDpi,
        ua: ua,
        ie: browser.ie,
        opera: browser.opera
    });

})(window, navigator.userAgent);
