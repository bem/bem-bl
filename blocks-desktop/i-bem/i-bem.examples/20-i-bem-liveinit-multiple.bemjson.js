({
    block: 'b-page',
    title: 'Liveinit по нескольким событиям',
    head: [
        { elem: 'css', url: '_20-i-bem-liveinit-multiple.css', ie: false },
        { elem: 'css', url: '_20-i-bem-liveinit-multiple.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', mods: {version: '1.8.3'} },
        { elem: 'js', url: '_20-i-bem-liveinit-multiple.js' }
    ],
    content: {
        block: 'b-tv',
        content: [
            { elem: 'click' },
            { elem: 'over' }
        ]
    }
})
