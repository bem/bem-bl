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
        block: 'b-link',
        url: 'http://yandex.ru',
        content: 'Самая посещаемая страница Рунета'
    }
})
