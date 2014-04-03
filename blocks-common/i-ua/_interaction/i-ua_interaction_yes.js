/*
 * Block to determine how the user interacts with the page.
 * Distinguishes interaction with a keyboard or mouse/finger.
 * For performance reason this code use data-attr `data-interaction` instead `setMod` (which switch css class and
 * always trigger repaint)
 */
(function() {

    var INTERACTKEYS = {
        9: 'tab',
        13: 'enter',
        32: 'space',
        33: 'page up',
        34: 'page down',
        35: 'end',
        36: 'home',
        37: 'left arrow',
        38: 'up arrow',
        39: 'right arrow',
        40: 'down arrow',
        46: 'delete'
    };

    var INTERACTDISABLEKEYS = {
        27: 'escape'
    };

    BEM.DOM.decl({
        block: 'i-ua',
        modName: 'interaction',
        modVal: 'yes' }, {

        /**
         * @private
         */
        _onPointer: function() {
            this.dataInteractionKeyboard = false;
            this.domElem.attr('data-interaction', 'pointer');

            this.__self.liveUnbindFrom('mousedown', this._onPointer);
        },

        /**
         * @private
         */
        _onKeyboard: function(e) {

            var keyCode = e.keyCode;

            if(INTERACTDISABLEKEYS[keyCode]) {
                this._onPointer();
                return;

            } else if(!INTERACTKEYS[keyCode]) {
                return;
            }

            if(this.dataInteractionKeyboard) {
                return;
            }

            this.domElem.attr('data-interaction', 'keyboard');
            this.dataInteractionKeyboard = true;

            this.__self.liveBindTo('mousedown', this._onPointer);
        }

    }, {

        live: function() {
            this
                .liveBindTo('mousedown', this.prototype._onPointer)
                .liveBindTo('keydown', this.prototype._onKeyboard);
        }

    });

}());
