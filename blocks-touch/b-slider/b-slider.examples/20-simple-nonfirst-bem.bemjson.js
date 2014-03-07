({
    block: 'b-page',
    title: 'заголовок',
    head: [
        {
            elem: 'css',
            url: '_20-simple-nonfirst-bem.css'
        },
        {
            elem: 'css',
            ie: true,
            url: '_20-simple-nonfirst-bem.ie.css'
        },
        {
            block: 'i-jquery',
            elem: 'core'
        },
        {
            elem: 'js',
            url: '_20-simple-nonfirst-bem.pub.js'
        }
    ],
    content: {
        block: 'b-slider',
        js: {
            index: 5
        },
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
