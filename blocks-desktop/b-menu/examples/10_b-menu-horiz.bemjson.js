({
    block: 'b-page',
    title: 'b-menu',
    head: [
        { elem: 'css', url: '_10_b-menu-horiz.css' },
        { elem: 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_10_b-menu-horiz.js' }
    ],
    content: [
        {
            block: 'b-menu',
            mods: { layout: 'horiz' },
            title: {
                elem: 'title',
                content: 'Заголовок:'
            },
            content: [
                {
                    elem: 'item',
                    elemMods: { state: 'current' },
                    content: 'Первая ячейка'
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        url: '/',
                        content: 'Находки'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        url: '/',
                        content: 'Поиск'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        url: '/',
                        content: 'О проекте'
                    }
                }
            ]
        }
    ]
})
