({
    block: 'b-page',
    title: 'title',
    head: [
        {
            elem: 'css',
            url: '_10-simple_bem.css'
        },
        {
            elem: 'css',
            ie: true,
            url: '_10-simple_bem.ie.css'
        },
        {
            elem: 'css',
            content: 'body { background: #fff }'
        },
        {
            block: 'i-jquery',
            elem: 'core'
        },
        {
            elem: 'js',
            url: '_10-simple_bem.pub.js'
        },
        {
            elem: 'icon',
            src16: 'favicon.ico',
            src57: 'apple-touch-icon-precomposed.png',
            src72: 'apple-touch-icon-72x72-precomposed.png',
            src114: 'apple-touch-icon-114x114-precomposed.png'
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
})