({
    block: 'b-page',
    head: [
        { elem: 'css', url: '_10-base_bem.css', ie: false },
        { elem: 'css', url: '_10-base_bem.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_10-base_bem.js' },
        { elem: 'js', url: '_10-base_bem.test.js' }
    ],
    content: [
        {
            attrs : { id : 'mods-test' },
            content: {
                block: 'b-foo',
                mods: { mod1 : 'val1' },
                content: [
                    { elem : 'elem1', mods : { emod1 : 'eval1' }},
                    { elem : 'elem2', mods : { emod2 : 'eval2' }},
                    { elem : 'elem3', mix : [{ elem : 'elem4', mods : { emod4 : 'eval4' }}]}
                ]
            }
        },
        {
            attrs : { id : 'once-test' },
            content: [
                { block: 'b-foo', js: { id : 'test' }},
                { block: 'b-foo', js: { id : 'test' }}
            ]
        },
        {
            attrs: { id : 'elem-params-test' },
            content: {
                block: 'b-foo',
                content: [
                    { elem: 'elem1', js: { param : 'param1' }},
                    { elem: 'elem2', js: { param : 'param2' }},
                    { elem: 'elem3' }
                ]
            }
        },
        {
            block: 'i-bem',
            elem: 'test',
            content: [
                { block: 'i-jquery', elem: 'observable' },
                { block: 'i-jquery', elem: 'stringify' },
                { block: 'i-ecma', elem : 'object' },
                { block: 'i-ecma', elem : 'array' },
                { block: 'i-bem' },
                { block: 'i-bem', elem: 'internal' },
                { block: 'i-bem', elem: 'mods' },
                { block: 'i-bem', elem: 'init' },
                { block: 'i-bem', elem: 'live-ctx' },
                { block: 'i-bem', elem: 'elem-params' }
            ]
        }
    ]
})