({
    block: 'b-page',
    title: 'заголовок',
    head: [
        {
            elem: 'css',
            url: '_50-vert-title-bem.css'
        },
        {
            elem: 'css',
            ie: true,
            url: '_50-vert-title-bem.ie.css'
        },
        {
            block: 'i-jquery',
            mods: {version: '1.8.3'}
        },
        {
            elem: 'js',
            url: '_50-vert-title-bem.js'
        }
    ],
    content: {
        block: 'b-menu',
        mods: {
            layout: 'vert'
        },
        content: [
            {
                elem: 'title',
                content: 'Меню:'
            },
            {
                elem: 'item',
                elemMods: {
                    state: 'current'
                },
                content: 'Главная'
            },{
                elem: 'item',
                content: {
                    block: 'b-link',
                    url: '#',
                    content: 'Продукты'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-link',
                    url: '#',
                    content: 'Поддержка'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-link',
                    url: '#',
                    content: 'О компании'
                }
            }
        ]
    }
})
