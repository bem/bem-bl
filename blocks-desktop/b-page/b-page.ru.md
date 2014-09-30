##Описание
Блок **b-page** создаёт теги верхнего уровня страницы:

* `<html>`
* `<head>`
* `<body>`

Именно он отвечает за то, какие подключить **CSS**- и **JS**-файлы к странице, выставление `meta` тегов, заголовка и так далее.

###Объявление блока на странице

Декларация блока в **BEMJSON** начинается объявлением блока и указанием свойства `title`, которое превращается в тег `<title>` в **HTML**.

```bemjson
{
    block: 'b-page',
    title: 'Page with link',
    content: 'Page'
}
```

Указание свойства `head` дополняет элемент `head`, соответствующий **HTML** тегу `<head>`, элементами для подключения **CSS**- и **JS**-файлов:

```bemjson
{
    block: 'b-page',
    title: 'Page with link',
    head: [
        { elem: 'css', url: 'example.css', ie: false },
        { elem: 'css', url: 'example.ie.css', ie: 'lt IE 8' },
        { elem: 'js', url: 'example.js' }
    ],
    content: 'Page'
}
```

Элемент `css` превращается в **HTML** в тег `<link>`, подключающий как **CSS**-стиль тот файл, что указан в свойстве `url` этого элемента. Также у такого элемента может быть свойство `ie`.
Если это свойство `false`, то будут использоваться такие `condittional comments`, которые предотвратят использование этих стилей в **IE**. При строчном значении этого свойства тег `<link>`, будет обёрнут в соответствующий `conditional comment`, и этот стиль будет грузиться и использоваться указанных браузерах.

Также есть возможность указывать свойство `content` для содержания тега `<style>`:

```bemjson
{
    block: 'b-page',
    title: 'Page with link',
    head: [
        {
            elem: 'css',
            content: '.b-blah { color: #f00 }'
        }
    ],
    content: 'Page'
}
```


Элемент `js` действует аналогично, подключая к странице **JS**-файлы при помощи тега `<script>`.

Свойство `head` не описывает содержание **HTML**-тега `<head>` полностью, а лишь дополняет дефолтное, которое блок сам создаёт в своём **BEMHTML**-шаблоне.

#### Тег `<meta>` с указанием кодировки

**BEMHTML**:

```js
content: [
{
    tag: 'meta',
    attrs: { 'http-equiv': 'content-type', content: 'text/html; charset=utf-8' }
},
...
```

#### Тег `<meta>` для использования **IE9** (и выше) в максимальном **compatibility** режиме

**BEMHTML**:

```js
content: [
...
{
    tag: 'meta',
    attrs: { 'http-equiv': 'X-UA-Compatible', content: 'IE=EmulateIE7, IE=edge' }
},
...
```

#### Выставление значения тега `<title>` страницы из свойства

```js
content: [
...
{
    tag: 'title',
    content: this.ctx.title
},
...
```


#### Выставление фавиконки

```js
content: [
...
this.ctx.favicon ? {
    elem: 'favicon',
    url: this.ctx.favicon
} : '',
...
```


#### Декларация блока `i-ua`

```js
content: [
...
{
    block: 'i-ua'
},
...
```

Аналогично указанию свойства `head`, может быть задано свойство `meta`, содержащее один или несколько элементов `meta`:

```bemjson
{
    block: 'b-page',
    title: 'Page with link',
    meta: {
        elem: 'meta',
        attrs: {
            name: 'keywords',
            content: 'js, css, html'
        }
    },
    content: 'Page'
}
```

```bemjson
{
    block: 'b-page',
    title: 'Page with link',
    meta: [
        {
            elem: 'meta',
            attrs: {
                name: 'keywords',
                content: 'js, css, html'
            }
        },
        {
            elem: 'meta',
            attrs: {
                name : 'description',
                content : 'Yet another webdev blog'
            }
        }
    ],
    content: 'Page'
}
```

Значением свойства `content` блока `b-page` может быть хеш-описание содержимого (если речь идёт лишь об одном блоке) или массив блоков, описанных хешами:

```bemjson
{
    block: 'b-page',
    title: 'Page with link',
    content: {
        block: 'b-link',
        mods: { pseudo: 'yes', togcolor: 'yes', color: 'green' },
        url: '#',
        target: '_blank',
        title: 'Кликни меня',
        content: 'Псевдоссылка, меняющая цвет по клику'
    }
}
```

На блоки, содержащиеся в `content`, действуют их **BEMHTML**-шаблоны.

#### Отмена автоматической инициализации блоков

```js
noDeps: [
    { block: 'i-bem', elem: 'dom', mods: { init: 'auto' } }
]
```

