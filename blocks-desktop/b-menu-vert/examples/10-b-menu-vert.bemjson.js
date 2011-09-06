({
    block: 'b-page',
    title: 'b-menu-vert',
    head: [
        { elem: 'css', url: '_10-b-menu-vert.css' },
        { elem: 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_10-b-menu-vert.js' }
    ],
    content: [
        {
            block: 'b-menu-vert',
            title: {
                elem: 'title',
                content: 'Заголовок:'
            },
            content: [
                {
                    elem: 'item',
                    elemMods: { state: 'current' },
                    content: 'Главная'
                },
                {
                    elem: 'item',
                    content: {
                        elem: 'trigger',
                        content: 'Элемент Триггер'

                    },
                    'item-content': {
                        elem: 'item-content',
                        content: {
                            block: 'b-menu-vert',
                            content: [
                                {
                                    elem: 'item',
                                    content: 'Пункт вложенного меню'
                                },
                                {
                                    elem: 'item',
                                    content: 'Еще один'
                                }
                            ]
                        }
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
                    elem: 'separator'
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
