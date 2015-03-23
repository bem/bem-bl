({
    block: 'b-page',
    title: 'заголовок',
    head: [
        {
            elem: 'css',
            url: '_10-simple-bem.css'
        },
        {
            elem: 'css',
            ie: true,
            url: '_10-simple-bem.ie.css'
        },
        {
            block: 'i-jquery',
            mods: {version: '1.8.3'}
        },
        {
            elem: 'js',
            url: '_10-simple-bem.js'
        }
    ],
    content: {
        block: 'b-slider',
        mix: [{
            block: 'b-my-slider'
        }],
        content: [
            {
                elem: 'item',
                content: {
                    block: 'b-link',
                    url: 'http://ya.ru',
                    content: 'Я.Слайдер!'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-link',
                    url: 'http://ya.ru',
                    content: 'Уиии! Я.Слайдер!'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-link',
                    url: 'http://ya.ru',
                    content: 'Я.Слайдер Я.Слайдер!'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-link',
                    url: 'http://ya.ru',
                    content: 'Я.Слайдер'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-link',
                    url: 'http://ya.ru',
                    content: 'Я.Слайдер!'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-link',
                    url: 'http://ya.ru',
                    content: 'Уиии! Я.Слайдер!'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-link',
                    url: 'http://ya.ru',
                    content: 'Я.Слайдер Я.Слайдер!'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-link',
                    url: 'http://ya.ru',
                    content: 'Я.Слайдер'
                }
            }
        ]
     }
})
