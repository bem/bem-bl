({
    block: 'b-page',
    title: 'b-layout-table',
    head: [
        { elem: 'css', url: '_10_b-layout-table.css' },
        { elem: 'css', url: '_10_b-layout-table.ie.css', ie: true },
        { elem: 'js', url: '_10_b-layout-table.js' }
    ],
    content: [
        {
            block: 'b-layout-table',
            content: [
                {
                    elem: 'row',
                    content: [
                        {
                            elem: 'gap',
                            rowspan: '2'
                        },
                        {
                            elem: 'cell',
                            colspan: '2',
                            content:  'q'
                        }
                    ]
                },
                {
                    elem: 'row',
                    content: [
                        {
                            elem: 'cell',
                            content:  'q'
                        },
                        {
                            elem: 'cell',
                            content:  'вторая колонка'
                        }
                    ]
                }
            ]
        }
    ]
})
