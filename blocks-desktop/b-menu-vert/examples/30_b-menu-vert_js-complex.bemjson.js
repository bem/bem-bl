({
    block: 'b-page',
    title: 'JS-меню с дополнительными элементами',
    head: [
        { elem: 'css', url: '_30_b-menu-vert_js-complex.css' },
        { elem: 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_30_b-menu-vert_js-complex.js' }
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
                                    url: 'http://yandex.st/lego/_/Kx6F6RQnQFitm0qRxX7vpvfP0K0.png',
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
                                    url: 'http://yandex.st/lego/_/Kx6F6RQnQFitm0qRxX7vpvfP0K0.png',
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
