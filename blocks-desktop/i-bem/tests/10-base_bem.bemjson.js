({
    block: 'b-page',
    head: [
    	{ elem: 'css', url: '_10-base_bem.css', ie: false },
    	{ elem: 'css', url: '_10-base_bem.ie.css', ie: 'lt IE 8' },
    	{ block: 'i-jquery', elem: 'core' },
    	{ elem: 'js', url: '_10-base_bem.js' },
        { elem: 'js', url: '_10-base_bem.test.js' }
    ],
    content: {
        block: 'i-bem',
        elem: 'test',
        content: [
            { block: 'i-bem' },
            { block: 'i-jquery', elem: 'stringify' }
        ]
    }
})