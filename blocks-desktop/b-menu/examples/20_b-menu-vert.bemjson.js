({
    block: 'b-page',
    title: 'b-menu',
    head: [
        { elem: 'css', url: '_20_b-menu-vert.css' },
        { elem: 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_20_b-menu-vert.js' }
    ],
    content: [
        {
            block: 'b-menu',
            mods: { layout: 'vert' },
            content: [
                {
                    elem: 'title',
                    content: 'Заголовок: '
                },
                {
                    elem: 'item',
                    elemMods: { state: 'current' },
                    content: 'Главная'
                },
                {
                    elem: 'item',
                    content: [
                        {
                            elem: 'trigger',
                            url: '/',
                            content: 'Элемент Триггер'
                        },
                        {
                            elem: 'item-content',
                            content: [
                                {
                                    block: 'b-menu',
                                    mods: { layout: 'vert' },
                                    content: [
                                        {
                                            elem: 'item',
                                            content: 'Вложенное меню'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
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
