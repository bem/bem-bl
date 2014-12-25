var assert = require('assert'),
    PATH = require('path'),
    FS = require('fs'),
    VM = require('vm'),
    PARSER = require('../lib/tanker.js');

// BEM.I18N initialization
VM.runInThisContext(FS.readFileSync(PATH.resolve(__dirname, '../i-bem__i18n.i18n/core.js')));

BEM.I18N.lang('ru');

suite('BEM.I18N syncParser tests', function() {
    setup(function() {
        BEM.I18N.decl('i-tanker__dynamic', {

            'gender' : function(params) {
                return (function(params) { return params[params.gender]; }).call(this, params);
            },

            'plural' : function(params) {
                return (function(params) {
                    var count = isNaN(parseInt(params.count)) ? 0 : params.count,
                        lastNumber = count % 10,
                        lastNumbers = count % 100;

                    return (lastNumber == 1 && lastNumbers != 11) ?
                        params.one : (
                        (lastNumber > 1 && lastNumber < 5) && (lastNumbers < 10 || lastNumbers > 20) ?
                            params.some : params.many );
                }).call(this, params);
            },

            'plural_adv' : function(params) {
                return (function(params) {
                    var count = isNaN(parseInt(params.count)) ? 0 : params.count;
                    if (count === 0) { return params.none; }
                    return this.keyset('i-tanker__dynamic').key('plural', {
                        'count' : params['count'],
                        'one' : params['one'],
                        'some' : params['some'],
                        'many' : params['many']
                    });
                }).call(this, params);
            },

            'toggle' : function(params) {
                return (function(params) {
                    return Boolean(params.condition) ? params['true'] : params['false'];
                }).call(this, params);
            }
        }, { 'lang' : 'ru' });

        BEM.I18N.decl('i-locale', {
            'not-found-in-section' : function(params) {
                return 'В разделе «' + '<b>' + params['section'] + '</b>' + '» ничего не было найдено.' + '<br/>' + 'Показаны результаты поиска по всем разделам Помощи.'
            }
        }, { 'lang' : 'ru' });

        BEM.I18N.decl('i-date', {
            'months-gen' : function(param) {
                return param['num'];
            }
        }, { 'lang' : 'ru' });

        BEM.I18N.decl('i-date', {
            'months-gen' : function(param) {
                return param['num'];
            }
        }, { 'lang' : 'ru' });

        BEM.I18N.decl('user', {
            'letter' : function(params) {
                return this.keyset('i-tanker__dynamic').key('plural_adv', {'count': params['count'], 'one': 'новое письмо', 'some': 'новых письма', 'many': 'новых писем', 'none': 'новых писем'})
            }
        }, { 'lang' : 'ru' });

    });

    test('dynamics keyset', function() {
        unit('dynamic-01', [
            {count: 0, result: ' 0 '},
            {count: 1, result: 'Найдена 1 страница.'},
            {count: 2, result: 'Найдено 2 страницы.'},
            {count: 5, result: 'Найдено 5 страниц.'}
        ]);
        unit('dynamic-02', [
            {count: 0, section: 'Lego', result: 'Ничего не найдено на страницах Помощи.0'},
            {count: 1, section: 'Lego', result: " <p contenteditable='true' class='i-face' style='margin:0;'> В разделе «<b>Lego</b>» ничего не было найдено.<br/>Показаны результаты поиска по всем разделам Помощи. </p>Найдена 1страница."},
            {count: 2, section: 'Lego', result: ' <p> В разделе «<b>Lego</b>» ничего не было найдено.<br/>Показаны результаты поиска по всем разделам Помощи. </p>Найдено 2страницы.'},
            {count: 5, section: 'Lego', result: ' <p> В разделе «<b>Lego</b>» ничего не было найдено.<br/>Показаны результаты поиска по всем разделам Помощи. </p>Найдено 5страниц.'}
        ]);
        unit('dynamic-03', [
            {count: 0, result: 'Новостей'},
            {count: 1, result: 'Новость'},
            {count: 2, result: 'Новости'},
            {count: 5, result: 'Новостей'}
        ]);
        unit('dynamic-04', [
            {count: 0, result: 'Нет новостей'},
            {count: 1, result: 'Новость'},
            {count: 2, result: 'Новости'},
            {count: 5, result: 'Новостей'}
        ]);
        unit('dynamic-05', [
            {count: 0, result: 'У вас 0 новых писем и это здорово'},
            {count: 1, result: 'У вас 1 новое письмо и это здорово'},
            {count: 2, result: 'У вас 2 новых письма и это здорово'},
            {count: 5, result: 'У вас 5 новых писем и это здорово'}
        ]);
    });
    test('nested keysets', function() {
        unit('complex-01', [
            {today: true, result: 'сегодня'},
            {tomorrow: true, result: ' завтра '},
            {day: 1, month: 'Марта', result: '  1 Марта  '}
        ]);
        unit('complex-02', [
            {count: 0, result: 'Нет новых писем'},
            {count: 1, result: 'Одно новое письмо'},
            {count: 2, result: '2 новых письма'},
            {count: 5, result: '5 новых писем'}
        ]);
        unit('complex-03', [
            {count: 0, first: 'one', second: 'ten', result: 'one and ten for none'},
            {count: 1, first: 'two', second: 'twenty', result: 'two and twenty for one'},
            {count: 2, first: 'three', second: 'thirty', result: 'three and thirty for some'},
            {count: 5, first: 'four', second: 'fourty', result: 'four and fourty for many'}
        ]);
    });
    test('empty', function() {
        unit('empty-01', [{result: ''}]);
    });
    test('entity in html', function() {
        unit('entity-01', [{result: 'Приходить на работу к одинадцати часам'}]);
    });
    test('html', function() {
        unit('html-01', [{result: '<!-- #issues/279 -->Это строка <br> приведёт к падению'}]);
        unit('html-02', [{result: "Hello <p>world <a href='http://ya.ru' class='b-link' target='_blank'>!</a></p>"}]);
    });
    test('literal', function() {
        unit('literal-01', [{result: 'null'}]);
        unit('literal-02', [{result: '500'}]);
        unit('literal-03', [{result: 'true'}]);
    });
    test('empty params', function() {
        unit('param-empty-01', [{result: 'бла-бла-бла'}]);
    });
    test('xml params', function() {
        unit('param-xml-01', [{
            section: 'Lego',
            result: 'В разделе «<b>Lego</b>» ничего не было найдено.<br/>Показаны результаты поиска по всем разделам Помощи.'
        }]);
        unit('param-xml-02', [{
            first: 'Hello',
            second: 'world',
            result: 'Hello between world'
        }]);
    });
});

function unit(name, expected) {
    var content = {
            src: readFile(name + '.xml')
        },
        parsedResult;

    // sync operation(!)
    PARSER.xmlToJs(content.src, function(item) {
        parsedResult = 'BEM.I18N.decl("test" ,{"' + name + '":' + item + '}, {"lang": "ru"})'
    });

    VM.runInThisContext(parsedResult);

    expected.forEach(function(exp){
        assert.equal(BEM.I18N('test', name, exp), exp.result);
    });
}

function readFile(src) {
    return FS.readFileSync(PATH.resolve(__dirname, 'files', src), 'utf-8').toString();
}
