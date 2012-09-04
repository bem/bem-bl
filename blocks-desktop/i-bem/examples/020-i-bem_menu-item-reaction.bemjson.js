({
    block: 'b-page',
    title: 'Block reacts to choosing a menu item',
    head: [
        { elem: 'css', url: '_020-i-bem_menu-item-reaction.css', ie: false },
        { elem: 'css', url: '_020-i-bem_menu-item-reaction.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '020-i-bem_menu-item-reaction.js' }
    ],
    content: {
        block: 'b-menu-reaction',
        js: true,
        content: [
            {
                block: 'b-layout-table',
                mods: { layout: '60-40'},
                content: {
                    elem: 'row',
                    content: [
                        {
                            elem: 'cell',
                            content: {
                                elem: 'inner',
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
                            }
                        },
                        {
                            elem: 'cell',
                            elemMods: { position: 'r'},
                            content: 'Second cell'
                        }
                    ]
                }
            }
        ]
    }
})
