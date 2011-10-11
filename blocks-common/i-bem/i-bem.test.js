BEM.TEST.decl('i-bem', function() {

    BEM.decl('b-block', {});

    describe('mods tests', function() {

        var block;

        beforeEach(function() {
            block = BEM.create('b-block');
        });

        it('getMod after setMod should be equal setted val', function() {
            expect(block.setMod('mod1', 'val1').getMod('mod1')).toEqual('val1');
        });

        it('getMod of undefined mod should be \'\'', function() {
            expect(block.getMod('mod1')).toBe('');
        });

        it('hasMod after setMod should be true', function() {
            expect(block.setMod('mod1', 'val1').hasMod('mod1', 'val1')).toBeTruthy();
            expect(block.setMod('mod1', 'val1').hasMod('mod1', 'val2')).toBeFalsy();
        });

    });

});