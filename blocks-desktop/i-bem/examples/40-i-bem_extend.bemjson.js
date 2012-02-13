({
    block: 'b-page',
    title: 'Изменение/дополнение стандартного поведения блока через модификатор',
    head: [
        { elem: 'css', url: '_40-i-bem_extend.css', ie: false },
        { elem: 'css', url: '_40-i-bem_extend.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '40-i-bem_extend.js' }
    ],
    content: {
        block: 'b-link',
        mods: { action: 'alert', pseudo: 'yes' },
        url: 'http://www.yandex.ru/',
        content: 'Кликни на ссылку'
    }
})
