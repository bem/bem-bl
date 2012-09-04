({
    block: 'b-page',
    title: 'b-search with under row',
    head: [
        { elem: 'css', url: '_20-b-search_under.css' }
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
