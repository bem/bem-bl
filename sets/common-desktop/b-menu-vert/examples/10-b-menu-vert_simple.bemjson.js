({
    block: 'b-page',
    title: 'Простое вертикальное меню',
    head: [
        { elem: 'css', url: '_10-b-menu-vert_simple.css' }
    ],
    content: [
        {
            block: 'b-menu-vert',
            title: {
                elem: 'title',
                content: 'Menu title'
            },
            content: [
                {
                    elem: 'item',
                    elemMods: { state: 'current' },
                    content: 'Index'
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        url: 'http://yandex.com',
                        content: 'Search'
                    }
                },
                {
                    elem: 'separator'
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        url: 'http://company.yandex.com',
                        content: 'Company'
                    }
                }
            ]
        }
    ]
})
