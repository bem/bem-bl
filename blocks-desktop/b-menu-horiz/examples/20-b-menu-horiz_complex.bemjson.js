({
    block: 'b-page',
    title: 'b-menu-horiz',
    head: [
        { elem: 'css', url: '_20-b-menu-horiz_complex.css' },
        { elem: 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_20-b-menu-horiz_complex.js' }
    ],
    content: [
        {
            block: 'b-menu-horiz',
            mods: { layout: 'complex' },
            content: [
                {
                    elem: 'title',
                    content: 'Заголовок:'
                },
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
