({
    block: 'b-page',
    title: 'b-link_pseudo_yes',
    head: [
        { elem: 'css', url: '_20_b-link_pseudo.css', ie: false  },
        { elem: 'css', url: '_20_b-link_pseudo.ie.css', ie: 'lt IE 8' },
        { elem: 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_20_b-link_pseudo.js' }
    ],
    content: [
        {
            attrs: { style: 'margin: 20px 0 20px 20px;' },
            content: [
                {
                    block: 'b-link',
                    mods: { pseudo: 'yes' },
                    content: 'Псевдо-ссылка спаном'
                }, '&nbsp;&nbsp;',
                {
                    block: 'b-link',
                    mods: { pseudo: 'yes' },
                    url: 'http://ya.ru',
                    content: 'Псевдо-ссылка ссылкой'
                }
            ]
        },
        {
            attrs: { style: 'margin: 20px 0 20px 20px;' },
            content: {
                block: 'b-link',
                mods: { pseudo: 'yes' },
                url: 'http://ya.ru',
                target: '_blank',
                title: 'Заголовок',
                content: 'Псевдо-ссылка ссылкой с атрибутами title и target'
            }
        },
        {
            attrs: { style: 'margin: 20px 0 20px 20px;' },
            content: [
                {
                    block: 'b-link',
                    mods: { pseudo: 'yes', disabled: 'yes' },
                    content: 'Неактивная псевдо-ссылка спаном'
                }, '&nbsp;&nbsp;',
                {
                    block: 'b-link',
                    mods: { pseudo: 'yes', disabled: 'yes' },
                    url: 'http://ya.ru',
                    content: 'Неактивная псевдо-ссылка ссылкой'
                }
            ]
        }
    ]
})
