({
    block: 'b-page',
    title: 'b-layout-table',
    head: [
        { elem: 'css', url: '_20_b-layout-table-rows.css' },
        { elem: 'js', url: '_20_b-layout-table-rows.js' }
    ],
    content: [
        {
            block: 'b-layout-table',
            mods: { layout: '18-20-60'},
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
                            content: 'First row'
                        },
                        {
                            elem: 'cell',
                            elemMods: { position: 'r'},
                            content: 'First row'
                        }
                    ]
                },
                {
                    elem: 'row',
                    content: [
                        {
                            elem: 'cell',
                            elemMods: { position: 'l'},
                            content: 'Second row'
                        },
                        {
                            elem: 'cell',
                            elemMods: { position: 'm'},
                            content: 'Second row'
                        },
                        {
                            elem: 'cell',
                            elemMods: { position: 'r'},
                            content: 'Second row'
                        }
                    ]
                }
            ]
        }
    ]
})
