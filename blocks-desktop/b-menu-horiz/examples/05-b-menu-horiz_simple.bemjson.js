({
    block: 'b-page',
    title: 'A horizontal menu using links',
    head: [
        { elem: 'css', url: '_05-b-menu-horiz_simple.css' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_05-b-menu-horiz_simple.js' }
    ],
    content: [
        {
            block: 'b-menu-horiz',
            mods: { layout: 'simple' },
            separator: ' | ',
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
