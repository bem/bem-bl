exports.blocks = [
    {
        "name": "b-page"
    },
    {
        "name": "b-menu-horiz",
        "mods": [
            {
                "name": "layout",
                "vals": [
                    "complex"
                ]
            }
        ],
        "elems": [
            {
                "name": "item",
                "mods": [
                    {
                        "name": "state",
                        "vals": [
                            "current",
                            "disabled"
                        ]
                    },
                    {
                        "name": "type",
                        "vals": [
                            "bottom"
                        ]
                    }
                ]
            },
            {
                "name": "separator"
            },
            {
                "name": "gap"
            }
        ]
    },
    {
        "name": "b-icon",
        "mods": [
            {
                "name": "type",
                "vals": [
                    "compose",
                    "check",
                    "forward",
                    "delete",
                    "spam",
                    "read"
                ]
            }
        ]
    },
    {
        "name": "b-link"
    }
]