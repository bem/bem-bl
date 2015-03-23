({
    block: 'b-page',
    title: 'заголовок',
    head: [
        {
            elem: 'css',
            url: '_30-ico-bem.css'
        },
        {
            elem: 'css',
            ie: true,
            url: '_30-ico-bem.ie.css'
        },
        {
            block: 'i-jquery',
            mods: {version: '1.8.3'}
        },
        {
            elem: 'js',
            url: '_30-ico-bem.js'
        }
    ],
    content: {
        block: 'b-link',
        url: 'http://yandex.ru',
        content: [
            {
                block: 'b-ico',
                src: 'http://yastatic.net/lego/_/pDu9OWAQKB0s2J9IojKpiS_Eho.ico'
            },
            {
                elem: 'text',
                content: 'Самая посещаемая страница Рунета'
            }
        ]
    }
})
