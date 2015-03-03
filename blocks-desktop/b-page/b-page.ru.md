###Поддержка IE8+

У каждого элемента `css` может быть свойство `ie`.
Если это свойство `false`, то будут использоваться такие `condittional comments`, которые предотвратят использование этих стилей в **IE**. При строчном значении этого свойства тег `<link>`, будет обёрнут в соответствующий `conditional comment`, и этот стиль будет грузиться и использоваться указанных браузерах.

```bemjson
{
    block: 'b-page',
    title: 'Page with link',
    head: [
        { elem: 'css', url: 'example.css', ie: false },
        { elem: 'css', url: 'example.ie.css', ie: 'gte IE 8' },
        { elem: 'js', url: 'example.js' }
    ],
    content: 'Page'
}
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
