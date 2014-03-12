({
    block: 'b-page',
    title: 'i-ua example',
    head: [
        { elem: 'css', url: '_10-i-ua.css' },
        { elem: 'css', url: '_10-i-ua.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_10-i-ua.js' }
    ],
    content: [
        {
            block: 'b-text',
            elem: 'h3',
            content: 'Различное поведение контролов в зависимости от способа взаимодействия: клавиатурой или мышкой.'
        },
        {
            block: 'b-text',
            elem: 'table',
            content: [
                {
                    block: 'b-text',
                    elem: 'thead',
                    content: [
                        {
                            block: 'b-text',
                            elem: 'tr',
                            content: [
                                {
                                    block: 'b-text',
                                    elem: 'th',
                                    content: 'Название контрола'
                                },
                                {
                                    block: 'b-text',
                                    elem: 'th',
                                    content: 'Реализация нативная'
                                },
                                {
                                    block: 'b-text',
                                    elem: 'th',
                                    content: 'Реализация блоком'
                                },
                                {
                                    block: 'b-text',
                                    elem: 'th',
                                    content: 'Примечания'
                                }
                            ]
                        }
                    ]
                },
                {
                    block: 'b-text',
                    elem: 'tbody',
                    content: [
                        {
                            block: 'b-text',
                            elem: 'tr',
                            content: [
                                {
                                    block: 'b-text',
                                    elem: 'td',
                                    content: 'b-link'
                                },
                                {
                                    block: 'b-text',
                                    elem: 'td',
                                    content: {
                                        tag: 'a',
                                        attrs: { href: '#' },
                                        content: 'Default.Link'
                                    }
                                },
                                {
                                    block: 'b-text',
                                    elem: 'td',
                                    content: [
                                        {
                                            block: 'b-link',
                                            url: '#',
                                            content: 'Block.b-link'
                                        }
                                    ]
                                },
                                {
                                    block: 'b-text',
                                    elem: 'td',
                                    content: 'При получении фокуса мышкой рамка отсутствует'
                                }
                            ]
                        },
                        {
                            block: 'b-text',
                            elem: 'tr',
                            content: [
                                {
                                    block: 'b-text',
                                    elem: 'td',
                                    content: 'button'
                                },
                                {
                                    block: 'b-text',
                                    elem: 'td',
                                    content: {
                                        tag: 'button',
                                        content: 'Default.Button'
                                    }
                                },
                                {
                                    block: 'b-text',
                                    elem: 'td',
                                    content: [
                                        {
                                            block: 'button',
                                            js: true,
                                            content: 'Block.Button'
                                        }
                                    ]
                                },
                                {
                                    block: 'b-text',
                                    elem: 'td',
                                    content: 'При получении фокуса мышкой рамка отсутствует. Браузеры: все, кроме' +
                                        ' opera presto (<=12.16)'
                                }
                            ]
                        },
                        {
                            block: 'b-text',
                            elem: 'tr',
                            content: [
                                {
                                    block: 'b-text',
                                    elem: 'td',
                                    content: 'checkbox'
                                },
                                {
                                    block: 'b-text',
                                    elem: 'td',
                                    content: {
                                        tag: 'input',
                                        attrs: { type: 'checkbox' },
                                        content: 'Default.checkbox'
                                    }
                                },
                                {
                                    block: 'b-text',
                                    elem: 'td',
                                    content: [
                                        {
                                            block: 'checkbox',
                                            content: ' Block.checkbox'
                                        }
                                    ]
                                },
                                {
                                    block: 'b-text',
                                    elem: 'td',
                                    content: 'При получении фокуса мышкой рамка отсутствует.'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
})
