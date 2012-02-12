({
    block: 'b-page',
    title: 'Текст на странице',
    head: [
        { elem: 'css', url: '_10_simple.css' },
        { elem: 'js', url: '_10_simple.js' }
    ],
    content: {
        block: 'b-text',
        content: [
            {
                elem: 'h1',
                content: 'Заголовок h1'
            },
            {
                elem: 'h2',
                content: 'Заголовок h2'
            },
            {
                elem: 'h3',
                content: 'Заголовок h3'
            },
            {
                elem: 'h4',
                content: 'Заголовок h4'
            },
            {
                elem: 'p',
                content: 'Параграф (тег p)'
            },
            {
                elem: 'ul',
                content: [
                    {
                        elem: 'li',
                        content: 'Пункт ненумерованного списка'
                    },
                    {
                        elem: 'li',
                        content: 'Ещё один пункт ненумерованного списка'
                    }
                ]
            },
            {
                elem: 'ol',
                content: [
                    {
                        elem: 'li',
                        content: 'Пункт нумерованного списка'
                    },
                    {
                        elem: 'li',
                        content: 'Ещё один пункт нумерованного списка'
                    }
                ]
            },
            {
                elem: 'blockquote',
                content: 'Блок с отступом'
            },
            {
                elem: 'pre',
                content: "BEM.DOM.decl('b-my-block', {\n" +
                         "    // Блок с кодом\n" +
                         "}..."
            }
        ]
    }
})
