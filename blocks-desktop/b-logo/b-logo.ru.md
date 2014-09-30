##Описание
Блок **b-logo** использует внутри себя абстрактную иконку **b-icon** и ссылку **b-link**.
Эти блоки миксируются в **BEMHTML**-шаблоне с соответствующими элементами блока **b-logo**.

##Объявление блока на странице
Обычно логотип представляет собой ссылку с изображением. **BEMJSON** для этого варианта:

```bemjson
{
    block: 'b-logo',
    content: {
        elem: 'link',
        url: '/',
        title: 'logo',
        icon: {
            elem: 'icon',
            url: 'http://yastatic.net/lego/_/ExOJSanIrX2IAis4l5gO2uX6M1E.png',
            alt: 'logo'
        }
    }
}
```
Представление блока в HTML, после BEMHTML-преобразования:

```
    <div class="b-logo">
        <a class="b-link b-logo__link" href="/" title="logo">
            <img class="b-icon b-logo__icon" src="http://yastatic.net/lego/_/ExOJSanIrX2IAis4l5gO2uX6M1E.png" alt="logo"/>
        </a>
    </div>
```

