({
    block: 'b-page',
    title: 'b-search',
    head: [
        { elem: 'css', url: '_10_b-search.css' },
        { elem: 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_10_b-search.js' }
    ],
    content: [
        {
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
    ]
})
