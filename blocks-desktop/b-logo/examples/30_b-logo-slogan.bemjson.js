({
    block: 'b-page',
    title: 'b-logo',
    head: [
        { elem: 'css', url: '_30_b-logo-slogan.css' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_30_b-logo-slogan.js' }
    ],
    content: [
        {
            block: 'b-logo',
            content: {
                elem: 'link',
                url: '/',
                content: [
                    {
                        elem: 'icon',
                        url: '../../../../bem-bl/blocks-desktop/b-logo/examples/30_b-logo-slogan.blocks/b-logo/b-logo.png'
                    },
                    {
                        elem: 'slogan',
                        content: 'Trademark slogan'
                    }
                ]
            }
        }
    ]
})



