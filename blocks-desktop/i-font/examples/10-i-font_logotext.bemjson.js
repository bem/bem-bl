({
    block: 'b-page',
    title: 'b-head-logo',
    head: [
        { elem: 'css', url: '_10logotext_bem.css', ie: false },
        { elem: 'css', url: '_10logotext_bem.ie.css', ie: 'IE' }
    ],
    content:[
        {
            block: 'b-head-logo',
            mods: { type: 'text' }
        },
        { block: 'b-head-logo' }
    ]
})
