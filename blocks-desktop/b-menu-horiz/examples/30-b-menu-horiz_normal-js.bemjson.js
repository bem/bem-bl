({
    block: 'b-page',
    title: 'Switching horizontal menu using a list',
    head: [
        { elem: 'css', url: '_30-b-menu-horiz_normal-js.css', ie: false },
        { elem: 'css', url: '_30-b-menu-horiz_normal-js.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '30-b-menu-horiz_normal-js.js' }
    ],
    content: [
        {
            block: 'b-menu-horiz',
            mods: { layout: 'normal' },
            title: {
                elem: 'title',
                content: 'Navigation:'
            },
            content: [
                {
                    elem: 'item',
                    elemMods: { state: 'current' },
                    content: {
                        block: 'b-link',
                        mods: { pseudo: 'yes' },
                        mix: [{ block: 'b-menu-horiz', elem : 'item-selector' }],
                        url: '/',
                        content: 'Home'
                    }
                },
                {
                    elem: 'item',
                    elemMods: { state: 'disabled' },
                    content: {
                        block: 'b-link',
                        mods: { pseudo : 'yes' },
                        mix: [{ block: 'b-menu-horiz', elem : 'item-selector' }],
                        url: '/',
                        content: 'Products'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        mods: { pseudo : 'yes' },
                        mix: [{ block: 'b-menu-horiz', elem : 'item-selector' }],
                        url: '/',
                        content: 'Services'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        mods: { pseudo : 'yes' },
                        mix: [{ block: 'b-menu-horiz', elem : 'item-selector' }],
                        url: '/',
                        content: 'Support'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        mods: { pseudo : 'yes' },
                        mix: [{ block: 'b-menu-horiz', elem : 'item-selector' }],
                        url: '/',
                        content: 'Company'
                    }
                }
            ]
        }
    ]
})
