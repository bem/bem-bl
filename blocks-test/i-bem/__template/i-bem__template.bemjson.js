{
    block: 'b-page',
    title: 'Tests',
    head: [
        {elem: 'css', url: '_unit.css'},
        {elem: 'css', url: '_unit.ie.css', ie: true},
        {elem: 'js', url: 'http://yandex.st/jquery/1.6.2/jquery.js'},
        {elem: 'js', url: '_unit.bemhtml.js'},
        {elem: 'js', url: '_unit.js'},
        {elem: 'js', url: '_unit.test.js'}
    ],
    content: [
        {block: 'i-bem', elem: 'test', js: {tests: '%TESTS%'}}
    ]
}
