({
    block: 'b-page',
    title: 'Использование submenu',
    head: [
        { elem: 'css', url: '_70_b-menu-vert_submenu-trigger.css' },
        { elem: 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_70_b-menu-vert_submenu-trigger.js' }
    ],
    content: [
        {
            block: 'b-menu-vert',
            js: true,
            title: {
                elem: 'title',
                content: 'Использование submenu:'
            },
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
                            elem: 'trigger',
                            content: '+'
                    },
                    'item-content': {
                        elem: 'item-content',
                        content: {
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
                    elemMods: { 'state' : 'current' },
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
