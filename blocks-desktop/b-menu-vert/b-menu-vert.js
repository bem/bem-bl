/** @requires BEM */
/** @requires BEM.DOM */

(function() {

BEM.DOM.decl('b-menu-vert', {

    onElemSetMod : {

        'trigger' : {

            'state' : function(elem, modName, modVal) {

                this
                .toggleMod(
                    this.findElem(elem.closest(this.buildSelector('layout-unit')), 'item-content').eq(0),
                    'visibility',
                    'visible',
                    modVal == 'opened')
                .trigger('trigger', {
                    domElem : elem,
                    state : modVal
                });
            }

        }

    },
    onTriggerClick: function(e) {
        this.toggleMod(e.data.domElem, 'state', 'opened');
    }

}, {

    live : function() {
        this
            .liveBindTo('trigger', 'leftclick', function(e) {
                this.onTriggerClick(e);
            })
    }

});

})();
