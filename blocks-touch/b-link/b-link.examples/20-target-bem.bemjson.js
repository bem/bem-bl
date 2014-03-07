({
    block: 'b-page',
    title: 'заголовок',
    head: [
        {
            elem: 'css',
            url: '_20-target-bem.css'
        },
        {
            elem: 'css',
            ie: true,
            url: '_20-target-bem.ie.css'
        },
        {
            block: 'i-jquery',
            elem: 'core'
        },
        {
            elem: 'js',
            url: '_20-target-bem.pub.js'
        }
    ],
    content: {
        block: 'b-link',
        url: 'http://yandex.ru',
        target: '_blank',
        content: 'Самая посещаемая страница Рунета'
    }
})
