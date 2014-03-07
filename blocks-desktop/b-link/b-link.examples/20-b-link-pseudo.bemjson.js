({
    block: 'b-page',
    title: 'b-link_pseudo_yes',
    head: [
        { elem: 'css', url: '_20-b-link-pseudo.css', ie: false  },
        { elem: 'css', url: '_20-b-link-pseudo.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_20-b-link-pseudo.js' }
    ],
    content: [
        {
            attrs: { style: 'margin: 20px 0 20px 20px;' },
            content: [
                {
                    block: 'b-link',
                    mods: { pseudo: 'yes' },
                    content: 'Псевдоссылка спаном'
                }, '&nbsp;&nbsp;',
                {
                    block: 'b-link',
                    mods: { pseudo: 'yes' },
                    url: 'http://ya.ru',
                    content: 'Псевдоссылка ссылкой'
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
                content: 'Псевдоссылка ссылкой с атрибутами title и target'
            }
        },
        {
            attrs: { style: 'margin: 20px 0 20px 20px;' },
            content: [
                {
                    block: 'b-link',
                    mods: { pseudo: 'yes', disabled: 'yes' },
                    content: 'Неактивная псевдоссылка спаном'
                }, '&nbsp;&nbsp;',
                {
                    block: 'b-link',
                    mods: { pseudo: 'yes', disabled: 'yes' },
                    url: 'http://ya.ru',
                    content: 'Неактивная псевдоссылка ссылкой'
                }
            ]
        }
    ]
})
