({
    shouldDeps: [
        { block: 'b-page', elems: ['i']},
        { block: "b-breadcrumbs"},
        { block: "i-menu"},
        {
            "block": "b-menu-horiz",
            "elems": ["item"],
            "mods": {"state": ['current']},
        },
        {
            "block": "b-menu-horiz",
            "elems": ["title"]
        },
        {
            "block": "b-menu-horiz",
            "mods": {"layout": ["horiz"]}
        },
        {
            block: 'b-menu-vert',
            elems: ['item-content']
        },
        {
            "block": "b-link"
        },
        {
            "block": "b-page-title",
            "mods": {"page": ["inner"]}
        },
        {
            block: 'b-blocks-list'
        },
        {
            "block": "b-blocks-desc"
        },
        {
            "block": "b-text"
        },
        {
            "block": "i-desc",
            "mods": {"type": ["mod"]}
        },
        {
            "block": "i-desc",
            "mods": {"type": ["elem"]}
        }
    ]
})
