###Поддержка IE9

У каждого элемента `css` может быть свойство `ie`.
Если это свойство `false`, то будут использоваться такие `condittional comments`, которые предотвратят использование этих стилей в **IE**. При строчном значении этого свойства тег `<link>`, будет обёрнут в соответствующий `conditional comment` для IE9

```bemjson
{
    block: 'b-page',
    title: 'Page with link',
    head: [
        { elem: 'css', url: 'example.css', ie: false },
        { elem: 'css', url: 'example.ie.css', ie: 'gte IE 9' },
        { elem: 'js', url: 'example.js' }
    ],
    content: 'Page'
}
```
