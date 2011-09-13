({
    block: 'b-page',
    title: 'JS-меню, переключающее активный элемент',
    head: [
        { elem: 'css', url: '_20_b-menu-vert_js.css' },
        { elem: 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_20_b-menu-vert_js.js' }
    ],
    content: [
        {
            block: 'b-menu-vert',
            js: true,
            title: {
                elem: 'title',
                content: 'JS-меню, переключающее активный элемент:'
            },
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
