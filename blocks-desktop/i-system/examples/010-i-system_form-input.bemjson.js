({
    block: 'b-page',
        title: 'b-form-input: Поле ввода',
        head: [
            {
                elem: 'css',
                url: '_010-i-system_form-input.css',
                ie: false
            },
            { elem: 'css', url: '_010-i-system_form-input.ie.css', ie: 'IE 7' },
            { block: 'i-jquery', elem: 'core' },
            { elem: 'js', 'url': '_010-i-system_form-input.js' }
        ],
    content: {
        attrs: { style: 'width: 400px; padding: 0 20px;' },
        content: {
            block: 'b-form-input',
            mods: { theme: 'grey' },
            content: { elem: 'input' }
        }
    }
})
