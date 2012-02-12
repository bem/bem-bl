({
    block: 'b-page',
    title: 'Изменение/дополнение стандартного поведения блока через модификатор',
    head: [
        { elem: 'css', url: '_40-extend.css', ie: false },
        { elem: 'css', url: '_40-extend.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_40-extend.js' }
    ],
    content: {
        block: 'b-link',
        mods: { action: 'alert', pseudo: 'yes' },
        url: 'http://www.yandex.ru/',
        content: 'Кликни на ссылку'
    }
})
