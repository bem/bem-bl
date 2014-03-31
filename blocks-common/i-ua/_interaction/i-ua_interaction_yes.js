/*
 * Block to determine how the user interacts with the page.
 * Distinguishes interaction with a keyboard or mouse/finger.
 */
BEM.DOM.decl({ block: 'i-ua', modName: 'interaction', modVal: 'yes' }, {}, {

    live: function() {

        this
            .liveBindTo('mousedown', this._onPointer)
            .liveBindTo('keydown', this._onKeyboard);

    },

    /**
     * @private
     */
    _onPointer: function() {
        /* this – instance */
        this.domElem.attr('data-interaction', 'pointer');

        var __self = this.__self;

        __self
              .liveUnbindFrom('mousedown', __self._onPointer)
              .liveBindTo('keydown', __self._onKeyboard);
    },

    /**
     * @private
     */
    _onKeyboard: function() {
        /* this – instance */
        this.domElem.attr('data-interaction', 'keyboard');

        var __self = this.__self;

        __self
               .liveUnbindFrom('keydown', __self._onKeyboard)
               .liveBindTo('mousedown', __self._onPointer);
    }

});
