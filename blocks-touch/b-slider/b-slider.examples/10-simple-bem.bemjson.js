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
            elem: 'core'
        },
        {
            elem: 'js',
            url: '_10-simple-bem.pub.js'
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
