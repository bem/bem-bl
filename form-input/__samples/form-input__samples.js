BEM.DOM.decl('b-form-input', {

    _setValFromSample : function(elem) {

        this.isEnabled() && this.val(elem.text()); // TODO сделать возможность указать значение в onclick у sample

    }

}, {

    live : function() {

        // TODO: так делать нельзя. никаких классов нет, есть блоки/элементы/модификаторы
        this.liveBindTo('sample', 'click', function(e) {
            var linkClass = BEM.blocks['b-pseudo-link'].buildClass();
            $(e.target).closest(this.buildSelector('sample') + ',.' + linkClass).hasClass(linkClass) &&
                this._setValFromSample(e.data.domElem);
        });

        return false;

    }

});
