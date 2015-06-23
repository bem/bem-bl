([
    {
        block: 'b-page',
        title: 'Page with CSP meta-tag',
        nonce: 'test-nonce-value',
        csp: {
            policies: {
                'script-src': [ 'examples.com' ],
                'style-src': ["'self'", "'unsafe-inline'"]
            }
        },
        head: [
            { elem: 'css', url: '_70-csp-with-nonce.css' },
            { elem: 'css', url: '_70-csp-with-nonce.ie.css', ie: true },
            { elem: 'css', content: 'body { color: blue; }' },
            { block: 'i-jquery', elem: 'core' },
            { elem: 'js', url: '_70-csp-with-nonce.js' }
        ],
        content: 'Page with CSP meta-tag'
    }
])
