({
    block: 'b-page',
    title: 'Изменение модификатора блока по клику',
    head: [
        { elem: 'css', url: '_17-square.css', ie: false },
        { elem: 'css', url: '_17-square.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_17-square.js' }
    ],
    content: {
        block: 'b-square'
    }
})
