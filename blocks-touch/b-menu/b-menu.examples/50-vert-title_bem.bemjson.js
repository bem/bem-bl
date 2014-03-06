({
    block: 'b-page',
    title: 'заголовок',
    head: [
        {
            elem: 'css',
            url: '_50-vert-title_bem.css'
        },
        {
            elem: 'css',
            ie: true,
            url: '_50-vert-title_bem.ie.css'
        },
        {
            block: 'i-jquery',
            elem: 'core'
        },
        {
            elem: 'js',
            url: '_50-vert-title_bem.pub.js'
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
