({
    block: 'b-page',
    title: 'b-logo',
    head: [
        { elem: 'css', url: '_20_b-logo-link.css' },
        { block: 'i-jquery', elem: 'core' },
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
