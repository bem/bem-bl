({
    block: 'b-page',
    title: 'Block reacting to a link click',
    head: [
        { elem: 'css', url: '_010-i-bem_link-click-reaction.css', ie: false },
        { elem: 'css', url: '_010-i-bem_link-click-reaction.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '010-i-bem_link-click-reaction.js' }
    ],
    content: {
        block: 'b-link-reaction',
        js: true,
        content: [
            {
                block: 'b-link',
                mods: { pseudo: 'yes' },
                content: 'Unclicked link'
            }
        ]
    }
})
