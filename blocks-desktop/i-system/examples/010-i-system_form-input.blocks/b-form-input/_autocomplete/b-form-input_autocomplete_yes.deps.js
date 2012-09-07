({
    mustDeps: { block: 'i-request', mods: { 'type': 'ajax' } },
    shouldDeps: [
        { elems: [ 'popup', 'dataprovider', 'shadow' ] },
        { block: 'i-popup' },
        { block: 'i-jquery', elem: 'debounce' },
        { block: 'b-autocomplete-item', mods: { type: 'hl' } },
        { block: 'b-autocomplete-item', mods: { type: 'fact' } },
        { block: 'b-autocomplete-item', mods: { type: 'nav' } },
        { block: 'b-autocomplete-item', mods: { type: 'nah' } },
        { block: 'b-autocomplete-item', mods: { type: 'foot' } }
    ]
})
