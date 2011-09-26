/** @requires BEM */
/** @requires BEM.DOM */

(function(){

BEM.DOM.decl('b-square', {

    onSetMod : {

        'js' : function() {
            var square = this;

            this.bindTo('click', function(){
                square.setMod('size', 'big');
            });
        },

        'size' : function() {
            this.domElem.append('размер1: ', this.domElem.width() + '<br/>');

            this.afterCurrentEvent(function(){
                this.domElem.append('размер2: ', this.domElem.width());
            });
        }
    }

});

}());