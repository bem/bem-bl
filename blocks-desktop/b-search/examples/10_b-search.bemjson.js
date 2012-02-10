({
    block: 'b-page',
    title: 'b-search',
    head: [
        { elem: 'css', url: '_10_b-search.css' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_10_b-search.js' }
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
