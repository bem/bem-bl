({
    mustDeps: [
        {block: 'i-jquery', elem: 'inherit'},
        {block: 'i-jquery', elem: 'identify'},
        {block: 'i-jquery', elem: 'is-empty-object'},
        {block: 'i-jquery', elem: 'debounce'},
        {block: 'i-jquery', elem: 'observable'}
    ],
    shouldDeps: [
        { block: 'i-ecma', elem: 'object' },
        { block: 'i-ecma', elem: 'array' },
        { block: 'i-ecma', elem: 'function' },
        { elem: 'internal' }
    ]
})
