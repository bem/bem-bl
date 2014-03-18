({
    block: 'b-page',
    title: 'i-ua example',
    head: [
        { elem: 'css', url: '_10-i-ua.css', ie: false  },
        { elem: 'css', url: '_10-i-ua.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_10-i-ua.js' }
    ],
    content: [
        {
            tag: 'p',
            content: 'Различное поведение контролов в зависимости от способа взаимодействия: клавиатурой или мышкой.'
        },
        {
            tag: 'table',
            content: [
                {
                    tag: 'thead',
                    content: [
                        {
                            tag: 'tr',
                            content: [
                                {
                                    tag: 'th',
                                    content: 'Название контрола'
                                },
                                {
                                    tag: 'th',
                                    content: 'Реализация нативная'
                                },
                                {
                                    tag: 'th',
                                    content: 'Реализация блоком'
                                },
                                {
                                    tag: 'th',
                                    content: 'Примечания'
                                }
                            ]
                        }
                    ]
                },
                {
                    tag: 'tbody',
                    content: [
                        {
                            tag: 'tr',
                            content: [
                                {
                                    tag: 'td',
                                    content: 'b-link'
                                },
                                {
                                    tag: 'td',
                                    content: {
                                        tag: 'a',
                                        attrs: { href: '#' },
                                        content: 'Default.Link'
                                    }
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            block: 'b-link',
                                            url: '#',
                                            content: 'Block.b-link'
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: 'При получении фокуса мышкой рамка отсутствует'
                                }
                            ]
                        },
                        {
                            tag: 'tr',
                            content: [
                                {
                                    tag: 'td',
                                    content: 'button'
                                },
                                {
                                    tag: 'td',
                                    content: {
                                        tag: 'button',
                                        content: 'Default.Button'
                                    }
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            block: 'button',
                                            js: true,
                                            content: 'Block.Button'
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: 'При получении фокуса мышкой рамка отсутствует. Браузеры: все, кроме' +
                                        ' opera presto (<=12.16)'
                                }
                            ]
                        },
                        {
                            tag: 'tr',
                            content: [
                                {
                                    tag: 'td',
                                    content: 'checkbox'
                                },
                                {
                                    tag: 'td',
                                    content: {
                                        tag: 'input',
                                        attrs: { type: 'checkbox' },
                                        content: 'Default.checkbox'
                                    }
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            block: 'checkbox',
                                            content: ' Block.checkbox'
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
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
