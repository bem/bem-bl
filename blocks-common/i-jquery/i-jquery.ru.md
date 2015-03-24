##Описание
Блок `i-jquery` помогает подключить **jQuery** на страницу и упорядочивает хранение js-кода плагинов.

На уровне `blocks-common` блок `i-jquery` состоит из нескольких элементов, которые содержат плагины к **jQuery**.
Декларация этих элементов обеспечивает подключение этих плагинов в страничный **JS**.

##Модификаторы

###_version
`_version`
Подключение библиотеки **jQuery** к странице
`{ mods: { 'version': '</url>' } }`
`{ mods: { 'version': '<jquery_version_number>' } }`
На уровне `blocks-common` модификатор `_version` дает возможность подключать необходимую версию библиотеки, указывая либо ее адрес, либо номер версии.

##Объявление блока на странице
Чтобы поддерживаемая версия **jQuery** оказалась на страницах, нужно использовать такой **BEMJSON**:

```bemjson
{
    block: 'b-page',
    title: 'Title of the page',
    head: [
        { elem: 'css', url: '_index.css' },
        { elem: 'meta', attrs: { name: 'description', content: 'description' }}
    ],
    content:[
        {
            block: 'some-block',
            content: 'Some content'
        },
        { block: 'i-jquery', mods: 'version' }
    ]
}
```

Этот шаблон не продуцирует **DOM**-представление элемента. Он декларирует использование на странице элемента `js` блока `b-page`, подключающего **js** с **jQuery**.
