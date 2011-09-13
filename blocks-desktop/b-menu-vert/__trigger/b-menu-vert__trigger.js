/** @requires BEM */
/** @requires BEM.DOM */

(function() {

BEM.DOM.decl({ name: 'b-menu-vert', baseBlock: 'i-menu' }, {

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

        },
        'item' : {
            'state' : {
                'current' : function(elem) {
                    var _this = this;

                    // открываем все триггеры более верхнего уровня
                    _this.findElem(
                        elem
                            .parents(_this.buildSelector('item-content'))
                            .prev(_this.buildSelector('item')), 'trigger')
                                .each(function() {
                                    _this.setMod($(this), 'state', 'opened');
                                });
                    _this.__base.apply(this, arguments);

                }
            }
        }

    },
    onTriggerClick: function(e) {
        this.toggleMod(e.data.domElem, 'state', 'opened');
    }

}, {

    live : function() {
        this.__base();
        this
            .liveBindTo('trigger', 'leftclick', function(e) {
                this.onTriggerClick(e);
            })
    }

});

})();
