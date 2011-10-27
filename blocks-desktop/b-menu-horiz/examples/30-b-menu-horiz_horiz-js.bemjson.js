({
    block: 'b-page',
    title: 'Переключающееся горизонтальное меню',
    head: [
        { elem: 'css', url: '_30-b-menu-horiz_horiz-js.css' },
        { elem: 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_30-b-menu-horiz_horiz-js.js' }
    ],
    content: [
        {
            block: 'b-menu-horiz',
            mods: { layout: 'horiz' },
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
                        mods: { 'pseudo': 'yes' },
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
                        mods: { 'pseudo' : 'yes' },
                        mix: [{ block: 'b-menu-horiz', elem : 'item-selector' }],
                        url: '/',
                        content: 'Products'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        mods: { 'pseudo' : 'yes' },
                        mix: [{ block: 'b-menu-horiz', elem : 'item-selector' }],
                        url: '/',
                        content: 'Services'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        mods: { 'pseudo' : 'yes' },
                        mix: [{ block: 'b-menu-horiz', elem : 'item-selector' }],
                        url: '/',
                        content: 'Support'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        mods: { 'pseudo' : 'yes' },
                        mix: [{ block: 'b-menu-horiz', elem : 'item-selector' }],
                        url: '/',
                        content: 'Company'
                    }
                }
            ]
        }
    ]
})
