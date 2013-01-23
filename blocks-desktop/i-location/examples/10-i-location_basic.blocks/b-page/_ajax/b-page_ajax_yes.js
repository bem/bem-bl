BEM.DOM.decl({ block: 'b-page', modName: 'ajax', modVal: 'yes' }, {

    onSetMod: {

        js: function() {

            this.__base.apply(this, arguments);

            this._location = BEM.blocks['i-location'].get();

            var _this = this;

            this.findBlocksInside('b-link').forEach(function(link) {
                link.bindTo('click', function(e) {
                    e.preventDefault();

                    _this._location.change({ url: this.domElem.attr('href') });
                });
            });

            this._location.on('change', function(e, data) {
                BEM.DOM.update(_this.elem('info'), JSON.stringify(data));
            });

        }

    }

});
