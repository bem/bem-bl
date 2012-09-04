/** @requires BEM.DOM */

(function() {

BEM.DOM.decl('b-link-reaction', {

    onSetMod : {
        'js' : function() {

            var link = this.findBlockInside('b-link');

            link.on('click', function(){
                link.elem('inner').html('Clicked link');
            })
        }
    }

});

})();
