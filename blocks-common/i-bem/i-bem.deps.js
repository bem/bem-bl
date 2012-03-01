({
    mustDeps: [
        {
            block: 'i-jquery',
            elems: [
                'inherit',
                'identify',
                'is-empty-object',
                'debounce',
                'observable'
            ]
        },
        { block: 'i-ecma', elem: 'object' },
        { block: 'i-ecma', elem: 'array' }
    ],
    shouldDeps: { elem: 'internal' }
})
