BEM.DOM.decl('b-form-input', {

    onSetMod : {

        'js' : function() {

            this.__base.apply(this, arguments);
            (this._hasHint = !!this.elem('hint')[0]) &&
                this
                    .on('change', this._updateHint)
                    ._updateHint();

        },

        'focused' : function() {

            this.__base.apply(this, arguments);
            this._hasHint && this._updateHint();

        }

    },

    /**
     * Показывает/скрывает хинт
     * @private
     */
    _updateHint : function() {

        this.toggleMod(this.elem('hint-wrap'), 'visibility', 'visible', !(this._focused || this.val()));

    }

});
