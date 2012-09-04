({
    block: 'b-page',
    title: 'Liveinit по нескольким событиям',
    head: [
        { elem: 'css', url: '_20-i-bem_liveinit-multiple.css', ie: false },
        { elem: 'css', url: '_20-i-bem_liveinit-multiple.css.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '20-i-bem_liveinit-multiple.js' }
    ],
    content: {
        block: 'b-tv',
        content: [
            { elem: 'click' },
            { elem: 'over' }
        ]
    }
})
