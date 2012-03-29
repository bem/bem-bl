BEM.TEST.decl({ block : 'i-bem', elem : 'live-init' }, function() {
    it('should be inited only on event', function() {
        var spy = jasmine.createSpy();
        BEM.DOM.decl('b-live-init-test', {
            onSetMod : {
                'js' : {
                    'inited' : function() {
                        spy();
                    }
                }
            }
        }, {
            live : function() {
                this.liveBindTo('click');
            }
        });

        BEM.DOM.append($('#live-init-test'), '<div id="b-live-init-test" class="b-live-init-test i-bem" onclick="return {\'b-live-init-test\':{}}"/>');
        expect(spy).not.toHaveBeenCalled();

        $('#b-live-init-test').click();
        expect(spy).toHaveBeenCalled();
    });
});