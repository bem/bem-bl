({
    block: 'b-page',
    title: 'Liveinit по нескольким событиям',
    head: [
        { elem: 'css', url: '_20-liveinit-multiple.css', ie: false },
        { elem: 'css', url: '_20-liveinit-multiple.css.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_20-liveinit-multiple.js' }
    ],
    content: {
        block: 'b-tv',
        content: [
            { elem: 'click' },
            { elem: 'over' }
        ]
    }
})
