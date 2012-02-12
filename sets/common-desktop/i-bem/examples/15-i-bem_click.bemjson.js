({
    block: 'b-page',
    title: 'Обработчик события click',
    head: [
        { elem: 'css', url: '_15-click.css', ie: false },
        { elem: 'css', url: '_15-click.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_15-click.js' }
    ],
    content: {
        block: 'b-square',
        js: true
    }
})
