BEM.TEST.decl({ block : 'i-bem', elem : 'find-block' }, function() {

    var testElem = $('#find-block-test');

    describe('findBlock(s)Inside specs', function() {
        var block = testElem.find('.b-foo1:eq(2)').bem('b-foo1');

        it('should be found only first inner block', function() {
            expect(block.findBlockInside('b-foo2').hasMod('first')).toBeTruthy();
        });

        it('should be found only first inner block in elem', function() {
            expect(block.findBlockInside(block.elem('el2'), 'b-foo2').hasMod('mod1')).toBeTruthy();
        });

        it('should be found only first block with mod', function() {
            expect(block.findBlockInside({ block: 'b-foo2', modName: 'mod1', modVal: 'val1' }).hasMod('mod1'))
                .toBeTruthy();
        });

        it('shouldn\'t be found unexisted block', function() {
            expect(block.findBlockInside('b-foo10')).toBeNull();
        });

        it('should be found all inner block', function() {
            expect(block.findBlocksInside('b-foo2').length).toEqual(5);
            expect(block.findBlocksInside('b-foo3').length).toEqual(2);
        });

        it('should be found all inner block in elem', function() {
            expect(block.findBlocksInside(block.elem('el1'), 'b-foo2').length).toEqual(2);
        });

        it('shouldn\'t be found unexisted block in elem', function() {
            expect(block.findBlockInside(block.elem('el2'), 'b-foo3')).toBeNull();
        });
    });

    describe('findBlock(s)On specs', function() {
        var block = testElem.find('.b-foo1:eq(2)').bem('b-foo1');

        it('should be found mixed block', function() {
            expect(block.findBlockOn('b-foo3'))
                .toBe(block.domElem.bem('b-foo3'));
        });

        it('should be found mixed block with mod', function() {
            expect(block.findBlockOn({ block: 'b-foo7', modName: 'mod7', modVal: 'val7' }).hasMod('mod7'))
                .toBeTruthy();
        });

        it('shouldn\'t be found unexisted mixed block', function() {
            expect(block.findBlockOn('b-foo10')).toBeNull();
        });

        it('should be found mixed block on elem', function() {
            expect(block.findBlockOn(block.elem('el2'), 'b-foo5')).toBe(block.elem('el2').bem('b-foo5'));
        });
    });

    describe('findBlock(s)Outside specs', function() {
        var block = testElem.find('.b-foo2_mod2_val2').bem('b-foo2');

        it('should be found first outer block', function() {
            expect(block.findBlockOutside('b-foo1').params.id).toEqual('id1');
        });

        it('shouldn\'t be found unexisted outer block', function() {
            expect(block.findBlockOutside('b-foo10')).toBeNull();
        });

        it('should be found all outer blocks', function() {
            expect(block.findBlocksOutside('b-foo1').length).toEqual(2);
        });
    });
});