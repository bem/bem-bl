({
    block: 'b-page',
    title: 'b-link',
    head: [
        { elem: 'css', url: '_20_b-link_pseudo.css' },
        { elem: 'css', url: '_20_b-link_pseudo.ie.css', ie: true },
        { elem : 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_20_b-link_pseudo.js' }
    ],
    content: [
        {
            block: 'b-link',
            mods : { pseudo : 'yes' },
            content : 'Псевдо-спан'
        },
        {
            block: 'b-link',
            mods : { pseudo : 'yes' },
            url: '#',
            target: '_blank',
            content : 'Псевдо-ссылка с таргетом'
        },
        {
            block: 'b-link',
            mods : { pseudo : 'yes' },
            url: '#',
            target: '_blank',
            title: 'Title у псевдо-ссылки',
            content : 'Псевдо-ссылка с тайтлом и таргетом'
        },
        {
            block: 'b-link',
            mods : { pseudo : 'yes', disabled : 'yes' },
            content : 'Залоченный псевдо-спан'
        },
        {
            block: 'b-link',
            mods : { pseudo : 'yes' },
            url : 'http://yandex.ru',
            content : 'Псевдо-ссылка со ссылкой'
        },
        {
            block: 'b-link',
            mods : { pseudo : 'yes', disabled : 'yes' },
            url : 'http://yandex.ru',
            content : 'Залоченная псевдо-ссылка'
        }
    ]
})
