{"name":"b-layout-table","techs":[{"name":"bemhtml"},{"name":"css"},{"name":"en.title.txt"},{"name":"ru.title.txt"},{"name":"ru.wiki"}],"title":"Раскладка таблицей","bemjsonDesc":{"block":"b-text","content":[{"elem":"p","content":["Блок ",{"tag":"tt","content":["b-layout-table"]}," — таблица со 100% шириной, для создания раскладки."]},{"elem":"p","content":["Bemhtml шаблон блока выводит таблицу, строки и ячейки со всеми необходимыми атрибутами."]},{"elem":"p","content":["Ячейки блока могут быть представлены либо елементом ",{"tag":"tt","content":["cell"]},", либо элементом gap. Элемент ",{"tag":"tt","content":["cell"]}," предназначен для вложения контента, а элемент gap служит распоркой."]},{"elem":"p","content":["Давайте рассмотрим ",{"tag":"tt","content":["bemjson"]}," блока:"]},{"block":"ohl","mods":{"lang":"js"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["{"]},"\n    ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["block"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-string ohl-string-single"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]},"b-layout-table",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]}]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":[","]},"\n    ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["mods"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["{"]}," ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["layout"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-string ohl-string-single"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]},"58-40",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]}]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["}"]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":[","]},"\n    ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["content"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["["]},"\n        ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["{"]},"\n            ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["elem"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-string ohl-string-single"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]},"row",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]}]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":[","]},"\n            ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["content"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["["]},"\n                ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["{"]},"\n                    ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["elem"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-string ohl-string-single"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]},"gap",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]}]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":[","]},"\n                    ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["rowspan"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-string ohl-string-single"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]},"2",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]}]},"\n                ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["}"]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":[","]},"\n                ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["{"]},"\n                    ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["elem"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-string ohl-string-single"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]},"cell",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]}]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":[","]},"\n                    ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["content"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["{"]},"\n                        ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["elem"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-string ohl-string-single"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]},"inner",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]}]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":[","]},"\n                        ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["content"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-string ohl-string-single"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]},"Left cell",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]}]},"\n                    ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["}"]},"\n                ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["}"]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":[","]},"\n                ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["{"]},"\n                    ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["elem"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-string ohl-string-single"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]},"cell",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]}]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":[","]},"\n                    ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["elemMods"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["{"]}," ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["position"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-string ohl-string-single"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]},"r",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]}]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["}"]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":[","]},"\n                    ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["content"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-string ohl-string-single"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]},"Right cell",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]}]},"\n                ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["}"]},"\n            ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["]"]},"\n        ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["}"]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":[","]},"\n        ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["{"]},"\n            ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["elem"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-string ohl-string-single"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]},"row",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]}]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":[","]},"\n            ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["content"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["["]},"\n                ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["{"]},"\n                    ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["elem"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-string ohl-string-single"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]},"cell",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]}]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":[","]},"\n                    ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["colspan"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-string ohl-string-single"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]},"2",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]}]},{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":[","]},"\n                    ",{"tag":"span","attrs":{"class":"ohl-name"},"content":["content"]},{"tag":"span","attrs":{"class":"ohl-operator"},"content":[":"]}," ",{"tag":"span","attrs":{"class":"ohl-string ohl-string-single"},"content":[{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]},"Second row and one cell",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["&apos;"]}]},"\n                ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["}"]},"\n            ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["]"]},"\n        ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["}"]},"\n    ",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["]"]},"\n",{"tag":"span","attrs":{"class":"ohl-punctuation"},"content":["}"]}]},{"elem":"p","content":["По умолчанию в блоке не задаются ширины ячейкам. Доопределить блок своими стилями можно следующим образом: добавляем модификатор блоку — ",{"tag":"tt","content":["mods: { layout: &apos;58-40&apos;}"]}," и ячейке — ",{"tag":"tt","content":["elemMods: { position: &apos;r&apos;}"]},". Элементом ",{"tag":"tt","content":["inner"]}," оборачиваем контент ячеек, что позволяет задать нужные нам отступы. Далее, используя каскад, задаем нужные нам ",{"tag":"tt","content":["css"]}," свойства."]},{"elem":"p","content":["Вот такой ",{"tag":"tt","content":["css"]}," получится к ",{"tag":"tt","content":["bemjson"]},", приведенному выше:"]},{"block":"ohl","mods":{"lang":"xml"},"content":[".b-layout-table_layout_58-40 .b-layout-table__cell_position_r\n{\n    width: 40%;\n}\n\n.b-layout-table_layout_58-40 .b-layout-table__gap\n{\n    width: 2%;\n    padding-left: 20px;\n}\n\n.b-layout-table_layout_58-40 .b-layout-table__inner\n{\n    margin-right: 0.8em;\n}"]},{"elem":"p","content":["Обратите внимание, что нельзя задавать самому блоку никаких дополнительных ",{"tag":"tt","content":["css"]}," свойств, это может привести к конфликтам в верстке, так как блок может быть использован в реализации других блоков. Важно: использовать блок нужно, задавая ему модификатор или миксируя его с другим блоком/элементом."]}]}}