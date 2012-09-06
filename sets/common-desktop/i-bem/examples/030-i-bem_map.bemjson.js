({
    block: 'b-page',
    title: 'Block reacts to choosing a menu item',
    head: [
        { elem: 'css', url: '_030-i-bem_map.css', ie: false },
        { elem: 'css', url: '_030-i-bem_map.ie.css', ie: 'lt IE 8' },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '030-i-bem_map.js' }
    ],
    content: {
        block: 'b-map',
        mods: {
            'api' : 'dynamic',
            'geo-objects' : 'yes'
        },
        js: {
            'type' : 'yandex#map',
            'lang' : 'RU-ru',
            'center' : [ 37.5850402142639, 55.733770999993745 ],
            'spn' : [0.004096, 0.002311 ],
            'zoom' : 16,
            'points' : [
                {
                    "location":{"latitude":55.733771,"longitude":37.587937},
                    "name":"uno","type":"single",
                    balloonContent: "Yandex"
                }
            ]
        }
    }
})
