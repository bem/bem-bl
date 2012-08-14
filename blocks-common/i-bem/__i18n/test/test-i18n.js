var assert = require('assert'),
    fs = require('fs'),
    path = require('path');

require('vm').runInThisContext(
    fs.readFileSync(path.resolve(__dirname, '../i-bem__i18n.i18n/core.js')));

suite('BEM.I18N Simple test', function() {

    setup(function() {

        BEM.I18N.lang('ru');

        BEM.I18N.decl('i-keyset-0', {

            "key1" : "Ключ1",
            "key2" : "Ключ2"

        }, { "lang" : "ru" });

        BEM.I18N.decl('i-keyset-1', {

            "dynamic" : function(param) {
                return this.keyset('i-keyset-0').key('key' + param['num']);
            },

            "complex" : function(param) {
                return this.key('dynamic', { num: param['num'] }) + ' : ' + param['text'];
            }

        }, { "lang" : "ru" });

        BEM.I18N.decl('i-keyset-2', {

            "key" : function(param) {
                return this.keyset('i-keyset-1').key('complex', {
                        num : 1,
                        text : this.keyset('i-keyset-0').key('key1')
                    });
            }

        }, { "lang" : "ru" });

    });

    test('Simple', function() {
        assert.equal('Ключ1', BEM.I18N('i-keyset-0', 'key1'));
    });

    test('Simple dynamic with param', function() {
        assert.equal('Ключ1', BEM.I18N('i-keyset-1', 'dynamic', { num: 1 }));
    });

    test('Complext dynamic with param', function() {
        assert.equal('Ключ1 : Бла', BEM.I18N('i-keyset-1', 'complex', { num: 1, text: 'Бла' }));
    });

    test('Complect dynamic with dynamic value as param', function() {
        assert.equal('Ключ1 : Ключ1', BEM.I18N('i-keyset-2', 'key', { }));
    });

});
