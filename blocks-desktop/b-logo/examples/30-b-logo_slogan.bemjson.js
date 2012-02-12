({
    block: 'b-page',
    title: 'b-logo',
    head: [
        { elem: 'css', url: '_30-b-logo_slogan.css' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_30-b-logo_slogan.js' }
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
                        url: '../../../blocks-desktop/b-logo/examples/30-b-logo_slogan.blocks/b-logo/b-logo.png'
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



