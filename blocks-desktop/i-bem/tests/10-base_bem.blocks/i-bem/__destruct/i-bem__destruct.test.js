BEM.TEST.decl({ block : 'i-bem', elem : 'destruct' }, function() {

    it('BEM.DOM.destruct should destruct block only when it has no nodes', function() {
        var spy = jasmine.createSpy();
        BEM.DOM.decl('b-test-destruct', {
            destruct : function() {
                spy();
                this.__base.apply(this, arguments);
            }
        });

        var rootNode = BEM.DOM.init($(
            '<div>' +
                '<div class="b-test-destruct i-bem" onclick="return {\'b-test-destruct\':{id:\'b-test-destruct\'}}"/>' +
                '<div class="b-test-destruct i-bem" onclick="return {\'b-test-destruct\':{id:\'b-test-destruct\'}}"/>' +
            '</div>'));

        BEM.DOM.destruct(true, rootNode.find('.b-test-destruct:eq(0)'));
        expect(spy).not.toHaveBeenCalled();

        BEM.DOM.destruct(true, rootNode.find('.b-test-destruct:eq(1)'));
        expect(spy).toHaveBeenCalled();
    });

});