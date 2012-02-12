({
    block: 'b-page',
    title: 'Меню с глубоко вложенным триггером',
    head: [
        { elem: 'css', url: '_50_b-menu-vert_trigger-deep.css' },
        { block: 'i-jquery', elem: 'core' },
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
                        content: [
                            {
                                block: 'b-icon',
                                mix: [{ block: 'b-menu-vert', elem: 'trigger-icon' }],
                                alt: 'trigger'
                            },'trigger 1'
                        ]
                    },
                    'item-content': {
                        elem: 'item-content',
                        content: {
                            block: 'b-menu-vert',
                            mods: { type: 'submenu'},
                            content: [
                                {
                                    elem: 'item',
                                    content: {
                                        block: 'b-link',
                                        url: '/',
                                        content: {
                                            block: 'b-link',
                                            url: '/',
                                            content: 'Submenu point 1'
                                        }
                                    }
                                },
                                {
                                    elem: 'item',
                                    content: {
                                        elem: 'trigger',
                                        content: [
                                            {
                                                block: 'b-icon',
                                                mix: [{ block: 'b-menu-vert', elem: 'trigger-icon' }],
                                                alt: 'trigger'
                                            },'trigger 2'
                                        ]
                                    },
                                    'item-content': {
                                        elem: 'item-content',
                                        content: {
                                            block: 'b-link',
                                            url: '/',
                                            content: 'Content'
                                        }
                                    }
                                },
                                {
                                    elem: 'item',
                                    content: {
                                        block: 'b-link',
                                        url: '/',
                                        content: 'Submenu point 2'
                                    }
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
