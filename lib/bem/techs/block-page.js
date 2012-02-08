var fs = require('fs'),
    path = require('path'),
    Template = require('bem/lib/template');

exports.techModule = module;

exports.newFileContent = function(vars) {

    function htmlEscape(str) {
        return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    var _this = this,
        readFileIfExists = function(fileName) {

            return path.existsSync(fileName)? fs.readFileSync(fileName, 'utf-8') : '';

        },
        doc = eval(readFileIfExists(vars.Prefix + '.doc.js')),
        filename = vars.BlockName + '.' + vars.Locale,
        text = []; // текстовое описание блока

    text.push([
        {
            block: 'b-text',
            elem: 'h1',
            content: htmlEscape(doc.title)
        },
        {
            block: 'b-layout-table',
            mods: { layout: '25-75' },
            content: [
                {
                    elem: 'row',
                    content: [
                        {
                            elem: 'cell',
                            mix: [{ block: 'b-blocks-desc', elem: 'entity-data'}],
                            content: {
                                elem: 'inner',
                                content: [
//                                    {
//                                        block: 'b-blocks-desc',
//                                        elem: 'entity-filename',
//                                        content: doc.name
//                                    },
                                    {
                                        block: 'b-blocks-desc',
                                        elem: 'entity-bemjson',
                                        tag: 'tt',
                                        content: '{ block: \'' + doc.name + '\' }'
                                    }
                                ]
                            }
                        },
                        {
                            elem: 'cell',
                            elemMods: { position: 'r' },
                            content: doc.bemjsonDesc
                        }
                    ]
                }
            ]
        }
    ]);

    doc.mods && (
        text.push({
            block: 'b-text',
            mix: [{ block: 'b-blocks-desc', elem: 'entity-group' }],
            elem: 'h5',
            content: {ru:'Модификаторы',en:'Modifiers'}[vars.Locale]
        }) && // заголовок про модификаторы
        doc.mods.forEach(function(mod){
            (mod.title || mod.bemjsonDesc) && text.push(
                {
                    block: 'b-layout-table',
                    mods: { layout: '25-75' },
                    content: [
                        {
                            elem: 'row',
                            content: [
                                {
                                    elem: 'cell',
                                    mix: [{ block: 'b-blocks-desc', elem: 'entity-data'}],
                                    content: {
                                        elem: 'inner',
                                        content: {
                                            block: 'b-blocks-desc',
                                            elem: 'entity-filename',
                                            content: '_' + mod.name
                                        }
                                    }
                                },
                                {
                                    elem: 'cell',
                                    elemMods: { position: 'r'},
                                    content: [
                                        {
                                            block: 'b-text',
                                            mix: [{ block: 'b-blocks-desc', elem: 'doc-header' }],
                                            elem: 'h3',
                                            content: mod.title
                                        },
                                        mod.bemjsonDesc
                                    ]
                                }
                            ]
                        }
                    ]
                }
            );
            mod.vals && mod.vals.forEach(function(val){
                (val.title || val.bemjsonDesc) && text.push(
                    {
                        block: 'b-layout-table',
                        mods: { layout: '25-75' },
                        content: [
                            {
                                elem: 'row',
                                content: [
                                    {
                                        elem: 'cell',
                                        mix: [{ block: 'b-blocks-desc', elem: 'entity-data'}],
                                        content: {
                                            elem: 'inner',
                                            content: [
                                                {
                                                    block: 'b-blocks-desc',
                                                    elem: 'entity-filename',
                                                    content: '_' + mod.name + '_' + val.name
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        elem: 'cell',
                                        elemMods: { position: 'r'},
                                        content: [
                                            {
                                                block: 'b-text',
                                                elem: 'h3',
                                                mix: [{ block: 'b-blocks-desc', elem: 'doc-header' }],
                                                content: val.title
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                elem: 'row',
                                content: [
                                    {
                                        elem: 'cell',
                                        mix: [{ block: 'b-blocks-desc', elem: 'entity-data'}],
                                        content: {
                                            elem: 'inner',
                                            content: [
                                                {
                                                    block: 'b-blocks-desc',
                                                    elem: 'entity-bemjson',
                                                    tag: 'tt',
                                                    content: '{ mods: { \''+ mod.name + '\': \'' + val.name + '\' } }'
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        elem: 'cell',
                                        elemMods: { position: 'r'},
                                        content: [
                                            val.bemjsonDesc
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                )
            });
        })
    );
    doc.elems && (
        text.push({
            block: 'b-text',
            mix: [{ block: 'b-blocks-desc', elem: 'entity-group' }],
            elem: 'h5',
            content: {ru:'Элементы',en:'Elements'}[vars.Locale]
        }) && // заголовок про элементы
        doc.elems.forEach(function(elem){
            (elem.title || elem.bemjsonDesc) && text.push(
                {
                    block: 'b-layout-table',
                    mods: { layout: '25-75' },
                    content: [
                        {
                            elem: 'row',
                            content: [
                                {
                                    elem: 'cell',
                                    mix: [{ block: 'b-blocks-desc', elem: 'entity-data'}],
                                    content: {
                                        elem: 'inner',
                                        content: [
                                            {
                                                block: 'b-blocks-desc',
                                                elem: 'entity-filename',
                                                content: '__' + elem.name
                                            }
                                        ]
                                    }
                                },
                                {
                                    elem: 'cell',
                                    elemMods: { position: 'r'},
                                    content: [
                                        {
                                            block: 'b-text',
                                            elem: 'h3',
                                            mix: [{ block: 'b-blocks-desc', elem: 'doc-header' }],
                                            content: elem.title
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            elem: 'row',
                            content: [
                                {
                                    elem: 'cell',
                                    mix: [{ block: 'b-blocks-desc', elem: 'entity-data'}],
                                    content: {
                                        elem: 'inner',
                                        content: [
                                            {
                                                block: 'b-blocks-desc',
                                                elem: 'entity-bemjson',
                                                tag: 'tt',
                                                content: '{ elem: \'' + elem.name + '\' }'
                                            }
                                        ]
                                    }
                                },
                                {
                                    elem: 'cell',
                                    elemMods: { position: 'r'},
                                    content: [
                                        elem.bemjsonDesc
                                    ]
                                }
                            ]
                        }
                    ]
                }
            )
            elem.mods && (
                elem.mods.forEach(function(mod){
                    (mod.title || mod.bemjsonDesc) && text.push(
                        {
                            block: 'b-layout-table',
                            mods: { layout: '25-75' },
                            content: [
                                {
                                    elem: 'row',
                                    content: [
                                        {
                                            elem: 'cell',
                                            mix: [{ block: 'b-blocks-desc', elem: 'entity-data'}],
                                            content: {
                                                elem: 'inner',
                                                content: {
                                                    block: 'b-blocks-desc',
                                                    elem: 'entity-filename',
                                                    content: '__' + elem.name + '_' + mod.name
                                                }
                                            }
                                        },
                                        {
                                            elem: 'cell',
                                            elemMods: { position: 'r'},
                                            content: [
                                                {
                                                    block: 'b-text',
                                                    elem: 'h3',
                                                    mix: [{ block: 'b-blocks-desc', elem: 'doc-header' }],
                                                    content: mod.title
                                                },
                                                mod.bemjsonDesc
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    );
                    mod.vals && mod.vals.forEach(function(val){
                        (val.title || val.bemjsonDesc) && text.push(
                            {
                                block: 'b-layout-table',
                                mods: { layout: '25-75' },
                                content: {
                                    elem: 'row',
                                    content: [
                                        {
                                            elem: 'cell',
                                            mix: [{ block: 'b-blocks-desc', elem: 'entity-data'}],
                                            content: {
                                                elem: 'inner',
                                                content: [
                                                    {
                                                        block: 'b-blocks-desc',
                                                        elem: 'entity-filename',
                                                        content: '__' + elem.name + '_' + mod.name + '_' + val.name
                                                    },
                                                    {
                                                        block: 'b-blocks-desc',
                                                        elem: 'entity-bemjson',
                                                        tag: 'tt',
                                                        content: '{ elemMods: { \''+ mod.name + '\': \'' + val.name + '\' } }'
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            elem: 'cell',
                                            elemMods: { position: 'r'},
                                            content: [
                                                {
                                                    block: 'b-text',
                                                    elem: 'h3',
                                                    mix: [{ block: 'b-blocks-desc', elem: 'doc-header' }],
                                                    content: val.title
                                                },
                                                val.bemjsonDesc
                                            ]
                                        }
                                    ]
                                }
                            }
                        )
                    })
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
