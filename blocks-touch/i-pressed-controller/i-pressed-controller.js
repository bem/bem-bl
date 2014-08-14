BEM.DOM.decl('i-pressed-controller', {

    onSetMod: {

        js: function() {

            this
                .bindTo('pointermove', this._onPointerMove)
                .bindToDoc('pointerup pointercancel', this._onPointerUp);

        }

    },

    _onPointerDown: function(e) {

        var that = this;

        that._pressedTimer = setTimeout(function() {
            if (!that._isMove) {
                that.setMod('pressed', 'yes');
            }
        }, 80);

    },

    _onPointerMove: function() {

        this._isMove = true;

    },

    _onPointerUp: function() {

        this.delMod('pressed');
        this._isMove = false;

        clearTimeout(this._pressedTimer);

    }

},{

    live: function() {

        this.liveBindTo('pointerdown', function() {
            this._onPointerDown();
        });

    }

});
