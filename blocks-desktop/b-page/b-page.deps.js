({
    mustDeps: [
        { block: 'i-bem', elem: 'html' },
        { block: 'i-bem', elem: 'dom', mods: { init: 'auto' } },
        { block: 'i-ua' },
        { block: 'i-jquery', elems: ['core'] }
    ],
    shouldDeps: [
        { elems: ['css', 'js'] }
    ]
})
