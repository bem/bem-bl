var fs = require('fs'),
    path = require('path'),
    Template = require('bem/lib/template');

exports.techModule = module;

exports.newFileContent = function(vars) {

    var _this = this,
        readFileIfExists = function(fileName) {

            return path.existsSync(fileName)? fs.readFileSync(fileName, 'utf-8') : '';

        },
        doc = eval(readFileIfExists(vars.Prefix + '.doc.js')),
        filename = vars.BlockName + '.' + vars.Locale,
        text = []; // текстовое описание блока

    doc.bemjsonDesc && (text.push(doc.bemjsonDesc));

    doc.mods && (
        text.push({
            block: 'b-text',
            elem: 'h5',
            content: {ru:'Модификаторы',en:'Modifiers'}[vars.Locale]
        }) && // заголовок про модификаторы
        doc.mods.forEach(function(mod){
            mod.title && text.push({
                block: 'b-text',
                elem: 'h2',
                content: mod.title
            });
            mod.bemjsonDesc && text.push(mod.bemjsonDesc);
            mod.vals && mod.vals.forEach(function(val){
                val.title && text.push({
                    block: 'b-text',
                    elem: 'h3',
                    content: val.title
                });
                val.bemjsonDesc && text.push(val.bemjsonDesc);
            });
        })
    );
    doc.elems && (
        text.push({
            block: 'b-text',
            elem: 'h5',
            content: {ru:'Элементы',en:'Elements'}[vars.Locale]
        }) && // заголовок про элементы
        doc.elems.forEach(function(elem){
            elem.title && text.push({
                block: 'b-text',
                elem: 'h2',
                content: elem.title
            });
            elem.bemjsonDesc && text.push(elem.bemjsonDesc);
            elem.mods && (
                elem.mods.forEach(function(mod){
                    console.log(mod);
                    mod.title && text.push({
                        block: 'b-text',
                        elem: 'h2',
                        content: mod.title
                    });
                    mod.bemjsonDesc && text.push(mod.bemjsonDesc);
                    mod.vals && mod.vals.forEach(function(val){
                        val.title && text.push({
                            block: 'b-text',
                            elem: 'h3',
                            content: val.title
                        });
                        val.bemjsonDesc && text.push(val.bemjsonDesc);
                    });
                })
            );
        })
    );

    var page = {
            block: 'b-page',
            title: doc.name + ': ' + doc.title,
            head: [,
                { elem: 'css', url: '_' + filename + '.css', ie: false},
                { elem: 'css', url: '_' + filename + '.ie.css', ie: 'lt IE 8'},
                { block: 'i-jquery', elem: 'core' },
                { elem: 'js', url:  filename + '.js'}
            ],
            meta: [
                { tag: 'meta', attrs: { property: 'fb:app_id', content: '352298414783700'} }
            ],
            content: [
                '<!-- Yandex.Metrika counter --><div style=\"display:none;\"><script type=\"text/javascript\">(function(w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter10053391 = new Ya.Metrika({id:10053391, enableAll: true, trackHash:true}); } catch(e) { } }); })(window, \"yandex_metrika_callbacks\");</script></div><script src=\"//mc.yandex.ru/metrika/watch.js\" type=\"text/javascript\" defer=\"defer\"></script><noscript><div><img src=\"//mc.yandex.ru/watch/10053391\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div></noscript><!-- /Yandex.Metrika counter -->',
                {
                    block: 'b-template',
                    mods: { type:'block'},
                    title: doc.title,
                    content: [
                        text
                    ]
                }
            ]
        }

        //    getDoc(levelPath + level['get-block-mod'](vars.BlockName, mod.name) + '.' + vars.Locale, mod);
        return '(' + JSON.stringify(page) + ')';
    }

exports.getFileSuffix = function() {
    return '.bemjson.js'
}
