/** @requires BEM.DOM */

(function() {

BEM.DOM.decl('b-menu-reaction', {

    onSetMod : {
        'js' : function() {

            var _this = this;

            this.findBlockInside(this.elem('menu'), 'b-menu-vert').on('current', function(e, data){

                _this.elem('panel').html('Load ' + this.elemParams(data.current)['handler-url']);

            })
        }
    }

});

})();
