// TODO: кто это писал? почему так много пустых строк?

BEM.DOM.decl('b-form-input', {

    onSetMod : {

        'js' : function() {

            this.__base();
            this.params.autoFocus || this._updateHint();

        }

    },

    onChange : function() {

        return this.__base()._updateHint();

    },

    onFocus : function() {

        return this.__base()._updateHint();

    },

    onBlur : function() {

        return this.__base()._updateHint();

    },

    _updateHint : function() {

        var hint = this.elem('hint');
        hint[0] &&
            (this.isFocused() || this.val()?
                (this._hintShowed && (this.delMod(hint, 'visibility')._hintShowed = false)) :
                (this._hintShowed || (this.setMod(hint, 'visibility', 'visible')._hintShowed = true)));

        return this;

    }

});
