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
                '<div class="b-test-destruct i-bem" data-bem="{\'b-test-destruct\':{id:\'b-test-destruct\'}}"/>' +
                '<div class="b-test-destruct i-bem" data-bem="{\'b-test-destruct\':{id:\'b-test-destruct\'}}"/>' +
            '</div>'));

        BEM.DOM.destruct(rootNode.find('.b-test-destruct:eq(0)'));
        expect(spy).not.toHaveBeenCalled();

        BEM.DOM.destruct(rootNode.find('.b-test-destruct'));
        expect(spy).toHaveBeenCalled();
    });

    it('BEM.DOM.destruct should not destruct mixed block', function() {
        var spy = jasmine.createSpy();
        BEM.DOM.decl('b-test-mix-destruct', {
            destruct : function() {
                spy();
                this.__base.apply(this, arguments);
            }
        });

        BEM.DOM.decl('b-test-mix-destruct2', {});

        var rootNode = BEM.DOM.init($(
            '<div>' +
                '<div class="b-test-mix-destruct b-test-mix-destruct2 i-bem" data-bem="{\'b-test-mix-destruct\':{id:\'b-test-mix-destruct\'},\'b-test-mix-destruct2\':{}}"/>' +
                '<div class="b-test-mix-destruct i-bem" data-bem="{\'b-test-mix-destruct\':{id:\'b-test-mix-destruct\'}}"/>' +
            '</div>'));

        BEM.DOM.destruct(rootNode.find('.b-test-mix-destruct:eq(0)'));
        expect(spy).not.toHaveBeenCalled();
    });

});
