({
    block: 'b-page',
    title: 'A horizontal menu using a list',
    head: [
        { elem: 'css', url: '_10-b-menu-horiz_normal.css' }
    ],
    content: [
        {
            block: 'b-menu-horiz',
            mods: { layout: 'normal' },
            js: false,
            title: {
                elem: 'title',
                content: 'Navigation:'
            },
            content: [
                {
                    elem: 'item',
                    elemMods: { state: 'current' },
                    content: 'Home'
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        url: '/',
                        content: 'Products'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        url: '/',
                        content: 'Services'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        url: '/',
                        content: 'Support'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        url: '/',
                        content: 'Company'
                    }
                }
            ]
        }
    ]
})
