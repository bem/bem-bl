({
    block: 'b-page',
    title: 'b-link',
    head: [
        { elem: 'css', url: '_10_b-link_link.css' }
    ],
    content: [
        {
            block: 'b-link',
            url: 'http://ya.ru',
            content: 'Просто ссылка'
        },
        {
            block: 'b-link',
            url: 'http://ya.ru',
            title: 'Заголовок',
            target: '_blank',
            content: 'Ссылка открывающаяся в новом окне'
        },
        {
            block: 'b-link',
            url: 'http://ya.ru',
            content: 'Ссылка cо счетчиком'
        }
    ]
})
