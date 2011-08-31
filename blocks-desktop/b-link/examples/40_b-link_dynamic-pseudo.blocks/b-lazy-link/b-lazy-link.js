/** @requires BEM */
/** @requires BEM.DOM */

(function() {

BEM.DOM.decl('b-lazy-link', {

    onSetMod : {
        'js' : function() {
            var _this = this,
                _link = this.findBlockOn('b-link');
            console.log(_link);
            setTimeout(function(){
                    _link.setMod('pseudo', 'yes')
                }, 5000);
        }
    }

}, {

    live : false

});

})();
