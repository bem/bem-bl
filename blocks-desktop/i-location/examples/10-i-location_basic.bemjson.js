({
    block: 'b-page',
    title: 'Page with i-location',
    js: true,
    mods: { ajax: 'yes' },
    head: [
        { elem: 'css', url: '_10-i-location_basic.css' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '10-i-location_basic.js' }
    ],
    content: [
        {
            block: 'b-menu-vert',
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
                        url: '/search/',
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
                        url: '/company/',
                        content: 'Company'
                    }
                }
            ]
        },
        {
            elem: 'info'
        }
    ]
})
