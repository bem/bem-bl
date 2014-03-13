({
    block: 'b-page',
    title: 'JS-меню с дополнительными элементами',
    head: [
        { elem: 'css', url: '_30-b-menu-vert_js-complex.css' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '30-b-menu-vert_js-complex.js' }
    ],
    content: [
        {
            block: 'b-menu-vert',
            js: true,
            content: [
                {
                    elem: 'item',
                    mods: { 'state' : 'current' },
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
                        elem: 'item-selector',
                        content: {
                            block: 'b-link',
                            mods : { 'pseudo' : 'yes', 'inner' : 'yes' },
                            mix: [{ block: 'b-menu-vert', elem: 'item-selector'}],
                            url: '/',
                            content: [
                                {
                                    block: 'b-icon',
                                    url: 'http://yastatic.net/lego/_/Kx6F6RQnQFitm0qRxX7vpvfP0K0.png',
                                    alt: 'Yandex favicon'
                                },
                                {
                                    elem: 'inner',
                                    content: 'Second point'
                                }
                            ]
                        }
                    }
                },
                {
                    elem: 'item',
                    content: {
                        block: 'b-link',
                        mods : { 'pseudo' : 'yes' },
                        mix: [{ block: 'b-menu-vert', elem: 'item-selector'}],
                        url: '/',
                        content: 'Third point'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        elem: 'item-selector',
                        content: {
                            block: 'b-link',
                            mods : { 'pseudo' : 'yes', 'inner' : 'yes' },
                            mix: [{ block: 'b-menu-vert', elem: 'item-selector'}],
                            url: '/',
                            content: [
                                {
                                    block: 'b-icon',
                                    url: 'http://yastatic.net/lego/_/Kx6F6RQnQFitm0qRxX7vpvfP0K0.png',
                                    alt: 'Yandex favicon'
                                },
                                {
                                    elem: 'inner',
                                    content: 'Second point'
                                }
                            ]
                        }
                    }
                }
            ]
        }
    ]
})
