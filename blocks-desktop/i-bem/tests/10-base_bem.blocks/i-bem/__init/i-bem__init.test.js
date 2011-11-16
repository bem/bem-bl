BEM.TEST.decl({ block : 'i-bem', elem : 'init' }, function() {

    it('initialization should\'t be sync', function() {
        var inited = false;
        BEM.DOM.decl('b-sync-init', {
            onSetMod : {
                'js' : function() {
                    inited = true;
                }
            }
        });
        BEM.DOM.init($('<div class="b-sync-init i-bem" onclick="return {\'b-sync-init\':{}}"/>'));
        expect(inited).toBeTruthy();
    });

});