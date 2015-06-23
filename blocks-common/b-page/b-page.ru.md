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
        { elem: 'css', url: 'example.css'},
        { elem: 'js', url: 'example.js' }
    ],
    content: 'Page'
}
```

Элемент `css` превращается в **HTML** в тег `<link>`, подключающий как **CSS**-стиль тот файл, что указан в свойстве `url` этого элемента. 

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

```js
content: [
...
{
    tag: 'meta',
    attrs: { 'http-equiv': 'content-type', content: 'text/html; charset=utf-8' }
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

## Content-Security-Policy

Блок `b-page` позволяет подключить метатег `<meta http-equiv="Content-Security-Policy" content="[POLICY GOES HERE]">`, который устанавливает [политику безопасности по умолчанию](#default-csp-policy), для загрузки контента (скриптов, стилей, картинок и т. д.).

---
**NB** Обратите внимание, что по умолчанию метатег отключен.

---

Подробнее о `Content Security Policy`:

* http://www.w3.org/TR/CSP2/
* http://en.wikipedia.org/wiki/Content_Security_Policy
* https://developer.mozilla.org/en-US/docs/Web/Security/CSP


<a name="default-csp-policy"></a>
### Политика по умолчанию

|Директивы      | Значение      | Назначение  |
| ------------- |---------------| ----------  |
| default-src   | 'self | Разрешенные источники, которые по умолчанию присваиваются не заданным директивам. [Директивы](http://www.w3.org/TR/CSP2/#directive-default-src) подпадающие под ограничения, заданные в `default-src`.<br> _**Внимание**: Специализированные директивы для соответствующего ресурса, `script-src`, не наследуют, а полностью переопределяют директиву default-src`._|
|script-src| не задано |Разрешенные источники для загрузки и выполнения JS-скриптов.|
|style-src| не задано |Разрешенные источники для загрузки CSS-стилей.|
|img-src| не задано |Разрешенные источники для загрузки изображений.|
|frame-src| не задано | Разрешенные источники для загрузки фреймов. [Директива устарела](http://www.w3.org/TR/CSP2/#directive-frame-src) в пользу `child-src`, но пока в браузерах поддерживается только `frame-src`.|
|connect-src| не задано | Ограничивает источники, к которым можно подключаться с помощью:<ul><li>XMLHttpRequest</li><li>WebSocket</li><li>EventSource</li><li>атрибут ping в элементе &lt;a&gt;</li><li>sendBeacon(url)</li></ul>|

**NB** Обратите внимание,если в заголовке CSP указать хост без схемы, например `social.yandex.ru`, то он отработает для того протокола, по которому пришел пользователь. То есть при заходе по `http://www.yandex.ru`, адрес `https://social.yandex.ru` будет заблокирован CSP.

На сервисе политику по умолчанию можно [подключить](#add-csp) несколькими способами или [переопределить](#redef-csp).


<a name="add-csp"></a>
### Подключение политики по умолчанию

Политика безопасности подключается несколькими способами, которые различаются областью применения в пределах страницы или всего сервиса.
При любом из способов надо убедится, что в блок добавлена зависимость от элемента `csp` (b-page.deps.js):

```js
({
    shouldDeps: { elems: ['csp'] }
})
```

#### Локальное подключение

Подключить политику только для отдельной страницы сервиса можно в поле `csp` BEMJSON блока. Рекомендуемый способ.

```javascript
{
    block: 'b-page',
    csp: true
}
```

Метатег с CSP будет расположен сразу после тега `<html>`. Политика применяется ко всем
ресурсам страницы расположенным в `<head>`(как внешним, подключенных по ссылке `<link>`, так и добавляемых в самом документе).


Есть дополнительная возможность подключить политику в элементе блока `csp` в поле `head`. В этом случае, метатег будет последним элементом в `<head>`.

---
**NB** Этот способ применять не рекомендуется, так как код загружаемый до метатега CSP не проверяется на соответствие политике безопасности. Например, данные плагинов для браузеров.

---

```javascript
{
    block: 'b-page',
    head: [
        { elem: 'csp': csp: true }
    ]
}
```

#### Глобальное подключение

Подключить политику для всего сервиса можно переопределив шаблон BEMHTML/BH элемента блока `csp`.

**BEMHTML**

```javascript
block b-page, elem csp, default: {
    this.ctx.policies = true;
    applyNext();
}
```

**BH**

```javascript
module.exports = function(bh) {
    bh.match('b-page__csp', function(ctx) {
        ctx.param('policies', true);
    });
};
```

<a name="redef-csp"></a>

### Переопределение политики

Способы переопределения политики аналогичны перечисленным в разделе [Подключение политики](#add-csp). Но предварительно нужно указать разрешенные источники в списке требуемых директив.

Переопределять можно любые из списка [директив](http://www.w3.org/TR/CSP2/#directive
), реализованные в CSP2.

Следует помнить, что директивы `report-uri` и `sandbox` нельзя задать через метатег (согласно спецификации, в метатеге они игнорируются).


#### Локальное переопределение

В поле `csp` BEMJSON блока. Значение каждой директивы – массив разрешенных источников. Рекомендуемый способ.

```javacsript
({
    block: 'b-page',
    csp: {
        policies: {
            'script-src': [
                'from-bemjson.net',
                'example.com'
            ],
            style-src': [
                'mystyle.net'
            ]
        }
    }
});
```

Список источников в каждой директиве можно гибко настроить:

```javacsript
({
    block: 'b-page',
    csp: {
        policies: {
            'script-src': [
                'from-bemjson.net',
                'example.com'
            ],
            style-src': [
                'self',
                'data: example.com'
            ]
        }
    }
});
```

Переопределение политики в элементе блока `csp` в поле  блока `head`. Не рекомендуется использовать (способ небезопасный).

 ```javascript
 ({
    block: 'b-page',
    head: [
        {
            elem: 'csp',
            policies: {
                'script-src': [
                    'from-bemjson.net',
                    'example.com'
                ],
                'style-src': [
                    'mystyle.net'
                ]
            }
        }
    ]
});
 ```

#### Глобальное переопределение

Выполняется переопределением шаблонов элемента блока `csp`.

**BEMHTML**

```javascript
block b-page, elem csp, default: {
    this.ctx.policies = {'script-src': ['test-from-bemhtml.net']};
    applyNext();
}
```

**BH**

```javascript
module.exports = function(bh) {
    bh.match('b-page__csp', function(ctx) {
        ctx.param('policies', {'script-src': ['test-from-bemhtml.net']});
    });
};
```

<a name="nonce"></a>
### Передача nonce

Для директив `script-src` и `style-src` существует специальное значение `nonce`, которое позволяет задать уникальный ключ `$RANDOM`.

`nonce-$RANDOM` разрешает использовать инлайновый JavaScript (`<script>`) и инлайновый CSS (`<style>`), у которых атрибут `nonce` равен `$RANDOM`. Их содержимое не будет заблокировано даже при отсутствии ключевого слова `unsafe-inline`.

Передать свое значение `nonce` можно в поле элемента `csp` BEMJSON блока:

```js
// TODO: https://st.yandex-team.ru/ISLROMOCHKA-229
({
    block: 'b-page',
    nonce: 'EDNnf03nceIOfn39fn3e9h3sdfa'
});
```

В этом случае, к директивам `script-src` и `style-src` будет добавлено значение `'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'`. Этим значением подписываются (добавляется свойство nonce="%nonce%") в блоки:

* i-ua: `<script nonce="%переданное значение nonce%">тут код блока i-ua</script>`
* i-jquery, будет подключен как `<script nonce="%переданное значение nonce%" src="_50-js-css-nonce.js"></script>`
и элементы `css`  и `js` блока `b-page`.

Это позволит добавлять на страницу инлайн-скрипты и стили с атрибутом `nonce-EDNnf03nceIOfn39fn3e9h3sdfa`.

Стили и скрипты, разрешенные с помощью `nonce`:

```html
<script nonce="EDNnf03nceIOfn39fn3e9h3sdfa">
    alert("Allowed because nonce is valid.");
</script>
<script nonce="EDNnf03nceIOfn39fn3e9h3sdfa" src="https://elsewhere.com/allowed-because-nonce-is-valid.js"></script>

<style nonce="EDNnf03nceIOfn39fn3e9h3sdfa">
    .inline {}
</style>
```
