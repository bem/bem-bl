({
    block: 'b-page',
    title: 'b-search',
    head: [
        { elem: 'css', url: '_10-b-search.css' }
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
        }
    }
})
