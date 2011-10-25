BEM.TEST.decl({ block : 'i-bem', elem : 'elem-params' }, function() {

    it('should be valid elem params', function() {
        var testElem = $('#elem-params-test'),
            block = testElem.find('.b-foo').bem('b-foo');

        expect(block.elemParams('elem1').param).toEqual('param1');
        expect(block.elemParams(block.elem('elem1')).param).toEqual('param1');
        expect(block.elemParams('elem2').param).toEqual('param2');
        expect(block.elemParams('elem3').param).toBeUndefined();
    });

});