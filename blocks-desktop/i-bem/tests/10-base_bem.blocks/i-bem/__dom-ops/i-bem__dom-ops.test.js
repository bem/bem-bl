BEM.TEST.decl({ block : 'i-bem', elem : 'dom-ops' }, function() {

    BEM.DOM.decl('b-dom-ops-test');

    var ctx = $('#dom-ops-test'),
        node;
    beforeEach(function() {
        BEM.DOM.destruct(ctx, true);
        ctx.html('<div class="child"/>');
        node = $('<div class="b-dom-ops-test i-bem" onclick="return {\'b-dom-ops-test\':{}}"/>');
    });

    it('block should be appended and inited', function() {
        BEM.DOM.append(ctx, node);

        expect(node.prevAll().length).toBe(1);
        expect(node.nextAll().length).toBe(0);
        expect(node.hasClass('b-dom-ops-test_js_inited')).toBeTruthy();
    });

    it('block should be prepended and inited', function() {
        BEM.DOM.prepend(ctx, node);

        expect(node.prevAll().length).toBe(0);
        expect(node.nextAll().length).toBe(1);
        expect(node.hasClass('b-dom-ops-test_js_inited')).toBeTruthy();
    });

    it('block should be inserted before and inited', function() {
        BEM.DOM.before(ctx.find('.child'), node);

        expect(node.prevAll().length).toBe(0);
        expect(node.nextAll().length).toBe(1);
        expect(node.hasClass('b-dom-ops-test_js_inited')).toBeTruthy();
    });

    it('block should be inserted after and inited', function() {
        BEM.DOM.after(ctx.find('.child'), node);

        expect(node.prevAll().length).toBe(1);
        expect(node.nextAll().length).toBe(0);
        expect(node.hasClass('b-dom-ops-test_js_inited')).toBeTruthy();
    });

});