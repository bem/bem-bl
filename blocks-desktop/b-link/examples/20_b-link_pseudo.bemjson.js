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
            block: 'b-link',
            mods: { pseudo: 'yes' },
            content: {
                elem: 'inner',
                content: 'Псевдо-спан'
            }
        },
        {
            block: 'b-link',
            mods: { pseudo: 'yes' },
            url: '#',
            target: '_blank',
            content: {
                elem: 'inner',
                content: 'Псевдо-ссылка с таргетом'
            }
        },
        {
            block: 'b-link',
            mods: { pseudo: 'yes' },
            url: '#',
            target: '_blank',
            title: 'Title у псевдо-ссылки',
            content: {
                elem: 'inner',
                content: 'Псевдо-ссылка с тайтлом и таргетом'
            }
        },
        {
            block: 'b-link',
            mods: { pseudo:'yes', disabled: 'yes' },
            content: {
                elem: 'inner',
                content: 'Залоченный псевдо-спан'
            }
        },
        {
            block: 'b-link',
            mods: { pseudo: 'yes' },
            url: 'http://ya.ru',
            content: {
                elem: 'inner',
                content: 'Псевдо-ссылка со ссылкой'
            }
        },
        {
            block: 'b-link',
            mods: { pseudo: 'yes', disabled: 'yes' },
            url: 'http://ya.ru',
            content: {
                elem: 'inner',
                content: 'Залоченная псевдо-ссылка'
            }
        },
        {
            block: 'b-link',
            mods: { pseudo: 'yes' },
            url: 'http://ya.ru',
            content: [
                {
                    block: 'b-icon',
                    mix: [ { block: 'b-link', elem: 'icon'} ],
                    url: 'http://yandex.st/lego/_/Kx6F6RQnQFitm0qRxX7vpvfP0K0.png',
                    alt: 'Иконка Серпа'
                },
                {
                    elem: 'inner',
                    content: 'Псевдо-ссылка с иконкой'
                }
            ]
        }
    ]
})
