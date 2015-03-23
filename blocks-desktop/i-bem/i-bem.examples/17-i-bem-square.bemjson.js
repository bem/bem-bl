({
    block: 'b-page',
    title: 'Изменение модификатора блока по клику',
    head: [
        { elem: 'css', url: '_17-i-bem-square.css', ie: false },
        { elem: 'css', url: '_17-i-bem-square.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', mods: {version: '1.8.3'} },
        { elem: 'js', url: '_17-i-bem-square.js' }
    ],
    content: {
        block: 'b-square'
    }
})
