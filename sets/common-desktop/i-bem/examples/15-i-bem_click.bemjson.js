({
    block: 'b-page',
    title: 'Обработчик события click',
    head: [
        { elem: 'css', url: '_15-i-bem_click.css', ie: false },
        { elem: 'css', url: '_15-i-bem_click.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '15-i-bem_click.js' }
    ],
    content: {
        block: 'b-square',
        js: true
    }
})
