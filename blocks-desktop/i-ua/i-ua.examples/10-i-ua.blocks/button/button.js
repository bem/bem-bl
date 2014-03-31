BEM.DOM.decl('button', {

    onSetMod: {

        'js': function() {

            this._control = this.elem('control').length && this.elem('control') || this.domElem;
        },

        'focused': {

            'yes': function() {

                this
                    .bindToWin('unload', function() {
                        this.delMod('focused');
                    })
                    .bindTo('keydown', this._onKeyDown);
                this._control.focus();

            },

            '': function() {

                this
                    .unbindFromWin('unload')
                    .unbindFrom('keydown');

                this._control.blur();

            }

        },

        'pressed': function() {

            this.setMod('focused', 'yes');

        }

    },

    _onKeyDown: function(e) {

        var keyCode = e.keyCode;

        if ((keyCode === 13 || keyCode === 32) && !this._keyDowned) {
            this._keyDowned = true;
            this
                .setMod('pressed', 'yes')
                .bindTo('keyup', function() {
                    this
                        .delMod('pressed')
                        .unbindFrom('keyup');

                    delete this._keyDowned;
                });
        }

    }

}, {

    live: function() {

        var eventsToMods = {
            'mouseover': {name: 'hovered', val: 'yes'},
            'mouseout': {name: 'hovered'},
            'mousedown': {name: 'pressed', val: 'yes'},
            'mouseup': {name: 'pressed'},
            'focusin': {name: 'focused', val: 'yes'},
            'focusout': {name: 'focused'}
        };

        this
            .liveBindTo('mouseover mouseout mouseup focusin focusout', function(e) {
                var mod = eventsToMods[e.type];
                this.setMod(mod.name, mod.val || '');
            })
            .liveBindTo('mousedown', function(e) {
                var mod = eventsToMods[e.type];
                e.which === 1 && this.setMod(mod.name, mod.val || '');
            });
    }

});
