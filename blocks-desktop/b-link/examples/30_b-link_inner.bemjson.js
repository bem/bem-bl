({
    block: 'b-page',
    title: 'b-link_inner_yes',
    head: [
        { elem: 'css', url: '_30_b-link_inner.css' },
        { elem: 'css', url: '_30_b-link_inner.ie.css', ie: true },
        { elem: 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_30_b-link_inner.js' }
    ],
    content: [
        {
            block: 'b-link',
            mods: { inner: 'yes' },
            url: '#',
            content: [
                {
                    block: 'b-icon',
                    mix: [ { block: 'b-link', elem: 'icon'} ],
                    url: 'http://yandex.st/lego/_/Kx6F6RQnQFitm0qRxX7vpvfP0K0.png',
                    alt: 'Иконка Серпа'
                },
                {
                    elem: 'inner',
                    content: 'Ссылка с иконкой'
                }
            ]
        }

    ]

})
