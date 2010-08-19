BEM.DOM.decl('b-form-input', {

    onSetMod : {

        'js' : function() {

            var input = this.elem('input'),
                _self = this.__self;

            this._val = input.val();
            this._focused = false;

            this
                .bindTo(input, {
                    'focus' : this.onFocus,
                    'blur'  : this.onBlur
                });

            this.params.autoFocus && this.focus();

            if(!_self._instances) {
                var instances = _self._instances = [];
                (function() {
                    $.each(instances, function() {
                        this.val(this.elem('input').val());
                    });
                    setTimeout(arguments.callee, 20);
                })();
            }
            _self._instances.push(this);

        }

    },

    onChange : function() {

        return this.trigger('change');

    },

    onFocus : function() {

        this._focused = true;
        return this.trigger('focus');

    },

    onBlur : function() {

        this._focused = false;
        return this.trigger('blur');

    },

    focus : function() {

        this.elem('input')[0].focus();
        return this;

    },

    blur : function() {

        this.elem('input')[0].blur();
        return this;

    },

    isFocused : function() {

        return this._focused;

    },

    disable : function() {

        this.elem('input').attr('disabled', true);
        return this;

    },

    enable : function() {

        this.elem('input').attr('disabled', false);
        return this;

    },

    isEnabled : function() {

        return !this.elem('input').attr('disabled');

    },

    val : function(val) {

        if(typeof val == 'undefined') return this._val;

        if(this._val != val) {
            var input = this.elem('input');
            input.val() != val && input.val(val);
            this._val = val;
            this.onChange();
        }

        return this;

    }

}, {

    _instances : null

});
