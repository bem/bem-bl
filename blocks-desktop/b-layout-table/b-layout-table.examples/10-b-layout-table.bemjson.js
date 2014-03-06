({
    block: 'b-page',
    title: 'b-layout-table',
    head: [
        { elem: 'css', url: '_10_b-layout-table.css' }
    ],
    content: [
        {
            block: 'b-layout-table',
            mods: { layout: '60-40'},
            content: {
                elem: 'row',
                content: [
                    {
                        elem: 'cell',
                        content: {
                            elem: 'inner',
                            content: 'First cell'
                        }
                    },
                    {
                        elem: 'cell',
                        elemMods: { position: 'r'},
                        content: 'Second cell'
                    }
                ]
            }
        }
    ]
})
