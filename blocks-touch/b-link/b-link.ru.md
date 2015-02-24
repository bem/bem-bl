##Описание
Блок **b-link** — является ссылкой. Используется в других блоках.

По умолчанию цвет ссылки – #1A3DC1.

##Объявление блока на странице

Пример использования блока:

```bemjson
{
   block: 'b-link',
   url: 'http://company.yandex.ru',
   title: 'Click here to learn more',
   target: '_blank',
   content: 'The best company all over the world'
}
```
В результате BEMHTML-преобразований свойство `url` трансформируется в атрибут `href`. Свойства `title` и `target` — в соответствующие атрибуты.

```
<a class="b-link i-pressed-controller i-bem" data-bem="{&quot;i-pressed-controller&quot;:{}}" href="http://company.yandex.ru" target="_blank">
    The best company all over the world
</a>
```
