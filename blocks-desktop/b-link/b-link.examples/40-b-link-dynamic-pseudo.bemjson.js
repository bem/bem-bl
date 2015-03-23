({
    block: 'b-page',
    js: true,
    title: 'b-link_pseudo_yes',
    head: [
        { elem: 'css', url: '_40-b-link-dynamic-pseudo.css', ie: false  },
        { elem: 'css', url: '_40-b-link-dynamic-pseudo.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', mods: {version: '1.8.3'}},
        { elem: 'js', url: '_40-b-link-dynamic-pseudo.js' }
    ],
    content: [
        {
            block: 'b-link',
            mods: { lazy: 'yes', pseudo: 'no' },
            mix: [{block: 'b-lazy-link', js: true}],
            url: '#',
            content: 'I am becoming pseudo link in 5 seconds'
        }
    ]
})
