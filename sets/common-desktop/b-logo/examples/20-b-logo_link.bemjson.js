({
    block: 'b-page',
    title: 'b-logo',
    head: [
        { elem: 'css', url: '_20-b-logo_link.css' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_20-b-logo_link.js' }
    ],
    content: [
        {
            block: 'b-logo',
            content: {
                elem: 'link',
                url: '/',
                title: 'logo',
                icon: {
                    elem: 'icon',
                    url: '../../../blocks-desktop/b-logo/examples/20-b-logo_link.blocks/b-logo/b-logo.png',
                    alt: 'logo'
                }
            }
        }
    ]
})
