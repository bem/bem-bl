**b-link** block is used inside the other blocks.

For a simple like set the following bemjson:

```js
{
   block: 'b-link',
   url: 'http://company.yandex.ru',
   title: 'Click here to learn more',
   target: '_blank',
   content: 'The best company all over the world'
}
```

An `url` property transforms info a `href` attribute. The `title` and `target` properties turn into the relevant attributes.
