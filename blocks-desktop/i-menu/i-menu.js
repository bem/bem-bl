/**
 * @module i-menu
 */
(function() {

/**
 * Abstract menu (helper)
 *
 * @exports
 * @class i-menu
 * @bem
 */
BEM.DOM.decl('i-menu', /** @lends i-menu.prototype */{

    onElemSetMod : {

        'item' : {

            'state': {

                'current' : function(elem, modName, modVal, oldModVal) {

                    if (oldModVal == 'disabled') return false;

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

    /**
     * Set 'state' mod on item-selector Click event
     *
     * @param {events:Event} e
     */
    onItemSelectorClick : function(e) {

        var item = this._getItemByEvent(e);
        this.setMod(item, 'state', 'current');

    },

    _getItemByEvent : function(e) {
        return e.data.domElem.closest(this.buildSelector('item'));
    }

}, /** @lends i-menu */{

    live : function() {
        this.liveBindTo('item-selector', 'leftclick', function(e) {
            this.onItemSelectorClick(e);
        });
    }

});

})();
