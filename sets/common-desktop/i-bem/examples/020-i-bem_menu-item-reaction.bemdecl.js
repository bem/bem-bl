exports.blocks = [
    {
        "name": "b-page"
    },
    {
        "name": "b-menu-reaction",
        "elems": [
            {
                "name": "menu"
            },
            {
                "name": "item",
                "mods": [
                    {
                        "name": "state",
                        "vals": [
                            "current"
                        ]
                    }
                ]
            },
            {
                "name": "panel"
            }
        ]
    },
    {
        "name": "b-layout-table",
        "mods": [
            {
                "name": "layout",
                "vals": [
                    "35-65"
                ]
            }
        ],
        "elems": [
            {
                "name": "row"
            },
            {
                "name": "cell",
                "mods": [
                    {
                        "name": "position",
                        "vals": [
                            "r"
                        ]
                    }
                ]
            },
            {
                "name": "inner"
            }
        ]
    },
    {
        "name": "b-menu-vert",
        "elems": [
            {
                "name": "item-selector"
            }
        ]
    },
    {
        "name": "b-link",
        "mods": [
            {
                "name": "pseudo",
                "vals": [
                    "yes"
                ]
            }
        ]
    }
]