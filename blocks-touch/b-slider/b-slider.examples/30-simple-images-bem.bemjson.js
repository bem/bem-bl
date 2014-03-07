({
    block: 'b-page',
    title: 'заголовок',
    head: [
        {
            elem: 'css',
            url: '_30-simple-images-bem.css'
        },
        {
            elem: 'css',
            ie: true,
            url: '_30-simple-images-bem.ie.css'
        },
        {
            block: 'i-jquery',
            elem: 'core'
        },
        {
            elem: 'js',
            url: '_30-simple-images-bem.pub.js'
        }
    ],
    content: {
        block: 'b-slider',
        mix: [{
            block: 'b-my-slider'
        }],
        content: [
            {
                elem: 'item',
                content: {
                    block: 'b-icon',
                    height: '63',
                    src: 'http://funkyimg.com/u2/710/335/196702-1440x900.jpg'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-icon',
                    height: '63',
                    src: 'http://funkyimg.com/u2/378/098/216191-1440x900.jpg'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-icon',
                    height: '63',
                    src: 'http://funkyimg.com/u2/817/967/215012-1440x900.jpg'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-icon',
                    height: '63',
                    src: 'http://funkyimg.com/u2/443/463/203102-1440x900.jpg'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-icon',
                    height: '63',
                    src: 'http://funkyimg.com/u2/300/175/189818-1440x900.jpg'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-icon',
                    height: '63',
                    src: 'http://funkyimg.com/u2/691/216/207493-1440x900.jpg'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-icon',
                    height: '63',
                    src: 'http://funkyimg.com/u2/987/234/212329-1920x1200.jpg'
                }
            },{
                elem: 'item',
                content: {
                    block: 'b-icon',
                    height: '63',
                    src: 'http://funkyimg.com/u2/668/000/184927-1440x900.jpg'
                }
            }
        ]
    }
})
