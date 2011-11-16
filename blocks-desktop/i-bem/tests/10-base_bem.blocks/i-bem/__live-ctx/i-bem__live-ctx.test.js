BEM.TEST.decl({ block : 'i-bem', elem : 'live-ctx' }, function() {

    it('should be callback called once', function() {
        var testElem = $('#once-test'),
            childBlock = testElem.find('.b-foo').bem('b-foo'),
            callback = jasmine.createSpy();

        BEM.blocks['b-foo'].on(testElem, 'event', callback);

        childBlock.trigger('event');
        expect(callback.callCount).toEqual(1);

    });

});