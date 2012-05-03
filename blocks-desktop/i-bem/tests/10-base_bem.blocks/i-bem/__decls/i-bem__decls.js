BEM.TEST.decl({ block : 'i-bem', elem : 'decls' }, function() {
    BEM.decl('b-decl-test', {
        method : function() {
            return 'base';
        }
    });

    BEM.decl({ block : 'b-decl-test', modName : 'mod1', modVal : 'val1' }, {
        method : function() {
            return 'val1';
        }
    });

    BEM.decl({ block : 'b-decl-test', modName : 'mod2' }, {
        method : function() {
            return 'anyval';
        }
    });

    BEM.decl({ block : 'b-decl-test', modName : 'mod3', modVal : ['val2', 'val3'] }, {
        method : function() {
            return 'val2Orval3';
        }
    });

    [
        { spec: 'should be method from no mods decl called', input: 'b-decl-test', output: 'base' },
        { spec: 'should be method from decl with concrete modVal called', input: { block: 'b-decl-test', mods: { mod1: 'val1' }}, output: 'val1' },
        { spec: 'should be method from no mods decl called', input: { block: 'b-decl-test', mods: { mod1: 'val2' }}, output: 'base' },
        { spec: 'should be method from decl with no concrete modVal called', input: { block: 'b-decl-test', mods: { mod2: 'any' }}, output: 'anyval' },
        { spec: 'should be method from no mods decl called', input: { block: 'b-decl-test', mods: { mod2: '' }}, output: 'base' },
        { spec: 'should be method from decl with no concrete modVal called', input: { block: 'b-decl-test', mods: { mod3: 'val2' }}, output: 'val2Orval3' },
        { spec: 'should be method from decl with no concrete modVal called', input: { block: 'b-decl-test', mods: { mod3: 'val3' }}, output: 'val2Orval3' },
        { spec: 'should be method from no mods decl called', input: { block: 'b-decl-test', mods: { mod3: 'val1' }}, output: 'base' }
    ].forEach(function(params) {
        it(params.spec, function() {
            expect(BEM.create(params.input).method()).toEqual(params.output);
        });
    });
});