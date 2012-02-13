({
    block: 'b-page',
    title: 'JS-меню, переключающее активный элемент',
    head: [
        { elem: 'css', url: '_20-b-menu-vert_js.css' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '20-b-menu-vert_js.js' }
    ],
    content: [
        {
            block: 'b-menu-vert',
            js: true,
            content: [
                {
                    elem: 'item',
                    elemMods: { 'state' : 'current' },
                    content: {
                        block: 'b-link',
                        mods : { 'pseudo' : 'yes' },
                        mix: [{ block: 'b-menu-vert', elem: 'item-selector'}],
                        url: '/',
                        content: 'First point'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        mods : { 'pseudo' : 'yes'},
                        mix: [{ block: 'b-menu-vert', elem: 'item-selector'}],
                        url: '/',
                        content: 'Second point'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        mods : { 'pseudo' : 'yes'},
                        mix: [{ block: 'b-menu-vert', elem: 'item-selector'}],
                        url: '/',
                        content: 'Third point'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        mods : { 'pseudo' : 'yes'},
                        mix: [{ block: 'b-menu-vert', elem: 'item-selector'}],
                        url: '/',
                        content: 'Forth point'
                    }
                }
            ]
        }
    ]
})
