({
    block: 'b-page',
    title: 'заголовок',
    head: [
        {
            elem: 'css',
            url: '_10-horiz-bem.css'
        },
        {
            elem: 'css',
            ie: true,
            url: '_10-horiz-bem.ie.css'
        },
        {
            block: 'i-jquery',
            elem: 'core'
        },
        {
            elem: 'js',
            url: '_10-horiz-bem.pub.js'
        }
    ],
    content: {
        block: 'b-menu',
        mods: {
            layout: 'horiz'
        },
        content: [
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
