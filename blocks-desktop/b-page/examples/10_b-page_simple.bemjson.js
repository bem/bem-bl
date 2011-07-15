([
    {
        block: 'b-page',
        mods: { exp: 'ololo' },
        js: { a: 'b' },
        title: 'заголовок',
        head: [
            {
                elem: 'css',
                url: '_simple.css'
            },
            {
                elem: 'css',
                url: '_simple.ie.css',
                condition: 'lte IE 7'
            },
            { elem : 'js', url: '//yandex.st/jquery/1.6.2/jquery.min.js' },
            {
                elem: 'js',
                url: '_simple.js'
            }
        ],
        content: [
            {
                elem: 'aaa',
                content: {
                    elem: 'abab',
                    mix: [{
                        block: 'b1'
                    }]
                }
            },{
                elem: 'bbb',
                elemMods: {
                    m1: 'v1'
                }
            },{
                block: 'b-bla',
                mods: {
                    m2: 'v2'
                }
            },{
                block: 'b-bla',
                mods: {
                    m2: 'v2',
                    m3: 'v3'
                },
                content: [
                    {
                        block: 'b1',
                        mods: {
                            mm: 'vv'
                        }
                    }
                ]
            }
        ]
    }
])
