({
    block: 'b-page',
    title: 'Меню с глубоко вложенным триггером',
    head: [
        { elem: 'css', url: '_50_b-menu-vert_trigger-deep.css' },
        { elem: 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_50_b-menu-vert_trigger-deep.js' }
    ],
    content: [
        {
            block: 'b-menu-vert',
            js: true,
            title: {
                elem: 'title',
                content: 'Меню с глубоко вложенным триггером:'
            },
            content: [
                {
                    elem: 'item',
                    content: {
                        elem: 'trigger',
                        content: 'trigger1'

                    },
                    'item-content': {
                        elem: 'item-content',
                        content: {
                            block: 'b-menu-vert',
                            content: [
                                {
                                    elem: 'item',
                                    content: 'Submenu point 1'
                                },
                                {
                                elem: 'item',
                                    content: {
                                        elem: 'trigger',
                                        content: 'trigger2'

                                    },
                                    'item-content' : {
                                        elem: 'item-content',
                                        content: 'Content'
                                    }
                                },
                                {
                                    elem: 'item',
                                    content: 'Submenu point 2'
                                }
                            ]
                        }
                    }
                },
                {
                    elem: 'item',
                    elemMods: { state: 'current'},
                    content: {
                        block: 'b-link',
                        url: '/',
                        content: 'Second point'
                    }
                }
            ]
        }
    ]
})
