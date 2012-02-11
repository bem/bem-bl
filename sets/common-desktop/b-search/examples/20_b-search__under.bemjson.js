({
    block: 'b-page',
    title: 'b-search with under row',
    head: [
        { elem: 'css', url: '_20_b-search__under.css' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_20_b-search__under.js' }
    ],
    content: {
        block: 'b-search',
        attrs: { action: '/search.xml' },
        input: {
            elem: 'input',
            attrs: { value: 'Text' }
        },
        button: {
            elem: 'button'
        },
        under: [
            {
                block: 'b-link',
                url: '/',
                content: 'Advanced search'
            }
        ]
    }
})
