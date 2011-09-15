({
    block: 'b-page',
    title: 'b-logo',
    head: [
        { elem: 'css', url: '_20_b-logo-link.css' },
        { elem: 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
        { elem: 'js', url: '_20_b-logo-link.js' }
    ],
    content: [
        'logotype with link',
        {
            block: 'b-logo',
            content: [
                {
                    elem: 'link',
                    url: '/',
                    title: 'logo',
                    icon: {
                        elem: 'icon',
                        url: '../../../../bem-bl/blocks-desktop/b-logo/examples/10_b-logo.blocks/b-logo/b-logo.png',
                        alt: 'logo'
                    }
                }
            ]
        }
    ]
})
