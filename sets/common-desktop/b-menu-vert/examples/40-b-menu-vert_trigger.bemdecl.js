exports.blocks = [
    {
        "name": "b-page"
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
                "name": "trigger",
                "mods": [
                    {
                        "name": "state",
                        "vals": [
                            "opened"
                        ]
                    }
                ]
            },
            {
                "name": "trigger-icon"
            },
            {
                "name": "separator"
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
            },
            {
                "name": "inner",
                "vals": [
                    "yes"
                ]
            }
        ]
    },
    {
        "name": "b-icon",
        "elems": [
            {
                "name": "inner"
            }
        ]
    }
]