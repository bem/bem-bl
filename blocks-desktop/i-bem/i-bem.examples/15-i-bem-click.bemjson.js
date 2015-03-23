({
    block: 'b-page',
    title: 'Обработчик события click',
    head: [
        { elem: 'css', url: '_15-i-bem-click.css', ie: false },
        { elem: 'css', url: '_15-i-bem-click.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', mods: {version: '1.8.3'} },
        { elem: 'js', url: '_15-i-bem-click.js' }
    ],
    content: {
        block: 'b-square',
        js: true
    }
})
