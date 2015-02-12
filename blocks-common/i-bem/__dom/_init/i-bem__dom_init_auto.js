/**
 * Auto initialization on DOM ready
 */

// Support for YModules
if (typeof modules === 'object') {
    // Implementation from bem-core#2.5.0
    modules.require(['i-bem__dom_init'], function(init) {
        $(function() {
            BEM.afterCurrentEvent(init);
        });
    });
} else {
    $(function() {
        BEM.afterCurrentEvent(function() {
            BEM.DOM.init();
        });
    });
}
