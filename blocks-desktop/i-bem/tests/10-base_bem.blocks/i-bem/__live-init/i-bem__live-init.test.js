BEM.TEST.decl({ block : 'i-bem', elem : 'live-init' }, function() {
    it('should be inited only on DOM event', function() {
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
                this.liveInitOnEvent('click');
            }
        });

        BEM.DOM.append(
            $('#live-init-test'),
            '<div class="b-live-init-test i-bem" id="b-live-init-test" onclick="return {\'b-live-init-test\':{}}"/>');

        expect(spy).not.toHaveBeenCalled();

        $('#b-live-init-test').click();
        expect(spy).toHaveBeenCalled();
    });

    it('should be inited only on DOM event on elem', function() {
        var spy = jasmine.createSpy();
        BEM.DOM.decl('b-live-init-elem-test', {
            onSetMod : {
                'js' : {
                    'inited' : function() {
                        spy();
                    }
                }
            }
        }, {
            live : function() {
                this.liveBindTo('elem', 'click');
            }
        });

        BEM.DOM.append(
            $('#live-init-test'),
            '<div class="b-live-init-elem-test i-bem" onclick="return {\'b-live-init-elem-test\':{}}"><div id="b-live-init-elem-test__elem" class="b-live-init-elem-test__elem"/>');

        expect(spy).not.toHaveBeenCalled();

        $('#b-live-init-elem-test__elem').click();
        expect(spy).toHaveBeenCalled();
    });

    it('should be inited only on BEM event', function() {
        var spy = jasmine.createSpy();
        BEM.DOM.decl('b-bem-live-init-test-inner', {}, { live : false });
        BEM.DOM.decl('b-bem-live-init-test', {
            onSetMod : {
                'js' : {
                    'inited' : function() {
                        spy();
                    }
                }
            }
        }, {
            live : function() {
                this.liveInitOnBlockInsideEvent('test-event', 'b-bem-live-init-test-inner');
            }
        });

        BEM.DOM.append(
            $('#live-init-test'),
            '<div class="b-bem-live-init-test i-bem" onclick="return {\'b-bem-live-init-test\':{}}">' +
                '<div class="b-bem-live-init-test-inner i-bem" onclick="return {\'b-bem-live-init-test-inner\':{}}">' +
            '</div>');

        expect(spy).not.toHaveBeenCalled();

        $('.b-bem-live-init-test-inner').bem('b-bem-live-init-test-inner').trigger('test-event');
        expect(spy).toHaveBeenCalled();
    });

    it('should be provided custom data on BEM event', function() {
        var spy = jasmine.createSpy();
        BEM.DOM.decl('b-bem-live-init-test-custom-data-inner', {}, { live : false });
        BEM.DOM.decl('b-bem-live-init-test-custom-data', {}, {
            live : function() {
                this.liveInitOnBlockInsideEvent('test-event', 'b-bem-live-init-test-custom-data-inner', spy);
            }
        });

        BEM.DOM.append(
            $('#live-init-test'),
            '<div class="b-bem-live-init-test-custom-data i-bem" onclick="return {\'b-bem-live-init-test-custom-data\':{}}">' +
                '<div class="b-bem-live-init-test-custom-data-inner i-bem" onclick="return {\'b-bem-live-init-test-custom-data-inner\':{}}">' +
            '</div>');

        var customData = { customData : true };
        $('.b-bem-live-init-test-custom-data-inner').bem('b-bem-live-init-test-custom-data-inner').trigger('test-event', customData);
        expect(spy.mostRecentCall.args[1]).toBe(customData);
    });
});