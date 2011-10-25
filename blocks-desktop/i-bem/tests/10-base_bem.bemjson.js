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
                { block: 'i-jquery', elem: 'stringify' },
                { block: 'i-bem' },
                { block: 'i-bem', elem : 'live-ctx' },
                { block: 'i-bem', elem : 'elem-params' }
            ]
        }
    ]
})