({
    block: 'b-page',
    title: 'A horizontal menu using links',
    head: [
        { elem: 'css', url: '_05-b-menu-horiz_simple.css' },
        { elem: 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_05-b-menu-horiz_simple.js' }
    ],
    content: [
        {
            block: 'b-menu-horiz',
            mods: { layout: 'simple' },
            separator: ' | ',
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
