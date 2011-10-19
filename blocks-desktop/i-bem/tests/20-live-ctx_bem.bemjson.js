({
    block: 'b-page',
    head: [
    	{ elem: 'css', url: '_20-live-ctx_bem.css', ie: false },
    	{ elem: 'css', url: '_20-live-ctx_bem.ie.css', ie: 'lt IE 8' },
    	{ block: 'i-jquery', elem: 'core' },
    	{ elem: 'js', url: '_20-live-ctx_bem.js' },
        { elem: 'js', url: '_20-live-ctx_bem.test.js' }
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
            block: 'i-bem',
            elem: 'test',
            content: [{ block: 'i-bem', elem : 'live-ctx' }]
        }
    ]
})