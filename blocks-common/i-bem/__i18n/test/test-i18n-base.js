var assert = require('assert'),
    fs = require('fs'),
    path = require('path');

require('vm').runInThisContext(
    fs.readFileSync(path.resolve(__dirname, '../i-bem__i18n.i18n/core.js')));


suite('BEM.I18N Lang', function() {

    test('Lang getter', function() {

        assert.ok(BEM.I18N.lang(), 'Lang should always be defined');

        assert.equal(BEM.I18N.lang(), 'ru', 'and should be "ru" by default');

    });

    test('Lang setter 1', function() {

        BEM.I18N.lang('tr');

        assert.equal(BEM.I18N.lang(), 'tr', 'Lang could be redefined');

    });

    test('Lang setter 2', function() {

        assert.equal(BEM.I18N.lang('ua'), 'ua', 'Setting lang with value should return new value');

    });

});


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

suite('BEM.I18N._i18n public functions', function () {

    test('setDeclProp', function () {
        BEM.I18N._i18n.setDeclProp('lang', 'ru')
        assert.equal('ru', BEM.I18N._i18n._declProps['lang']);

        BEM.I18N._i18n.setDeclProp('lang', 'kz')
        assert.equal('kz', BEM.I18N._i18n._declProps['lang']);

        // deleting
        BEM.I18N._i18n.setDeclProp('lang')
        assert.equal(undefined, BEM.I18N._i18n._declProps['lang']);
    });

});

suite('BEM.I18N multiple props', function () {

    setup(function() {
        BEM.I18N.brand = (function () {
            var klass = function (brand) {
                return BEM.I18N.setDeclProp('brand', brand, true);
            };

            return klass;
        }) ();

        BEM.I18N.lang('ru');
        BEM.I18N.setOrderProps('lang', 'brand', 'version')

        BEM.I18N.decl('i-keyset-0', {

            "key1" : "Ключ1",
            "key2" : "Ключ2"

        }, { "lang" : "ru" });

        BEM.I18N.decl('i-keyset-0', {

            "key1" : "Ключ1-БрендированиеUA"

        }, { "lang" : "ru", "brand" : "ua" });

        BEM.I18N.decl('i-keyset-0', {

            "key1" : "Ключ1-БрендированиеTR",
            "key2" : "Ключ2-БрендированиеTR"

        }, { "lang" : "ru", "brand" : "tr" });

        BEM.I18N.decl('i-keyset-0', {

            "key1" : "Ключ1-БрендированиеTR-Версия1",
            "key3" : "Ключ3"

        }, { "lang" : "ru", "brand" : "tr", "version" : "1.0" });

    });

    test('Simple', function () {
        BEM.I18N._i18n.setDeclProp('brand', 'ua');

        assert.equal('Ключ1-БрендированиеUA', BEM.I18N('i-keyset-0', 'key1'));
        assert.equal('Ключ2', BEM.I18N('i-keyset-0', 'key2'));

        BEM.I18N._i18n.setDeclProp('version', '1.0');

        assert.equal('Ключ1-БрендированиеUA', BEM.I18N('i-keyset-0', 'key1'));

        BEM.I18N.brand('tr');
        assert.equal('Ключ1-БрендированиеTR-Версия1', BEM.I18N('i-keyset-0', 'key1'));
        assert.equal('Ключ2-БрендированиеTR', BEM.I18N('i-keyset-0', 'key2'));
        assert.equal('Ключ3', BEM.I18N('i-keyset-0', 'key3'));

        BEM.I18N.brand('brand', null);
        assert.equal('Ключ1', BEM.I18N('i-keyset-0', 'key1'));
        assert.equal('', BEM.I18N('i-keyset-0', 'key3'));
    });

});
