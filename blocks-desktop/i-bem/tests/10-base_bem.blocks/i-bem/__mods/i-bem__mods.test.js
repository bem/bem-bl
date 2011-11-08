BEM.TEST.decl({ block : 'i-bem', elem : 'mods' }, function() {

    var block = $('#mods-test').find('.b-foo').bem('b-foo');

    it('getMod should be extract block\'s mods from CSS class', function() {
        expect(block.getMod('mod1')).toEqual('val1');
        expect(block.getMod('mod2')).toEqual('');
    });

    it('getMod should be extract elem\'s mods from CSS class', function() {
        var elem1 = block.elem('elem1'),
            elem2 = block.elem('elem2');

        expect(block.getMod(elem1, 'emod1')).toEqual('eval1');
        expect(block.getMod(elem1, 'emod2')).toEqual('');
        expect(block.getMod(elem2, 'emod2')).toEqual('eval2');
        expect(block.getMod(elem2, 'emod1')).toEqual('');
    });

    it('getMod should be extract elem\'s mods from mix', function() {
        expect(block.getMod(block.elem('elem4'), 'emod4')).toEqual('eval4');
    });

    it('hasMod on block should be valid', function() {
        expect(block.hasMod('mod1', 'val1')).toBeTruthy();
        expect(block.hasMod('mod1', 'val2')).toBeFalsy();
        expect(block.hasMod('mod1')).toBeTruthy();
        expect(block.hasMod('mod2', '')).toBeTruthy();
        expect(block.hasMod('mod2')).toBeFalsy();
    });

    it('hasMod on elem should be valid', function() {
        var elem1 = block.elem('elem1');

        expect(block.hasMod(elem1, 'emod1', 'eval1')).toBeTruthy();
        expect(block.hasMod(elem1, 'emod1', 'eval2')).toBeFalsy();
        expect(block.hasMod(elem1, 'emod1')).toBeTruthy();
        expect(block.hasMod(elem1, 'emod2', '')).toBeTruthy();
        expect(block.hasMod(elem1, 'emod2')).toBeFalsy();
    });

});