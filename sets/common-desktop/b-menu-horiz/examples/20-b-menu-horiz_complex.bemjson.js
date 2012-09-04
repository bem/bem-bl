({
    block: 'b-page',
    title: 'A horizontal menu using a table',
    head: [
        { elem: 'css', url: '_20-b-menu-horiz_complex.css' }
    ],
    content: [
        {
            block: 'b-menu-horiz',
            js: false,
            mods: { layout: 'complex' },
            content: [
                {
                    elem: 'item',
                    elemMods: { state: 'current' },
                    content: [
                            {
                                block: 'b-icon',
                                mods: { type: 'compose'},
                                alt: 'Compose'
                            },
                        'Compose'
                    ]
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        url: '/',
                        content: [
                            {
                                block: 'b-icon',
                                mods: { type: 'check'},
                                alt: 'Check'
                            },
                            'Check&nbsp;mail'
                        ]
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
                        content: [
                            {
                                block: 'b-icon',
                                mods: { type: 'forward'},
                                alt: 'forward'
                            },
                            'Forward'
                        ]
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        url: '/',
                        content: [
                            {
                                block: 'b-icon',
                                mods: { type: 'delete'},
                                alt: 'Delete'
                            },
                            'Delete'
                        ]
                    }
                },
                {
                    elem: 'item',
                    elemMods: { state: 'disabled'},
                    content: [
                        {
                            block: 'b-icon',
                            mods: { type: 'spam'},
                            alt: 'Spam'
                        },
                        'Spam!'
                    ]
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        url: '/',
                        content: [
                            {
                                block: 'b-icon',
                                mods: { type: 'read'},
                                alt: 'Read'
                            },
                            'Read'
                        ]
                    }
                },
                {
                    elem: 'gap'
                },
                {
                    elem: 'item',
                    elemMods: { type: 'bottom'},
                    content: {
                        block: 'b-link',
                        url: '/',
                        content: 'Mark&nbsp;as'
                    }
                },
                {
                    elem: 'item',
                    elemMods: { type: 'bottom'},
                    content: {
                        block: 'b-link',
                        url: '/',
                        content: 'Move&nbsp;to&nbsp;folder'
                    }
                }
            ]
        }
    ]
})
