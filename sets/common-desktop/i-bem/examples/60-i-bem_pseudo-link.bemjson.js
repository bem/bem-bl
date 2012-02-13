({
    block: 'b-page',
    title: 'Реакция на события вложенных блоков',
    head: [
        { elem: 'css', url: '_60-i-bem_pseudo-link.css', ie: false },
        { elem: 'css', url: '_60-i-bem_pseudo-link.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '60-i-bem_pseudo-link.js' }
    ],
    content: {
        block: 'b-pseudo-link-example',
        content: {
            block: 'b-link',
            mods: { pseudo: 'yes', 'is-bem': 'yes' },
            content: 'Некликнутая ссылка'
        }
    }
})
