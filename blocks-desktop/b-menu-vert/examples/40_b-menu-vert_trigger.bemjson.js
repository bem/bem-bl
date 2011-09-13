({
    block: 'b-page',
    title: 'Меню с триггером',
    head: [
        { elem: 'css', url: '_40_b-menu-vert_trigger.css' },
        { elem: 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_40_b-menu-vert_trigger.js' }
    ],
    content: [
        {
            block: 'b-menu-vert',
            js: true,
            title: {
                elem: 'title',
                content: 'Everythings'
            },
            content: [
                {
                    elem: 'item',
                    elemMods: { state: 'current' },
                    content: 'Videos'
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
                            },
                            {
                                elem: 'inner',
                                content: 'Images'
                            }
                        ]
                    },
                    'item-content': {
                        elem: 'item-content',
                        content: {
                            block: 'b-menu-vert',
                            mods: { 'type' : 'submenu' },
                            content: [
                                {
                                    elem: 'item',
                                    content: 'Any size'
                                },
                                {
                                    elem: 'item',
                                    content: 'Large'
                                },
                                {
                                    elem: 'item',
                                    content: 'Medium'
                                },
                                {
                                    elem: 'item',
                                    content: 'Icon'
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
                        content: 'News'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        url: '/',
                        content: 'Shoping'
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
                        content: 'More'
                    }
                }
            ]
        }
    ]
})
