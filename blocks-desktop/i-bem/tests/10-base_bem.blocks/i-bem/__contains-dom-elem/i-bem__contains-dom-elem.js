BEM.TEST.decl({ block : 'i-bem', elem : 'contains-dom-elem' }, function() {

    var block;
    beforeEach(function() {
        block = $('#contains-dom-elem-test').find('.b-foo').bem('b-foo');
    });

    it('should contains inside elems', function() {
        expect(block.containsDomElem(block.elem('e1'))).toBeTruthy();
        expect(block.containsDomElem(block.elem('e2'))).toBeTruthy();
    });

    it('shouldn\'t contains outside elems', function() {
        expect(block.containsDomElem($('#no-contains'))).toBeFalsy();
    });

});