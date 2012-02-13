({
    block: 'b-page',
    title: 'Использование submenu',
    head: [
        { elem: 'css', url: '_70-b-menu-vert_submenu-trigger.css' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '70-b-menu-vert_submenu-trigger.js' }
    ],
    content: [
        {
            block: 'b-menu-vert',
            js: true,
            title: {
                elem: 'title',
                content: 'Menu title'
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
                        mix: [{ block: 'b-menu-vert', elem: 'item-selector'}],
                        content: '+ Images'
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
