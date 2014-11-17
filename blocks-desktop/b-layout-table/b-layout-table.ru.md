##Описание
Блок `b-layout-table` — таблица со 100% шириной, для создания раскладки.

Bemhtml шаблон блока выводит таблицу, строки и ячейки со всеми необходимыми атрибутами.

##Элементы блока
Имеет опциональные элементы блока: `gap`, `cell`, `row`, `inner`.

Ячейки блока могут быть представлены либо элементом `cell`, либо элементом `gap`.

###__cell
Предназначен для вложения контента.
Преобразуется BEMHTML-шаблоном в тэг `<td>`.

###__gap
Пустая ячейка, служит распоркой.
Преобразуется BEMHTML-шаблоном в тэг `<td>`.

###__row
Служит для обозначения строк в раскладке таблицы.
Преобразуется BEMHTML-шаблоном в тэг `<tr>`.

###__inner
Оборачивает контент ячеек, что позволяет задать отступы.
В HTML преобразуется тегом `<div>` с классом `b-layout-table`.

##Объявление блока на странице

Пример использования блока:

```bemjson
{
    block: 'b-layout-table',  // имя блока
    mods: { layout: '58-40'}, // модификаторы блока. Модификатор необязательный
    content: [                // структура страницы
        {
            elem: 'row',
            content: [
                {
                    elem: 'gap',
                    rowspan: '2'
                },
                {
                    elem: 'cell',
                    content: {
                        elem: 'inner',
                        content: 'Left cell'
                    }
                },
                {
                    elem: 'cell',
                    elemMods: { position: 'r'},
                    content: 'Right cell'
                }
            ]
        },
        {
            elem: 'row',
            content: [
                {
                    elem: 'cell',
                    colspan: '2',
                    content: 'Second row and one cell'
                }
            ]
        }
    ]
}
```
Представление блока в HTML, после BEMHTML-преобразования:

```
	<table class="b-layout-table b-layout-table_layout_58-40">
		<tr class="b-layout-table__row">
			<td class="b-layout-table__gap" rowspan="2"></td>
			<td class="b-layout-table__cell">
				<div class="b-layout-table__inner">Left cell</div>
			</td>
			<td class="b-layout-table__cell b-layout-table__cell_position_r">Right cell</td>
		</tr>
		<tr class="b-layout-table__row">
			<td class="b-layout-table__cell" colspan="2">Second row and one cell</td>
		</tr>
	</table>
```
По умолчанию значения ширины ячеек в блоке не задаются. Доопределить блок стилями можно следующим образом:
* добавляем модификатор блоку — `mods: { layout: '58-40' }`;
* добавляем модификатор ячейке — `elemMods: { position: 'r' }`;
* оборачиваем контент ячеек, используя элемент `inner`, что позволяет задать нужные отступы. Далее каскадом задаем нужные  CSS-свойства.

Вот такой CSS получится к BEMJSON-файлу, приведенному выше:

```
.b-layout-table_layout_58-40 .b-layout-table__cell_position_r
{
    width: 40%;
}
.b-layout-table_layout_58-40 .b-layout-table__gap
{
    width: 2%;
    padding-left: 20px;
}
.b-layout-table_layout_58-40 .b-layout-table__inner
{
    margin-right: 0.8em;
}
```
**Важно**
Обратите внимание, что нельзя задавать самому блоку никаких дополнительных CCS-свойств, это может привести к конфликтам в верстке, так как блок может быть использован в реализации других блоков.
Использовать блок нужно, задавая ему модификатор или миксируя его с другим блоком/элементом.

##Модификаторы блока

####_layout
Позволяет задавать размеры таблицы
