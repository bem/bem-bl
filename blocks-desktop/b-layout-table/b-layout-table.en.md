`b-layout-table` block — is a 100%-width table for making a layout.

This block has a `bemhtml` template that gives a table, its rows and cells with all the attribute nodes needed.

Cells of the block can be either `cell` or `gap` elements.
A `cell` element is to contain a content and `gap` element is to set some space betwen cells.

Let's look at **bemjson** input data of the block:

```js
{
    block: 'b-layout-table',
    mods: { layout: '58-40'},
    content: [
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


There is no width for cells by default.

You can extend a block by your own CSS rules. For example, set a layout modifier to your block `mods: { layout: '58-40'}`, set a position modifier to right cell `elemMods: { position: 'r'}`.
Wrap cells' content by **inner** element to be able to set some paddings. Then, set CSS rules you
need (via cascade):

This are CSS rules for the example above:

```css
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

Draw your attention that you shouldn't set any CSS to the block itself.
This is important to avoid CSS conflicts, because this block may be used as a part of many others.
So, use modifiers or mix with other blocks when using `b-layout-table`.
