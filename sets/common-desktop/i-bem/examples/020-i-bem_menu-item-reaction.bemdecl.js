exports.blocks = [
    {
        "name": "b-page"
    },
    {
        "name": "b-menu-reaction"
    },
    {
        "name": "b-layout-table",
        "mods": [
            {
                "name": "layout",
                "vals": [
                    "60-40"
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