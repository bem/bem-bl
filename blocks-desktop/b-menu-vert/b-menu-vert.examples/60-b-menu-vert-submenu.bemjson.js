({
    block: 'b-page',
    title: 'Использование submenu',
    head: [
        { elem: 'css', url: '_60-b-menu-vert-submenu.css' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_60-b-menu-vert-submenu.js' }
    ],
    content: [
        {
            block: 'b-menu-vert',
            js: true,
            content: [
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        mods : { 'pseudo' : 'yes'},
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
                        },
                    'item-content': {
                        elem: 'item-content',
                        elemMods: { 'visibility' : 'visible' },
                        content:
                            {
                                elem: 'submenu',
                                content: [
                                    {
                                        elem: 'item',
                                        content: {
                                            block: 'b-link',
                                            mods : { 'pseudo' : 'yes'},
                                            mix: [{ block: 'b-menu-vert', elem: 'item-selector'}],
                                            url: '/',
                                            content: 'First submenu point'
                                        }
                                    },
                                    {
                                        elem: 'item',
                                        content: {
                                            block: 'b-link',
                                            mods : { 'pseudo' : 'yes'},
                                            mix: [{ block: 'b-menu-vert', elem: 'item-selector'}],
                                            url: '/',
                                            content: 'Second submenu point'
                                        }
                                    }
                                ]
                            }
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
                        content: 'Fourth point'
                    }
                }
            ]
        }
    ]
})
