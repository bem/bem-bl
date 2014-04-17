({
    block: 'b-page',
    title: 'Браузерные контролы и контролы-блоки',
    head: [
        {elem: 'css', url: '_10-i-ua.css', ie: false},
        {elem: 'css', url: '_10-i-ua', ie: true}
    ],
    content: [
        {
            attrs: {style: 'padding: 30px 100px 0;'},
            content: '<p style="margin-bottom: 0;">Проверить работу можно нажимая на контролы-блоки мышкой ' +
                'или пробелом и переходя по ним клавишей Tab</p>'
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
                                    content: 'link'
                                },
                                {
                                    tag: 'td',
                                    content: {
                                        tag: 'a',
                                        attrs: {href: 'http://ya.ru'},
                                        content: 'Default.Link'
                                    }
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            block: 'link',
                                            url: 'http://ya.ru',
                                            content: 'Самая посещаемая страница Рунета'
                                        },
                                        '<br><br>',
                                        {
                                            block: 'link',
                                            mods: {pseudo: 'yes'},
                                            content: 'Псевдо-ссылка спаном'
                                        },
                                        '<br><br>',
                                        {
                                            block: 'link',
                                            mods: {pseudo: 'yes'},
                                            url: 'http://ya.ru',
                                            content: 'Псевдо-ссылка ссылкой'
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: 'При получении фокуса мышкой рамка отсутствует. Браузеры: TODO'
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
                                            mods: {size: 's', theme: 'normal'},
                                            content: 'button_theme_normal'
                                        },
                                        '<br><br>',
                                        {
                                            block: 'button',
                                            mods: {size: 's', theme: 'action'},
                                            content: 'button_theme_action'
                                        },
                                        '<br><br>',
                                        {
                                            block: 'button',
                                            mods: {size: 's', theme: 'clear'},
                                            content: 'button_theme_clear'
                                        },
                                        '<br><br>',
                                        {
                                            block: 'button',
                                            mods: {size: 's', theme: 'pseudo'},
                                            content: 'button_theme_pseudo'
                                        },
                                        '<br><br>',
                                        {
                                            block: 'button',
                                            mods: {size: 's', round: 'yes'},
                                            attrs: {title: 'button_round_yes'},
                                            content: 'button_round_yes'
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: 'При получении фокуса мышкой рамка отсутствует. Браузеры: все, кроме' +
                                        'opera presto (<=12.16)'
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
                                    content: [
                                        {
                                            tag: 'input',
                                            attrs: {type: 'checkbox', value: 'Default.Checkbox', id: 'Default.Checkbox'}
                                        },
                                        {
                                            tag: 'label',
                                            attrs: {'for': 'Default.Checkbox'},
                                            content: 'Default.Checkbox'
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            block: 'checkbox',
                                            mods: {size: 's'},
                                            content: {elem: 'label', content: 'Я.Checkbox'}
                                        },
                                        '<br><br>',
                                        {
                                            block: 'checkbox',
                                            mods: {size: 's', theme: 'pseudo'},
                                            content: {elem: 'label', content: 'Я.Checkbox_pseudo'}
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: 'При получении фокуса мышкой рамка отсутствует. Браузеры: TODO'
                                }
                            ]
                        },
                        {
                            tag: 'tr',
                            content: [
                                {
                                    tag: 'td',
                                    content: 'radiobox'
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            tag: 'input',
                                            attrs: {
                                                type: 'radio',
                                                value: 'Default.Radio1',
                                                name: 'Default.Radio',
                                                id: 'Default.Radio1'}
                                        },
                                        {
                                            tag: 'label',
                                            attrs: {'for': 'Default.Radio1'},
                                            content: ' radiobox'
                                        },
                                        '<br>',
                                        '<br>',
                                        {
                                            tag: 'input',
                                            attrs: {type: 'radio',
                                                value: 'Default.Radio2',
                                                name: 'Default.Radio',
                                                id: 'Default.Radio2'}
                                        },
                                        {
                                            tag: 'label',
                                            attrs: {'for': 'Default.Radio2'},
                                            content: ' только мне'
                                        },
                                        '<br>',
                                        '<br>',
                                        {
                                            tag: 'input',
                                            attrs: {type: 'radio',
                                                value: 'Default.Radio3',
                                                name: 'Default.Radio',
                                                id: 'Default.Radio3'}
                                        },
                                        {
                                            tag: 'label',
                                            attrs: {'for': 'Default.Radio3'},
                                            content: ' только не мне'
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            block: 'radiobox',
                                            mods: {size: 's'},
                                            name: 'bla',
                                            content: [
                                                {
                                                    elem: 'radio',
                                                    content: 'radiobox',
                                                    controlAttrs: {value: 'val-1'}
                                                },
                                                '<br>',
                                                {
                                                    elem: 'radio',
                                                    content: 'только мне',
                                                    controlAttrs: {value: 'val-2'}
                                                },
                                                '<br>',
                                                {
                                                    elem: 'radio',
                                                    content: 'только не мне',
                                                    controlAttrs: {value: 'val-3'}
                                                }
                                            ]
                                        },
                                        '<br><br>',
                                        {
                                        block: 'radiobox',
                                        mods: {size: 's', theme: 'pseudo'},
                                        name: 'bla',
                                        content: [
                                            {
                                                elem: 'radio',
                                                content: 'Радио 1_pseudo',
                                                controlAttrs: {value: 'val-1'}
                                            },
                                            '&nbsp;&nbsp;&nbsp;&nbsp;',
                                            {
                                                elem: 'radio',
                                                content: 'Радио 2_pseudo',
                                                controlAttrs: {value: 'val-2'}
                                            },
                                            '&nbsp;&nbsp;&nbsp;&nbsp;',
                                            {
                                                elem: 'radio',
                                                content: 'Радио 3_pseudo',
                                                controlAttrs: {value: 'val-3'}
                                            }
                                        ]
                                    }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: 'При получении фокуса мышкой рамка отсутствует. Браузеры: TODO'
                                }
                            ]
                        },
                        {
                            tag: 'tr',
                            content: [
                                {
                                    tag: 'td',
                                    content: 'input'
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            tag: 'input',
                                            attrs: {type: 'input', value: 'Default.Input'}
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            block: 'input',
                                            mods: {size: 'm'},
                                            value: 'Я.Input',
                                            content: {elem: 'control'}
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: 'При получении фокуса мышкой рамка остается'
                                }
                            ]
                        },
                        {
                            tag: 'tr',
                            content: [
                                {
                                    tag: 'td',
                                    content: 'textarea'
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            tag: 'textarea',
                                            attrs: {
                                                value: 'Я текстовая область размера M',
                                                style: 'width: 400px; padding: 20px',
                                                rows: '10',
                                                cols: '10'
                                            },
                                            content: 'Я текстовая область размера M'
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            block: 'input',
                                            mods: {type: 'textarea', size: 'm'},
                                            value: 'Я текстовая область размера M',
                                            content: {elem: 'control'}
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: ''
                                }
                            ]
                        },
                        {
                            tag: 'tr',
                            content: [
                                {
                                    tag: 'td',
                                    content: 'select'
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            tag: 'select',
                                            content: [
                                                {
                                                    tag: 'options',
                                                    content: [
                                                        {
                                                            tag: 'option',
                                                            content: 'select'
                                                        },
                                                        {
                                                            tag: 'option',
                                                            content: 'Черновики'
                                                        },
                                                        {
                                                            tag: 'option',
                                                            content: 'Входящие'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            block: 'select',
                                            name: 'mail',
                                            mods: {size: 'm', theme: 'normal'},
                                            content: [
                                                {
                                                    block: 'button',
                                                    content: 'select'
                                                },
                                                {
                                                    elem: 'control',
                                                    content: [
                                                        {
                                                            elem: 'option',
                                                            attrs: {value: 'send'},
                                                            content: 'select'
                                                        },
                                                        {
                                                            elem: 'option',
                                                            attrs: {value: 'draft'},
                                                            content: 'Черновики'
                                                        },
                                                        {
                                                            elem: 'option',
                                                            attrs: {value: 'inbox'},
                                                            content: 'Входящие'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: 'нет нативного аналога'
                                }
                            ]
                        },
                        {
                            tag: 'tr',
                            content: [
                                {
                                    tag: 'td',
                                    content: 'radio-button'
                                },
                                {
                                    tag: 'td',
                                    content: 'нет нативного контрола'
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            block: 'radio-button',
                                            mods: {size: 'm'},
                                            name: 'show_to_1',
                                            value: 'friends',
                                            content: [
                                                {
                                                    elem: 'radio',
                                                    controlAttrs: {value: 'all'},
                                                    elemMods: {disabled: 'yes'},
                                                    content: 'radio-button'
                                                },
                                                {
                                                    elem: 'radio',
                                                    controlAttrs: {value: 'friends'},
                                                    content: 'только друзьям'
                                                },
                                                {
                                                    elem: 'radio',
                                                    controlAttrs: {value: 'me'},
                                                    content: 'только мне'
                                                },
                                                {
                                                    elem: 'radio',
                                                    controlAttrs: {value: 'other'},
                                                    content: 'только не мне'
                                                }
                                            ]
                                        },
                                        '<br><br>',
                                        {
                                            block: 'radio-button',
                                            mods: {size: 'm', theme: 'pseudo'},
                                            name: 'show_to_2',
                                            value: 'friends',
                                            content: [
                                                {
                                                    elem: 'radio',
                                                    controlAttrs: {value: 'all'},
                                                    elemMods: {disabled: 'yes'},
                                                    content: '_pseudo'
                                                },
                                                {
                                                    elem: 'radio',
                                                    controlAttrs: {value: 'friends'},
                                                    content: '_pseudo'
                                                },
                                                {
                                                    elem: 'radio',
                                                    controlAttrs: {value: 'me'},
                                                    content: '_pseudo'
                                                },
                                                {
                                                    elem: 'radio',
                                                    controlAttrs: {value: 'other'},
                                                    content: '_pseudo'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: 'нет нативного аналога'
                                }
                            ]
                        },
                        {
                            tag: 'tr',
                            content: [
                                {
                                    tag: 'td',
                                    content: 'check-button'
                                },
                                {
                                    tag: 'td',
                                    content: 'нет нативного контрола'
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            block: 'check-button',
                                            name: 'test',
                                            value: '1',
                                            mods: {size: 's'},
                                            content: 'Я.Check-button'
                                        },
                                        '<br><br>',
                                        {
                                            block: 'check-button',
                                            mods: {size: 's', pseudo: 'yes'},
                                            content: 'Я.Check-button_pseudo'
                                        },
                                        '<br><br>',
                                        {
                                            block: 'check-button',
                                            mods: {size: 's', theme: 'clear'},
                                            content: 'Я.Check-button_clear'
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: 'нет нативного аналога'
                                }
                            ]
                        },
                        {
                            tag: 'tr',
                            content: [
                                {
                                    tag: 'td',
                                    content: 'tumbler'
                                },
                                {
                                    tag: 'td',
                                    content: 'нет нативного контрола'
                                },
                                {
                                    tag: 'td',
                                    content: [
                                        {
                                            block: 'tumbler',
                                            mods: {size: 's'},
                                            content: [
                                                {
                                                    elem: 'option',
                                                    side: 'left',
                                                    content: 'слева'
                                                },
                                                {
                                                    elem: 'option',
                                                    side: 'right',
                                                    content: 'справа'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    tag: 'td',
                                    content: 'нет нативного аналога'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {block: 'i-jquery', mods: {version: '1.8.3'}},
        {elem: 'js', url: '_10-i-ua.js'}
    ]
});
