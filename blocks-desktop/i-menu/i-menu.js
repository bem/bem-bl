/** @requires BEM */
/** @requires BEM */

(function() {

BEM.DOM.decl('i-menu', {

    onElemSetMod : {

        'item' : {

            'state': {

                'current' : function(elem) {

                    var prev = this.elem('item', 'state', 'current');
                    this
                        .delMod(prev, 'state')
                        .trigger('current', {
                            prev    : prev,
                            current : elem
                        });
                }
            }
        }
    },
    onItemSelectorClick : function(e) {

        var item = this._getItemByEvent(e);
        this.hasMod(item, 'state', 'disabled') || this.setMod(item, 'state', 'current');

    },

    _getItemByEvent : function(e) {
        return e.data.domElem.closest(this.buildSelector('item'));
    }

}, {

    live : function() {
        this.liveBindTo('item-selector', 'leftclick', function(e) {
            this.onItemSelectorClick(e);
        });
    }

});

})();
