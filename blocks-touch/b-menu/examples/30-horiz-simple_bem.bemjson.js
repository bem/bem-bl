({
    block: 'b-page',
    title: 'заголовок',
    head: [
        {
            elem: 'css',
            url: '_30-horiz-simple_bem.css'
        },
        {
            elem: 'css',
            ie: true,
            url: '_30-horiz-simple_bem.ie.css'
        },
        {
            block: 'i-jquery',
            elem: 'core'
        },
        {
            elem: 'js',
            url: '_30-horiz-simple_bem.pub.js'
        }
    ],
    content: {
        block: 'b-menu',
        mods: {
            layout: 'horiz-simple'
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
