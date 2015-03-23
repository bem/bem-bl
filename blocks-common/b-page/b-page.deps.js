({
    mustDeps: [
        { block: 'i-bem', elems: ['html'] },
        { block: 'i-bem', elem: 'dom', mods: { init: 'auto' } },
        { block: 'i-ua' },
        { block: 'i-jquery', mods: {version: ''}}
    ],
    shouldDeps: { elems: 'js' }
});
