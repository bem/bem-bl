(function(win) {
    var devicePixelRatio = 1;

    // http://stackoverflow.com/questions/16383503/window-devicepixelratio-does-not-work-in-ie-10-mobile
    if ('deviceXDPI' in screen && 'logicalXDPI' in screen) {
        // Internet Explorer
        devicePixelRatio = screen.deviceXDPI / screen.logicalXDPI;
    } else if ('devicePixelRatio' in window) {
        // Standard way
        devicePixelRatio = window.devicePixelRatio;
    }

    /**
     * Block for gathering and providing UserAgent information
     */
    BEM.DOM.decl('i-ua', {}, {
        dpr: devicePixelRatio,
    });

})(window);
