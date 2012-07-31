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
            attrs: { id: 'mods-test' },
            content: {
                block: 'b-foo',
                mods: { mod1: 'val1' },
                content: [
                    { elem: 'elem1', mods: { emod1: 'eval1' }},
                    { elem: 'elem2', mods: { emod2: 'eval2' }},
                    { elem: 'elem3', mix: [{ elem: 'elem4', mods: { emod4: 'eval4' }}]}
                ]
            }
        },
        {
            attrs: { id: 'live-init-test' }
        },
        {
            attrs: { id: 'once-test' },
            content: [
                { block: 'b-foo', js: { id: 'test' }},
                { block: 'b-foo', js: { id: 'test' }}
            ]
        },
        {
            attrs: { id: 'elem-params-test' },
            content: {
                block: 'b-foo',
                content: [
                    { elem: 'elem1', js: { param: 'param1' }},
                    { elem: 'elem2', js: { param: 'param2' }},
                    { elem: 'elem3' }
                ]
            }
        },
        {
            attrs: { id: 'contains-dom-elem-test' },
            content: [
                { block: 'b-foo', content: { elem: 'e1' }, js: { id: 'id' }},
                { block: 'b-foo', content: { elem: 'e2' }, js: { id: 'id' }},
                { tag: 'div', attrs: { id: 'no-contains'} }
            ]
        },
        {
            attrs: { id: 'find-block-test'},
            content: {
                block: 'b-foo1',
                content : [
                    { block: 'b-foo1' },
                    {
                        block: 'b-foo1', mix: [{ block: 'b-foo3' }, { block: 'b-foo7', mods: { mod7: 'val7' }}], js: { id: 'id1' },
                        content: [
                            {
                                elem: 'el1',
                                content: [
                                    { block: 'b-foo2', mods: { first: 'yes' }, js: { id: 'id2' }},
                                    { block: 'b-foo2', mods: { first: 'yes' }, js: { id: 'id2' }},
                                    { block: 'b-foo2', mods: { mod1: 'val1' }},
                                    { block: 'b-foo3', mix: [{ block: 'b-foo4' }]}
                                ]
                            },
                            {
                                elem: 'el2',
                                mix: [{ block : 'b-foo5' }],
                                content: [
                                    { block: 'b-foo2', mods: { mod1: 'val2' }},
                                    { block: 'b-foo2', mods: { mod2: 'val2' }}
                                ]
                            }
                        ]
                    },
                    {
                        block: 'b-foo1', js: { id: 'id1' },
                        content: [
                            { block: 'b-foo2', mods: { first: 'yes' }, js: { id: 'id2' }},
                            { block: 'b-foo2' }
                        ]
                    }
                ]
            }
        },
        {
            attrs: { id: 'dom-ops-test'}
        },
        {
            block: 'i-bem',
            elem: 'test',
            content: [
                { block: 'i-jquery', elem: 'observable' },
                { block: 'i-ecma', elem: 'object' },
                { block: 'i-ecma', elem: 'array' },
                { block: 'i-ecma', elem: 'function' },
                { block: 'i-ecma', elem: 'string' },
                { block: 'i-ecma', elem: 'json' },
                { block: 'i-bem' },
                { block: 'i-bem', elem: 'internal' },
                { block: 'i-bem', elem: 'decls' },
                { block: 'i-bem', elem: 'mods' },
                { block: 'i-bem', elem: 'init' },
                { block: 'i-bem', elem: 'live-init' },
                { block: 'i-bem', elem: 'live-ctx' },
                { block: 'i-bem', elem: 'destruct' },
                { block: 'i-bem', elem: 'elem-params' },
                { block: 'i-bem', elem: 'contains-dom-elem' },
                { block: 'i-bem', elem: 'find-block' },
                { block: 'i-bem', elem: 'dom-ops' }
            ]
        }
    ]
})