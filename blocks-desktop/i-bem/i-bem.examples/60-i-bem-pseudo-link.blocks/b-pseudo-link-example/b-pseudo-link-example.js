BEM.DOM.decl('b-pseudo-link-example', {

    onSetMod: {

        'js': function() {
            var link = this.findBlockInside('b-link');
            BEM.blocks['b-link']
                .liveCtxBind(link.domElem, 'click', function(){
                    link.elem('inner').text('Кликнутая ссылка');
                }, this);
        }

    }

}, {

    live: function() {
        this.liveInitOnBlockInsideInit('b-link');
    }

}
);
