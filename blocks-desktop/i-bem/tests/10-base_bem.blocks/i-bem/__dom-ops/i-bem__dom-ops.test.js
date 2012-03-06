BEM.TEST.decl({ block : 'i-bem', elem : 'dom-ops' }, function() {

    BEM.DOM.decl('b-dom-ops-test');

    var ctx = $('#dom-ops-test');
    beforeEach(function() {
        BEM.DOM.destruct(ctx, true);
        ctx.html('<div/>');
    });

    it('block should be appended and inited', function() {
        var node = $('<div class="b-dom-ops-test i-bem" onclick="return {\'b-dom-ops-test\':{}}"/>');
        BEM.DOM.append(ctx, node);

        expect(node.prevAll().length).toBe(1);
        expect(node.nextAll().length).toBe(0);
        expect(node.hasClass('b-dom-ops-test_js_inited')).toBeTruthy();
    });

    it('block should be prepended and inited', function() {
        var node = $('<div class="b-dom-ops-test i-bem" onclick="return {\'b-dom-ops-test\':{}}"/>');
        BEM.DOM.prepend(ctx, node);

        expect(node.prevAll().length).toBe(0);
        expect(node.nextAll().length).toBe(1);
        expect(node.hasClass('b-dom-ops-test_js_inited')).toBeTruthy();
    });

});